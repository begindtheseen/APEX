var e=`@track python
@course cs-cloud
@subject Computer Science
@requires cs-dist1
@level advanced
@title Cloud Infrastructure
@name Cloud Infrastructure: from one box to a fleet
@blurb Run software on a thousand machines that keep failing: control loops, scheduling, rollouts, load balancing, queueing for capacity, autoscaling, overload control, caching, observability with SLOs, and infrastructure as code, each built as a small, faithful version on a simulated cluster.
@plainvoice true

=== cloud-01 | From one box to a fleet: failure as the normal case, and a cluster you can simulate
--- teach
Distributed Systems I was about the messages between machines: what a timeout can and cannot tell you, how retries and quorums survive a network that loses things. This course is about the machines themselves, and the software that keeps a service running on thousands of them. It is the work of platform, infrastructure and site reliability teams: deciding where programs run, replacing what breaks, rolling out new versions, spreading load, planning capacity, and noticing trouble before users do.

Every lab in the course runs on one small simulator, which you finish in this lesson. First, the three ideas that change when you go from one box to a fleet.

### Failure stops being rare

Picture one server under your desk. It might break once in three years. You would notice, swear, and fix it. Now picture 10,000 of them.

Say each machine fails on average once every 1,000 days (about three years). That average gap is the **MTBF**, the *mean time between failures*. Then one machine fails on a given day with probability about 1/1,000. Across the fleet:

- **Expected failures per day** = machines × daily probability = 10,000 × 1/1,000 = **10**.
- **Chance of a day with no failure at all** = (1 − 1/1,000)^10,000 ≈ e^(−10) ≈ 0.0000454, or about once in 60 years.

So in a fleet, a broken machine is not an incident. It is Tuesday. The arithmetic only gets worse when you count disks, power supplies, network links and software crashes, each with its own rate. The design question changes from "how do I stop machines failing?" to "**how does the service keep working while machines fail all the time?**"

The second number uses a fact worth keeping: when p is small, (1 − p)^n ≈ e^(−np). Raising a number just below 1 to a large power gives something close to 0 surprisingly fast, which is why "it almost never fails" stops being true at scale.

### Cattle, not pets

On one box, the machine has a name, a history and a person who knows its quirks. If it is sick you nurse it back. That is a **pet**.

In a fleet, you cannot nurse 10 machines a day. So machines become **cattle**: interchangeable, numbered, and replaced rather than repaired. A program does not live "on web-07". It lives wherever there is room, and if that machine dies, a new copy starts somewhere else.

This only works if two things are true:

- **Nothing important lives only on one machine.** State goes to replicated storage (you built replication in Distributed Systems I), and a program's code and configuration come from a description, not from hand edits made on that box.
- **Starting a copy is automatic and fast.** The copy is built from an **image**: a frozen, versioned bundle of the program and everything it needs, so every copy is identical. Real images are built from [[content-addressed layers|layers]].

A copy of a program running somewhere is a **task** (other systems say instance, container or pod). The slots a service wants filled, "three copies of the web server", are **replicas**.

### The control plane and the data plane

A fleet has two kinds of software, and keeping them apart is the most useful habit in this course.

- The **data plane** does the work users asked for: it serves requests, stores bytes, forwards packets. It must be fast and it must keep going.
- The **control plane** decides how the data plane is arranged: which tasks run where, how many, which version, where traffic goes. It runs in the background, a few times a second or less.

A city's water system is a good picture. The pipes and taps are the data plane: water flows whether or not anyone is in the control room. The control room is the control plane: it opens valves, reroutes around a burst main, and plans for summer. If the control room loses power, the taps must keep running.

That last sentence has a name: **static stability**. When the control plane fails, the data plane keeps doing what it was last told. It cannot repair anything, so new failures pile up, but nothing that was working stops. You will see exactly this in the lab.

### Control loops

How does the control plane "replace what breaks"? Not with a script that someone runs after an outage. With a **control loop**: a small program that runs over and over, compares what *should* be true with what *is* true, and acts to close the gap.

A thermostat is the everyday control loop. Every minute it reads the room, compares it with the setting, and turns the heater on or off. It does not need to know *why* the room got cold. A loop that keeps three replicas running works the same way: every tick it counts the replicas, and starts the missing ones. Lesson 2 builds a general version.

### The simulator

Real clusters run on real time, with threads and network calls. A lab needs something it can rerun exactly. So the course uses a **discrete-time simulation**: time moves in whole **ticks**, and everything that happens is decided by code you can read and by a seeded random number generator.

A machine has a name, a CPU capacity, a memory capacity and a zone, and holds tasks. Each task records the CPU and memory it reserved:

\`\`\`python fragment
class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu          # capacity, in whole cores
        self.mem = mem          # capacity, in GiB
        self.zone = zone
        self.up = True
        self.tasks = {}         # task name -> (cpu, mem) it reserved
\`\`\`

\`free()\` returns the unreserved \`(cpu, mem)\`, and \`fits(cpu, mem)\` says whether a task of that size can go there now: the machine is up and has room for both.

A \`Cluster\` holds the machines by name, the clock \`now\`, a seeded generator \`rng\`, a list of control loops \`loops\`, actions scheduled for later, and a \`log\` of what happened. These parts are written for you:

| call | what it does |
| --- | --- |
| \`place(task, name, cpu, mem)\` | puts a task on that machine if the name is new and it fits; returns \`True\` or \`False\` |
| \`remove(task)\` | takes a task off its machine; returns \`True\` if it was running |
| \`where(task)\` | the machine name a task runs on, or \`None\` |
| \`running(prefix)\` | sorted names of every running task that starts with \`prefix\` |
| \`recover(name)\` | brings a machine back up, empty |
| \`at(t, action)\` | schedules \`action(cluster)\` to run during tick \`t\` |
| \`run(ticks)\` | calls \`tick()\` that many times |

Every change appends a 4-tuple to \`log\`: \`(time, kind, what, detail)\`, for example \`(3, "place", "web-0", "m2")\`.

Two parts are left for you to write in the lab: \`fail(name)\`, which crashes a machine and loses its tasks, and \`tick()\`, which moves time forward as described next.

One tick does three things, in this order:

1. Run every scheduled action that is due. These are the outside world: a machine dying, a load spike, an operator's change.
2. Run every control loop, in order. This is the control plane taking a look.
3. Add one to \`now\`.

Scheduled actions come first so that a loop always sees the newest state of the world in the same tick.

Here is a loop that is not the one you will write: it only reports what it sees, once per tick.

\`\`\`python fragment
def census(cluster):
    print(cluster.now, len(cluster.running("db-")))

cluster.loops.append(census)
cluster.at(4, lambda c: c.recover("m3"))
cluster.run(10)
\`\`\`

\`at\` takes any function of the cluster, so a \`lambda\` is enough for a one-off event.

### Requests that arrive at random

Users do not arrive on a schedule. When many independent people each make a request now and then, the number arriving in one tick follows a **[[Poisson distribution|poisson]]**: it averages some rate λ (read "lambda"), but some ticks bring more and some fewer. The simulator draws it with \`poisson(rng, lam)\`, which uses only \`rng.random()\`, so the same seed always gives the same traffic, in the browser and on the checker. A service with exactly enough capacity for the *average* still drops requests on the busy ticks. Lesson 6 turns that observation into capacity planning.

### What runs on a machine

One machine runs tasks from many teams. They must not read each other's files or starve each other of CPU. That is **isolation**, and today's clusters mostly get it from [[containers|containers]]: ordinary processes that the kernel shows a private view of the system and holds to a share of its resources. The simulator models only the share: a task reserves CPU and memory, and \`fits\` refuses a task that would overflow the machine. A task that uses more than it reserved hurts its neighbours, the [[noisy neighbour|noisy]] problem.

### Where it is used

- Every large cluster manager (Borg, Kubernetes, Nomad, the schedulers inside cloud providers) is a control plane of this shape: a store of what should be running, and loops that make it so.
- Load balancers, proxies and storage servers are data planes, built to keep serving with the configuration they last received when the control plane is down.
- Training clusters for large models live with the same arithmetic: with thousands of accelerators, a hardware fault every few hours is normal, so jobs checkpoint and restart automatically.

**Watch out:**

- **Thinking a 99.9%-reliable machine makes a reliable service.** Reliability of one part says nothing about the fleet; count expected failures per day instead.
- **Putting the control plane in the request path.** If serving a request needs the scheduler to answer, a scheduler outage becomes a full outage. The data plane should work from what it was last told.
- **Replacing a task under a new name.** A replica is a slot. If a loop invents names, it loses track of which slot is empty, and starts too many or too few.

::: context layers Images built from shared layers
A container image is a stack of layers. Each layer is an archive of files: a base operating system, then the language runtime, then your libraries, then your code. Each layer is named by the SHA-256 hash of its bytes, its **digest**, so the name says exactly what is inside, and two images that share a base share the same layer, stored once. When a machine pulls an image, it downloads only the layers it does not already have. That is why a new version of a service starts in seconds: only the thin top layer with the new code is new. Builds are made **reproducible** (fixed file order, fixed timestamps) so the same source always gives the same digests.
:::

::: context poisson Why random arrivals are Poisson
If a very large number of people each have a tiny, independent chance of sending a request in a given tick, the total in that tick follows a Poisson distribution with mean λ. Its variance is also λ, so its typical wobble is √λ. At λ = 100 a tick usually brings between about 80 and 120 requests; at λ = 4, anything from 0 to 9 is common. The simulator's \`poisson\` multiplies uniform random numbers until the product falls below e^(−λ), a method due to Knuth, and splits a big λ into pieces of 30 so that e^(−λ) never underflows to 0.
:::

::: context containers Processes, virtual machines and containers
A **process** gets its own memory but shares the kernel's view of everything else: files, other processes, the network. A **virtual machine** runs a whole guest kernel on emulated hardware, so it is strongly isolated but heavier to start and to run. A **container** sits between: it is a plain process, but Linux **namespaces** give it a private view (its own process ids, file system, network interfaces, hostname), and **cgroups** cap what it can use (CPU time, memory, disk bandwidth). A container starts in well under a second and shares the host kernel, which is also why a kernel bug can break the isolation a virtual machine would keep.
:::

::: context noisy The noisy neighbour
CPU and memory can be reserved, but some resources are shared by every task on a machine: the processor's last-level cache, memory bandwidth, the network card, the disk. A task that streams through gigabytes of memory can slow its neighbours' cache-friendly code by tens of percent without ever exceeding its CPU reservation. Clusters fight this by measuring interference, by placing antagonists apart (lesson 3), and by giving latency-sensitive tasks whole cores. When one replica of a service is mysteriously slow, a noisy neighbour on its machine is a classic cause.
:::
--- task
Finish the simulator. The starter has \`poisson\`, \`Machine\`, and most of \`Cluster\`. Write three things.

1. **\`Cluster.fail(self, name)\`**: the machine called \`name\` crashes. Set its \`up\` to \`False\`, throw away all its tasks (an empty dict), append \`(now, "fail", name, number_of_tasks_lost)\` to \`log\`, and return the sorted list of the lost task names.

2. **\`Cluster.tick(self)\`**: one step of time, in this order. First run every scheduled action whose time is at most \`now\`, earliest time first, and in the order they were scheduled when times are equal; each runs once and is then removed from \`pending\`. Each entry of \`pending\` is \`(time, sequence_number, action)\` and \`action\` is called with the cluster. Then call every function in \`loops\`, in order, with the cluster. Then add 1 to \`now\`.

3. **\`restarter(service, replicas, cpu, mem)\`**: return a control loop (a function taking the cluster) that keeps tasks named \`f"{service}-{i}"\` running for every \`i\` from 0 to \`replicas − 1\`. Each time it runs, go through \`i\` in order. If that task is running somewhere, leave it. If not, place it, reserving \`cpu\` and \`mem\`, on the machine with the **most free CPU** among the machines it fits on; on a tie, the machine whose name sorts first. If it fits nowhere, skip it this time.

For example, with machines \`m1\` and \`m2\` of 4 cores and 8 GiB each, one tick of \`restarter("web", 3, 1, 1)\` puts \`web-0\` and \`web-2\` on \`m1\` and \`web-1\` on \`m2\`.
--- starter
import math
import random


def poisson(rng, lam):
    # How many requests arrive in one tick, when they come at lam per tick on average.
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def remove(self, task):
        name = self.where(task)
        if name is None:
            return False
        del self.machines[name].tasks[task]
        self.log.append((self.now, "remove", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        return []

    def recover(self, name):
        self.machines[name].up = True
        self.log.append((self.now, "recover", name, 0))

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def restarter(service, replicas, cpu, mem):
    def loop(cluster):
        pass
    return loop
--- solution
import math
import random


def poisson(rng, lam):
    # How many requests arrive in one tick, when they come at lam per tick on average.
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def remove(self, task):
        name = self.where(task)
        if name is None:
            return False
        del self.machines[name].tasks[task]
        self.log.append((self.now, "remove", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def recover(self, name):
        self.machines[name].up = True
        self.log.append((self.now, "recover", name, 0))

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def restarter(service, replicas, cpu, mem):
    def loop(cluster):
        for i in range(replicas):
            task = f"{service}-{i}"
            if cluster.where(task) is not None:
                continue
            spots = [m for m in cluster.machines.values() if m.fits(cpu, mem)]
            if spots:
                best = min(spots, key=lambda m: (-m.free()[0], m.name))
                cluster.place(task, best.name, cpu, mem)
    return loop
--- hint
\`fail\` mirrors \`remove\`, but for a whole machine: remember the sorted task names before you empty the dict, so you can log how many there were and return them.
--- hint
In \`tick\`, split \`pending\` into the entries that are due (\`time <= now\`) and the rest. Sort the due ones by \`(time, sequence_number)\`, keep only the rest in \`pending\`, then call each due action, then each loop, then move the clock.
--- hint
In the restarter's loop, build the list of machines where \`m.fits(cpu, mem)\` is true, and pick with \`min(spots, key=lambda m: (-m.free()[0], m.name))\`: the minus sign turns "most free CPU" into "smallest key", and the name breaks ties.
--- check case | fail returns the lost tasks, sorted
(c := Cluster([Machine("a", 4, 8)]), c.place("x-1", "a", 1, 1), c.place("x-0", "a", 1, 1), c.fail("a"))[-1]
=> ["x-0", "x-1"]
--- check case | A failed machine is down, empty, logged and refuses new tasks
(c := Cluster([Machine("a", 4, 8)]), c.place("x-0", "a", 1, 1), c.place("x-1", "a", 1, 1), c.fail("a"), c.machines["a"].up, c.machines["a"].tasks, c.log[-1], c.place("x-2", "a", 1, 1))[-4:]
=> (False, {}, (0, "fail", "a", 2), False)
--- check case | Failing an empty machine loses nothing
(c := Cluster([Machine("a", 4, 8)]), c.fail("a"), c.log[-1])[1:]
=> ([], (0, "fail", "a", 0))
--- check case | tick moves the clock and runs every loop once per tick, in order
(c := Cluster([Machine("a", 4, 8)]), seen := [], c.loops.append(lambda cl: seen.append(("first", cl.now))), c.loops.append(lambda cl: seen.append(("second", cl.now))), c.run(2), c.now, seen)[-2:]
=> (2, [("first", 0), ("second", 0), ("first", 1), ("second", 1)])
--- check case | Scheduled actions run in their own tick, before the loops
(c := Cluster([Machine("a", 4, 8)]), seen := [], c.at(1, lambda cl: seen.append(("action", cl.now))), c.loops.append(lambda cl: seen.append(("loop", cl.now))), c.run(3), seen)[-1]
=> [("loop", 0), ("action", 1), ("loop", 1), ("loop", 2)]
--- check case | Equal times run in scheduling order, earlier times first, each only once
(c := Cluster([Machine("a", 4, 8)]), seen := [], c.at(2, lambda cl: seen.append("b")), c.at(1, lambda cl: seen.append("a")), c.at(2, lambda cl: seen.append("c")), c.run(5), seen, c.pending)[-2:]
=> (["a", "b", "c"], [])
--- check case | An action scheduled in the past runs at the next tick
(c := Cluster([Machine("a", 4, 8)]), c.run(3), seen := [], c.at(0, lambda cl: seen.append(cl.now)), c.run(2), seen)[-1]
=> [3]
--- check case | The restarter fills the replicas, most free CPU first, ties by name
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8)]), c.loops.append(restarter("web", 3, 1, 1)), c.run(1), {m.name: sorted(m.tasks) for m in c.machines.values()})[-1]
=> {"m1": ["web-0", "web-2"], "m2": ["web-1"]}
--- check case | After a failure, the lost replicas come back on another machine in the same tick
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8)]), c.loops.append(restarter("web", 3, 1, 1)), c.at(5, lambda cl: cl.fail("m1")), c.run(6), {m.name: sorted(m.tasks) for m in c.machines.values()})[-1]
=> {"m1": [], "m2": ["web-0", "web-1", "web-2"]}
--- check case | Running it again changes nothing: no duplicates, no extra log lines
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8)]), c.loops.append(restarter("web", 2, 1, 1)), c.run(4), len(c.log), c.running())[-2:]
=> (2, ["web-0", "web-1"])
--- check case | No room: skip for now, and place once a machine recovers
(c := Cluster([Machine("m1", 2, 4), Machine("m2", 2, 4)]), c.loops.append(restarter("db", 2, 2, 2)), c.at(1, lambda cl: cl.fail("m1")), c.at(4, lambda cl: cl.recover("m1")), c.run(3), a := c.running(), c.run(2), c.running(), c.where("db-0"))[-4:]
=> (["db-1"], None, ["db-0", "db-1"], "m1")
--- check case | Memory counts too: a task that fits on CPU but not memory goes elsewhere
(c := Cluster([Machine("big", 8, 2), Machine("small", 2, 8)]), c.loops.append(restarter("cache", 1, 1, 4)), c.run(1), c.where("cache-0"))[-1]
=> "small"
--- check case | Static stability: with the loops gone, survivors keep running but nothing is repaired
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8), Machine("m3", 4, 8)]), c.loops.append(restarter("api", 3, 1, 1)), c.run(2), c.loops.clear(), c.fail("m2"), c.run(5), c.running("api-"))[-1]
=> ["api-0", "api-2"]

+++ question | Ten a day
--- ask
A fleet has 20,000 machines, and each fails on average once every 4 years (about 1,460 days). About how many machines fail on a typical day?
--- choice
Almost none: each machine is very reliable.
--- choice
About 1.
--- choice correct
About 14.
--- choice
About 1,460.
--- why
Expected failures per day = machines × daily failure probability = 20,000 / 1,460 ≈ 13.7. A reliable machine is not a reliable fleet: at this size several machines die every day, so the system must replace them automatically.

+++ question | Static stability
--- ask
The scheduler and every other control-plane service of a cluster go down for an hour. The cluster was designed to be statically stable. What happens to user traffic during that hour?
--- choice
Everything stops: no request can be routed without the control plane.
--- choice correct
Tasks that were running keep serving; tasks lost to new failures are not replaced, so capacity can only shrink until the control plane returns.
--- choice
Nothing at all changes, because the data plane repairs itself.
--- choice
New tasks are started at random until the control plane returns.
--- why
Static stability means the data plane keeps doing what it was last told without the control plane. It cannot make decisions, so failures accumulate, but it never needs the control plane to serve a request. That is why platform teams keep the control plane out of the request path.

+++ question | Why a slot has a fixed name
--- ask
A replacement loop names each new task after a counter that always goes up (\`web-0\`, \`web-1\`, then \`web-3\` to replace a dead \`web-0\`, and so on). Why do platform loops usually refill fixed slots instead?
--- choice
Because names longer than five characters are not allowed.
--- choice correct
Because a fixed slot makes "what is missing?" a question the loop can answer by looking: slot 0 is either running or not. With ever-new names, a loop that runs twice, or sees a slow start, cannot tell a missing replica from one that is starting.
--- choice
Because the counter would overflow after a few thousand failures.
--- why
A control loop decides what to do from what it observes. If the desired state is "slots 0, 1 and 2 are running", each slot can be checked on its own, and running the loop again is harmless. Lesson 2 builds on exactly this property, called idempotence.

+++ practice | Failures in a fleet
--- task
Write two functions about a fleet of identical machines, each of which fails on average once every \`mtbf_days\` days, so it fails on a given day with probability \`1 / mtbf_days\`.

- \`expected_failures(machines, mtbf_days, days)\`: the expected number of machine failures over \`days\` days, as a float rounded to 2 decimal places.
- \`p_quiet(machines, mtbf_days, days)\`: the probability that **no** machine fails on any of those \`days\` days, as a float rounded to 6 decimal places. Treat every machine-day as independent.

For example, \`expected_failures(10000, 1000, 1)\` is \`10.0\`, and \`p_quiet(10, 1000, 1)\` is \`0.990045\`.
--- starter
def expected_failures(machines, mtbf_days, days):
    return 0.0


def p_quiet(machines, mtbf_days, days):
    return 1.0
--- solution
def expected_failures(machines, mtbf_days, days):
    return round(machines * days / mtbf_days, 2)


def p_quiet(machines, mtbf_days, days):
    p_day = 1 / mtbf_days
    return round((1 - p_day) ** (machines * days), 6)
--- hint
Each machine-day fails with probability 1 / mtbf_days, and there are machines × days machine-days. Expectation adds up across them.
--- hint
"No failure at all" needs every one of the machines × days independent trials to succeed, each with probability 1 − 1/mtbf_days, so multiply: raise it to that power.
--- check case | The examples from the task
(expected_failures(10000, 1000, 1), p_quiet(10, 1000, 1))
=> (10.0, 0.990045)
--- check case | A week on a big fleet
expected_failures(50000, 1200, 7)
=> 291.67
--- check case | A quiet day on 10,000 machines is very rare
p_quiet(10000, 1000, 1)
=> 4.5e-05
--- check case | One machine for two years
(expected_failures(1, 1000, 730), p_quiet(1, 1000, 730))
=> (0.73, 0.481733)
--- check case | Zero days or zero machines: nothing fails
(expected_failures(0, 1000, 30), p_quiet(0, 1000, 30), p_quiet(500, 1000, 0))
=> (0.0, 1.0, 1.0)

+++ practice | Enough machines up
--- task
A service needs at least \`needed\` of its \`total\` machines up to carry its load. Each machine is up, independently, with probability \`p_up\`.

Write \`p_enough(total, needed, p_up)\`: the probability that at least \`needed\` machines are up, rounded to 6 decimal places. Use the binomial formula: the probability that exactly k of n are up is C(n, k) · p^k · (1 − p)^(n − k), where C(n, k) is \`math.comb(n, k)\`, the number of ways to choose which k.

Then write \`smallest_fleet(needed, p_up, target)\`: the smallest \`total\` (at least \`needed\`) for which \`p_enough(total, needed, p_up)\` is at least \`target\`. Compare the **unrounded** probability with \`target\`. Assume \`target\` is below 1 and \`p_up\` above 0, so an answer exists.

For example, \`p_enough(3, 2, 0.9)\` is \`0.972\` and \`smallest_fleet(10, 0.99, 0.9999)\` is \`13\`.
--- starter
import math


def p_enough(total, needed, p_up):
    return round(p_up ** needed, 6)


def smallest_fleet(needed, p_up, target):
    return needed
--- solution
import math


def prob_at_least(total, needed, p_up):
    return sum(math.comb(total, k) * p_up ** k * (1 - p_up) ** (total - k) for k in range(needed, total + 1))


def p_enough(total, needed, p_up):
    return round(prob_at_least(total, needed, p_up), 6)


def smallest_fleet(needed, p_up, target):
    total = needed
    while prob_at_least(total, needed, p_up) < target:
        total += 1
    return total
--- hint
Add up the probabilities of exactly k machines up, for every k from \`needed\` to \`total\`.
--- hint
For \`smallest_fleet\`, start at \`total = needed\` and add one machine at a time until the unrounded probability reaches the target. Keep the summing in a helper so both functions share it.
--- check case | The examples from the task
(p_enough(3, 2, 0.9), smallest_fleet(10, 0.99, 0.9999))
=> (0.972, 13)
--- check case | Needing every machine
p_enough(10, 10, 0.99)
=> 0.904382
--- check case | Two spares make a big difference
(p_enough(10, 10, 0.99), p_enough(11, 10, 0.99), p_enough(12, 10, 0.99))
=> (0.904382, 0.99482, 0.999794)
--- check case | Needing nothing is always enough
p_enough(5, 0, 0.3)
=> 1.0
--- check case | Less reliable machines need more spares
(smallest_fleet(10, 0.95, 0.999), smallest_fleet(100, 0.95, 0.999))
=> (14, 114)

+++ practice | The data plane under failures
--- task
The starter has the simulator from the lesson, finished. Write \`serve(cluster, service, rate, per_replica, ticks)\`, which runs the cluster for \`ticks\` ticks and plays the data plane. For each tick, in this order:

1. call \`cluster.tick()\` (the world and the control plane move first);
2. draw the arrivals with \`poisson(cluster.rng, rate)\`;
3. the capacity is \`per_replica\` times the number of running tasks whose names start with \`service + "-"\`;
4. serve as many arrivals as the capacity allows; the rest are dropped.

Return the pair \`(served, dropped)\`, totalled over all ticks. Use nothing else from \`cluster.rng\`, so the same seed always gives the same answer.

For example, with three 4-core machines and seed 1, \`restarter("api", 3, 1, 1)\` as the only loop, \`serve(cluster, "api", 20, 10, 50)\` returns \`(1013, 4)\`: a capacity of 30 a tick still drops a few requests on the busiest ticks.
--- starter
import math
import random


def poisson(rng, lam):
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def remove(self, task):
        name = self.where(task)
        if name is None:
            return False
        del self.machines[name].tasks[task]
        self.log.append((self.now, "remove", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def recover(self, name):
        self.machines[name].up = True
        self.log.append((self.now, "recover", name, 0))

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def restarter(service, replicas, cpu, mem):
    def loop(cluster):
        for i in range(replicas):
            task = f"{service}-{i}"
            if cluster.where(task) is not None:
                continue
            spots = [m for m in cluster.machines.values() if m.fits(cpu, mem)]
            if spots:
                best = min(spots, key=lambda m: (-m.free()[0], m.name))
                cluster.place(task, best.name, cpu, mem)
    return loop


def serve(cluster, service, rate, per_replica, ticks):
    return (0, 0)
--- solution
import math
import random


def poisson(rng, lam):
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def remove(self, task):
        name = self.where(task)
        if name is None:
            return False
        del self.machines[name].tasks[task]
        self.log.append((self.now, "remove", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def recover(self, name):
        self.machines[name].up = True
        self.log.append((self.now, "recover", name, 0))

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def restarter(service, replicas, cpu, mem):
    def loop(cluster):
        for i in range(replicas):
            task = f"{service}-{i}"
            if cluster.where(task) is not None:
                continue
            spots = [m for m in cluster.machines.values() if m.fits(cpu, mem)]
            if spots:
                best = min(spots, key=lambda m: (-m.free()[0], m.name))
                cluster.place(task, best.name, cpu, mem)
    return loop


def serve(cluster, service, rate, per_replica, ticks):
    served = dropped = 0
    for _ in range(ticks):
        cluster.tick()
        arrivals = poisson(cluster.rng, rate)
        capacity = per_replica * len(cluster.running(service + "-"))
        served += min(arrivals, capacity)
        dropped += max(0, arrivals - capacity)
    return served, dropped
--- hint
Keep two running totals. Each tick: move the cluster, draw the arrivals, count the replicas with \`cluster.running(service + "-")\`, and split the arrivals into what fits in the capacity and what does not.
--- hint
\`min(arrivals, capacity)\` is served and \`max(0, arrivals - capacity)\` is dropped. Call \`cluster.tick()\` before drawing the arrivals, so a replica the restarter starts this tick can already serve.
--- check case | The example from the task
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8), Machine("m3", 4, 8)], 1), c.loops.append(restarter("api", 3, 1, 1)), serve(c, "api", 20, 10, 50))[-1]
=> (1013, 4)
--- check case | No replicas at all: everything is dropped
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8), Machine("m3", 4, 8)], 1), serve(c, "api", 20, 10, 10))[-1]
=> (0, 183)
--- check case | A failure with the control plane working
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8), Machine("m3", 4, 8)], 1), c.loops.append(restarter("api", 3, 1, 1)), c.at(10, lambda cl: cl.fail("m1")), serve(c, "api", 25, 10, 40))[-1]
=> (997, 28)
--- check case | The same failure during a control-plane outage: capacity shrinks and stays down
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8), Machine("m3", 4, 8)], 1), c.loops.append(restarter("api", 3, 1, 1)), c.at(10, lambda cl: cl.loops.clear()), c.at(12, lambda cl: cl.fail("m1")), serve(c, "api", 25, 10, 40))[-1]
=> (840, 185)
--- check case | Other services do not count towards capacity
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8), Machine("m3", 4, 8)], 1), c.loops.append(restarter("apiv2", 3, 1, 1)), serve(c, "api", 20, 10, 10))[-1]
=> (0, 183)

+++ practice | Surviving the worst k failures
--- task
Before a risky change, a platform team asks: if the worst \`k\` machines failed at once, would the service still have at least \`minimum\` replicas running?

Write \`survives(cluster, service, k, minimum)\`. Count, for each machine, how many running tasks it holds whose names start with \`service + "-"\`. The worst \`k\` failures are the \`k\` machines holding the most of them. Return \`True\` if the replicas left after removing those machines' replicas number at least \`minimum\`, and \`False\` otherwise. Do not change the cluster.

Edge cases: \`k\` of 0 removes nothing; \`k\` larger than the number of machines removes everything; a service with no replicas survives only if \`minimum\` is 0.

The starter has the simulator. For example, if \`web-0\` and \`web-1\` share machine \`m1\` and \`web-2\` is on \`m2\`, then \`survives(cluster, "web", 1, 2)\` is \`False\`: losing \`m1\` leaves one replica.
--- starter
import math
import random


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))


def survives(cluster, service, k, minimum):
    return True
--- solution
import math
import random


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))


def survives(cluster, service, k, minimum):
    prefix = service + "-"
    per_machine = sorted((sum(1 for t in m.tasks if t.startswith(prefix)) for m in cluster.machines.values()), reverse=True)
    left = sum(per_machine) - sum(per_machine[:k])
    return left >= minimum
--- hint
Make a list with one count per machine: how many of the service's tasks it holds. The worst case removes the biggest counts.
--- hint
Sort the counts from largest to smallest. The replicas left are the total minus the sum of the first \`k\` counts; slicing with \`[:k]\` handles both \`k = 0\` and \`k\` larger than the list.
--- check case | The example from the task
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8), Machine("m3", 4, 8)]), c.place("web-0", "m1", 1, 1), c.place("web-1", "m1", 1, 1), c.place("web-2", "m2", 1, 1), survives(c, "web", 1, 2))[-1]
=> False
--- check case | Spread replicas survive one failure
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8), Machine("m3", 4, 8)]), c.place("web-0", "m1", 1, 1), c.place("web-1", "m2", 1, 1), c.place("web-2", "m3", 1, 1), survives(c, "web", 1, 2), survives(c, "web", 2, 2))[-2:]
=> (True, False)
--- check case | k = 0 removes nothing; k bigger than the fleet removes everything
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8)]), c.place("web-0", "m1", 1, 1), c.place("web-1", "m2", 1, 1), survives(c, "web", 0, 2), survives(c, "web", 5, 1), survives(c, "web", 5, 0))[-3:]
=> (True, False, True)
--- check case | Other services and similar names do not count
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8)]), c.place("web-0", "m1", 1, 1), c.place("webhook-0", "m2", 1, 1), c.place("web-1", "m2", 1, 1), c.place("db-0", "m2", 1, 1), survives(c, "web", 1, 1))[-1]
=> True
--- check case | No replicas: only a minimum of 0 survives
(c := Cluster([Machine("m1", 4, 8)]), survives(c, "web", 1, 0), survives(c, "web", 0, 1))[-2:]
=> (True, False)
--- check test | The cluster is not changed
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8)]), c.place("web-0", "m1", 1, 1), c.place("web-1", "m2", 1, 1), survives(c, "web", 2, 1), c.running() == ["web-0", "web-1"] and c.machines["m1"].up and c.machines["m2"].up)[-1]

+++ practice | Debug: the restarter that loses count
--- task
This version of the restarter names a replacement after how many replicas are running: if two are running, the next one is called \`f"{service}-2"\`. It is meant to keep \`replicas\` tasks named \`f"{service}-{i}"\`, for \`i\` from 0 to \`replicas − 1\`, running, placing each missing one on the machine with the most free CPU it fits on (ties: smallest name).

It works on the first tick. But when \`web-0\` dies while \`web-1\` and \`web-2\` live, it tries to start \`web-2\` again, \`place\` refuses the duplicate name, and the service stays one replica short forever. Fix it so that it refills exactly the missing slots. The starter has the simulator.
--- starter
import math
import random


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def restarter(service, replicas, cpu, mem):
    def loop(cluster):
        while len(cluster.running(service + "-")) < replicas:
            task = f"{service}-{len(cluster.running(service + '-'))}"
            spots = [m for m in cluster.machines.values() if m.fits(cpu, mem)]
            if not spots:
                return
            best = min(spots, key=lambda m: (-m.free()[0], m.name))
            if not cluster.place(task, best.name, cpu, mem):
                return
    return loop
--- solution
import math
import random


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def restarter(service, replicas, cpu, mem):
    def loop(cluster):
        for i in range(replicas):
            task = f"{service}-{i}"
            if cluster.where(task) is not None:
                continue
            spots = [m for m in cluster.machines.values() if m.fits(cpu, mem)]
            if not spots:
                return
            best = min(spots, key=lambda m: (-m.free()[0], m.name))
            cluster.place(task, best.name, cpu, mem)
    return loop
--- hint
How many replicas are running tells you how many are missing, not which ones. Which slot is empty after \`web-0\` dies?
--- hint
Check each slot by name instead: for every \`i\` in \`range(replicas)\`, if \`f"{service}-{i}"\` is not running anywhere, place that exact name.
--- check case | The first tick still fills every slot
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8)]), c.loops.append(restarter("web", 3, 1, 1)), c.run(1), c.running())[-1]
=> ["web-0", "web-1", "web-2"]
--- check case | Losing the lowest slot refills that slot
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8), Machine("m3", 4, 8)]), c.loops.append(restarter("web", 3, 1, 1)), c.run(1), c.at(2, lambda cl: cl.fail("m1")), c.run(3), c.running())[-1]
=> ["web-0", "web-1", "web-2"]
--- check case | Losing a middle slot refills that slot, on the emptiest machine
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8), Machine("m3", 4, 8)]), c.loops.append(restarter("web", 3, 1, 1)), c.run(1), c.at(2, lambda cl: cl.fail("m2")), c.run(3), c.where("web-1"))[-1]
=> "m1"
--- check case | Losing two of four slots refills both
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8), Machine("m3", 4, 8)]), c.loops.append(restarter("web", 4, 1, 1)), c.run(1), c.at(2, lambda cl: cl.fail("m1")), c.run(3), c.running())[-1]
=> ["web-0", "web-1", "web-2", "web-3"]

+++ practice | A control-plane outage drill
--- task
Platform teams rehearse a control-plane outage on purpose. Write \`outage_drill(machines, replicas, failures, outage, ticks)\`.

- \`machines\` is a list of \`(name, cpu, mem)\`. Build a \`Cluster\` from them (seed 0) and add one control loop, \`restarter("svc", replicas, 1, 1)\`.
- \`failures\` is a list of \`(tick, machine_name)\`: that machine fails during that tick.
- \`outage\` is a pair \`(start, end)\`: the control plane is down for ticks \`start\` to \`end − 1\`. Model it by scheduling an action at \`start\` that clears \`cluster.loops\`, and one at \`end\` that puts the same restarter back. Schedule the outage **before** the failures, so at the same tick the outage action runs first.
- Run \`ticks\` ticks. After every tick, record the number of running \`svc-\` replicas.

Return the list of those counts, one per tick. The starter has the simulator and the restarter.

For example, with machines \`a\`, \`b\`, \`c\` (4 cores, 8 GiB each), 3 replicas, \`failures = [(3, "a")]\`, \`outage = (2, 5)\` and 7 ticks, the counts are \`[3, 3, 3, 2, 2, 3, 3]\`: the replica lost at tick 3 is replaced only at tick 5, when the control plane returns.
--- starter
import math
import random


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def restarter(service, replicas, cpu, mem):
    def loop(cluster):
        for i in range(replicas):
            task = f"{service}-{i}"
            if cluster.where(task) is not None:
                continue
            spots = [m for m in cluster.machines.values() if m.fits(cpu, mem)]
            if spots:
                best = min(spots, key=lambda m: (-m.free()[0], m.name))
                cluster.place(task, best.name, cpu, mem)
    return loop


def outage_drill(machines, replicas, failures, outage, ticks):
    return []
--- solution
import math
import random


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def restarter(service, replicas, cpu, mem):
    def loop(cluster):
        for i in range(replicas):
            task = f"{service}-{i}"
            if cluster.where(task) is not None:
                continue
            spots = [m for m in cluster.machines.values() if m.fits(cpu, mem)]
            if spots:
                best = min(spots, key=lambda m: (-m.free()[0], m.name))
                cluster.place(task, best.name, cpu, mem)
    return loop


def outage_drill(machines, replicas, failures, outage, ticks):
    cluster = Cluster([Machine(name, cpu, mem) for name, cpu, mem in machines])
    control = restarter("svc", replicas, 1, 1)
    cluster.loops.append(control)
    start, end = outage
    cluster.at(start, lambda c: c.loops.clear())
    cluster.at(end, lambda c: c.loops.append(control))
    for t, name in failures:
        cluster.at(t, lambda c, name=name: c.fail(name))
    counts = []
    for _ in range(ticks):
        cluster.tick()
        counts.append(len(cluster.running("svc-")))
    return counts
--- hint
Keep the restarter in a variable, so the action at \`end\` can append the very same loop that the action at \`start\` cleared.
--- hint
Schedule each failure with \`cluster.at(t, lambda c, name=name: c.fail(name))\`. The \`name=name\` default freezes the current name; without it, every lambda would see the last name of the loop.
--- check case | The example from the task
outage_drill([("a", 4, 8), ("b", 4, 8), ("c", 4, 8)], 3, [(3, "a")], (2, 5), 7)
=> [3, 3, 3, 2, 2, 3, 3]
--- check case | Failures pile up during the outage
outage_drill([("a", 4, 8), ("b", 4, 8), ("c", 4, 8), ("d", 4, 8)], 4, [(2, "a"), (3, "b"), (6, "c")], (1, 5), 8)
=> [4, 4, 3, 2, 2, 4, 4, 4]
--- check case | A failure at the very tick the outage starts is not repaired
outage_drill([("a", 4, 8), ("b", 4, 8)], 2, [(2, "a")], (2, 4), 5)
=> [2, 2, 1, 1, 2]
--- check case | No outage effect when it ends before any failure
outage_drill([("a", 4, 8), ("b", 4, 8)], 2, [(5, "b")], (1, 3), 7)
=> [2, 2, 2, 2, 2, 2, 2]
--- check case | Losing every machine leaves nothing to restart on
outage_drill([("a", 2, 4), ("b", 2, 4)], 2, [(1, "a"), (1, "b")], (0, 1), 4)
=> [0, 0, 0, 0]
=== cloud-02 | Desired state and reconciliation: controllers that converge
--- teach
Last lesson's restarter kept one service at a fixed number of replicas, with the numbers written into its code. A real platform runs thousands of services, and people change what they want every minute: more replicas, a new service, one retired. This lesson builds the pattern every modern control plane is made of: **desired state** written down as data, and **controllers** that keep making the world match it.

### Say what, not how

There are two ways to ask for something.

- **Imperative**: a list of steps. "Start a web server on m3. Start another on m5." If m3 dies tomorrow, the steps say nothing about what to do.
- **Declarative**: a description of the end result. "Three web servers should be running." It stays true, and checkable, forever.

A cluster's control plane stores declarative records, each called a **spec** (short for specification): the desired state of one thing. What is really out there is the **observed state**, sometimes called the status. People and tools only ever edit specs. Making the world match is the controllers' job.

Here is the store for this lesson: a plain dict from service name to its spec.

\`\`\`python fragment
desired = {
    "search": {"replicas": 4, "cpu": 2, "mem": 4},
    "auth":   {"replicas": 2, "cpu": 1, "mem": 1},
}
\`\`\`

### The reconcile loop

A **controller** is a control loop that runs one function over and over, called **reconcile**. Each pass has three steps:

1. **Observe**: read the spec and look at what is really running.
2. **Diff**: work out the actions that would turn what is running into what is wanted.
3. **Act**: carry those actions out, as far as possible.

The diff step is worth keeping as a **[[pure function|pure]]**, one that only computes and changes nothing: given the desired state and the observed state, return a list of actions. A pure diff can be tested with plain values, and its output is a **plan** you can print and read before anything happens. Lesson 11 does exactly that for whole data centres.

In this lesson's naming, replica i of service s is the task \`f"{s}-{i}"\`, so a task name splits back into its service and its slot at the **last** dash. A service may have a dash in its own name:

\`\`\`python fragment
service, slot = "user-auth-12".rsplit("-", 1)
print(service, int(slot))     # user-auth 12
\`\`\`

The diff for one service compares slots. Slots 0 to replicas − 1 should exist; any missing one needs a **create**. A running slot at or above \`replicas\`, or any task of a service that has no spec at all, needs a **delete**.

### Why slots, not counts

Say the spec drops from 3 replicas to 2. Which task goes? If the controller deleted "any one", it might remove slot 0, leaving slots 1 and 2. On the next pass it would see slot 0 missing and slot 2 extra, and create one and delete the other, forever. Comparing **slots** instead of **counts** makes the answer unique: slot 2 goes, and the next pass finds nothing to do. Scaling down removes the highest slots first.

### Level-triggered, not edge-triggered

There are two ways a controller can decide when and what to act on. The words come from electronics: an edge-triggered circuit reacts to the moment a signal *changes*, a level-triggered one to the signal's current *level*.

- An **edge-triggered** controller reacts to events: "task web-1 died, so start web-1". It keeps its own idea of the world, updated by each event.
- A **level-triggered** controller ignores what happened and looks at what *is*: "slots 0 to 2 should run; slot 1 does not; start it".

The difference shows the first time an event is lost, and in a distributed system events are lost: a watch connection drops, a controller restarts, a message is delayed past a crash. An edge-triggered controller that misses "web-1 died" believes web-1 is fine forever. A level-triggered one fixes it on its next pass, because its decision depends only on the current state, never on history.

Real controllers combine the two. They watch for events, so they react within milliseconds, but treat each event only as a hint to "go and reconcile this object", and they also do a full **[[resync|resync]]** every few minutes, in case a hint was lost.

### Idempotent actions

A reconcile pass can stop halfway: the controller crashes, a call times out, the machine is restarted. The next pass then starts from whatever state the world is in. That is only safe if acting twice is the same as acting once. Such an action is **idempotent**.

"Create task \`web-2\` if it is not running" is idempotent: a second attempt finds it running and does nothing. "Create a new web task" is not: retry it after a timeout and you may get two. You met the same idea for requests in Distributed Systems I, with idempotency keys. In a controller, the slot name *is* the idempotency key.

One test catches most controller bugs: **after a pass that fully succeeds, the plan must be empty.** A controller with that property **[[converges|converge]]**: if the spec stops changing and the world stops breaking, it reaches the desired state and stays there.

### A pass that cannot finish

Sometimes an action is impossible right now: the cluster is full, or a machine is down. A reconciler does not wait or give up. It skips that action and tries again next pass. That is why the controller's job is stated as "keep trying to make it true", not "make it true". Lesson 3 replaces the simple "most free CPU" placement with a real scheduler.

### Where it is used

- Kubernetes is built entirely from this pattern: every object kind (deployments, services, volumes, certificates) has a controller with a reconcile function, watching an API server that stores the specs.
- Infrastructure-as-code tools run one reconcile pass on demand: plan the diff, show it, apply it (lesson 11).
- Configuration management for fleets of servers, and the operators that run databases on a cluster, are reconcilers too.

**Watch out:**

- **Trusting your own memory over the world.** A controller that caches "what I started" and diffs against that drifts the first time something changes behind its back. Observe every pass.
- **Deleting by count.** It picks a different victim each pass and never settles. Delete specific slots, highest first.
- **Actions that are not idempotent.** A retry after a timeout must not create a second copy. Name what you create from the spec.

::: context pure Why keep the diff pure
A pure function's output depends only on its inputs, and it has no side effects: it does not place tasks, write logs or read the clock. That makes the hardest part of a controller, deciding what to do, testable with plain dicts and lists, with no cluster at all. It also separates two kinds of failure: a wrong plan is a logic bug, while a right plan that fails to apply is an operational problem. Production controllers keep the same split, often with a "dry run" mode that prints the plan without acting.
:::

::: context resync How often to look again
A full resync is a level-triggered pass over every object, so it costs work proportional to the number of objects, even when nothing changed. Real controllers pick a long period (minutes, not seconds) and rely on events for speed. The resync is the safety net: the longest a lost event can leave something wrong is one resync period. That bound is the real guarantee, and it is worth stating whenever you design a controller.
:::

::: context converge Convergence as an invariant
Convergence can be argued like a loop invariant. Define the gap as the number of actions in the plan. A successful create or delete removes exactly one action from the next plan and adds none, because each action fixes one slot and touches no other. So with a stable spec, every pass that makes progress shrinks the gap, and a pass with no failures takes it to zero. Two controllers that fight over the same objects break this argument, which is why each object should have exactly one owner.
:::
--- task
The starter has the simulator from lesson 1. Write two functions.

**\`plan(desired, running)\`** is the pure diff. \`desired\` maps a service name to a spec \`{"replicas": n, "cpu": c, "mem": m}\`; \`running\` is a list of task names, each \`f"{service}-{slot}"\` (split at the last dash; the slot is a whole number). Return a list of actions:

- a delete \`("delete", task)\` for every running task whose service has no spec, or whose slot is at least that service's \`replicas\`;
- a create \`("create", task, cpu, mem)\` for every slot from 0 to \`replicas − 1\` of every service in \`desired\` that is not running, with that service's \`cpu\` and \`mem\`.

All deletes come first, ordered by service name and then by slot from **highest to lowest**. Then all creates, ordered by service name and then by slot from lowest to highest.

**\`reconciler(desired)\`** returns a control loop. Each time it runs, it calls \`plan(desired, cluster.running())\` and carries out the actions in order: a delete removes the task; a create places it on the machine with the most free CPU among those it fits on (ties: smallest name), or skips it if it fits nowhere. The loop must read \`desired\` every time it runs, so changing the dict changes what the controller does.

For example, \`plan({"web": {"replicas": 2, "cpu": 1, "mem": 1}}, ["web-1", "web-5", "old-0"])\` is \`[("delete", "old-0"), ("delete", "web-5"), ("create", "web-0", 1, 1)]\`.
--- starter
import math
import random


def poisson(rng, lam):
    # How many requests arrive in one tick, when they come at lam per tick on average.
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def remove(self, task):
        name = self.where(task)
        if name is None:
            return False
        del self.machines[name].tasks[task]
        self.log.append((self.now, "remove", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def recover(self, name):
        self.machines[name].up = True
        self.log.append((self.now, "recover", name, 0))

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def plan(desired, running):
    return []


def reconciler(desired):
    def loop(cluster):
        pass
    return loop
--- solution
import math
import random


def poisson(rng, lam):
    # How many requests arrive in one tick, when they come at lam per tick on average.
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def remove(self, task):
        name = self.where(task)
        if name is None:
            return False
        del self.machines[name].tasks[task]
        self.log.append((self.now, "remove", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def recover(self, name):
        self.machines[name].up = True
        self.log.append((self.now, "recover", name, 0))

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def parse(task):
    service, slot = task.rsplit("-", 1)
    return service, int(slot)


def plan(desired, running):
    have = set(running)
    deletes = []
    for task in running:
        service, slot = parse(task)
        if service not in desired or slot >= desired[service]["replicas"]:
            deletes.append((service, -slot, task))
    creates = []
    for service in sorted(desired):
        spec = desired[service]
        for slot in range(spec["replicas"]):
            task = f"{service}-{slot}"
            if task not in have:
                creates.append(("create", task, spec["cpu"], spec["mem"]))
    return [("delete", task) for _, _, task in sorted(deletes)] + creates


def reconciler(desired):
    def loop(cluster):
        for action in plan(desired, cluster.running()):
            if action[0] == "delete":
                cluster.remove(action[1])
                continue
            _, task, cpu, mem = action
            spots = [m for m in cluster.machines.values() if m.fits(cpu, mem)]
            if spots:
                best = min(spots, key=lambda m: (-m.free()[0], m.name))
                cluster.place(task, best.name, cpu, mem)
    return loop
--- hint
Split each running name with \`rsplit("-", 1)\` and turn the slot into an \`int\`. A task is extra if its service is missing from \`desired\` or its slot is too high. A slot is missing if its name is not in the running set.
--- hint
To order deletes by service and then by slot from highest to lowest, sort tuples \`(service, -slot, task)\` and keep the task. Comparing slots as numbers matters: as strings, \`"web-10"\` would sort before \`"web-9"\`.
--- hint
In the loop, call \`plan\` afresh on every run, with \`cluster.running()\`. Apply each action in order: \`cluster.remove(task)\` for a delete, and the same "most free CPU, then name" choice as last lesson's restarter for a create.
--- check case | The example from the task
plan({"web": {"replicas": 2, "cpu": 1, "mem": 1}}, ["web-1", "web-5", "old-0"])
=> [("delete", "old-0"), ("delete", "web-5"), ("create", "web-0", 1, 1)]
--- check case | Deletes by service, highest slot first, compared as numbers
plan({"web": {"replicas": 3, "cpu": 1, "mem": 2}, "db": {"replicas": 1, "cpu": 2, "mem": 4}}, ["web-1", "web-7", "cache-0", "web-10"])
=> [("delete", "cache-0"), ("delete", "web-10"), ("delete", "web-7"), ("create", "db-0", 2, 4), ("create", "web-0", 1, 2), ("create", "web-2", 1, 2)]
--- check case | Nothing to do when the world matches
plan({"api": {"replicas": 2, "cpu": 1, "mem": 1}}, ["api-1", "api-0"])
=> []
--- check case | A service name with dashes, and zero replicas
plan({"user-auth": {"replicas": 1, "cpu": 1, "mem": 1}, "batch": {"replicas": 0, "cpu": 4, "mem": 8}}, ["batch-0", "user-auth-0", "user-auth-1"])
=> [("delete", "batch-0"), ("delete", "user-auth-1")]
--- check case | An empty spec deletes everything
plan({}, ["b-0", "a-1", "a-0"])
=> [("delete", "a-1"), ("delete", "a-0"), ("delete", "b-0")]
--- check test | plan does not change its inputs
(d := {"web": {"replicas": 2, "cpu": 1, "mem": 1}}, r := ["web-3"], plan(d, r), d == {"web": {"replicas": 2, "cpu": 1, "mem": 1}} and r == ["web-3"])[-1]
--- check case | The reconciler starts what the spec asks for
(d := {"web": {"replicas": 3, "cpu": 1, "mem": 1}}, c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8)]), c.loops.append(reconciler(d)), c.run(1), {m.name: sorted(m.tasks) for m in c.machines.values()})[-1]
=> {"m1": ["web-0", "web-2"], "m2": ["web-1"]}
--- check case | Editing the spec changes the cluster: scale down, add a service
(d := {"web": {"replicas": 3, "cpu": 1, "mem": 1}}, c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8)]), c.loops.append(reconciler(d)), c.run(1), d["web"].update(replicas=1), d.update(db={"replicas": 2, "cpu": 2, "mem": 2}), c.run(1), {m.name: sorted(m.tasks) for m in c.machines.values()})[-1]
=> {"m1": ["db-1", "web-0"], "m2": ["db-0"]}
?? Deletes run before creates, so the room freed by web-1 and web-2 is there for db-0 and db-1.
--- check case | Removing a service's spec removes its tasks
(d := {"web": {"replicas": 2, "cpu": 1, "mem": 1}, "tmp": {"replicas": 2, "cpu": 1, "mem": 1}}, c := Cluster([Machine("m1", 8, 8)]), c.loops.append(reconciler(d)), c.run(1), d.pop("tmp"), c.run(1), c.running())[-1]
=> ["web-0", "web-1"]
--- check case | After it converges, more passes change nothing
(d := {"web": {"replicas": 2, "cpu": 1, "mem": 1}, "db": {"replicas": 1, "cpu": 2, "mem": 2}}, c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8)]), c.loops.append(reconciler(d)), c.run(5), len(c.log), plan(d, c.running()))[-2:]
=> (3, [])
--- check case | A failed machine's tasks come back; a full cluster waits for room
(d := {"web": {"replicas": 3, "cpu": 2, "mem": 2}}, c := Cluster([Machine("m1", 4, 8), Machine("m2", 2, 8)]), c.loops.append(reconciler(d)), c.at(2, lambda cl: cl.fail("m1")), c.at(5, lambda cl: cl.recover("m1")), c.run(3), a := c.running(), c.run(3), a, c.running())[-2:]
=> (["web-2"], ["web-0", "web-1", "web-2"])

+++ question | The lost event
--- ask
A controller reacts to "task died" events by restarting the task named in the event. During a network blip one such event is lost. What happens, and what is the standard fix?
--- choice
Nothing goes wrong: the cluster resends lost events automatically.
--- choice correct
The task stays dead until something else touches it; the fix is to decide from the observed state on every pass (level-triggered), with a periodic full resync, treating events only as hints.
--- choice
The controller restarts every task, because it cannot tell which one died.
--- choice
The fix is to make the network reliable, so events cannot be lost.
--- why
An edge-triggered controller's view is only as good as its event stream, and in a distributed system some events are always lost. A level-triggered controller recomputes the diff from the current state, so a lost event costs at most one resync period.

+++ question | The plan after a clean pass
--- ask
A reconcile pass applies every action in its plan, and all of them succeed. The spec has not changed and nothing has failed. What should the next pass's plan be?
--- answer
empty
nothing
[]
an empty list
no actions
--- why
If a successful pass leaves something to do, the controller does not converge: it will act on every pass, churning tasks. "The plan after a clean pass is empty" is the single most useful test of a reconcile function.

+++ question | Scaling down by count
--- ask
A controller scales a service from 3 replicas to 2 by deleting the first running task in alphabetical order (\`web-0\`). What happens on the following passes?
--- choice
It settles: two replicas run, which is what the spec asks for.
--- choice correct
It churns: the next pass sees slot 0 missing and slot 2 extra, creates web-0 and deletes web-2, and the pass after that may do the reverse.
--- choice
It deletes every replica, because the count is now wrong.
--- why
A slot-based diff has one right answer: slots 0 and 1 run, and slot 2 does not. Deleting by count picks a victim the spec does not name, so the diff sees a new mismatch every time.

+++ practice | Reconciling DNS records
--- task
The same desired-versus-observed diff works for any resource. Here it is for DNS records, which map a name to an address.

Write \`plan_records(desired, actual)\`. Both are dicts from a record name to an address string. Return a list of actions, ordered by record name:

- \`("create", name, address)\` for a name in \`desired\` but not in \`actual\`;
- \`("update", name, old_address, new_address)\` for a name in both whose addresses differ;
- \`("delete", name)\` for a name in \`actual\` but not in \`desired\`.

Names whose addresses already match produce nothing.

For example, \`plan_records({"api": "10.0.0.5"}, {"api": "10.0.0.4", "old": "10.0.9.9"})\` is \`[("update", "api", "10.0.0.4", "10.0.0.5"), ("delete", "old")]\`.
--- starter
def plan_records(desired, actual):
    return []
--- solution
def plan_records(desired, actual):
    out = []
    for name in sorted(set(desired) | set(actual)):
        if name not in actual:
            out.append(("create", name, desired[name]))
        elif name not in desired:
            out.append(("delete", name))
        elif desired[name] != actual[name]:
            out.append(("update", name, actual[name], desired[name]))
    return out
--- hint
Walk over every name that appears in either dict, in sorted order: \`sorted(set(desired) | set(actual))\`.
--- hint
For each name there are four cases: only desired (create), only actual (delete), both but different (update), both and equal (nothing).
--- check case | The example from the task
plan_records({"api": "10.0.0.5"}, {"api": "10.0.0.4", "old": "10.0.9.9"})
=> [("update", "api", "10.0.0.4", "10.0.0.5"), ("delete", "old")]
--- check case | All three kinds, ordered by name
plan_records({"api": "10.0.0.5", "www": "10.0.0.9", "db": "10.0.1.2"}, {"www": "10.0.0.8", "old": "10.0.3.3", "db": "10.0.1.2"})
=> [("create", "api", "10.0.0.5"), ("delete", "old"), ("update", "www", "10.0.0.8", "10.0.0.9")]
--- check case | Matching records produce nothing
plan_records({"a": "1.1.1.1", "b": "2.2.2.2"}, {"b": "2.2.2.2", "a": "1.1.1.1"})
=> []
--- check case | Empty on either side
(plan_records({}, {"x": "9.9.9.9"}), plan_records({"x": "9.9.9.9"}, {}), plan_records({}, {}))
=> ([("delete", "x")], [("create", "x", "9.9.9.9")], [])
--- check test | Applying the plan makes the next plan empty
(lambda d, a: (lambda acts: (lambda after: plan_records(d, after) == [])({**{x[1]: x[-1] for x in acts if x[0] != "delete"}, **{k: v for k, v in a.items() if k not in {x[1] for x in acts}}}))(plan_records(d, a)))({"a": "1", "b": "2", "c": "3"}, {"b": "9", "c": "3", "d": "4"})

+++ practice | Edge-triggered, level-triggered, and the resync
--- task
Compare the two kinds of controller on the same history. A service wants \`desired\` replicas, in slots 0 to \`desired − 1\`. Nothing runs before tick 0.

Write \`run_controller(desired, deaths, lost, ticks, resync=None)\`. For each tick \`t\` from 0 to \`ticks − 1\`:

1. **Deaths.** \`deaths\` maps a tick to a list of slots that die during it. Each listed slot that is running stops, and produces a "died" event, unless \`t\` is in the set \`lost\` (then every event of that tick is lost). A listed slot that is not running does nothing.
2. **The controller.** At tick 0, and at every tick where \`resync\` is not \`None\` and \`t % resync == 0\`, it does a level-triggered pass: it starts every missing slot. At every other tick it is edge-triggered: it restarts only the slots named in this tick's delivered events.
3. Record how many slots are running.

Return the list of counts. With \`resync=1\` the controller is fully level-triggered; with \`resync=None\` it is purely edge-triggered.

For example, \`run_controller(3, {2: [1], 4: [0]}, {2}, 6)\` is \`[3, 3, 2, 2, 2, 2]\`: slot 1's death event was lost, so the edge-triggered controller never restarts it.
--- starter
def run_controller(desired, deaths, lost, ticks, resync=None):
    return [desired] * ticks
--- solution
def run_controller(desired, deaths, lost, ticks, resync=None):
    running = set()
    counts = []
    for t in range(ticks):
        events = []
        for slot in deaths.get(t, []):
            if slot in running:
                running.discard(slot)
                if t not in lost:
                    events.append(slot)
        if t == 0 or (resync is not None and t % resync == 0):
            running |= set(range(desired))
        else:
            running |= set(events)
        counts.append(len(running))
    return counts
--- hint
Keep the running slots in a set. A death removes the slot, and records an event only when the tick is not in \`lost\`.
--- hint
A level pass is \`running |= set(range(desired))\`. An edge pass adds back only this tick's delivered events. Decide which one runs with \`t == 0 or (resync is not None and t % resync == 0)\`.
--- check case | The example from the task: a lost event is never repaired
run_controller(3, {2: [1], 4: [0]}, {2}, 6)
=> [3, 3, 2, 2, 2, 2]
--- check case | With every event delivered, edge-triggered keeps up
run_controller(3, {2: [1], 4: [0]}, set(), 6)
=> [3, 3, 3, 3, 3, 3]
--- check case | A resync every 3 ticks repairs it at tick 3
run_controller(3, {2: [1], 4: [0]}, {2}, 8, resync=3)
=> [3, 3, 2, 3, 3, 3, 3, 3]
--- check case | Fully level-triggered shrugs off lost events
run_controller(3, {2: [1], 4: [0]}, {2, 4}, 8, resync=1)
=> [3, 3, 3, 3, 3, 3, 3, 3]
--- check case | Every event of a lost tick is lost; a slot that is not running cannot die
run_controller(2, {1: [0, 1], 3: [5]}, {1}, 6, resync=4)
=> [2, 0, 0, 0, 2, 2]
--- check case | A death at tick 0 comes before the first pass
run_controller(3, {0: [0]}, {0}, 3)
=> [3, 3, 3]

+++ practice | Idempotent actuation over a flaky API
--- task
A controller talks to an API that sometimes loses its reply: the call may have taken effect, but the caller gets a \`TimeoutError\`. The starter has a \`FlakyAPI\` that simulates this. Every call (\`get\`, \`create\`, \`update\`) counts as one call, and the calls whose numbers are in \`lose\` raise \`TimeoutError\` **after** doing their work. \`create\` raises \`KeyError\` if the name already exists.

Write \`ensure(api, name, spec, attempts)\`, which makes sure the object \`name\` exists with exactly \`spec\`. Make up to \`attempts\` tries. Each try:

1. \`current = api.get(name)\`;
2. if \`current == spec\`, return \`True\`;
3. otherwise call \`api.create(name, spec)\` if \`current\` is \`None\`, or \`api.update(name, spec)\` if not, and go on to the next try (the next try's \`get\` checks whether it worked).

A \`TimeoutError\` anywhere in a try ends that try; go on to the next. If the tries run out, return \`False\`. Never create the object twice.

For example, with \`lose = {2}\`, the first try's \`get\` sees nothing and its \`create\` works but loses its reply; the second try's \`get\` sees the spec and returns \`True\`, after 3 calls in all.
--- starter
class FlakyAPI:
    def __init__(self, lose=()):
        self.objects = {}
        self.calls = 0
        self.lose = set(lose)

    def _reply(self, value):
        self.calls += 1
        if self.calls in self.lose:
            raise TimeoutError("no reply")
        return value

    def get(self, name):
        return self._reply(self.objects.get(name))

    def create(self, name, spec):
        if name in self.objects:
            raise KeyError("already exists: " + name)
        self.objects[name] = spec
        return self._reply("created")

    def update(self, name, spec):
        if name not in self.objects:
            raise KeyError("not found: " + name)
        self.objects[name] = spec
        return self._reply("updated")


def ensure(api, name, spec, attempts):
    for _ in range(attempts):
        try:
            api.create(name, spec)
            return True
        except TimeoutError:
            pass
    return False
--- solution
class FlakyAPI:
    def __init__(self, lose=()):
        self.objects = {}
        self.calls = 0
        self.lose = set(lose)

    def _reply(self, value):
        self.calls += 1
        if self.calls in self.lose:
            raise TimeoutError("no reply")
        return value

    def get(self, name):
        return self._reply(self.objects.get(name))

    def create(self, name, spec):
        if name in self.objects:
            raise KeyError("already exists: " + name)
        self.objects[name] = spec
        return self._reply("created")

    def update(self, name, spec):
        if name not in self.objects:
            raise KeyError("not found: " + name)
        self.objects[name] = spec
        return self._reply("updated")


def ensure(api, name, spec, attempts):
    for _ in range(attempts):
        try:
            current = api.get(name)
            if current == spec:
                return True
            if current is None:
                api.create(name, spec)
            else:
                api.update(name, spec)
        except TimeoutError:
            pass
    return False
--- hint
The starter's version calls \`create\` blindly: after a lost reply it creates again and hits \`KeyError\`. Read first, then act on what you read.
--- hint
Put the whole try (get, compare, create or update) inside \`try: … except TimeoutError: pass\`, in a \`for\` loop over the attempts. Only a \`get\` that sees the spec returns \`True\`.
--- check case | The example from the task: a lost reply, then a confirming read
(a := FlakyAPI({2}), ensure(a, "web", {"replicas": 3}, 3), a.objects, a.calls)[1:]
=> (True, {"web": {"replicas": 3}}, 3)
--- check case | No trouble: create, then confirm
(a := FlakyAPI(), ensure(a, "web", {"replicas": 3}, 3), a.calls)[1:]
=> (True, 3)
--- check case | Already right: one read and done
(a := FlakyAPI(), a.objects.update(web={"replicas": 3}), ensure(a, "web", {"replicas": 3}, 1), a.calls)[2:]
=> (True, 1)
--- check case | A wrong spec is updated, even when replies are lost
(a := FlakyAPI({1, 3}), a.objects.update(web={"replicas": 1}), ensure(a, "web", {"replicas": 3}, 3), a.objects, a.calls)[2:]
=> (True, {"web": {"replicas": 3}}, 4)
--- check case | Running out of tries returns False
(a := FlakyAPI({1, 2, 3}), ensure(a, "web", {"replicas": 3}, 2), a.objects, a.calls)[1:]
=> (False, {}, 2)
--- check case | The work done before the tries ran out still stands
(a := FlakyAPI({2}), ensure(a, "web", {"replicas": 3}, 1), a.objects)[1:]
=> (False, {"web": {"replicas": 3}})

+++ practice | Debug: the scale-down that never settles
--- task
\`plan(desired, running)\` takes \`desired\`, a dict from service name to a number of replicas, and \`running\`, a list of task names \`f"{service}-{slot}"\`. It should return the actions that make slots 0 to \`replicas − 1\` of each service run and nothing else: deletes first, as \`("delete", task)\`, ordered by service name and then slot from highest to lowest; then creates, as \`("create", task)\`, ordered by service name and then slot from lowest to highest. Tasks of services missing from \`desired\` are deleted.

This version counts instead of comparing slots. Scaling \`web\` from 3 to 2 deletes \`web-0\`, and the next plan then creates \`web-0\` and deletes \`web-2\`, so the controller churns forever. Fix it so the plan is right and applying it leaves nothing to do.
--- starter
def parse(task):
    service, slot = task.rsplit("-", 1)
    return service, int(slot)


def plan(desired, running):
    deletes, creates = [], []
    by_service = {}
    for task in running:
        service, slot = parse(task)
        by_service.setdefault(service, []).append(task)
    for service in sorted(by_service):
        tasks = sorted(by_service[service])
        extra = len(tasks) - desired.get(service, 0)
        for task in tasks[:max(0, extra)]:
            deletes.append(("delete", task))
    for service in sorted(desired):
        for slot in range(desired[service]):
            task = f"{service}-{slot}"
            if task not in running:
                creates.append(("create", task))
    return deletes + creates
--- solution
def parse(task):
    service, slot = task.rsplit("-", 1)
    return service, int(slot)


def plan(desired, running):
    deletes, creates = [], []
    for task in running:
        service, slot = parse(task)
        if slot >= desired.get(service, 0):
            deletes.append((service, -slot, task))
    for service in sorted(desired):
        for slot in range(desired[service]):
            task = f"{service}-{slot}"
            if task not in running:
                creates.append(("create", task))
    return [("delete", task) for _, _, task in sorted(deletes)] + creates
--- hint
The spec names which slots should exist: 0 to replicas − 1. So a task is extra exactly when its slot is at least the replica count, no matter how many others are running.
--- hint
Collect \`(service, -slot, task)\` for every extra task and sort them, so the highest slot of each service comes first and slots compare as numbers.
--- check case | Scaling down deletes the top slot
plan({"web": 2}, ["web-0", "web-1", "web-2"])
=> [("delete", "web-2")]
--- check case | Slots compare as numbers, highest first
plan({"web": 2}, ["web-0", "web-1", "web-9", "web-10"])
=> [("delete", "web-10"), ("delete", "web-9")]
--- check case | Gaps are refilled, extras removed, in one plan
plan({"web": 3, "api": 1}, ["web-0", "web-4", "api-0", "old-2"])
=> [("delete", "old-2"), ("delete", "web-4"), ("create", "web-1"), ("create", "web-2")]
--- check test | After applying a plan, the next plan is empty
(lambda d, r: (lambda after: plan(d, after) == [])(sorted(set(r) - {a[1] for a in plan(d, r) if a[0] == "delete"} | {a[1] for a in plan(d, r) if a[0] == "create"})))({"web": 2, "db": 1}, ["web-0", "web-1", "web-2", "db-3"])
--- check case | Matching state gives an empty plan
plan({"web": 2}, ["web-1", "web-0"])
=> []

+++ practice | Garbage collection by owner
--- task
Objects in a control plane often have an **owner**: a replica set owns its tasks, a deployment owns its replica sets. When an owner goes, everything it owns, directly or through others, must go too. And an object whose owner does not exist at all is an orphan, left behind by some earlier crash, and must go as well.

Write \`to_delete(objects, deleted)\`. \`objects\` maps each object's name to its owner's name, or \`None\` if it has no owner. \`deleted\` is a set of names a user just deleted; ignore any that are not in \`objects\`. Return the sorted list of every name that must go: the deleted ones, every object whose owner is missing from \`objects\`, and, repeatedly, every object whose owner is going.

For example, with \`{"deploy": None, "rs-1": "deploy", "pod-a": "rs-1", "pod-z": "rs-9"}\` and \`deleted = {"rs-1"}\`, the answer is \`["pod-a", "pod-z", "rs-1"]\`: \`pod-z\`'s owner \`rs-9\` does not exist.
--- starter
def to_delete(objects, deleted):
    return sorted(deleted)
--- solution
def to_delete(objects, deleted):
    going = {name for name in deleted if name in objects}
    for name, owner in objects.items():
        if owner is not None and owner not in objects:
            going.add(name)
    changed = True
    while changed:
        changed = False
        for name, owner in objects.items():
            if name not in going and owner in going:
                going.add(name)
                changed = True
    return sorted(going)
--- hint
Start a set with the deleted names that exist and the orphans. Then keep sweeping: any object whose owner is in the set joins it.
--- hint
Repeat the sweep until a whole pass adds nothing (a \`changed\` flag), so chains of any depth are caught. Owners of \`None\` never match a name in the set.
--- check case | The example from the task
to_delete({"deploy": None, "rs-1": "deploy", "pod-a": "rs-1", "pod-z": "rs-9"}, {"rs-1"})
=> ["pod-a", "pod-z", "rs-1"]
--- check case | Deleting the top removes the whole tree
to_delete({"deploy": None, "rs-1": "deploy", "rs-2": "deploy", "pod-a": "rs-1", "pod-b": "rs-1", "pod-c": "rs-2", "svc": None, "ep": "svc"}, {"deploy"})
=> ["deploy", "pod-a", "pod-b", "pod-c", "rs-1", "rs-2"]
--- check case | Orphans go even when nothing is deleted, and so do their children
to_delete({"svc": None, "lost": "gone", "lostchild": "lost"}, set())
=> ["lost", "lostchild"]
--- check case | Names that do not exist are ignored
(to_delete({}, {"x"}), to_delete({"a": None}, {"b"}))
=> ([], [])
--- check case | A long chain, ordered as strings
len(to_delete({f"n{i}": (f"n{i - 1}" if i else None) for i in range(50)}, {"n10"}))
=> 40

+++ practice | The controller's work queue
--- task
Real controllers do not reconcile every object on every tick. Events put an object's name (its **key**) on a work queue, and workers take keys off it and reconcile them. The queue has three rules, and each one prevents a real bug:

- A key waiting in the queue is never there twice: ten events about one object cause one reconcile, not ten.
- A key being processed is never handed to a second worker at the same time.
- If a key is added while it is being processed, it is not lost: it goes back in the queue when processing finishes, because the object changed after the worker looked at it.

Write a class \`WorkQueue\` with:

- \`add(key)\`: if the key is being processed, mark it dirty; otherwise put it at the back unless it is already waiting.
- \`get()\`: take the key at the front, mark it as being processed, and return it; return \`None\` if nothing is waiting.
- \`done(key)\`: processing has finished. If the key was marked dirty, clear the mark and put it at the back.
- \`len(q)\` (the method \`__len__\`): how many keys are waiting.

For example: add \`"a"\`, add \`"b"\`, add \`"a"\` leaves two keys waiting; \`get()\` returns \`"a"\`; adding \`"a"\` now does not make it waiting; after \`done("a")\` it is waiting again, behind \`"b"\`.
--- starter
class WorkQueue:
    def __init__(self):
        self.queue = []

    def add(self, key):
        self.queue.append(key)

    def get(self):
        return self.queue.pop(0) if self.queue else None

    def done(self, key):
        pass

    def __len__(self):
        return len(self.queue)
--- solution
class WorkQueue:
    def __init__(self):
        self.queue = []
        self.processing = set()
        self.dirty = set()

    def add(self, key):
        if key in self.processing:
            self.dirty.add(key)
        elif key not in self.queue:
            self.queue.append(key)

    def get(self):
        if not self.queue:
            return None
        key = self.queue.pop(0)
        self.processing.add(key)
        return key

    def done(self, key):
        self.processing.discard(key)
        if key in self.dirty:
            self.dirty.discard(key)
            self.queue.append(key)

    def __len__(self):
        return len(self.queue)
--- hint
Keep three things: the list of waiting keys, a set of keys being processed, and a set of dirty keys.
--- hint
\`add\` checks "being processed?" first (then mark dirty), then "already waiting?" (then do nothing). \`done\` removes the key from processing and, only if it was dirty, puts it back at the end of the list.
--- check case | The example from the task
(q := WorkQueue(), q.add("a"), q.add("b"), q.add("a"), len(q), q.get(), q.add("a"), len(q), q.done("a"), q.get(), q.get(), q.get())[4:]
=> (2, "a", None, 1, None, "b", "a", None)
--- check case | Duplicates collapse while waiting
(q := WorkQueue(), [q.add(k) for k in "xyxzyx"], len(q), [q.get() for _ in range(4)])[2:]
=> (3, ["x", "y", "z", None])
--- check case | A key is not handed out twice while it is processed
(q := WorkQueue(), q.add("a"), q.get(), q.add("a"), q.add("a"), q.get())[-1]
=> None
--- check case | done without a new add does not requeue
(q := WorkQueue(), q.add("a"), q.get(), q.done("a"), len(q), q.get())[-2:]
=> (0, None)
--- check case | Dirty keys requeue once, at the back
(q := WorkQueue(), q.add("a"), q.add("b"), q.get(), q.add("a"), q.add("a"), q.add("c"), q.done("a"), [q.get() for _ in range(4)])[-1]
=> ["b", "c", "a", None]
=== cloud-03 | Scheduling: bin packing, spreading and preemption
--- teach
Last lesson's reconciler decided *what* should run. Where each task went was an afterthought: "the machine with the most free CPU". That choice is the **scheduler's** job, and it decides two things a platform team is measured on: how many machines the company pays for, and whether one failure takes a service down. This lesson builds a scheduler of the shape real cluster managers use, and measures it.

### The problem is packing

Picture loading boxes of different sizes into identical vans. You want to use as few vans as possible. That is **bin packing**: items with sizes, bins with a capacity, and the goal of using the fewest bins. A cluster is the same, with tasks as items and machines as bins.

Two facts frame everything else:

- **No fast exact method is known.** Bin packing is [[NP-hard|np-hard]] (Theory of Computation): every known exact algorithm takes exponential time in the worst case. Schedulers use **heuristics**, quick rules that are usually close.
- **There is a simple lower bound.** You cannot beat the total size divided by the capacity, rounded up. Tasks of 4, 8, 1, 4, 2 and 1 cores on 10-core machines need at least ⌈20 / 10⌉ = 2 machines.

The classic heuristic is **first-fit decreasing**: sort the items from largest to smallest, then put each into the first bin it fits in. Placing big items first leaves the small ones to fill the gaps. It is proven to use at most about 11/9 of the optimal number of bins (plus a small constant), and in practice it is often optimal.

### Best fit and worst fit

When a task fits on several machines, which one? Two opposite rules:

- **Best fit** (also called *most allocated*): the machine that will have the **least** room left. It packs tightly and leaves whole machines empty, for big tasks or to be switched off.
- **Worst fit** (*least allocated*): the machine with the **most** room left. It spreads load, so each task has headroom to burst.

Lesson 1's restarter was worst fit. For cost, best fit wins: with 3 machines of 4 cores and tasks of 1, 1, 1 and 3 cores arriving in that order, worst fit puts the 1-core tasks on all three machines and the 3-core task fits nowhere; best fit stacks the small ones on one machine and the 3-core task gets an empty one.

### More than one resource

Machines have CPU **and** memory, and tasks use them in different proportions. A machine with 6 free cores and 1 GiB of free memory can take almost nothing: the cores are **stranded**, paid for but unusable. Packing in two dimensions means trying to keep each machine's leftovers balanced. One good heuristic places a task where its shape lines up with the machine's free space, measured as a dot product. You will try it in the practice.

### Requests and limits

How much does a task "use"? Usage moves every second, so schedulers pack by a promise instead.

- The **request** is what the task reserves. The scheduler only places a task where its request fits, so requests never add up to more than a machine.
- The **limit** is the most it is allowed to use. Above its CPU limit a task is slowed down (throttled). Above its memory limit it is killed, because memory cannot be taken back gently.

Setting limits above requests is **[[overcommit|overcommit]]**: the sum of the limits can be more than the machine, betting that not every task peaks at once. It is how clusters reach high utilization. When the bet loses on memory, the machine must kill something, and it starts with the tasks using the most memory above their request. In this course's simulator, the \`(cpu, mem)\` a task holds is its request.

### Spreading, and the filter-score pipeline

Packing tightly has a danger. If all three replicas of a service land on one machine, one failure takes all three. So schedulers also **spread**: replicas of a service go to different machines and, better, different **[[zones|zones]]** (separate buildings or power and network domains in one region, which fail independently).

Real schedulers combine these goals in two stages:

1. **Filter**: drop every machine where the task cannot run (down, too full, wrong hardware, or forbidden by a rule).
2. **Score**: rank the machines that are left, and bind the task to the best one.

The score can be a sum of weighted terms, or a tuple compared term by term, which is clearer: spreading first, and packing only to break ties. A Python tuple compares its first items, then its second if the first are equal, and so on:

\`\`\`python fragment
print((0, 3, "m2") < (1, 0, "m1"))     # True: decided by the first item
print((0, 3, "m2") < (0, 5, "m1"))     # True: first items tie, so the second decides
\`\`\`

Lowest tuple wins, so put "how bad is this machine" terms first.

### Preemption

When an important task fits nowhere, the scheduler may make room by evicting less important ones. Each task has a **priority**, and **preemption** removes lower-priority tasks (which their own controllers will try to reschedule elsewhere) so a higher-priority one can run. Production serving outranks batch jobs; batch jobs are [[written to survive being preempted|preempt]]. A good scheduler evicts as few tasks as it can, and the least important ones.

### Where it is used

- Cluster managers (Borg, Kubernetes, YARN, Slurm for training clusters) all filter, then score, then bind. Kubernetes exposes both scoring strategies (least and most allocated) and spread rules.
- Packing well is worth real money: on a fleet of 100,000 machines, a few percent better packing is thousands of machines not bought.
- Training clusters add their own constraints: a job's accelerators should share fast links, so the scheduler packs a job into one rack or one network domain, a form of affinity.

**Watch out:**

- **Packing replicas together.** Best fit alone will happily put every replica of a service on one machine. Spread first.
- **Ignoring the second resource.** A scheduler that only looks at CPU strands memory, and the reverse.
- **Arrival order.** Placing tasks in the order they arrive can strand space that sorting by size would have used. When you place a batch, place the big ones first.

::: context np-hard Why nobody solves it exactly
Bin packing is NP-hard: an algorithm that always found the minimum number of bins quickly would also solve thousands of other hard problems quickly, which nobody believes is possible. It does not mean small cases are hard: ten tasks can be packed optimally by trying every assignment. It means that for a scheduler placing tasks in milliseconds on thousands of machines, a heuristic with a proven bound, such as first-fit decreasing, is the right tool, and the lower bound tells you how far from perfect you could possibly be.
:::

::: context overcommit Betting on averages
Overcommit works for the same reason insurance does: many independent tasks rarely peak together, so the sum of their actual usage is far below the sum of their limits. The bet fails when usage is correlated, for example when every replica of a service gets busy at once during a traffic spike. That is why CPU is overcommitted freely (throttling slows things down but kills nothing) while memory is overcommitted carefully, with lower-priority tasks first in line when the machine runs short.
:::

::: context zones What a zone is
A cloud region (one metropolitan area) is divided into a few zones: separate data centres, or separate halls with their own power feeds, cooling and network paths, close enough for fast links between them. Failures that take out a rack or a whole hall stay inside one zone. Spreading replicas across three zones means a service survives losing any one of them, which is the usual design target. Lesson 11 goes up one more level, to whole regions.
:::

::: context preempt Writing jobs that can be preempted
A batch job that loses an hour of work every time it is preempted is expensive to run at low priority. So such jobs checkpoint: they save their progress every few minutes, and a restarted copy resumes from the last checkpoint. With that, low-priority capacity becomes cheap: it fills the gaps that production leaves, and gives them back within seconds when production needs them. Training runs for large models checkpoint for the same reason, against hardware failures as well as preemption.
:::
--- task
The starter has the simulator. Build a scheduler in three functions. A task named \`f"{service}-{slot}"\` belongs to \`service\` (split at the last dash).

**\`score(cluster, machine, service, cpu, mem)\`** returns a tuple for placing a task of \`service\` that reserves \`cpu\` and \`mem\` on \`machine\`. Lower is better. Its items, in order:

1. how many tasks of \`service\` already run in the machine's **zone** (on any machine in that zone);
2. how many tasks of \`service\` already run on this machine;
3. the free CPU this machine would have left after the task (best fit: less is better);
4. the free memory it would have left after the task;
5. the machine's name.

**\`schedule(cluster, task, cpu, mem)\`** filters to the machines the task fits on (\`fits\`), picks the one with the lowest score, places the task there, and returns the machine's name. If it fits nowhere, it returns \`None\` and places nothing.

**\`schedule_all(cluster, tasks)\`** takes a list of \`(name, cpu, mem)\` and schedules them **largest first**: by CPU from high to low, then memory from high to low, then name. It returns the sorted list of names that could not be placed.

For example, on machines \`a1\`, \`a2\` in zone \`za\` and \`b1\`, \`b2\` in zone \`zb\` (8 cores and 16 GiB each), scheduling \`web-0\` to \`web-4\` (2 cores, 4 GiB each) one by one places them on \`a1\`, \`b1\`, \`a2\`, \`b2\`, \`a1\`.
--- starter
import math
import random


def poisson(rng, lam):
    # How many requests arrive in one tick, when they come at lam per tick on average.
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def remove(self, task):
        name = self.where(task)
        if name is None:
            return False
        del self.machines[name].tasks[task]
        self.log.append((self.now, "remove", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def recover(self, name):
        self.machines[name].up = True
        self.log.append((self.now, "recover", name, 0))

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def score(cluster, machine, service, cpu, mem):
    return (machine.name,)


def schedule(cluster, task, cpu, mem):
    return None


def schedule_all(cluster, tasks):
    return []
--- solution
import math
import random


def poisson(rng, lam):
    # How many requests arrive in one tick, when they come at lam per tick on average.
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def remove(self, task):
        name = self.where(task)
        if name is None:
            return False
        del self.machines[name].tasks[task]
        self.log.append((self.now, "remove", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def recover(self, name):
        self.machines[name].up = True
        self.log.append((self.now, "recover", name, 0))

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def score(cluster, machine, service, cpu, mem):
    prefix = service + "-"
    in_zone = sum(1 for m in cluster.machines.values() if m.zone == machine.zone for t in m.tasks if t.startswith(prefix))
    on_machine = sum(1 for t in machine.tasks if t.startswith(prefix))
    free_cpu, free_mem = machine.free()
    return (in_zone, on_machine, free_cpu - cpu, free_mem - mem, machine.name)


def schedule(cluster, task, cpu, mem):
    service = task.rsplit("-", 1)[0]
    spots = [m for m in cluster.machines.values() if m.fits(cpu, mem)]
    if not spots:
        return None
    best = min(spots, key=lambda m: score(cluster, m, service, cpu, mem))
    cluster.place(task, best.name, cpu, mem)
    return best.name


def schedule_all(cluster, tasks):
    unplaced = []
    for name, cpu, mem in sorted(tasks, key=lambda t: (-t[1], -t[2], t[0])):
        if schedule(cluster, name, cpu, mem) is None:
            unplaced.append(name)
    return sorted(unplaced)
--- hint
For the zone count, look at every machine whose \`zone\` equals this machine's zone and count the task names that start with \`service + "-"\`. The \`"-"\` matters: \`web\` must not count \`webhook-0\`.
--- hint
\`schedule\` is filter then score: \`spots = [m for m in cluster.machines.values() if m.fits(cpu, mem)]\`, then \`min(spots, key=…)\` with the score as the key.
--- hint
For \`schedule_all\`, sort with the key \`(-cpu, -mem, name)\` so the biggest tasks go first, call \`schedule\` on each, and collect the names it returns \`None\` for.
--- check case | The example: replicas spread over zones first, then machines
(c := Cluster([Machine("a1", 8, 16, "za"), Machine("a2", 8, 16, "za"), Machine("b1", 8, 16, "zb"), Machine("b2", 8, 16, "zb")]), [schedule(c, f"web-{i}", 2, 4) for i in range(5)])[-1]
=> ["a1", "b1", "a2", "b2", "a1"]
--- check case | The score tuple for an empty machine and a busy one
(c := Cluster([Machine("a1", 8, 16, "za"), Machine("a2", 8, 16, "za")]), c.place("web-0", "a1", 2, 4), c.place("db-0", "a2", 4, 4), score(c, c.machines["a2"], "web", 1, 2), score(c, c.machines["a1"], "db", 1, 2))[-2:]
=> ((1, 0, 3, 10, "a2"), (1, 0, 5, 10, "a1"))
--- check case | Different services pack onto one machine (best fit)
(c := Cluster([Machine("m1", 8, 16), Machine("m2", 8, 16)]), [schedule(c, f"job{i}-0", 3, 2) for i in range(3)])[-1]
=> ["m1", "m1", "m2"]
--- check case | Best fit picks the tighter machine
(c := Cluster([Machine("big", 16, 32), Machine("small", 4, 8)]), schedule(c, "cache-0", 3, 6))[-1]
=> "small"
--- check case | Nowhere to go: None, and nothing placed
(c := Cluster([Machine("m1", 2, 2)]), schedule(c, "huge-0", 4, 4), c.running())[-2:]
=> (None, [])
--- check case | Down machines are filtered out
(c := Cluster([Machine("m1", 8, 8), Machine("m2", 4, 8)]), c.fail("m2"), schedule(c, "web-0", 1, 1))[-1]
=> "m1"
--- check case | Similar service names do not count as the same service
(c := Cluster([Machine("a1", 8, 16, "za"), Machine("b1", 8, 16, "zb")]), c.place("webhook-0", "b1", 1, 1), schedule(c, "web-0", 1, 1))[-1]
=> "b1"
--- check case | schedule_all places the largest first
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8)]), schedule_all(c, [("a-0", 1, 1), ("b-0", 3, 3), ("c-0", 2, 2), ("d-0", 2, 2)]), {m.name: sorted(m.tasks) for m in c.machines.values()})[-2:]
=> ([], {"m1": ["a-0", "b-0"], "m2": ["c-0", "d-0"]})
--- check case | schedule_all reports what did not fit, sorted
(c := Cluster([Machine("m1", 4, 8), Machine("m2", 4, 8)]), schedule_all(c, [("z-0", 3, 1), ("y-0", 3, 1), ("x-0", 3, 1), ("w-0", 1, 1)]))[-1]
=> ["z-0"]
--- check test | Sorting first packs better than arrival order on this batch
(c1 := Cluster([Machine(f"m{i}", 10, 100) for i in range(3)]), c2 := Cluster([Machine(f"m{i}", 10, 100) for i in range(3)]), batch := [(f"t{i}-0", s, 1) for i, s in enumerate([3, 3, 3, 7, 7, 7])], schedule_all(c1, batch) == [] and [schedule(c2, n, s, m) for n, s, m in batch].count(None) == 1)[-1]

+++ question | The lower bound
--- ask
Tasks need 7, 6, 5, 4, 3, 2 and 1 cores, and every machine has 10 cores. What is the lower bound on the number of machines, ⌈total ÷ capacity⌉?
--- answer
3
three
--- why
The total is 28 cores, and 28 ÷ 10 = 2.8, which rounds up to 3. Here 3 is also achievable (7+3, 6+4, 5+2+1), so first-fit decreasing hits the bound. The bound is not always reachable: three 6-core tasks need 3 machines although 18 ÷ 10 rounds up to 2.

+++ question | Why spread before you pack
--- ask
The score puts "replicas of this service in the zone" before "free CPU left over". What would happen with the order swapped?
--- choice
Nothing much: both terms are compared anyway.
--- choice correct
Best fit would decide almost every placement, so replicas of one service would pile onto the same tightly packed machine, and one failure could take several of them at once.
--- choice
The scheduler would refuse to place more than one replica per zone.
--- choice
Placements would become random.
--- why
A tuple compares its first items first, and later items only break ties. With packing first, the free-CPU term is almost never tied, so the spreading term would rarely be consulted. Availability goals go first; cost goals break ties.

+++ question | Requests, limits and memory
--- ask
A task requests 2 GiB of memory with a limit of 6 GiB, on a machine whose tasks' requests add up to exactly its memory. The task grows to 5 GiB while its neighbours are also above their requests. What is the likely outcome?
--- choice
Nothing: the task is under its limit, so it is safe.
--- choice correct
The machine runs out of memory, and this task, using the most memory above its request, is among the first to be killed.
--- choice
The scheduler moves the task to a bigger machine without restarting it.
--- choice
The task is throttled to 2 GiB, like CPU.
--- why
A limit above the request is overcommit: it is allowed, not guaranteed. Memory cannot be throttled, so when the machine runs short it kills tasks, starting with those furthest above their requests. Only the request is a promise.

+++ practice | First-fit decreasing and its lower bound
--- task
Write two functions for one-dimensional bin packing, where \`sizes\` is a list of whole numbers (each at most \`cap\`) and \`cap\` is the capacity of every bin.

- \`lower_bound(sizes, cap)\`: the total size divided by \`cap\`, rounded **up**, as an \`int\`.
- \`ffd(sizes, cap)\`: the number of bins first-fit decreasing uses. Sort the sizes from largest to smallest; put each into the **first** open bin (in the order the bins were opened) that still has room for it; if none has, open a new bin.

For example, \`ffd([4, 8, 1, 4, 2, 1], 10)\` is \`2\` (8+2, then 4+4+1+1) and \`lower_bound\` of the same is \`2\`. An empty list needs 0 bins.
--- starter
def lower_bound(sizes, cap):
    return sum(sizes) // cap


def ffd(sizes, cap):
    return len(sizes)
--- solution
def lower_bound(sizes, cap):
    return -(-sum(sizes) // cap)


def ffd(sizes, cap):
    rooms = []
    for size in sorted(sizes, reverse=True):
        for i, room in enumerate(rooms):
            if size <= room:
                rooms[i] -= size
                break
        else:
            rooms.append(cap - size)
    return len(rooms)
--- hint
Rounding up a whole-number division: \`-(-a // b)\` or \`(a + b - 1) // b\`. Plain \`//\` rounds down.
--- hint
Keep a list with the room left in each open bin. For each size (largest first), scan the list in order and use the first bin with enough room; the \`for … else\` form runs the \`else\` only when the loop found nothing.
--- check case | The example from the task
(ffd([4, 8, 1, 4, 2, 1], 10), lower_bound([4, 8, 1, 4, 2, 1], 10))
=> (2, 2)
--- check case | The bound is not always reachable
(ffd([6, 6, 6], 10), lower_bound([6, 6, 6], 10))
=> (3, 2)
--- check case | First-fit decreasing is not always optimal: two bins would do
ffd([4, 4, 3, 3, 3, 3], 10)
=> 3
?? 4+3+3 and 4+3+3 fits in two bins, but FFD puts 4 and 4 together first. Run it by hand to see.
--- check case | Exactly full bins
(ffd([10, 10, 10], 10), ffd([2, 5, 4, 7, 1, 3, 8], 10))
=> (3, 3)
--- check case | Nothing to pack
(ffd([], 10), lower_bound([], 10))
=> (0, 0)
--- check case | A bigger mix
(ffd([6, 6, 5, 5, 4, 4, 4, 4, 3, 3, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1], 10), lower_bound([6, 6, 5, 5, 4, 4, 4, 4, 3, 3, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1], 10))
=> (6, 6)

+++ practice | Who is killed when memory runs out
--- task
A machine has \`capacity\` GiB of memory. Its tasks were placed by their requests, but they may use more, up to their limits. \`tasks\` maps a task name to \`(request, usage)\` in GiB.

When the total usage is above \`capacity\`, the machine kills tasks until the total is at or below it. It kills in this order: the task whose usage is furthest **above its request** first (usage minus request, largest first; a task under its request has a negative value), and on a tie the name that sorts first. It stops as soon as the remaining usage fits.

Write \`oom_victims(capacity, tasks)\` that returns the list of killed task names, in the order they are killed. If the usage already fits, return an empty list.

For example, \`oom_victims(16, {"web": (4, 5), "batch": (2, 8), "db": (6, 6)})\` is \`["batch"]\`: usage is 19, \`batch\` is 6 above its request, and killing it leaves 11.
--- starter
def oom_victims(capacity, tasks):
    return sorted(tasks, key=lambda t: -tasks[t][1])[:1]
--- solution
def oom_victims(capacity, tasks):
    usage = sum(used for request, used in tasks.values())
    order = sorted(tasks, key=lambda t: (-(tasks[t][1] - tasks[t][0]), t))
    victims = []
    for name in order:
        if usage <= capacity:
            break
        victims.append(name)
        usage -= tasks[name][1]
    return victims
--- hint
Sort the names by how far each is above its request, largest first, with the name as the tie-breaker: the key \`(-(usage - request), name)\`.
--- hint
Walk that order, killing (and subtracting the usage of) one task at a time, and stop as soon as the total fits. Check before each kill, so a machine that already fits kills nobody.
--- check case | The example from the task
oom_victims(16, {"web": (4, 5), "batch": (2, 8), "db": (6, 6)})
=> ["batch"]
--- check case | Usage fits: nobody dies
oom_victims(16, {"web": (4, 4), "db": (6, 6)})
=> []
--- check case | A tie on overage goes to the name that sorts first
oom_victims(10, {"b": (2, 6), "a": (2, 6), "c": (4, 3)})
=> ["a"]
--- check case | Several kills may be needed
oom_victims(4, {"a": (1, 3), "b": (2, 4), "c": (3, 3)})
=> ["a", "b"]
?? Usage is 10. Killing a leaves 7, still too much; killing b leaves 3, which fits, so c survives. Check after each kill.
--- check case | The biggest user is not necessarily the first victim
oom_victims(9, {"x": (4, 4), "y": (1, 6), "z": (5, 5)})
=> ["y"]

+++ practice | Preemption: making room for a higher priority
--- task
A high-priority task needs \`cpu\` cores and fits nowhere. Find where to put it by evicting lower-priority tasks.

\`machines\` maps a machine name to \`{"cpu": capacity, "tasks": {task_name: (cpu, priority)}}\`. Write \`preempt(machines, cpu, priority)\`:

1. If some machine already has \`cpu\` cores free, return \`(that_machine, [])\`, choosing the first such machine by name.
2. Otherwise, for each machine, consider only tasks with priority **strictly below** \`priority\`, in this order: lowest priority first, then the largest CPU first, then by name. Evict them one at a time until the machine has room. If even evicting all of them is not enough, that machine is out.
3. Among the machines that work, choose the one with the **fewest** victims; on a tie, the one whose highest victim priority is lowest; then by machine name.

Return \`(machine_name, sorted_list_of_victims)\`, or \`None\` if no machine works.

For example, if \`m1\` (8 cores) runs \`web-0\` (4 cores, priority 10) and two batch tasks (2 cores, priority 0 each), and \`m2\` (8 cores) runs \`db-0\` (6, priority 10) and \`etl-0\` (2, priority 5), then a task of 2 cores at priority 7 gives \`("m1", ["batch-0"])\`: one victim on either machine, but \`m1\`'s victim has the lower priority.
--- starter
def preempt(machines, cpu, priority):
    return None
--- solution
def preempt(machines, cpu, priority):
    for name in sorted(machines):
        m = machines[name]
        if m["cpu"] - sum(c for c, p in m["tasks"].values()) >= cpu:
            return (name, [])
    best = None
    for name in sorted(machines):
        m = machines[name]
        room = m["cpu"] - sum(c for c, p in m["tasks"].values())
        tasks = m["tasks"]
        candidates = sorted((t for t in tasks if tasks[t][1] < priority), key=lambda t: (tasks[t][1], -tasks[t][0], t))
        victims = []
        for t in candidates:
            if room >= cpu:
                break
            victims.append(t)
            room += tasks[t][0]
        if room < cpu:
            continue
        key = (len(victims), max(tasks[t][1] for t in victims), name)
        if best is None or key < best[0]:
            best = (key, name, sorted(victims))
    return None if best is None else (best[1], best[2])
--- hint
First look for a machine with enough free CPU already. If there is none, every machine that works needs at least one victim, so "highest victim priority" is always defined.
--- hint
For each machine, sort its lower-priority tasks with the key \`(priority, -cpu, name)\` and evict until the room is enough. Compare the machines that work with the key \`(number_of_victims, highest_victim_priority, name)\`.
--- check case | The example from the task
preempt({"m1": {"cpu": 8, "tasks": {"web-0": (4, 10), "batch-0": (2, 0), "batch-1": (2, 0)}}, "m2": {"cpu": 8, "tasks": {"db-0": (6, 10), "etl-0": (2, 5)}}}, 2, 7)
=> ("m1", ["batch-0"])
--- check case | Fewer victims beats lower priority
preempt({"m1": {"cpu": 4, "tasks": {"a": (1, 1), "b": (1, 1), "c": (2, 3)}}, "m2": {"cpu": 4, "tasks": {"d": (3, 2), "e": (1, 9)}}}, 3, 5)
=> ("m2", ["d"])
--- check case | Free room means no eviction at all
preempt({"m1": {"cpu": 8, "tasks": {"x": (8, 0)}}, "m2": {"cpu": 8, "tasks": {"y": (4, 0)}}}, 4, 9)
=> ("m2", [])
--- check case | Equal or higher priority is never evicted
preempt({"m1": {"cpu": 8, "tasks": {"web-0": (4, 10), "batch-0": (2, 0), "batch-1": (2, 0)}}, "m2": {"cpu": 8, "tasks": {"db-0": (6, 10), "etl-0": (2, 5)}}}, 4, 0)
=> None
--- check case | Evicting everything lower may still not be enough
preempt({"m1": {"cpu": 8, "tasks": {"web-0": (4, 10), "batch-0": (2, 0), "batch-1": (2, 0)}}, "m2": {"cpu": 8, "tasks": {"db-0": (6, 10), "etl-0": (2, 5)}}}, 6, 7)
=> None
--- check case | No machines at all
preempt({}, 1, 1)
=> None

+++ practice | Debug: the scheduler that spreads the bill
--- task
\`pack(machines, tasks)\` should place each task, in the order given, on the machine where it fits with the **least** free CPU left over (best fit), breaking ties by the machine's position in the list. \`machines\` is a list of CPU capacities and \`tasks\` a list of CPU sizes. A task that fits nowhere is skipped. It returns the pair \`(machines_used, skipped)\`: how many machines ended up with at least one task, and how many tasks were skipped.

With machines \`[8, 8, 8]\` and tasks \`[2, 2, 2, 2]\` it returns \`(3, 0)\`, but best fit puts all four on the first machine and should return \`(1, 0)\`. Find the bug and fix it.
--- starter
def pack(machines, tasks):
    free = list(machines)
    used = set()
    skipped = 0
    for size in tasks:
        fits = [i for i in range(len(free)) if free[i] >= size]
        if not fits:
            skipped += 1
            continue
        best = max(fits, key=lambda i: (free[i] - size, -i))
        free[best] -= size
        used.add(best)
    return len(used), skipped
--- solution
def pack(machines, tasks):
    free = list(machines)
    used = set()
    skipped = 0
    for size in tasks:
        fits = [i for i in range(len(free)) if free[i] >= size]
        if not fits:
            skipped += 1
            continue
        best = min(fits, key=lambda i: (free[i] - size, i))
        free[best] -= size
        used.add(best)
    return len(used), skipped
--- hint
Read the selection line out loud: which machine does \`max\` of the leftover pick? Is that the tightest fit or the loosest?
--- hint
Best fit wants the smallest leftover, with the lowest index on a tie: \`min(fits, key=lambda i: (free[i] - size, i))\`.
--- check case | The example from the task
pack([8, 8, 8], [2, 2, 2, 2])
=> (1, 0)
--- check case | Best fit keeps the big machine free for a big task
pack([16, 4], [3, 16])
=> (2, 0)
--- check case | Small tasks stacked together leave room for the big ones
pack([4, 4, 4], [1, 1, 1, 3, 4])
=> (3, 0)
--- check case | Tasks that fit nowhere are skipped
pack([2, 2], [3, 1, 1, 1])
=> (2, 1)
--- check case | Nothing to place
pack([4, 4], [])
=> (0, 0)

+++ practice | Topology spread: how uneven may the zones be?
--- task
A **topology spread** rule says that, across a set of zones, the number of replicas in the fullest zone minus the number in the emptiest zone (the **skew**) must never exceed \`max_skew\`. Zones with no replicas count, with 0.

Write \`violations(placements, zones, max_skew)\`. \`placements\` is the list of zones in which replicas were placed, in order; \`zones\` is the list of every zone the rule covers (each placement is one of them). Replay the placements one at a time, and return the list of positions (0-based) of every placement after which the skew was above \`max_skew\`.

For example, \`violations(["a", "b", "a", "a"], ["a", "b", "c"], 1)\` is \`[2, 3]\`: after the third placement the counts are a = 2, b = 1, c = 0, a skew of 2.
--- starter
def violations(placements, zones, max_skew):
    counts = {}
    bad = []
    for i, z in enumerate(placements):
        counts[z] = counts.get(z, 0) + 1
        if max(counts.values()) - min(counts.values()) > max_skew:
            bad.append(i)
    return bad
--- solution
def violations(placements, zones, max_skew):
    counts = {z: 0 for z in zones}
    bad = []
    for i, z in enumerate(placements):
        counts[z] += 1
        if max(counts.values()) - min(counts.values()) > max_skew:
            bad.append(i)
    return bad
--- hint
The starter forgets the empty zones: a zone with no replicas never appears in its dict, so the minimum is wrong. Which zones should the counts start with?
--- hint
Start the counts at 0 for every zone in \`zones\`, then add one per placement and compare max minus min with \`max_skew\` after each.
--- check case | The example from the task
violations(["a", "b", "a", "a"], ["a", "b", "c"], 1)
=> [2, 3]
--- check case | Round-robin over zones never violates a skew of 1
violations(["a", "b", "c", "a", "b", "c"], ["a", "b", "c"], 1)
=> []
--- check case | An empty zone makes the very first stacked replica a violation
violations(["a", "a"], ["a", "b"], 1)
=> [1]
--- check case | One zone can never be skewed; nothing placed, nothing wrong
(violations(["a", "a", "a"], ["a"], 0), violations([], ["a", "b"], 1))
=> ([], [])
--- check case | A looser rule allows more stacking
(violations(["a", "a", "b", "b"], ["a", "b"], 2), violations(["a", "a", "a", "b"], ["a", "b"], 2))
=> ([], [2])

+++ practice | Packing in two dimensions: best fit or alignment
--- task
Machines have CPU **and** memory. Compare two placement rules on the same arrival stream.

Write \`pack2(machines, tasks, policy)\`. \`machines\` is a list of \`(cpu, mem)\` capacities; \`tasks\` is a list of \`(cpu, mem)\` requests, in arrival order. Each task goes to one machine where both its CPU and memory fit in what is still free, chosen by \`policy\`; a task that fits nowhere is rejected.

- \`"bestfit"\`: the machine with the least free CPU left after placing it; ties go to the lowest index.
- \`"align"\`: the machine with the **highest** alignment score, computed from its free space **before** placing: cpu × free_cpu ÷ cap_cpu² + mem × free_mem ÷ cap_mem², where cap is that machine's capacity. This is the dot product of the task and the free space, each as a fraction of the machine. Compare scores exactly, with \`Fraction\`; ties go to the lowest index.

Return \`(placed, free_cpu_total, free_mem_total)\`: how many tasks were placed, and the free CPU and memory summed over all machines at the end.

For example, with machines \`[(8, 8), (8, 8)]\` and tasks \`[(6, 1), (1, 6), (2, 7), (7, 2)]\`, \`"bestfit"\` gives \`(3, 7, 2)\`, while \`"align"\` gives \`(4, 0, 0)\`: it puts the memory-heavy task where memory is free, and everything fits.
--- starter
from fractions import Fraction


def pack2(machines, tasks, policy):
    return (0, sum(c for c, m in machines), sum(m for c, m in machines))
--- solution
from fractions import Fraction


def pack2(machines, tasks, policy):
    free = [list(m) for m in machines]
    placed = 0
    for cpu, mem in tasks:
        fits = [i for i, (fc, fm) in enumerate(free) if fc >= cpu and fm >= mem]
        if not fits:
            continue
        if policy == "bestfit":
            i = min(fits, key=lambda i: (free[i][0] - cpu, i))
        else:
            def align(i):
                cap_cpu, cap_mem = machines[i]
                return Fraction(cpu * free[i][0], cap_cpu * cap_cpu) + Fraction(mem * free[i][1], cap_mem * cap_mem)
            i = min(fits, key=lambda i: (-align(i), i))
        free[i][0] -= cpu
        free[i][1] -= mem
        placed += 1
    return placed, sum(f[0] for f in free), sum(f[1] for f in free)
--- hint
Keep a list of \`[free_cpu, free_mem]\` per machine. For each task, filter to the machines where both fit, then choose by the policy, subtract, and count.
--- hint
For \`"align"\`, the highest score with the lowest index on ties is \`min(fits, key=lambda i: (-score(i), i))\`. Build the score from two \`Fraction\`s so equal scores compare as equal.
--- check case | The example from the task
(pack2([(8, 8), (8, 8)], [(6, 1), (1, 6), (2, 7), (7, 2)], "bestfit"), pack2([(8, 8), (8, 8)], [(6, 1), (1, 6), (2, 7), (7, 2)], "align"))
=> ((3, 7, 2), (4, 0, 0))
--- check case | A task too big for every machine is rejected
pack2([(4, 8)], [(5, 1), (2, 2)], "align")
=> (1, 2, 6)
--- check case | No machines: nothing placed
pack2([], [(1, 1)], "bestfit")
=> (0, 0, 0)
--- check case | Alignment uses each machine's own capacity
(pack2([(4, 4), (8, 8)], [(2, 2)], "align"), pack2([(4, 4), (8, 8)], [(2, 2)], "bestfit"))
=> ((1, 10, 10), (1, 10, 10))
--- check case | On a mixed stream of CPU-heavy and memory-heavy tasks, alignment strands less
(lambda w: (pack2([(16, 64)] * 6, w, "bestfit"), pack2([(16, 64)] * 6, w, "align")))((lambda r: [r.choice([(4, 4), (1, 12)]) for _ in range(60)])(__import__("random").Random(3)))
=> ((39, 0, 68), (42, 0, 24))
=== cloud-04 | Rollouts and health checks: canaries that roll themselves back
--- teach
So far the controllers kept one version of a service running. But services change every day, and the change itself is the riskiest moment in a service's life: industry incident reviews keep finding that [[most outages begin with a deploy or a configuration push|changes]]. This lesson is about changing a running service safely: replacing it gradually, telling healthy tasks from sick ones, and letting statistics, not hope, decide whether a new version goes further or comes back.

### Three ways to replace a running service

- **Rolling update.** Replace the replicas a few at a time: start some new ones, wait until they work, stop some old ones, repeat. It needs no spare environment, but for a while both versions serve together, and a bad version reaches every replica before anyone may notice.
- **Blue-green.** Run a complete second copy (green) next to the live one (blue), test it, then switch all traffic at once. Rolling back is one switch back. It costs a second full environment, and the switch itself is all-or-nothing.
- **Canary.** Send a small share of the traffic, say 1%, to the new version, and compare it with the old version serving the other 99% at the same moment. If it looks as good, raise the share step by step (1%, 5%, 25%, 50%) until it carries everything; if it looks worse, send all traffic back to the old version.

The canary is named after the birds miners carried underground: a canary showed bad air before the miners felt it. A bad release should hurt a few users, briefly, instead of all of them.

### Two limits on a rolling update

A rolling update is governed by two numbers:

- **max surge**: how many replicas *above* the desired count may exist at once (extra capacity used during the update);
- **max unavailable**: how many *below* the desired count may be out of service at once.

With 10 replicas, a surge of 2 and an unavailable of 0, the update starts 2 new replicas, waits until they are ready, stops 2 old ones, and repeats. If both numbers are 0 the update can never begin: it may not add a replica and may not remove one. You will simulate this in the practice.

### Liveness and readiness

A replica has to tell the platform two different things, and mixing them up causes real outages.

- **Liveness**: *is this process stuck beyond repair?* If a liveness check keeps failing, the platform **restarts** the replica.
- **Readiness**: *can this process take traffic right now?* If a readiness check fails, the load balancer **stops sending it requests**, but nothing is restarted. A replica that is still loading its cache, or briefly overloaded, is alive but not ready.

A rollout counts a new replica only once it is ready, so a version that never becomes ready stalls its own rollout instead of replacing working replicas. Checks are judged on several failures in a row, a **[[failure threshold|threshold]]**, so one slow probe does not restart anything.

**Watch out** for one classic: a liveness check that also tests a shared dependency, such as the database. When the database has a hiccup, every replica fails liveness together and the platform restarts the whole service at once, turning a small problem into a full outage. Liveness should test only the process itself.

### Judging a canary

After some minutes, the canary has served \`can_n\` requests with \`can_err\` errors, and the old version, the **baseline**, has served \`base_n\` with \`base_err\`. Is the canary worse?

Comparing error *counts* is wrong, because the baseline serves far more traffic. Compare error *rates*. But rates from small samples wobble: a canary with 100 requests and 2 errors has a 2% rate, and so might a perfectly good one, by luck. The question is whether the difference is bigger than chance would produce.

That is a **[[two-proportion z-test|z-test]]**. Pool both samples to estimate the shared error rate if the versions were equally good:

pool = (base_err + can_err) / (base_n + can_n)

How much would the two rates differ by chance? Their difference has a **standard error** of

se = √( pool · (1 − pool) · (1/base_n + 1/can_n) )

and the **z-score** says how many standard errors apart the rates really are:

z = (can_err/can_n − base_err/base_n) / se

A worked example: the baseline has 1,000 requests and 10 errors (1%); the canary has 100 requests and 6 errors (6%). Then pool = 16 / 1,100 ≈ 0.01455, se = √(0.01455 × 0.98545 × (0.001 + 0.01)) ≈ 0.01258, and z = (0.06 − 0.01) / 0.01258 ≈ 3.97. Almost four standard errors: far beyond chance. With 1 error in the canary's 100 instead, z = 0: no evidence at all.

A canary judge then needs three answers, not two:

- **wait**, while either side has fewer requests than a minimum, because tiny samples prove nothing;
- **rollback**, when z is above a limit (3 is a common choice), meaning the canary is worse beyond reasonable doubt;
- **pass**, otherwise.

Only "worse" triggers a rollback, so the test is one-sided. And if both versions had no errors at all (pool is 0), they are equally good: pass.

### What the minimum sample can catch

Here is the uncomfortable part. With 100 canary requests, a canary at 2.5% errors against a baseline at 1% often passes, because 100 requests usually hold only 1 to 4 errors either way. The minimum sample size decides how small a regression you can catch. Each later step of a canary sees more traffic, which is one reason to keep judging at every step rather than only at the first.

### Where it is used

- Progressive delivery tools and the deploy systems of large services run exactly this loop: shift traffic in steps, compare the canary's metrics with the baseline's over the same window, and roll back automatically.
- Large services deploy region by region in **[[waves|waves]]**, with a bake time between waves, so a bad release is caught while it is in one small region.
- Feature flags apply the same idea to code paths instead of binaries: turn a feature on for 1% of users and watch.

**Watch out:**

- **Comparing counts, not rates.** At 5% of the traffic the canary has about a twentieth of the baseline's errors even when it is far worse.
- **Comparing against last week.** Compare the canary with the baseline over the same minutes, so traffic patterns and outside incidents affect both equally.
- **Treating "no data" as "good".** A canary that never gathers enough requests has not passed. Time out and roll back.

::: context changes Why changes cause outages
A running system that has worked for weeks has, in a sense, been tested by all of its real traffic. A change throws part of that evidence away: new code, a new configuration value, a new dependency version. That is why platform teams invest so heavily in making changes small, gradual and reversible. A useful habit when an incident starts is to ask first "what changed?", and to roll back before debugging, because rolling back is usually faster than understanding.
:::

::: context threshold Thresholds and flapping
One failed probe can mean the network dropped a packet, or a garbage-collection pause made the replica slow for a moment. Acting on a single failure would restart healthy replicas all day, a behaviour called flapping. Requiring several consecutive failures trades a few seconds of detection speed for stability. The same trade appears in the failure detectors of Distributed Systems I: a timeout too short gives false suspicions, too long gives slow detection.
:::

::: context z-test Where the formula comes from
If each request fails independently with probability p, the error rate of n requests averages p, with a standard deviation of √(p(1 − p)/n). The difference of two independent rates has a variance equal to the sum of their variances. Assuming both versions share one rate (the pooled estimate) gives the standard error in the lesson. For large samples the difference divided by its standard error is close to a standard normal variable, so z above 3 happens by chance only about once in 740 comparisons. Requests are not perfectly independent in real traffic, which is one more reason to require a high z.
:::

::: context waves Waves and bake time
Deploying in waves bounds the blast radius: the first wave is a single small region or a slice of one, the next few are larger, and the last covers the rest. Between waves the release bakes, running long enough for slow problems (a memory leak, a daily batch job, a rare request type) to show up. A release that would have taken down everything takes down only the first wave, for one bake period. The cost is time: a careful global rollout can take days.
:::
--- task
The starter has the simulator's \`poisson\` and a \`traffic\` function: one tick of requests at \`rate\` per tick, of which a share of \`weight\` percent goes to the canary, each request failing with that version's error probability. It returns \`(base_n, base_err, can_n, can_err)\` for the tick.

Write two functions.

**\`judge(base_n, base_err, can_n, can_err, min_requests, z_limit)\`** returns \`"wait"\` if either side has fewer than \`min_requests\` requests. Otherwise it computes the pooled rate; if that is 0 or 1 it returns \`"pass"\`. Otherwise it computes the standard error and the z-score as in the lesson, and returns \`"rollback"\` if z is above \`z_limit\`, else \`"pass"\`.

**\`rollout(seed, steps, rate, err_base, err_canary, min_requests, z_limit, max_ticks)\`** runs a canary. Make one \`random.Random(seed)\` and use it for all traffic. For each traffic share \`weight\` in \`steps\` (each below 100), in order:

1. start fresh totals of all four counts;
2. repeat: draw one tick with \`traffic(rng, rate, weight, err_base, err_canary)\`, add it to the totals, and call \`judge\` on the totals; stop when the verdict is not \`"wait"\`, or after \`max_ticks\` ticks;
3. if the verdict is still \`"wait"\`, it becomes \`"timeout"\`;
4. append \`(weight, ticks_used, verdict)\` to the history; if the verdict is not \`"pass"\`, stop.

Return \`(history, outcome)\`, where \`outcome\` is \`"promoted"\` if every step passed and \`"rolled back"\` otherwise.

For example, \`judge(1000, 10, 100, 6, 50, 3)\` is \`"rollback"\` (z ≈ 3.97), and \`judge(1000, 10, 100, 1, 50, 3)\` is \`"pass"\`.
--- starter
import math
import random


def poisson(rng, lam):
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


def traffic(rng, rate, weight, err_base, err_canary):
    # One tick of requests: weight percent of them go to the canary.
    base_n = base_err = can_n = can_err = 0
    for _ in range(poisson(rng, rate)):
        if rng.random() * 100 < weight:
            can_n += 1
            can_err += rng.random() < err_canary
        else:
            base_n += 1
            base_err += rng.random() < err_base
    return base_n, base_err, can_n, can_err


def judge(base_n, base_err, can_n, can_err, min_requests, z_limit):
    return "pass"


def rollout(seed, steps, rate, err_base, err_canary, min_requests, z_limit, max_ticks):
    return [], "promoted"
--- solution
import math
import random


def poisson(rng, lam):
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


def traffic(rng, rate, weight, err_base, err_canary):
    # One tick of requests: weight percent of them go to the canary.
    base_n = base_err = can_n = can_err = 0
    for _ in range(poisson(rng, rate)):
        if rng.random() * 100 < weight:
            can_n += 1
            can_err += rng.random() < err_canary
        else:
            base_n += 1
            base_err += rng.random() < err_base
    return base_n, base_err, can_n, can_err


def judge(base_n, base_err, can_n, can_err, min_requests, z_limit):
    if base_n < min_requests or can_n < min_requests:
        return "wait"
    pool = (base_err + can_err) / (base_n + can_n)
    if pool == 0 or pool == 1:
        return "pass"
    se = math.sqrt(pool * (1 - pool) * (1 / base_n + 1 / can_n))
    z = (can_err / can_n - base_err / base_n) / se
    return "rollback" if z > z_limit else "pass"


def rollout(seed, steps, rate, err_base, err_canary, min_requests, z_limit, max_ticks):
    rng = random.Random(seed)
    history = []
    for weight in steps:
        totals = [0, 0, 0, 0]
        verdict = "wait"
        ticks = 0
        while verdict == "wait" and ticks < max_ticks:
            for k, value in enumerate(traffic(rng, rate, weight, err_base, err_canary)):
                totals[k] += value
            ticks += 1
            verdict = judge(*totals, min_requests, z_limit)
        if verdict == "wait":
            verdict = "timeout"
        history.append((weight, ticks, verdict))
        if verdict != "pass":
            return history, "rolled back"
    return history, "promoted"
--- hint
In \`judge\`, check the minimum sample first, then the pooled rate. The order matters: with a pooled rate of 0 the standard error is 0, and dividing by it would fail.
--- hint
In \`rollout\`, keep a list of four totals per step, reset at the start of each step, and loop \`while verdict == "wait" and ticks < max_ticks\`. \`judge(*totals, min_requests, z_limit)\` passes the four totals as the first four arguments.
--- hint
Use one generator for the whole rollout, created once from the seed, so every run with the same seed sees the same traffic.
--- check case | The examples from the task
(judge(1000, 10, 100, 6, 50, 3), judge(1000, 10, 100, 1, 50, 3))
=> ("rollback", "pass")
--- check case | Too few requests on either side: wait
(judge(1000, 10, 40, 6, 50, 3), judge(30, 0, 500, 50, 50, 3))
=> ("wait", "wait")
--- check case | No errors anywhere is a pass, not a crash
(judge(1000, 0, 100, 0, 50, 3), judge(60, 60, 60, 60, 50, 3))
=> ("pass", "pass")
--- check case | Only worse is a problem: a better canary passes
judge(1000, 50, 200, 0, 50, 3)
=> "pass"
--- check case | The limit decides: z about 2.8
(judge(950, 19, 50, 4, 50, 3), judge(950, 19, 50, 4, 50, 2))
=> ("pass", "rollback")
--- check case | A good release is promoted through every step
rollout(1, [1, 5, 25, 50], 200, 0.01, 0.01, 100, 3, 60)
=> ([(1, 47, "pass"), (5, 10, "pass"), (25, 2, "pass"), (50, 2, "pass")], "promoted")
--- check case | A clearly bad release is stopped at the first step
rollout(5, [1, 5, 25, 50], 200, 0.01, 0.2, 100, 3, 60)
=> ([(1, 46, "rollback")], "rolled back")
--- check case | A small regression slips through 1% and is caught at 25%
rollout(5, [1, 5, 25, 50], 200, 0.01, 0.025, 100, 3, 80)
=> ([(1, 46, "pass"), (5, 11, "pass"), (25, 3, "rollback")], "rolled back")
--- check case | Not enough traffic in time is a timeout, and a rollback
rollout(1, [1, 5, 25, 50], 200, 0.01, 0.01, 100, 3, 40)
=> ([(1, 40, "timeout")], "rolled back")
--- check case | No steps: nothing to judge
rollout(1, [], 200, 0.01, 0.5, 100, 3, 40)
=> ([], "promoted")

+++ question | Liveness or readiness
--- ask
A replica needs 40 seconds after starting to load a large cache from storage. Until then it cannot answer requests quickly. Which check should report the loading phase?
--- choice
Liveness should fail, so the platform restarts it until it loads faster.
--- choice correct
Readiness should fail, so the load balancer sends it nothing until the cache is loaded; liveness should pass, because the process is fine.
--- choice
Both should pass, so the replica receives traffic as soon as possible.
--- choice
Both should fail, to be safe.
--- why
Readiness answers "send me traffic?" and liveness answers "restart me?". A failing liveness check during loading would restart the replica forever, and it would never finish loading.

+++ question | Counts or rates
--- ask
A canary takes 5% of the traffic. In ten minutes it has 12 errors, and the baseline has 60. What can you conclude?
--- choice
The canary is five times better.
--- choice correct
Nothing yet from the counts: the canary served about a nineteenth of the baseline's requests, so 12 errors may mean a much higher error rate; compare rates, with a significance test.
--- choice
The canary is worse, because it has any errors at all.
--- why
With 5% of the traffic, the canary serves about 5/95 of the baseline's requests. If the baseline served 19,000 requests (0.32% errors), the canary served about 1,000, which makes its rate 1.2%: almost four times worse.

+++ question | The surge and unavailable limits
--- ask
A rolling update has \`max_surge = 0\` and \`max_unavailable = 0\`. What happens?
--- choice
It replaces one replica at a time, which is the safest setting.
--- choice correct
It never starts: it may not add a replica above the desired count, and may not take one away, so no step is allowed.
--- choice
It replaces every replica at once.
--- why
To make progress, a rolling update must either add a new replica first (surge) or remove an old one first (unavailable). With both at 0, neither is allowed, and real deployment systems reject this combination.

+++ practice | Acting on health probes
--- task
A platform probes each replica regularly. \`probes\` is a list of \`(tick, replica, kind, ok)\` in time order, where \`kind\` is \`"live"\` or \`"ready"\` and \`ok\` is \`True\` or \`False\`. Count, for each replica and kind, how many probes **in a row** have failed; a success resets that count to 0.

Write \`health_actions(probes, threshold)\` that returns the list of actions taken, as \`(tick, replica, action)\`:

- When a replica's liveness failures in a row reach \`threshold\`: \`"restart"\`, and its liveness count goes back to 0.
- Every replica starts **not ready**. A successful readiness probe on a replica that is not ready makes it ready: \`"ready"\`.
- When a ready replica's readiness failures in a row reach \`threshold\`: \`"unready"\` (once; it stays not ready until a readiness success).

For example, with threshold 2, \`[(0, "a", "ready", True), (2, "a", "ready", False), (3, "a", "ready", False), (5, "a", "ready", True)]\` gives \`[(0, "a", "ready"), (3, "a", "unready"), (5, "a", "ready")]\`.
--- starter
def health_actions(probes, threshold):
    actions = []
    for tick, replica, kind, ok in probes:
        if not ok:
            actions.append((tick, replica, "restart"))
    return actions
--- solution
def health_actions(probes, threshold):
    fails = {}
    ready = set()
    actions = []
    for tick, replica, kind, ok in probes:
        key = (replica, kind)
        if ok:
            fails[key] = 0
            if kind == "ready" and replica not in ready:
                ready.add(replica)
                actions.append((tick, replica, "ready"))
            continue
        fails[key] = fails.get(key, 0) + 1
        if fails[key] >= threshold:
            if kind == "live":
                actions.append((tick, replica, "restart"))
                fails[key] = 0
            elif replica in ready:
                ready.discard(replica)
                actions.append((tick, replica, "unready"))
    return actions
--- hint
Keep a dict from \`(replica, kind)\` to failures in a row, and a set of the replicas that are ready.
--- hint
On a success, reset the count, and for readiness add the replica to the set (with a \`"ready"\` action) if it was not there. On a failure, add one; at the threshold, restart (and reset) for liveness, or mark unready only if the replica is currently ready.
--- check case | The example from the task
health_actions([(0, "a", "ready", True), (2, "a", "ready", False), (3, "a", "ready", False), (5, "a", "ready", True)], 2)
=> [(0, "a", "ready"), (3, "a", "unready"), (5, "a", "ready")]
--- check case | A stuck process is restarted every threshold failures
health_actions([(t, "w", "live", False) for t in range(7)], 3)
=> [(2, "w", "restart"), (5, "w", "restart")]
--- check case | A success in between resets the count
health_actions([(0, "w", "live", False), (1, "w", "live", True), (2, "w", "live", False), (3, "w", "live", False)], 3)
=> []
--- check case | Failing readiness before ever being ready does nothing; liveness counts separately
health_actions([(0, "b", "ready", False), (1, "b", "ready", False), (2, "b", "ready", True), (3, "b", "live", False), (4, "b", "ready", False), (5, "b", "live", False), (6, "b", "ready", False)], 2)
=> [(2, "b", "ready"), (5, "b", "restart"), (6, "b", "unready")]
--- check case | Unready is reported once, and replicas are independent
health_actions([(0, "x", "ready", True), (0, "y", "ready", True), (1, "x", "ready", False), (2, "x", "ready", False), (3, "x", "ready", False), (3, "y", "ready", False)], 2)
=> [(0, "x", "ready"), (0, "y", "ready"), (2, "x", "unready")]
--- check case | No probes, no actions
health_actions([], 1)
=> []

+++ practice | Simulating a rolling update
--- task
Simulate a rolling update from \`replicas\` old replicas to \`replicas\` new ones. Old replicas are always ready. A new replica started during tick s becomes ready at the start of tick s + \`ready_delay\` (\`ready_delay\` is at least 1).

Write \`rolling_update(replicas, max_surge, max_unavailable, ready_delay)\`. Each tick t = 0, 1, 2, … does, in order:

1. new replicas that have waited long enough become ready;
2. while there is an old replica and removing one keeps old + new_ready at least \`replicas − max_unavailable\`, remove one old replica;
3. while new_ready + new_starting is below \`replicas\` and old + new_ready + new_starting is below \`replicas + max_surge\`, start one new replica;
4. record \`(old, new_ready, new_starting)\`.

Stop after the tick that reaches \`(0, replicas, 0)\` and return the list of records. If a tick ends exactly where it began and nothing is starting, the update is stuck: return \`None\`.

For example, \`rolling_update(4, 0, 1, 1)\` is \`[(3, 0, 1), (2, 1, 1), (1, 2, 1), (0, 3, 1), (0, 4, 0)]\`.
--- starter
def rolling_update(replicas, max_surge, max_unavailable, ready_delay):
    return [(0, replicas, 0)]
--- solution
def rolling_update(replicas, max_surge, max_unavailable, ready_delay):
    old, ready, starting = replicas, 0, []
    timeline = []
    t = 0
    while not (old == 0 and ready == replicas):
        before = (old, ready, len(starting))
        ready += sum(1 for s in starting if t - s >= ready_delay)
        starting = [s for s in starting if t - s < ready_delay]
        while old > 0 and old + ready - 1 >= replicas - max_unavailable:
            old -= 1
        while ready + len(starting) < replicas and old + ready + len(starting) < replicas + max_surge:
            starting.append(t)
        state = (old, ready, len(starting))
        timeline.append(state)
        if state == before and not starting:
            return None
        t += 1
    return timeline
--- hint
Keep the start tick of every new replica that is not ready yet in a list. At the start of tick t, those with \`t - s >= ready_delay\` become ready.
--- hint
Steps 2 and 3 are \`while\` loops with exactly the conditions in the task. Compare the state at the end of the tick with the state at its start to detect a stuck update.
--- check case | The example from the task
rolling_update(4, 0, 1, 1)
=> [(3, 0, 1), (2, 1, 1), (1, 2, 1), (0, 3, 1), (0, 4, 0)]
--- check case | Surge only: never below 4 serving, slower with a long readiness delay
rolling_update(4, 1, 0, 2)
=> [(4, 0, 1), (4, 0, 1), (3, 1, 1), (3, 1, 1), (2, 2, 1), (2, 2, 1), (1, 3, 1), (1, 3, 1), (0, 4, 0)]
--- check case | Bigger limits finish much sooner
rolling_update(4, 2, 1, 1)
=> [(3, 0, 3), (0, 3, 1), (0, 4, 0)]
--- check case | Both limits zero: stuck
rolling_update(3, 0, 0, 1)
=> None
--- check case | Unavailable equal to replicas: everything goes down at once
rolling_update(2, 0, 2, 3)
=> [(0, 0, 2), (0, 0, 2), (0, 0, 2), (0, 2, 0)]
--- check case | Ten replicas: how long each setting takes
(len(rolling_update(10, 1, 0, 3)), len(rolling_update(10, 5, 0, 3)), len(rolling_update(10, 0, 5, 3)))
=> (31, 7, 7)

+++ practice | Debug: the canary judge that counts
--- task
\`verdict(base_n, base_err, can_n, can_err)\` should say whether a canary looks worse than its baseline, using error **rates**: return \`"rollback"\` if the canary's error rate is more than twice the baseline's rate plus 0.005, that is if \`can_err / can_n > 2 * base_err / base_n + 0.005\`; otherwise \`"pass"\`. If either side served no requests, return \`"wait"\`.

The canary takes only a small share of the traffic, and this version compares raw error counts, so a canary with 10% errors on 100 requests "passes" against a baseline with 1% errors on 2,000. Fix it.
--- starter
def verdict(base_n, base_err, can_n, can_err):
    if base_n == 0 or can_n == 0:
        return "wait"
    if can_err > 2 * base_err:
        return "rollback"
    return "pass"
--- solution
def verdict(base_n, base_err, can_n, can_err):
    if base_n == 0 or can_n == 0:
        return "wait"
    if can_err / can_n > 2 * base_err / base_n + 0.005:
        return "rollback"
    return "pass"
--- hint
10 errors in 100 requests and 20 errors in 2,000 requests: which is worse? Compare each count with its own number of requests.
--- hint
Divide each side's errors by its requests before comparing, exactly as the formula in the task says.
--- check case | The case from the task
verdict(2000, 20, 100, 10)
=> "rollback"
--- check case | Same rate is fine, even with more errors in absolute terms
verdict(100, 1, 2000, 20)
=> "pass"
--- check case | A baseline with no errors still allows a little noise
(verdict(1000, 0, 200, 1), verdict(1000, 0, 200, 2))
=> ("pass", "rollback")
--- check case | No requests on a side: wait
(verdict(0, 0, 10, 1), verdict(10, 1, 0, 0))
=> ("wait", "wait")

+++ practice | Blue-green: how long to drain
--- task
In a blue-green switch, new requests go to green from the moment of the switch, but requests already running on blue must finish before blue is shut down, or they are cut off. That waiting period is the **drain**.

Write \`drain_time(requests, switch)\`. \`requests\` is a list of \`(start, duration)\` pairs in seconds, all served by blue if they started **before** \`switch\`. A request occupies blue from \`start\` until \`start + duration\`. Return the shortest drain, in seconds after \`switch\`, that lets every request that started before the switch finish: the latest end among them, minus \`switch\`, or 0 if none is still running at the switch. A request that started exactly at \`switch\` went to green.

For example, \`drain_time([(0, 5), (3, 10), (9, 4), (12, 1)], 10)\` is \`3\`: the request that started at 3 ends at 13.
--- starter
def drain_time(requests, switch):
    return max((start + duration for start, duration in requests), default=switch) - switch
--- solution
def drain_time(requests, switch):
    longest = 0
    for start, duration in requests:
        if start < switch and start + duration > switch:
            longest = max(longest, start + duration - switch)
    return longest
--- hint
Only requests with \`start < switch\` are on blue, and only those still running at the switch (\`start + duration > switch\`) need waiting for.
--- hint
Keep the largest \`start + duration - switch\` among them, starting from 0 so that "nothing to wait for" gives 0.
--- check case | The example from the task
drain_time([(0, 5), (3, 10), (9, 4), (12, 1)], 10)
=> 3
--- check case | Requests after the switch went to green
drain_time([(1, 2), (10, 50), (11, 9)], 10)
=> 0
--- check case | A request that ends exactly at the switch needs no wait
drain_time([(1, 4)], 5)
=> 0
--- check case | No requests at all
drain_time([], 3)
=> 0
--- check case | One long request decides
drain_time([(2, 3), (4, 100), (7, 6)], 8)
=> 96

+++ practice | Waves and the blast radius
--- task
A global service deploys region by region. \`waves\` is a list of lists of region names: wave i starts at tick \`i × bake\`, and every region in it gets the new release at that tick. This release is bad: each region's alarms fire \`detect\` ticks after it gets the release. The **first** alarm anywhere triggers an instant rollback of every region, and no wave whose start tick is at or after that alarm starts.

\`shares\` maps each region to its share of users (whole numbers). The **exposure** is the sum, over every region that got the release, of its share times the ticks from when it got the release until the rollback.

Write \`blast_radius(shares, waves, bake, detect)\` that returns \`(sorted list of regions that got the release, exposure)\`.

For example, with shares \`{"canary": 1, "us": 40, "eu": 35, "asia": 24}\`, waves \`[["canary"], ["us"], ["eu", "asia"]]\`, \`bake = 10\` and \`detect = 15\`, the canary's alarm fires at tick 15, after \`us\` started at 10 but before the third wave at 20, so the answer is \`(["canary", "us"], 1 × 15 + 40 × 5)\`, that is \`(["canary", "us"], 215)\`.
--- starter
def blast_radius(shares, waves, bake, detect):
    regions = sorted(r for wave in waves for r in wave)
    return regions, sum(shares[r] for r in regions) * detect
--- solution
def blast_radius(shares, waves, bake, detect):
    since = {}
    alarm = None
    for i, wave in enumerate(waves):
        start = i * bake
        if alarm is not None and start >= alarm:
            break
        for region in wave:
            since[region] = start
            if alarm is None or start + detect < alarm:
                alarm = start + detect
    exposure = sum(shares[r] * (alarm - s) for r, s in since.items())
    return sorted(since), exposure
--- hint
Walk the waves in order, keeping the earliest alarm time so far. Before starting a wave, compare its start tick with that alarm.
--- hint
Record when each region got the release. At the end, each exposed region contributes its share times (alarm − its start tick).
--- check case | The example from the task
blast_radius({"canary": 1, "us": 40, "eu": 35, "asia": 24}, [["canary"], ["us"], ["eu", "asia"]], 10, 15)
=> (["canary", "us"], 215)
--- check case | Fast detection keeps it inside the first wave
blast_radius({"canary": 1, "us": 40, "eu": 35, "asia": 24}, [["canary"], ["us"], ["eu", "asia"]], 10, 4)
=> (["canary"], 4)
--- check case | One big wave exposes everyone
blast_radius({"canary": 1, "us": 40, "eu": 35, "asia": 24}, [["canary", "us", "eu", "asia"]], 10, 4)
=> (["asia", "canary", "eu", "us"], 400)
--- check case | A wave starting exactly at the alarm does not start
blast_radius({"canary": 1, "us": 40, "eu": 35, "asia": 24}, [["canary"], ["us"], ["eu", "asia"]], 10, 20)
=> (["canary", "us"], 420)
--- check case | Slow detection lets every wave out
blast_radius({"canary": 1, "us": 40, "eu": 35, "asia": 24}, [["canary"], ["us"], ["eu", "asia"]], 10, 35)
=> (["asia", "canary", "eu", "us"], 1920)
--- check case | Nothing deployed, nothing exposed
blast_radius({"us": 50}, [], 10, 5)
=> ([], 0)
=== cloud-05 | Service discovery and load balancing: who gets the next request
--- teach
The controllers of the last lessons keep the right replicas running, in the right places, at the right version. Now a request arrives. Which replica should get it? This lesson covers how clients find the replicas of a service at all (**service discovery**), and how a **load balancer** picks one for each request. You will build four picking rules and race them on the simulator, and see one of the most surprising results in systems: a little randomness beats a "smart" rule that works from slightly old information.

### Finding the replicas

Replicas come and go all day. Clients need a current list, and there are two common ways to get it.

- **DNS.** The service has a name, and a DNS lookup returns the addresses of its replicas. It works with every client ever written. But answers are cached for their **[[TTL|ttl]]** (time to live), so a client can keep using a dead replica's address for that long.
- **A registry.** Each replica registers itself and sends a **heartbeat** every few seconds. An entry whose heartbeats stop is dropped after its own TTL. Load balancers and clients watch the registry for changes. This is faster and richer (it can carry health, zone and version), but clients need a library or a proxy that speaks it.

Either way, the list is always a little out of date. A load balancer must also stop sending to replicas that fail, using the health checks from lesson 4.

### L4 and L7

Load balancers work at [[one of two layers|layer4]] of the network stack (Computer Networks).

- An **L4** (transport layer) balancer sees TCP connections, not requests. It picks a backend when a connection opens, and every request on that connection goes there. It is fast and simple, but it cannot look inside, and one long-lived connection carrying a huge stream of requests stays pinned to one backend.
- An **L7** (application layer) balancer understands the protocol, typically HTTP. It picks a backend per **request**, and can route by path or header (\`/api/\` to one pool, \`/static/\` to another), retry a failed request elsewhere, and send 1% of users to a canary. It costs more processing per request.

### Four ways to pick

Say the service has n replicas, and the balancer knows each one's **queue**: the work it has waiting. Four classic rules:

- **Round robin**: replica 0, 1, 2, …, n − 1, then 0 again. Perfectly fair in *count*.
- **Random**: any replica, uniformly.
- **Least loaded**: the replica with the shortest queue.
- **Power of two choices**: pick **two** replicas at random and send the request to the one with the shorter queue.

Round robin is fair only if every request costs the same and every replica is equally fast. Real requests do not: one search query takes 2 ms and the next takes 200 ms. Round robin keeps sending new work to a replica that happens to be chewing on three slow requests. Random is worse: some replicas get more than their share by plain luck, and the luckiest one sets the tail latency.

### The trouble with "least loaded"

Least loaded looks perfect: always choose the emptiest queue. It is, when the balancer sees every queue exactly as it is at that instant. But real balancers see load through reports that are a little old, and there are usually many balancers, each picking on its own.

Picture a supermarket where a screen above the tills shows the queue lengths, updated once a minute. Everyone who walks in during that minute heads for the same "shortest" queue, which instantly becomes the longest. This is the **[[herd effect|herd]]**: with stale information, least loaded sends a whole burst of requests to one replica.

Power of two choices avoids it. Each request only compares two random replicas, so a burst spreads over many pairs, and even with old information each choice still avoids the worst queues. [[The improvement over random is dramatic|two-choices]]: with n replicas and n requests, the fullest replica under random gets about log n / log log n requests, while with two choices it gets about log log n, a much smaller number. Going from one random choice to two gives most of the benefit; going to three adds little.

In code, two distinct random replicas come from \`rng.sample\`:

\`\`\`python fragment
a, b = rng.sample(range(len(view)), 2)
\`\`\`

### Measuring a balancer

How do you tell which rule is better? Run the same traffic through each and measure the queues. Two numbers matter:

- the **peak** queue, which is where the slowest requests wait;
- the **total waiting**: the sum, over every tick, of all the work still queued. By **[[Little's law|little]]** (lesson 6) the average time a request waits is proportional to it.

### Where it is used

- L7 proxies (Envoy, NGINX, HAProxy) and service meshes offer round robin, least requests and power of two choices; several use power of two choices as their least-requests rule, for exactly the herd reason.
- Large RPC systems put a balancer inside each client, so thousands of independent pickers work from slightly different, slightly old views: the setting where the herd effect is worst.
- Cloud load balancers are L4 for raw TCP and UDP traffic and L7 for HTTP; a common design has an L4 tier spreading connections over a fleet of L7 proxies.
- Inference servers for large models route on queue depth too, since one long generation can occupy a replica for many seconds (ML Systems II).

**Watch out:**

- **Trusting load information that is old.** If the view is stale and there are many pickers, "least loaded" stampedes. Use two choices.
- **Counting requests instead of work.** Equal request counts are not equal load when request costs differ by a hundred times.
- **Pinned connections.** Behind an L4 balancer, a client with one long-lived connection never moves, even when new replicas start. Balance per request, or recycle connections now and then.

::: context ttl The price of caching an answer
A DNS answer carries a TTL in seconds, and resolvers and clients may reuse it until it expires. A short TTL (say 30 seconds) means faster failover but more lookups; a long TTL (an hour) means fewer lookups but an hour in which some clients still try an old address. Some clients ignore TTLs and cache longer still. That is one reason service-to-service traffic inside a data centre usually goes through registries or proxies rather than plain DNS.
:::

::: context layer4 What each layer can see
At layer 4 a balancer sees addresses, ports and the bytes of a connection, which it can forward without understanding them; it can even pass encrypted traffic straight through. At layer 7 it parses the requests themselves (method, path, headers), which means terminating encryption and holding each request in memory. That costs CPU, but it is what makes per-request routing, retries, canary splits and request-level metrics possible.
:::

::: context herd The herd effect, measured
Michael Mitzenmacher studied this in "How useful is old information?" (2000): when servers report their load periodically and clients pick the least loaded, performance can be far worse than picking at random, because everyone piles onto the same server between updates. Choosing the better of two random servers stays good across a wide range of staleness. The same effect appears anywhere many agents act on one shared, delayed signal, such as cars all following the same traffic report onto one "clear" road.
:::

::: context two-choices Why two choices are so much better
With one random choice, each replica's load is like counting heads in many coin flips: some replica gets unlucky by a margin that grows with the number of replicas. With two choices, a replica only gets a new request if it is the shorter of a random pair, so a replica that has fallen behind is chosen less and less. Its excess shrinks doubly exponentially, which is where the log log n comes from. The result is due to Azar, Broder, Karlin and Upfal (1994), and Mitzenmacher's thesis showed it holds in queueing systems too.
:::

::: context little Little's law, briefly
The average number of requests in a system equals their arrival rate times the average time each one spends there. So if two balancers face the same arrival rate, the one with half the work waiting has half the average wait. Lesson 6 derives it and uses it for capacity planning.
:::
--- task
The starter has the simulator's \`poisson\`. Write two functions.

**\`choose(policy, view, rng, counter)\`** returns the index of the replica that gets the next request. \`view\` is the list of queue lengths the balancer can see, \`counter\` is how many requests this balancer has placed so far, and \`rng\` is a \`random.Random\`.

- \`"round_robin"\`: \`counter % len(view)\`.
- \`"random"\`: \`rng.randrange(len(view))\`.
- \`"least_loaded"\`: the index with the smallest value in \`view\`; ties go to the smallest index. Uses no randomness.
- \`"p2c"\`: \`a, b = rng.sample(range(len(view)), 2)\`; return \`a\` if \`view[a] <= view[b]\`, else \`b\`.

**\`simulate(speeds, rate, policy, ticks, seed, stale)\`** races one policy. \`speeds[i]\` is how much work replica i finishes per tick. Make one \`random.Random(seed)\` and set every queue to 0. Each tick:

1. take a **snapshot** of the queues;
2. draw the number of arrivals with \`poisson(rng, rate)\`;
3. for each arrival: its cost is 10 if \`rng.random() < 0.1\`, else 1 (drawn **before** choosing); choose a replica with \`choose(policy, view, rng, counter)\`, where \`view\` is the snapshot if \`stale\` is true and the live queues otherwise; add the cost to that queue, and add 1 to the counter;
4. each replica finishes up to its speed: \`queues[i] = max(0, queues[i] - speeds[i])\`;
5. update the peak (largest queue seen after step 4) and add the sum of all queues to the total waiting.

Return \`(peak, total_waiting)\`.

For example, \`simulate([10] * 10, 45, "least_loaded", 300, 1, False)\` is \`(17, 6675)\`.
--- starter
import math
import random


def poisson(rng, lam):
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


def choose(policy, view, rng, counter):
    return 0


def simulate(speeds, rate, policy, ticks, seed, stale):
    return (0, 0)
--- solution
import math
import random


def poisson(rng, lam):
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


def choose(policy, view, rng, counter):
    n = len(view)
    if policy == "round_robin":
        return counter % n
    if policy == "random":
        return rng.randrange(n)
    if policy == "least_loaded":
        return min(range(n), key=lambda i: (view[i], i))
    if policy == "p2c":
        a, b = rng.sample(range(n), 2)
        return a if view[a] <= view[b] else b
    raise ValueError("unknown policy: " + policy)


def simulate(speeds, rate, policy, ticks, seed, stale):
    rng = random.Random(seed)
    queues = [0] * len(speeds)
    counter = 0
    peak = waiting = 0
    for _ in range(ticks):
        snapshot = list(queues)
        for _ in range(poisson(rng, rate)):
            cost = 10 if rng.random() < 0.1 else 1
            view = snapshot if stale else queues
            i = choose(policy, view, rng, counter)
            counter += 1
            queues[i] += cost
        for i, speed in enumerate(speeds):
            queues[i] = max(0, queues[i] - speed)
        peak = max(peak, max(queues))
        waiting += sum(queues)
    return peak, waiting
--- hint
\`least_loaded\` is \`min(range(n), key=lambda i: (view[i], i))\`: the tuple key breaks ties by index. Only \`random\` and \`p2c\` touch \`rng\`.
--- hint
In \`simulate\`, \`snapshot = list(queues)\` copies the queues at the start of the tick. When \`stale\` is false, pass \`queues\` itself, so each choice sees the arrivals already placed this tick.
--- hint
Keep the order of random draws exactly as the task says (arrivals, then for each request its cost, then the choice), or the same seed gives different traffic and the numbers will not match.
--- check case | round_robin and least_loaded
(choose("round_robin", [5, 0, 0], None, 7), choose("least_loaded", [3, 1, 4, 1], None, 0), choose("least_loaded", [2], None, 9))
=> (1, 1, 0)
--- check case | random and p2c use the generator exactly as told
(lambda r: (choose("random", [0] * 6, r, 0), choose("p2c", [9, 1, 5, 7], r, 0), choose("p2c", [9, 1, 5, 7], r, 0), choose("p2c", [4, 4, 4, 4], r, 0)))(__import__("random").Random(2))
=> (0, 3, 2, 2)
--- check case | The example from the task
simulate([10] * 10, 45, "least_loaded", 300, 1, False)
=> (17, 6675)
--- check case | Fresh information: least loaded is best, two choices close behind
[simulate([10] * 10, 45, p, 300, 1, False) for p in ("round_robin", "random", "least_loaded", "p2c")]
=> [(118, 35577), (130, 44555), (17, 6675), (24, 8111)]
--- check case | Stale information: least loaded stampedes, two choices hold up
[simulate([10] * 10, 45, p, 300, 1, True) for p in ("round_robin", "random", "least_loaded", "p2c")]
=> [(118, 35577), (130, 44555), (155, 111027), (49, 15911)]
?? With a stale view, every request in a tick sees the same "shortest" queue.
--- check case | Unequal replicas sink round robin
(simulate([16, 16, 16, 16, 4, 4, 4, 4, 4, 4], 40, "round_robin", 200, 1, False)[0] > 500, simulate([16, 16, 16, 16, 4, 4, 4, 4, 4, 4], 40, "least_loaded", 200, 1, False)[0] < 50)
=> (True, True)
--- check case | No traffic, no queues
simulate([5, 5], 0, "p2c", 50, 3, False)
=> (0, 0)

+++ question | Where the herd comes from
--- ask
Twenty client-side balancers each receive a report of every replica's queue length once per second, and each sends every request to the replica with the shortest reported queue. What goes wrong?
--- choice
Nothing: the shortest queue is always the best choice.
--- choice correct
For a whole second, all twenty send everything to the same replica, which is suddenly flooded while the others sit idle; the next report moves the flood somewhere else.
--- choice
The balancers disagree and send requests to random replicas.
--- choice
The reports use too much network bandwidth.
--- why
Acting on a shared, stale signal makes every picker choose the same target. Power of two choices breaks the symmetry: each request compares a different random pair, so a burst spreads out even when every view is old.

+++ question | L4 or L7
--- ask
A service is reached through an L4 balancer. Each client opens one long-lived connection at startup and sends all its requests over it. The team adds five replicas to absorb a traffic spike. What happens?
--- choice
Load spreads evenly over the new replicas within seconds.
--- choice correct
Almost nothing at first: existing connections stay on the old replicas, so the new ones only receive connections opened after they started.
--- choice
The L4 balancer moves half the requests on each connection to the new replicas.
--- why
An L4 balancer decides once per connection and never looks inside it. Per-request balancing needs an L7 balancer (or a client library), or clients must reconnect from time to time so their connections get redistributed.

+++ question | Two or three choices
--- ask
Going from one random choice to two cuts the fullest replica's load from about log n / log log n to about log log n. What does going from two choices to three do?
--- choice
Another dramatic improvement of the same size.
--- choice correct
A small improvement: d choices give about log log n / log d, so most of the benefit came from the second choice.
--- choice
It makes things worse, because the herd effect returns.
--- why
The big change is from one choice to two, an exponential improvement; extra choices only divide by log d. Each choice also costs a load lookup, so two is the usual setting.

+++ practice | Smooth weighted round robin
--- task
When replicas differ in size, a balancer gives each a **weight** and sends it that share of the requests. Naive weighted round robin sends a replica's whole share in a burst (a, a, a, a, a, b, c). **Smooth** weighted round robin interleaves them.

Write \`smooth_wrr(weights, n)\` that returns the first \`n\` picks. \`weights\` is a dict from backend name to a whole-number weight. Keep a \`current\` value per backend, starting at 0. For each pick:

1. add each backend's weight to its \`current\`;
2. pick the backend with the largest \`current\` (on a tie, the one that comes first in \`weights\`);
3. subtract the total of all weights from the picked backend's \`current\`.

For example, \`smooth_wrr({"a": 5, "b": 1, "c": 1}, 7)\` is \`["a", "a", "b", "a", "c", "a", "a"]\`.
--- starter
def smooth_wrr(weights, n):
    order = [b for b, w in weights.items() for _ in range(w)]
    return [order[i % len(order)] for i in range(n)]
--- solution
def smooth_wrr(weights, n):
    current = {b: 0 for b in weights}
    total = sum(weights.values())
    picks = []
    for _ in range(n):
        for b in weights:
            current[b] += weights[b]
        best = max(weights, key=lambda b: current[b])
        current[best] -= total
        picks.append(best)
    return picks
--- hint
\`max(weights, key=lambda b: current[b])\` returns the first of the tied backends, in the dict's order, which is the tie rule you need.
--- hint
After a full cycle of \`total\` picks, every \`current\` is back to 0, so the pattern repeats.
--- check case | The example from the task
smooth_wrr({"a": 5, "b": 1, "c": 1}, 7)
=> ["a", "a", "b", "a", "c", "a", "a"]
--- check case | Two to one
smooth_wrr({"x": 2, "y": 1}, 6)
=> ["x", "y", "x", "x", "y", "x"]
--- check case | Equal weights are plain round robin
smooth_wrr({"x": 1, "y": 1, "z": 1}, 4)
=> ["x", "y", "z", "x"]
--- check case | A weight of 0 is never picked
smooth_wrr({"a": 3, "b": 0}, 3)
=> ["a", "a", "a"]
--- check test | Over a full cycle each backend gets exactly its weight
(lambda p: p.count("big") == 6 and p.count("mid") == 3 and p.count("tiny") == 1)(smooth_wrr({"big": 6, "mid": 3, "tiny": 1}, 10))

+++ practice | Rendezvous hashing: the same key, the same replica
--- task
A cache tier wants every request for one key to reach the same replica, so that replica's cache holds it, and wants as few keys as possible to move when a replica joins or leaves. **Rendezvous hashing** (highest random weight) does this: every backend gets a score for the key, and the highest score wins. Removing a backend only moves the keys it owned.

Write three functions:

- \`score(key, backend)\`: \`int(hashlib.sha256(f"{key}|{backend}".encode()).hexdigest(), 16)\`.
- \`owner(key, backends)\`: the backend with the highest score for the key (a tie, which will not happen in practice, goes to the larger name).
- \`moved(keys, before, after)\`: the sorted list of keys whose owner differs between the backend list \`before\` and the list \`after\`.

For example, \`owner("alice", ["s1", "s2", "s3", "s4"])\` is \`"s2"\`.
--- starter
import hashlib


def score(key, backend):
    return int(hashlib.sha256(f"{key}|{backend}".encode()).hexdigest(), 16)


def owner(key, backends):
    return backends[score(key, "") % len(backends)]


def moved(keys, before, after):
    return []
--- solution
import hashlib


def score(key, backend):
    return int(hashlib.sha256(f"{key}|{backend}".encode()).hexdigest(), 16)


def owner(key, backends):
    return max(backends, key=lambda b: (score(key, b), b))


def moved(keys, before, after):
    return sorted(k for k in keys if owner(k, before) != owner(k, after))
--- hint
The owner is a \`max\` over the backends, keyed by the score of this key with that backend.
--- hint
\`moved\` compares \`owner(k, before)\` with \`owner(k, after)\` for every key.
--- check case | The example, and a single backend
(owner("alice", ["s1", "s2", "s3", "s4"]), owner("bob", ["s1", "s2", "s3", "s4"]), owner("carol", ["s9"]))
=> ("s2", "s4", "s9")
--- check case | Keys spread roughly evenly
sorted(__import__("collections").Counter(owner(f"user{i}", ["s1", "s2", "s3", "s4"]) for i in range(1000)).items())
=> [("s1", 262), ("s2", 239), ("s3", 267), ("s4", 232)]
--- check test | Removing s3 moves exactly s3's keys
(lambda keys, b: (lambda m: len(m) == 267 and all(owner(k, b) == "s3" for k in m))(moved(keys, b, ["s1", "s2", "s4"])))([f"user{i}" for i in range(1000)], ["s1", "s2", "s3", "s4"])
--- check test | Adding s5 moves only keys that now belong to s5
(lambda keys, b: (lambda m: len(m) == 212 and all(owner(k, b + ["s5"]) == "s5" for k in m))(moved(keys, b, b + ["s5"])))([f"user{i}" for i in range(1000)], ["s1", "s2", "s3", "s4"])
?? Compare: hashing with "hash mod number of backends" would move about 80% of the keys.
--- check case | The order of the backend list does not matter
(owner("alice", ["s4", "s3", "s2", "s1"]), moved(["a", "b", "c"], ["x", "y"], ["y", "x"]))
=> ("s2", [])

+++ practice | A service registry with heartbeats
--- task
Write a class \`Registry\` for service discovery. Replicas announce themselves with heartbeats, and an entry expires if no heartbeat arrives for \`ttl\` ticks.

- \`Registry(ttl)\` starts empty.
- \`heartbeat(service, address, now)\`: records that \`address\` of \`service\` was alive at tick \`now\` (registering it if new).
- \`leave(service, address)\`: removes that entry at once (a clean shutdown); does nothing if it is not there.
- \`lookup(service, now)\`: the sorted list of addresses of \`service\` whose last heartbeat was **less than** \`ttl\` ticks before \`now\` (so \`now - last < ttl\`). An unknown service gives \`[]\`.

For example, with \`ttl = 10\`, after \`heartbeat("api", "10.0.0.1", 0)\` and \`heartbeat("api", "10.0.0.2", 5)\`, \`lookup("api", 12)\` is \`["10.0.0.2"]\`.
--- starter
class Registry:
    def __init__(self, ttl):
        self.ttl = ttl
        self.entries = {}

    def heartbeat(self, service, address, now):
        self.entries.setdefault(service, set()).add(address)

    def leave(self, service, address):
        pass

    def lookup(self, service, now):
        return sorted(self.entries.get(service, set()))
--- solution
class Registry:
    def __init__(self, ttl):
        self.ttl = ttl
        self.entries = {}

    def heartbeat(self, service, address, now):
        self.entries.setdefault(service, {})[address] = now

    def leave(self, service, address):
        self.entries.get(service, {}).pop(address, None)

    def lookup(self, service, now):
        seen = self.entries.get(service, {})
        return sorted(a for a, last in seen.items() if now - last < self.ttl)
--- hint
Store, per service, a dict from address to the tick of its last heartbeat. A new heartbeat overwrites the tick.
--- hint
\`lookup\` filters with \`now - last < ttl\`; \`leave\` can use \`dict.pop(address, None)\` so a missing entry is not an error.
--- check case | The example from the task
(r := Registry(10), r.heartbeat("api", "10.0.0.1", 0), r.heartbeat("api", "10.0.0.2", 5), r.lookup("api", 12))[-1]
=> ["10.0.0.2"]
--- check case | A new heartbeat keeps an entry alive
(r := Registry(10), r.heartbeat("api", "a", 0), r.heartbeat("api", "a", 8), r.lookup("api", 15))[-1]
=> ["a"]
--- check case | Exactly ttl old has expired
(r := Registry(10), r.heartbeat("api", "a", 0), r.lookup("api", 9), r.lookup("api", 10))[-2:]
=> (["a"], [])
--- check case | A clean leave removes at once; leaving twice is harmless
(r := Registry(10), r.heartbeat("db", "x", 0), r.heartbeat("db", "y", 0), r.leave("db", "x"), r.leave("db", "x"), r.leave("nope", "z"), r.lookup("db", 1))[-1]
=> ["y"]
--- check case | Services are separate, and unknown ones are empty
(r := Registry(5), r.heartbeat("a", "1", 0), r.heartbeat("b", "2", 0), r.lookup("a", 1), r.lookup("c", 1))[-2:]
=> (["1"], [])

+++ practice | Debug: least connections that forgets failures
--- task
A **least-connections** balancer sends each new request to the backend with the fewest requests in progress. \`LeastConn(backends)\` keeps a count of active requests per backend; \`pick()\` returns the backend with the fewest (ties: the first in the list) and adds one to its count; \`done(backend, ok)\` is called when a request finishes, successfully or not, and must take one off that backend's count.

In production, a backend that returned a burst of errors stopped receiving any traffic, forever, even after it recovered. Find the bug and fix it.
--- starter
class LeastConn:
    def __init__(self, backends):
        self.backends = list(backends)
        self.active = {b: 0 for b in backends}

    def pick(self):
        best = min(self.backends, key=lambda b: self.active[b])
        self.active[best] += 1
        return best

    def done(self, backend, ok):
        if ok:
            self.active[backend] -= 1
--- solution
class LeastConn:
    def __init__(self, backends):
        self.backends = list(backends)
        self.active = {b: 0 for b in backends}

    def pick(self):
        best = min(self.backends, key=lambda b: self.active[b])
        self.active[best] += 1
        return best

    def done(self, backend, ok):
        self.active[backend] -= 1
--- hint
A failed request is finished too. What happens to the count of a backend whose requests fail?
--- hint
Every finished request, successful or not, must release its slot: take the decrement out of the \`if\`.
--- check case | Picks the least busy, ties to the first
(lb := LeastConn(["a", "b", "c"]), lb.pick(), lb.pick(), lb.pick(), lb.pick())[1:]
=> ("a", "b", "c", "a")
--- check case | A failed request releases its slot
(lb := LeastConn(["a", "b"]), lb.pick(), lb.pick(), lb.done("a", False), lb.pick())[-1]
=> "a"
--- check case | A burst of errors does not exile a backend
(lb := LeastConn(["a", "b"]), [lb.done(lb.pick(), False) for _ in range(5)], lb.active)[-1]
=> {"a": 0, "b": 0}
--- check case | Counts go back to zero when everything finishes
(lb := LeastConn(["x", "y", "z"]), picks := [lb.pick() for _ in range(6)], [lb.done(b, i % 2 == 0) for i, b in enumerate(picks)], lb.active)[-1]
=> {"x": 0, "y": 0, "z": 0}

+++ practice | L7 routing by path
--- task
An L7 balancer chooses a backend pool from the request's path. \`routes\` is a list of \`(prefix, pool)\`. A prefix matches a path when the path equals the prefix, or the path continues the prefix with a \`/\` (so \`/api\` matches \`/api\` and \`/api/users\` but **not** \`/apix\`). The prefix \`/\` matches every path. A prefix may end in \`/\` (like \`/static/\`): then it matches any path that starts with it, and also the path without that final slash.

Write \`route(path, routes)\` that returns the pool of the **longest** matching prefix; if two routes have the same prefix, the first one listed wins. Return \`None\` if nothing matches.

For example, with routes \`[("/", "web"), ("/api", "api"), ("/api/admin", "admin")]\`, \`route("/api/admin/users", routes)\` is \`"admin"\` and \`route("/apix", routes)\` is \`"web"\`.
--- starter
def route(path, routes):
    best = None
    for prefix, pool in routes:
        if path.startswith(prefix):
            best = pool
    return best
--- solution
def matches(path, prefix):
    base = prefix.rstrip("/")
    if base == "":
        return True
    return path == base or path.startswith(base + "/")


def route(path, routes):
    best = None
    best_len = -1
    for prefix, pool in routes:
        if matches(path, prefix) and len(prefix) > best_len:
            best, best_len = pool, len(prefix)
    return best
--- hint
Strip a trailing \`/\` from the prefix to get its base. Then a path matches if it equals the base, or starts with the base followed by \`/\`. An empty base (the prefix \`/\`) matches everything.
--- hint
Keep the best match so far and replace it only when a matching prefix is strictly longer, so the first of two equal prefixes wins.
--- check case | The examples from the task
(route("/api/admin/users", [("/", "web"), ("/api", "api"), ("/api/admin", "admin")]), route("/apix", [("/", "web"), ("/api", "api"), ("/api/admin", "admin")]))
=> ("admin", "web")
--- check case | Order in the list does not decide; length does
route("/api/v2/items", [("/api", "api"), ("/", "web"), ("/api/v2", "api-v2")])
=> "api-v2"
--- check case | A trailing slash in the prefix
(route("/static", [("/static/", "cdn")]), route("/static/app.js", [("/static/", "cdn")]), route("/staticfoo", [("/static/", "cdn")]))
=> ("cdn", "cdn", None)
--- check case | No catch-all: unmatched paths get None
route("/health", [("/api", "api")])
=> None
--- check case | Equal prefixes: the first listed wins
route("/pay", [("/pay", "payments-blue"), ("/pay", "payments-green")])
=> "payments-blue"

+++ practice | Rendezvous hashing with bounded load
--- task
Plain rendezvous hashing can give one backend noticeably more keys than another, and a few hot keys can overload it. **Bounded-load** hashing caps each backend at \`capacity = ceil(c × number_of_keys / number_of_backends)\` keys, for a chosen \`c\` of at least 1. Keys are assigned in the order given. Each key goes to the highest-ranked backend on its own ranking that still has room, where the ranking orders backends by \`score(key, backend)\` from highest to lowest (ties: the larger name first).

Write \`bounded(keys, backends, c)\` that returns a dict from each key to its backend. Use \`score(key, backend) = int(hashlib.sha256(f"{key}|{backend}".encode()).hexdigest(), 16)\`.

For example, with 10 keys \`user0\` to \`user9\`, backends \`["p", "q"]\` and \`c = 1.0\`, each backend gets exactly 5 keys.
--- starter
import hashlib
import math


def score(key, backend):
    return int(hashlib.sha256(f"{key}|{backend}".encode()).hexdigest(), 16)


def bounded(keys, backends, c):
    return {k: max(backends, key=lambda b: score(k, b)) for k in keys}
--- solution
import hashlib
import math


def score(key, backend):
    return int(hashlib.sha256(f"{key}|{backend}".encode()).hexdigest(), 16)


def bounded(keys, backends, c):
    if not keys:
        return {}
    capacity = math.ceil(c * len(keys) / len(backends))
    load = {b: 0 for b in backends}
    assigned = {}
    for key in keys:
        for b in sorted(backends, key=lambda b: (score(key, b), b), reverse=True):
            if load[b] < capacity:
                load[b] += 1
                assigned[key] = b
                break
    return assigned
--- hint
Compute the capacity once. For each key, sort the backends by \`(score, name)\` from highest to lowest, and walk down that list until one has room.
--- hint
With c at least 1 the capacities add up to at least the number of keys, so every key finds a place. Handle an empty key list before dividing.
--- check case | The example from the task
sorted(__import__("collections").Counter(bounded([f"user{i}" for i in range(10)], ["p", "q"], 1.0).values()).items())
=> [("p", 5), ("q", 5)]
--- check case | Without a tight bound, keys keep their first choice
(lambda a: sorted(__import__("collections").Counter(a.values()).items()))(bounded([f"user{i}" for i in range(20)], ["s1", "s2", "s3", "s4"], 1.25))
=> [("s1", 4), ("s2", 6), ("s3", 5), ("s4", 5)]
--- check case | c = 1 forces a perfectly even spread
(lambda a: sorted(__import__("collections").Counter(a.values()).items()))(bounded([f"user{i}" for i in range(20)], ["s1", "s2", "s3", "s4"], 1.0))
=> [("s1", 5), ("s2", 5), ("s3", 5), ("s4", 5)]
--- check case | No keys, and a single backend
(bounded([], ["s1", "s2"], 1.0), bounded(["k"], ["only"], 1.0))
=> ({}, {"k": "only"})
--- check test | A key that is not displaced keeps its plain rendezvous owner
(lambda keys: (lambda a: all(a[k] == max(["p", "q", "r"], key=lambda b: (score(k, b), b)) for k in keys[:3]))(bounded(keys, ["p", "q", "r"], 1.0)))([f"k{i}" for i in range(30)])
=== cloud-06 | Queueing theory for capacity: Little's law, the latency knee, M/M/c and fan-out tails
--- teach
In the last lesson's race, queues grew suddenly once the load got close to what the replicas could handle. That is not a quirk of the simulator. It is the central fact of capacity planning, and a small piece of mathematics, **queueing theory**, predicts it well enough to decide how many replicas a service needs. This lesson gives you the four results platform engineers actually use: Little's law, the latency knee, the M/M/c formula, and the arithmetic of fan-out tails.

### Little's law

Picture a café. On average 30 customers walk in per hour, and each stays 20 minutes (a third of an hour). How many are inside at a typical moment? 30 × 1/3 = 10. That is **Little's law**:

**L = λ · W**

where L is the average number of requests in the system, λ (lambda) is the arrival rate, and W is the average time each request spends inside. It holds for any stable system (one that is not growing without end), whatever the arrival pattern, service times or scheduling order. The units must match: requests per second times seconds gives requests.

It answers questions you meet every week:

- A service handles 2,000 requests per second, and each takes 50 ms. Requests in flight: 2,000 × 0.05 = **100**. A connection pool or thread pool smaller than that will queue.
- A database allows 64 concurrent queries, and each takes 20 ms. Its throughput can never exceed 64 / 0.02 = **3,200** queries per second, however fast the clients send.

Why it is true, in one picture: plot the number of requests inside against time. The area under that curve can be counted two ways: as the average height L times the length of the window T, or as the sum of every request's time inside, which is (number of requests) × W = λT × W. Set them equal and divide by T.

### Utilization and the knee

A server that can complete μ (mu) requests per second, receiving λ per second, is busy a fraction **ρ = λ / μ** of the time, its **utilization** (rho). It must be below 1, or the queue grows forever.

The simplest queueing model has random (Poisson) arrivals, random (exponential) service times and one server. It is written **M/M/1**: M for [[memoryless|memoryless]] arrivals, M for memoryless service, 1 server. For it, the average time in the system is

**W = 1 / (μ − λ)**, which is the service time 1/μ multiplied by **1 / (1 − ρ)**.

That multiplier is the whole story:

| utilization ρ | 50% | 80% | 90% | 95% | 99% |
| --- | --- | --- | --- | --- | --- |
| time in system, in service times | 2 | 5 | 10 | 20 | 100 |

Going from 50% to 80% busy multiplies latency by 2.5. Going from 90% to 99% multiplies it by 10. The curve bends sharply upwards somewhere around 70–85%: this is the **latency knee**. Below it, extra load costs little; above it, a small rise in traffic makes latency explode. That is why services are planned to run well below 100%, and why "we are only at 90% CPU" is not good news.

Why does a server that is idle 10% of the time keep a queue at all? Because arrivals are random. Requests bunch up: three arrive in the same millisecond, then none for a while. The idle time is wasted while the bunches wait.

### Many servers: M/M/c

A service usually has c replicas sharing one queue (one load balancer spreading work). That is **M/M/c**. The offered load is **a = λ / μ**, measured in **Erlangs**: how many servers' worth of work arrives. The utilization is ρ = a / c.

The key quantity is the probability that an arriving request has to wait at all, because every server is busy. It is given by the **[[Erlang C formula|erlang]]**. It is computed most safely from a running value b, starting at b = 1 and updated for k = 1, 2, …, c:

b ← a · b / (k + a · b)

After the loop, b is the Erlang B number for c servers, and

**C = c · b / (c − a · (1 − b))**

is the probability of waiting. From it:

- the average wait in the queue is **Wq = C / (c·μ − λ)**;
- a request waits longer than t with probability **C · e^(−(c·μ − λ)·t)**.

The second line gives percentiles. The wait at percentile p (say p = 0.99) is the t where that probability equals 1 − p:

**t = ln(C / (1 − p)) / (c·μ − λ)**, and **0** if C ≤ 1 − p (at least a fraction p of requests never wait at all).

A worked example: 800 requests per second, each replica serving 100 per second, so a = 8. With c = 10 replicas, C ≈ 0.409: 41% of requests wait. The average wait is 0.409 / (1,000 − 800) ≈ 2 ms, and the 99th percentile wait is ln(0.409 / 0.01) / 200 ≈ 18.6 ms.

### Pooling

Here is a result worth remembering: **one shared queue beats several separate ones.** Two services of 400 requests per second each, kept apart, need 7 replicas each to keep their 99th-percentile wait under 10 ms, so 14 in total. Pooled into one queue of 800 per second, 12 replicas do the same job. Large pools absorb bursts better, because a burst on one part of the traffic finds servers idled by a lull elsewhere. It is one reason big shared clusters are cheaper than many small ones.

### Fan-out makes tails the common case

A search page or a feed is often built by asking many servers at once and waiting for all of them. Then the request is as slow as its **slowest** part.

Say each leaf server answers within 10 ms 99% of the time. A request that fans out to 100 leaves is fast only if all 100 are fast: 0.99^100 ≈ 0.366. So **63%** of requests see at least one slow leaf. The leaf's rare 1% tail has become the typical case. Turned around: for 99% of fan-out requests to be fast, each leaf must be fast with probability 0.99^(1/100) ≈ 0.9999, its 99.99th percentile.

This is why large services care about the **[[tail latency|tail]]** (the 99th and 99.9th percentiles), not the average, and why techniques such as hedged requests from Distributed Systems I exist.

### Where it is used

- Capacity planning: from forecast traffic and measured service time, pick the replica count that keeps the percentile you care about under its target, then add headroom for losing a zone.
- Sizing thread pools, connection pools and concurrency limits with Little's law.
- Call centres, the original use of Erlang's formulas, and the queues in front of GPU inference servers, where one long request holds a server for seconds.

**Watch out:**

- **Planning to the average.** A service at 95% utilization has an average latency 20 times its service time, and far worse tails. Plan for a percentile, below the knee.
- **Dividing by the wrong capacity.** In M/M/c the utilization is λ / (c·μ), not λ / μ.
- **Units.** Little's law with requests per second and milliseconds is off by a factor of 1,000. Convert first.

::: context memoryless What M/M/c assumes
The model assumes arrivals are a Poisson process (independent, at a steady average rate) and service times are exponential: a request that has already taken 10 ms is as likely to finish in the next millisecond as a new one. Real service times are more regular than that, which makes real queues somewhat better than the model; real traffic is burstier, which makes them worse. The model is a good first answer and a reason to measure, not a guarantee.
:::

::: context erlang Agner Erlang and the telephone exchange
Agner Krarup Erlang, a Danish engineer at the Copenhagen Telephone Company, worked out these formulas between 1909 and 1917 to decide how many lines and operators an exchange needed. Erlang B gives the chance that a call is blocked when there is no queue; Erlang C gives the chance that it has to wait when there is one. The unit of offered load is named after him. The recurrence in the lesson avoids computing a^c / c! directly, which overflows a float for a few hundred servers.
:::

::: context tail Why the tail matters
At a large service, "1% of requests" is millions a day, and the people who see them are often the most active users, who send the most requests. Worse, fan-out means one user action triggers many internal requests, so a backend's 99th percentile is what a large share of users experience. Jeffrey Dean and Luiz André Barroso's article "The Tail at Scale" (2013) made this argument and catalogued the remedies: hedged requests, tied requests, micro-partitioning and putting slow machines on probation.
:::
--- task
Plan capacity with M/M/c. Write four functions. \`lam\` is the arrival rate, \`mu\` the rate one server completes requests, and \`c\` the number of servers (both rates per second).

- **\`erlang_c(c, a)\`**: the probability that an arrival waits, for offered load \`a\`. If \`a >= c\`, return \`1.0\`. Otherwise start with b = 1.0, for k = 1, …, c set b = a·b / (k + a·b), and return c·b / (c − a·(1 − b)).
- **\`mean_wait(lam, mu, c)\`**: the average time in the queue, C / (c·mu − lam), with C = \`erlang_c(c, lam / mu)\`. If \`lam >= c * mu\`, return \`float("inf")\`.
- **\`wait_percentile(lam, mu, c, p)\`**: the queueing wait at percentile \`p\` (for example 0.99): \`float("inf")\` if unstable as above; \`0.0\` if C ≤ 1 − p; otherwise ln(C / (1 − p)) / (c·mu − lam).
- **\`servers_needed(lam, mu, p, target)\`**: the smallest whole number of servers c ≥ 1 whose \`wait_percentile\` at \`p\` is at most \`target\` seconds. Start the search at the smallest c with \`c * mu > lam\`.

For example, \`erlang_c(2, 1)\` is 1/3, \`mean_wait(800, 100, 10)\` is about 0.002046, and \`servers_needed(800, 100, 0.99, 0.01)\` is 12.
--- starter
import math


def erlang_c(c, a):
    return a / c


def mean_wait(lam, mu, c):
    return 0.0


def wait_percentile(lam, mu, c, p):
    return 0.0


def servers_needed(lam, mu, p, target):
    return 1
--- solution
import math


def erlang_c(c, a):
    if a >= c:
        return 1.0
    b = 1.0
    for k in range(1, c + 1):
        b = a * b / (k + a * b)
    return c * b / (c - a * (1 - b))


def mean_wait(lam, mu, c):
    if lam >= c * mu:
        return float("inf")
    return erlang_c(c, lam / mu) / (c * mu - lam)


def wait_percentile(lam, mu, c, p):
    if lam >= c * mu:
        return float("inf")
    waits = erlang_c(c, lam / mu)
    if waits <= 1 - p:
        return 0.0
    return math.log(waits / (1 - p)) / (c * mu - lam)


def servers_needed(lam, mu, p, target):
    c = max(1, math.floor(lam / mu) + 1)
    while wait_percentile(lam, mu, c, p) > target:
        c += 1
    return c
--- hint
\`erlang_c\` is a short loop exactly as given; check the unstable case first. With one server it should give back the utilization: \`erlang_c(1, 0.5)\` is 0.5.
--- hint
The percentile formula only applies when more than a fraction 1 − p of requests wait. If C is at most 1 − p, at least a fraction p never queue, so the answer is 0.
--- hint
For \`servers_needed\`, the first stable count is \`floor(lam / mu) + 1\`. Increase c one at a time until the percentile meets the target; the wait falls as c grows, so the first success is the smallest.
--- check case | Erlang C on small cases
(round(erlang_c(1, 0.5), 6), round(erlang_c(2, 1), 6), round(erlang_c(10, 8), 6))
=> (0.5, 0.333333, 0.40918)
--- check case | Overloaded: everyone waits
(erlang_c(3, 3), erlang_c(2, 5))
=> (1.0, 1.0)
--- check case | A thousand servers without overflow
round(erlang_c(1000, 950), 6)
=> 0.068253
?? Computing a^c / c! directly overflows a float long before c = 1000. The recurrence keeps every value between 0 and 1.
--- check case | Mean waits: one server, ten servers, and a hundred
(round(mean_wait(80, 100, 1), 6), round(mean_wait(800, 100, 10), 6), round(mean_wait(90, 1, 100), 6))
=> (0.04, 0.002046, 0.021694)
--- check case | Unstable is infinite, including exactly at capacity
(mean_wait(300, 100, 3), wait_percentile(800, 100, 8, 0.5))
=> (float("inf"), float("inf"))
--- check case | The 99th-percentile wait
(round(wait_percentile(80, 100, 1, 0.99), 6), round(wait_percentile(800, 100, 10, 0.99), 6))
=> (0.219101, 0.018558)
--- check case | When few requests wait, the percentile is 0
wait_percentile(800, 100, 16, 0.99)
=> 0.0
--- check case | Planning: replicas needed for a target
(servers_needed(800, 100, 0.99, 0.01), servers_needed(800, 100, 0.99, 0.0), servers_needed(9000, 10, 0.99, 0.005))
=> (12, 16, 945)
--- check case | Tiny load still needs one server, and zero wait may need two
(servers_needed(5, 100, 0.5, 0.0), servers_needed(5, 100, 0.99, 0.0))
=> (1, 2)
--- check case | Pooling: two pools of 400 need more than one pool of 800
(2 * servers_needed(400, 100, 0.99, 0.01), servers_needed(800, 100, 0.99, 0.01))
=> (14, 12)

+++ question | The knee
--- ask
A single-server queue (M/M/1) has a service time of 10 ms. Its utilization rises from 80% to 90%. What happens to the average time a request spends in the system?
--- choice
It rises by about 12%, in proportion to the load.
--- choice correct
It doubles, from 50 ms to 100 ms.
--- choice
It stays at 10 ms, because the server is not yet full.
--- choice
It rises tenfold.
--- why
W = service time / (1 − ρ): 10 / 0.2 = 50 ms at 80% and 10 / 0.1 = 100 ms at 90%. Near full utilization, each extra percent of load costs more latency than the one before.

+++ question | Little's law
--- ask
An API gateway sees 5,000 requests per second, and the average request spends 40 ms inside it. On average, how many requests are inside the gateway at once?
--- answer
200
--- why
L = λ · W = 5,000 per second × 0.040 seconds = 200. Convert milliseconds to seconds first: 5,000 × 40 would give 200,000, off by a factor of 1,000.

+++ question | Fan-out
--- ask
A page is built from 50 backend calls made in parallel, and it is ready when the last one answers. Each backend is slower than 100 ms on 2% of calls, independently. Roughly what share of pages take longer than 100 ms?
--- choice
2%
--- choice
About 10%
--- choice correct
About 64%
--- choice
100%
--- why
A page is fast only if all 50 calls are: 0.98^50 ≈ 0.364, so about 64% of pages wait on at least one slow call. Fan-out turns a backend's rare tail into the page's common case.

+++ practice | Little's law for pools
--- task
Little's law, L = λ · W, sizes every pool of workers, threads or connections.

Write three functions. Use whole-number arithmetic so the answers are exact.

- \`in_flight(qps, latency_ms)\`: the average number of requests in progress, as a \`Fraction\`, for \`qps\` requests per second that each take \`latency_ms\` milliseconds.
- \`max_qps(slots, latency_ms)\`: the highest request rate, as a \`Fraction\` of requests per second, that \`slots\` concurrent slots can sustain when each request holds a slot for \`latency_ms\` milliseconds.
- \`pool_size(qps, latency_ms, headroom_pct)\`: the number of slots to provision: the requests in flight increased by \`headroom_pct\` percent, rounded **up** to a whole number, as an \`int\`.

For example, \`in_flight(2000, 50)\` is \`Fraction(100)\`, \`max_qps(64, 20)\` is \`Fraction(3200)\`, and \`pool_size(2000, 50, 20)\` is \`120\`.
--- starter
from fractions import Fraction


def in_flight(qps, latency_ms):
    return Fraction(qps * latency_ms)


def max_qps(slots, latency_ms):
    return Fraction(slots * latency_ms)


def pool_size(qps, latency_ms, headroom_pct):
    return int(qps * latency_ms * (1 + headroom_pct / 100) / 1000)
--- solution
from fractions import Fraction


def in_flight(qps, latency_ms):
    return Fraction(qps * latency_ms, 1000)


def max_qps(slots, latency_ms):
    return Fraction(slots * 1000, latency_ms)


def pool_size(qps, latency_ms, headroom_pct):
    return -(-qps * latency_ms * (100 + headroom_pct) // 100000)
--- hint
Milliseconds to seconds is a division by 1,000. \`Fraction(a, b)\` keeps the division exact.
--- hint
For \`pool_size\`, the exact value is qps × latency_ms × (100 + headroom_pct) / (1000 × 100). Round a whole-number division up with \`-(-x // y)\`; a float version of 2000 × 0.05 × 1.2 is 120.00000000000001, which rounds up to 121.
--- check case | The examples from the task
(in_flight(2000, 50), max_qps(64, 20), pool_size(2000, 50, 20))
=> (__import__("fractions").Fraction(100), __import__("fractions").Fraction(3200), 120)
--- check case | Fractions stay exact
(in_flight(3, 7), max_qps(10, 3))
=> (__import__("fractions").Fraction(21, 1000), __import__("fractions").Fraction(10000, 3))
--- check case | No headroom, and rounding up
(pool_size(2000, 50, 0), pool_size(1, 1, 0), pool_size(333, 7, 15))
=> (100, 1, 3)
--- check case | No traffic needs no slots
(in_flight(0, 50), pool_size(0, 50, 20))
=> (__import__("fractions").Fraction(0), 0)

+++ practice | The M/M/1 queue and its knee
--- task
Write two functions for a single-server queue with arrival rate \`lam\` and service rate \`mu\` (per second).

- \`mm1(lam, mu)\`: return \`None\` if \`lam >= mu\` (unstable). Otherwise return a tuple \`(rho, W, Wq, L)\`, each rounded to 6 decimal places: the utilization ρ = lam/mu, the time in the system W = 1/(mu − lam), the time waiting in the queue Wq = ρ/(mu − lam), and the number in the system L = ρ/(1 − ρ).
- \`max_rate(mu, max_w)\`: the largest arrival rate for which W is at most \`max_w\` seconds, that is mu − 1/max_w, or \`0.0\` if that is negative (even an idle server takes 1/mu, so a target below that cannot be met). Return a float.

For example, \`mm1(80, 100)\` is \`(0.8, 0.05, 0.04, 4.0)\`, and \`max_rate(100, 0.05)\` is \`80.0\`.
--- starter
def mm1(lam, mu):
    rho = lam / mu
    return (rho, 1 / mu, 0.0, rho)


def max_rate(mu, max_w):
    return mu
--- solution
def mm1(lam, mu):
    if lam >= mu:
        return None
    rho = lam / mu
    w = 1 / (mu - lam)
    wq = rho / (mu - lam)
    l = rho / (1 - rho)
    return (round(rho, 6), round(w, 6), round(wq, 6), round(l, 6))


def max_rate(mu, max_w):
    return max(0.0, mu - 1 / max_w)
--- hint
Check stability first. Then each of the four numbers is one formula from the task.
--- hint
\`max_rate\` solves 1/(mu − lam) ≤ max_w for lam. Clamp at 0 with \`max(0.0, …)\`.
--- check case | The examples from the task
(mm1(80, 100), max_rate(100, 0.05))
=> ((0.8, 0.05, 0.04, 4.0), 80.0)
--- check case | Half busy
mm1(50, 100)
=> (0.5, 0.02, 0.01, 1.0)
--- check case | At or above capacity: unstable
(mm1(100, 100), mm1(120, 100))
=> (None, None)
--- check case | No traffic: no waiting
mm1(0, 10)
=> (0.0, 0.1, 0.0, 0.0)
--- check case | Little's law holds: L equals lam times W
(lambda r: abs(r[3] - 90 * r[1]) < 1e-4)(mm1(90, 100))
=> True
--- check case | An impossible target gives 0
(max_rate(100, 0.005), max_rate(10, 1))
=> (0.0, 9.0)

+++ practice | Checking the formula by simulation
--- task
Never trust a formula you have not checked. Simulate an M/M/1 queue and compare with W = 1/(mu − lam).

Write \`simulate_mm1(lam, mu, n, seed)\`. Use one \`random.Random(seed)\`. Requests arrive one after another: request i arrives \`rng.expovariate(lam)\` seconds after request i − 1 (the first one, that long after time 0). Then its service time is drawn, \`rng.expovariate(mu)\`: draw the gap first, then the service time, for each request in turn. The single server takes requests in arrival order: a request starts at its arrival or when the server frees up, whichever is later, and leaves after its service time. Return the average time in the system (leave minus arrive) over the \`n\` requests, as a float. Assume \`n\` is at least 1.

For example, \`round(simulate_mm1(8, 10, 50000, 1), 6)\` is \`0.469468\`, close to the theory's 1/(10 − 8) = 0.5.
--- starter
import random


def simulate_mm1(lam, mu, n, seed):
    return 1 / (mu - lam)
--- solution
import random


def simulate_mm1(lam, mu, n, seed):
    rng = random.Random(seed)
    now = 0.0
    free_at = 0.0
    total = 0.0
    for _ in range(n):
        now += rng.expovariate(lam)
        start = max(now, free_at)
        free_at = start + rng.expovariate(mu)
        total += free_at - now
    return total / n
--- hint
Keep two clocks: the arrival time of the current request, and the time the server becomes free.
--- hint
For each request: advance the arrival clock by a gap, start at \`max(arrival, free_at)\`, set \`free_at\` to the start plus a service time, and add \`free_at - arrival\` to the total.
--- check case | The example from the task
round(simulate_mm1(8, 10, 50000, 1), 6)
=> 0.469468
--- check case | One request never waits
round(simulate_mm1(2, 10, 1, 5), 6)
=> 0.135397
--- check test | Close to theory at 50% load
abs(simulate_mm1(5, 10, 100000, 2) - 0.2) < 0.01
--- check test | Close to theory near the knee, at 95% load
abs(simulate_mm1(9.5, 10, 200000, 3) - 2.0) < 0.2
--- check test | Busier queues wait longer
simulate_mm1(9, 10, 30000, 4) > simulate_mm1(7, 10, 30000, 4) > simulate_mm1(3, 10, 30000, 4)

+++ practice | Tail latency under fan-out
--- task
A request that fans out to \`n\` leaves, and waits for all of them, is slow if any leaf is slow. Write three functions, treating leaves as independent.

- \`p_any_slow(p_slow, n)\`: the probability that at least one of \`n\` leaves is slow, when each is slow with probability \`p_slow\`, rounded to 6 decimal places.
- \`leaf_quantile(q, n)\`: the fraction of calls each leaf must answer fast so that a fraction \`q\` of fan-out requests are fast: q^(1/n), rounded to 6 decimal places.
- \`fanout_quantile(samples, n, q)\`: the \`q\` percentile of the fan-out request's latency, read from a list of measured leaf latencies. Sort the samples; compute level = q^(1/n); the answer is the sample at position k, counting from 1, where k = ceil(round(level × number_of_samples, 9)), but at least 1 (the nearest-rank method).

For example, \`p_any_slow(0.01, 100)\` is \`0.633968\`, and \`leaf_quantile(0.99, 100)\` is \`0.9999\`.
--- starter
import math


def p_any_slow(p_slow, n):
    return round(p_slow * n, 6)


def leaf_quantile(q, n):
    return q


def fanout_quantile(samples, n, q):
    s = sorted(samples)
    return s[max(1, math.ceil(round(q * len(s), 9))) - 1]
--- solution
import math


def p_any_slow(p_slow, n):
    return round(1 - (1 - p_slow) ** n, 6)


def leaf_quantile(q, n):
    return round(q ** (1 / n), 6)


def fanout_quantile(samples, n, q):
    s = sorted(samples)
    level = q ** (1 / n)
    k = max(1, math.ceil(round(level * len(s), 9)))
    return s[k - 1]
--- hint
"At least one slow" is 1 minus "all fast", and all fast is (1 − p_slow)^n.
--- hint
The fan-out request is fast with probability (leaf fast)^n. Setting that equal to q gives the leaf's level q^(1/n); the fan-out percentile is the leaf percentile at that level.
--- check case | The examples from the task
(p_any_slow(0.01, 100), leaf_quantile(0.99, 100))
=> (0.633968, 0.9999)
--- check case | One leaf changes nothing
(p_any_slow(0.01, 1), leaf_quantile(0.9, 1))
=> (0.01, 0.9)
--- check case | Never slow stays never slow
p_any_slow(0.0, 50)
=> 0.0
--- check case | A fan-out median sits at the leaf's 99.3rd percentile
leaf_quantile(0.5, 100)
=> 0.993092
--- check case | Fan-out percentiles from measured leaf latencies
(fanout_quantile(list(range(1, 1001)), 1, 0.99), fanout_quantile(list(range(1, 1001)), 10, 0.99), fanout_quantile(list(range(1, 1001)), 100, 0.5))
=> (990, 999, 994)
--- check case | One sample, and unsorted input
(fanout_quantile([5], 3, 0.9), fanout_quantile([30, 10, 20], 1, 0.5))
=> (5, 20)

+++ practice | Debug: the M/M/c that cries overload
--- task
\`mean_wait(lam, mu, c)\` should give the average queueing wait of an M/M/c system: C / (c·mu − lam), where C is the Erlang C probability, and \`float("inf")\` only when the system is unstable, that is when \`lam\` is at least the **total** capacity \`c * mu\`.

A team with 10 replicas of 100 requests per second each, receiving 800 per second, asked it for their wait and got \`inf\`. Find the bug and fix it.
--- starter
import math


def erlang_c(c, a):
    if a >= c:
        return 1.0
    b = 1.0
    for k in range(1, c + 1):
        b = a * b / (k + a * b)
    return c * b / (c - a * (1 - b))


def mean_wait(lam, mu, c):
    rho = lam / mu
    if rho >= 1:
        return float("inf")
    return erlang_c(c, lam / mu) / (c * mu - lam)
--- solution
import math


def erlang_c(c, a):
    if a >= c:
        return 1.0
    b = 1.0
    for k in range(1, c + 1):
        b = a * b / (k + a * b)
    return c * b / (c - a * (1 - b))


def mean_wait(lam, mu, c):
    rho = lam / (c * mu)
    if rho >= 1:
        return float("inf")
    return erlang_c(c, lam / mu) / (c * mu - lam)
--- hint
With 10 servers of 100 per second, the arrival rate 800 is 80% of the capacity. What does the code compute as the utilization?
--- hint
λ / μ is the offered load in Erlangs (here 8), not the utilization. The utilization divides by the total capacity, c · μ.
--- check case | The team's case
round(mean_wait(800, 100, 10), 6)
=> 0.002046
--- check case | One server still works
round(mean_wait(80, 100, 1), 6)
=> 0.04
--- check case | Truly overloaded is still infinite
(mean_wait(1000, 100, 10), mean_wait(1200, 100, 10))
=> (float("inf"), float("inf"))
--- check case | Many servers at high load
round(mean_wait(9500, 10, 1000), 6)
=> 0.000137

+++ practice | How much pooling saves
--- task
The starter has \`erlang_c\` and \`wait_percentile\` from the lesson. Several services, with arrival rates \`rates\`, run on servers that each complete \`mu\` requests per second. Each service needs its \`p\` percentile queueing wait to be at most \`target\` seconds.

Write \`pooling(rates, mu, p, target)\` that returns a pair:

1. the total number of servers if every service has its own pool, each sized to the smallest count that meets the target;
2. the number of servers for one shared pool carrying the sum of all the rates, sized the same way.

Size a pool by starting at the smallest whole number c ≥ 1 with \`c * mu > rate\` and adding one server at a time until \`wait_percentile(rate, mu, c, p) <= target\`.

For example, \`pooling([400, 400], 100, 0.99, 0.01)\` is \`(14, 12)\`.
--- starter
import math


def erlang_c(c, a):
    if a >= c:
        return 1.0
    b = 1.0
    for k in range(1, c + 1):
        b = a * b / (k + a * b)
    return c * b / (c - a * (1 - b))


def wait_percentile(lam, mu, c, p):
    if lam >= c * mu:
        return float("inf")
    waits = erlang_c(c, lam / mu)
    if waits <= 1 - p:
        return 0.0
    return math.log(waits / (1 - p)) / (c * mu - lam)


def pooling(rates, mu, p, target):
    total = sum(math.ceil(r / mu) for r in rates)
    return total, total
--- solution
import math


def erlang_c(c, a):
    if a >= c:
        return 1.0
    b = 1.0
    for k in range(1, c + 1):
        b = a * b / (k + a * b)
    return c * b / (c - a * (1 - b))


def wait_percentile(lam, mu, c, p):
    if lam >= c * mu:
        return float("inf")
    waits = erlang_c(c, lam / mu)
    if waits <= 1 - p:
        return 0.0
    return math.log(waits / (1 - p)) / (c * mu - lam)


def size(rate, mu, p, target):
    c = max(1, math.floor(rate / mu) + 1)
    while wait_percentile(rate, mu, c, p) > target:
        c += 1
    return c


def pooling(rates, mu, p, target):
    separate = sum(size(r, mu, p, target) for r in rates)
    return separate, size(sum(rates), mu, p, target)
--- hint
Write one helper that sizes a single pool, and call it once per service and once for the total rate.
--- hint
The first stable count is \`floor(rate / mu) + 1\`; from there, add servers while the percentile is above the target.
--- check case | The example from the task
pooling([400, 400], 100, 0.99, 0.01)
=> (14, 12)
--- check case | Eight small services gain the most from sharing
pooling([100] * 8, 100, 0.99, 0.01)
=> (32, 12)
--- check case | One service: nothing to pool
pooling([50], 100, 0.99, 0.01)
=> (3, 3)
--- check case | Uneven services and a stricter percentile
pooling([900, 100, 30], 100, 0.999, 0.02)
=> (19, 14)
=== cloud-07 | Autoscaling: target tracking without oscillation
--- teach
Last lesson worked out how many replicas a given load needs. But load is not given once: a consumer service may see [[three times as much traffic in the evening as at 4 a.m.|diurnal]], and a launch can double it in minutes. Running for the peak all day wastes most of the fleet; running for the average drops requests every evening. An **autoscaler** is a control loop that changes the replica count as the load moves. Writing one is easy. Writing one that does not **oscillate**, swinging up and down for no reason, is the real skill, and it is this lesson's lab.

### Target tracking

Pick a metric that rises with load per replica, usually CPU utilization or requests per second per replica, and a **target** value for it, say 60% utilization. If utilization is proportional to load divided by replicas, then to bring it to the target:

**desired = ⌈current × metric / target⌉**

With 10 replicas at 90% and a target of 60%: 10 × 0.9 / 0.6 = 15 replicas. At 30%: 10 × 0.3 / 0.6 = 5. This is **target tracking**, the core of most autoscalers.

The target sits below 100% on purpose. Lesson 6's knee says latency climbs steeply above about 80%, and the spare room also absorbs a sudden rise while new replicas start.

### Why autoscalers oscillate

A thermostat that switched the heater on at 19.9 °C and off at 20.0 °C would click all day. An autoscaler has the same problem, from three sources.

- **Noise.** Traffic is random (lesson 1's Poisson arrivals). Utilization wobbles a few percent from one minute to the next, and a naive autoscaler chases every wobble: add a replica, remove it, add it again. Each change costs a replica start, cold caches, and sometimes dropped connections.
- **Delay.** A new replica takes time to become useful: pulling an image, starting the process, loading a model, warming caches. This is the **[[cold start|cold]]**. During it, the load still looks too high, so a naive autoscaler keeps adding replicas, overshoots, and then removes too many once they all arrive.
- **Over-reaction.** Scaling down by the full computed amount on a single quiet minute removes capacity that the next busy minute needs.

### Three remedies

1. **A tolerance band** (also called a deadband or [[hysteresis|hysteresis]]): do nothing while the metric is within, say, 10% of the target. Small wobbles no longer cause changes. In code: if |metric / target − 1| ≤ tolerance, keep the current count.
2. **Scale up fast, scale down slowly.** Remember the recommendations of the last few minutes, the **stabilization window**, and act on the **largest** of them. A rise acts at once (it is the newest and largest), while a fall acts only once every recommendation in the window agrees that fewer replicas are enough. Running short drops requests; running long only costs money, so the asymmetry is deliberate.
3. **Count replicas that are starting.** Compute the metric over all replicas, including those still warming up, so a scale-up is not repeated every tick while its replicas boot. The new replicas will take their share of the load soon; until then, the shortfall shows up as dropped or slow requests, not as a reason to add even more.

Here is the stabilization window on its own, with made-up recommendations and a window of 3 ticks:

| tick | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| recommended | 10 | 14 | 9 | 9 | 9 | 12 |
| acted on (largest of the last 3) | 10 | 14 | 14 | 14 | 9 | 12 |

The rise to 14 happens at once; the fall to 9 waits until tick 4, when the 14 has left the window; the rise to 12 is immediate again.

### Counting oscillation

To compare autoscalers, count how often the replica count changes **direction**: from rising to falling or back. Ignore ticks where it stays the same. The sequence 10, 12, 12, 11, 13 changes direction twice (up, then down, then up). A good autoscaler follows real changes in load with few direction changes.

### Scaling on queue depth

For workers that pull jobs from a queue, utilization is the wrong signal: a worker is "100% busy" whether the queue holds 10 jobs or 10 million. Scale instead on the work waiting. To keep up with an arrival rate λ and also clear a backlog B within a drain time T, with each worker doing r jobs per second:

**workers = ⌈(λ + B / T) / r⌉**

With 100 jobs per second arriving, 6,000 waiting, a minute to drain them and 20 jobs per second per worker: (100 + 6,000 / 60) / 20 = 10 workers.

### The harness

The starter includes \`run(load, scaler, warmup, seed)\`, which wires your autoscaler into the simulator. It starts the service at the scaler's minimum, already warm, and adds a control loop that, every tick, calls \`scaler.decide(now, current, demand)\` with the current replica count and the demand seen in the previous tick, then starts or stops replicas to match. A replica serves only after \`warmup\` ticks. Demand each tick is \`poisson(cluster.rng, load[t])\`, and what the warm replicas cannot serve is dropped. It returns \`(counts, dropped)\`: the replica count after each tick, and the total dropped.

### Where it is used

- Horizontal autoscalers in cluster managers and cloud instance groups use target tracking with tolerance bands and stabilization windows, and scale on CPU, request rate or custom metrics such as queue length.
- Model servers are the extreme case of cold starts: loading tens of gigabytes of weights can take minutes, so they keep **warm pools** of ready replicas and scale earlier (ML Systems II).
- Serverless platforms scale each function to zero when idle, and pay for it in cold starts on the next request.

**Watch out:**

- **Scaling on latency directly.** Latency is flat, then explodes past the knee, so "desired = current × latency / target" swings wildly. Scale on a quantity proportional to load.
- **Ignoring the cold start.** Adding replicas every tick while the first batch boots overshoots; count starting replicas, and keep headroom for the boot time.
- **Symmetric scaling.** Scaling down as eagerly as up turns noise into churn. Scale down slowly.

::: context diurnal The daily shape of traffic
User-facing traffic follows the people using it: low in the small hours, rising through the morning, peaking in the evening, with weekly and seasonal patterns on top. For a service whose peak is three times its trough, a fleet sized for the peak sits two-thirds idle at night. Global services flatten this by serving many time zones, and batch work (analytics, training, re-indexing) is scheduled into the troughs, which is another reason big shared clusters run at higher utilization than small dedicated ones.
:::

::: context cold What a cold start contains
A new replica's start-up time is the sum of several steps: finding a machine and scheduling (lesson 3), pulling the image if the machine does not have its layers, starting the runtime, loading configuration and data, opening connections, and warming caches so the first requests are not slow. For a small web service it may be a few seconds; for a service that loads a large model or a big in-memory index it can be minutes. The longer it is, the earlier the autoscaler must act, and the more spare capacity must be kept ready.
:::

::: context hysteresis A word from magnets
Hysteresis originally described iron: its magnetization depends on its history, not only on the current field. In control, it means using different thresholds for switching on and switching off, so that a signal hovering near one threshold cannot flip the output back and forth. A thermostat that heats below 19.5 °C and stops above 20.5 °C has a one-degree band of hysteresis. An autoscaler's tolerance band and its slow scale-down are both forms of it.
:::
--- task
Build an autoscaler that does not oscillate. The starter has the simulator and the \`run\` harness described in the lesson. Write three things.

**\`recommend(current, utilization, target, tolerance)\`**: if |utilization / target − 1| is at most \`tolerance\`, return \`current\`; otherwise return ⌈current × utilization / target⌉, computed as \`math.ceil(round(current * utilization / target, 9))\` so float noise cannot push an exact answer up by one.

**\`Autoscaler(target, per_replica, tolerance, window, min_replicas, max_replicas)\`**, a class whose method **\`decide(now, current, demand)\`**:

1. computes the utilization over all \`current\` replicas, including those starting: demand / (current × per_replica);
2. gets a recommendation from \`recommend\`, then clamps it between \`min_replicas\` and \`max_replicas\`;
3. remembers \`(now, recommendation)\`, forgets every remembered entry with \`now - t >= window\`, and returns the **largest** recommendation still remembered.

**\`flips(counts)\`**: how many times the list of replica counts changes direction (from rising to falling or from falling to rising), ignoring steps where it stays the same.

For example, \`recommend(10, 0.9, 0.6, 0.1)\` is \`15\`, \`recommend(10, 0.65, 0.6, 0.1)\` is \`10\`, and \`flips([1, 2, 3, 2, 2, 3, 1])\` is \`3\`.
--- starter
import math
import random


def poisson(rng, lam):
    # How many requests arrive in one tick, when they come at lam per tick on average.
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def remove(self, task):
        name = self.where(task)
        if name is None:
            return False
        del self.machines[name].tasks[task]
        self.log.append((self.now, "remove", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def recover(self, name):
        self.machines[name].up = True
        self.log.append((self.now, "recover", name, 0))

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def recommend(current, utilization, target, tolerance):
    return math.ceil(current * utilization / target)


class Autoscaler:
    def __init__(self, target, per_replica, tolerance, window, min_replicas, max_replicas):
        self.target = target
        self.per_replica = per_replica
        self.tolerance = tolerance
        self.window = window
        self.min_replicas = min_replicas
        self.max_replicas = max_replicas

    def decide(self, now, current, demand):
        return current


def flips(counts):
    return 0


def run(load, scaler, warmup, seed):
    cluster = Cluster([Machine(f"m{i}", 32, 64) for i in range(4)], seed)
    born = {}

    def start(i, when):
        free = [m for m in cluster.machines.values() if m.fits(1, 1)]
        best = min(free, key=lambda m: (-m.free()[0], m.name))
        cluster.place(f"web-{i}", best.name, 1, 1)
        born[f"web-{i}"] = when

    for i in range(scaler.min_replicas):
        start(i, -warmup)
    seen = {"demand": load[0]}

    def control(c):
        current = len(c.running("web-"))
        desired = scaler.decide(c.now, current, seen["demand"])
        for i in range(current, desired):
            start(i, c.now)
        for i in range(current - 1, desired - 1, -1):
            c.remove(f"web-{i}")

    cluster.loops.append(control)
    counts, dropped = [], 0
    for t in range(len(load)):
        cluster.tick()
        ready = sum(1 for task in cluster.running("web-") if t - born[task] >= warmup)
        demand = poisson(cluster.rng, load[t])
        dropped += max(0, demand - ready * scaler.per_replica)
        seen["demand"] = demand
        counts.append(len(cluster.running("web-")))
    return counts, dropped
--- solution
import math
import random


def poisson(rng, lam):
    # How many requests arrive in one tick, when they come at lam per tick on average.
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def remove(self, task):
        name = self.where(task)
        if name is None:
            return False
        del self.machines[name].tasks[task]
        self.log.append((self.now, "remove", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def recover(self, name):
        self.machines[name].up = True
        self.log.append((self.now, "recover", name, 0))

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def recommend(current, utilization, target, tolerance):
    ratio = utilization / target
    if abs(ratio - 1) <= tolerance:
        return current
    return math.ceil(round(current * ratio, 9))


class Autoscaler:
    def __init__(self, target, per_replica, tolerance, window, min_replicas, max_replicas):
        self.target = target
        self.per_replica = per_replica
        self.tolerance = tolerance
        self.window = window
        self.min_replicas = min_replicas
        self.max_replicas = max_replicas
        self.history = []

    def decide(self, now, current, demand):
        utilization = demand / (current * self.per_replica)
        rec = recommend(current, utilization, self.target, self.tolerance)
        rec = max(self.min_replicas, min(self.max_replicas, rec))
        self.history.append((now, rec))
        self.history = [(t, r) for t, r in self.history if now - t < self.window]
        return max(r for t, r in self.history)


def flips(counts):
    steps = [b - a for a, b in zip(counts, counts[1:]) if b != a]
    return sum(1 for x, y in zip(steps, steps[1:]) if (x > 0) != (y > 0))


def run(load, scaler, warmup, seed):
    cluster = Cluster([Machine(f"m{i}", 32, 64) for i in range(4)], seed)
    born = {}

    def start(i, when):
        free = [m for m in cluster.machines.values() if m.fits(1, 1)]
        best = min(free, key=lambda m: (-m.free()[0], m.name))
        cluster.place(f"web-{i}", best.name, 1, 1)
        born[f"web-{i}"] = when

    for i in range(scaler.min_replicas):
        start(i, -warmup)
    seen = {"demand": load[0]}

    def control(c):
        current = len(c.running("web-"))
        desired = scaler.decide(c.now, current, seen["demand"])
        for i in range(current, desired):
            start(i, c.now)
        for i in range(current - 1, desired - 1, -1):
            c.remove(f"web-{i}")

    cluster.loops.append(control)
    counts, dropped = [], 0
    for t in range(len(load)):
        cluster.tick()
        ready = sum(1 for task in cluster.running("web-") if t - born[task] >= warmup)
        demand = poisson(cluster.rng, load[t])
        dropped += max(0, demand - ready * scaler.per_replica)
        seen["demand"] = demand
        counts.append(len(cluster.running("web-")))
    return counts, dropped
--- hint
The window keeps a list of \`(tick, recommendation)\` pairs on the object. Append the new pair, keep only pairs with \`now - t < window\`, and return the largest recommendation left: a rise wins at once, a fall waits until the larger values age out.
--- hint
For \`flips\`, first make the list of non-zero steps (\`b - a\` for neighbouring counts, skipping zeros). Then count neighbouring steps whose signs differ.
--- hint
Clamp with \`max(min_replicas, min(max_replicas, rec))\` before remembering the recommendation, so the window only ever holds counts that are allowed.
--- check case | recommend: outside the band, inside it, and down
(recommend(10, 0.9, 0.6, 0.1), recommend(10, 0.65, 0.6, 0.1), recommend(10, 0.3, 0.6, 0.1), recommend(3, 0.6, 0.6, 0.0))
=> (15, 10, 5, 3)
--- check case | recommend rounds up, without float noise
(recommend(7, 0.5, 0.35, 0.0), recommend(3, 0.7, 0.6, 0.0))
=> (10, 4)
--- check case | decide: up at once, down only after the window
(a := Autoscaler(0.6, 10, 0.1, 3, 2, 50), [a.decide(t, cur, d) for t, (cur, d) in enumerate([(10, 60), (10, 90), (15, 60), (15, 30), (15, 30), (15, 30), (15, 30)])])[-1]
=> [10, 15, 15, 15, 10, 5, 5]
--- check case | decide clamps to the limits
(b := Autoscaler(0.5, 10, 0.0, 1, 1, 8), b.decide(0, 4, 200), b.decide(1, 8, 0))[1:]
=> (8, 1)
--- check case | flips counts changes of direction only
(flips([1, 2, 3, 2, 2, 3, 1]), flips([]), flips([5, 5, 5]), flips([1, 2, 3, 4]), flips([4, 3, 2, 5]))
=> (3, 0, 0, 0, 1)
--- check case | The naive autoscaler chases noise
(lambda load: (lambda r: (flips(r[0]), r[1]))(run(load, Autoscaler(0.6, 10, 0.0, 1, 10, 80), 3, 1)))([100] * 20 + [300] * 40 + [150] * 40)
=> (58, 530)
--- check case | A tolerance band alone halves the flapping
(lambda load: flips(run(load, Autoscaler(0.6, 10, 0.1, 1, 10, 80), 3, 1)[0]))([100] * 20 + [300] * 40 + [150] * 40)
=> 30
--- check case | Band plus a slow scale-down: one direction change, and fewer drops
(lambda load: (lambda r: (flips(r[0]), r[1], r[0][::10]))(run(load, Autoscaler(0.6, 10, 0.1, 10, 10, 80), 3, 1)))([100] * 20 + [300] * 40 + [150] * 40)
=> (1, 370, [17, 20, 20, 51, 51, 57, 57, 28, 28, 28])

+++ question | Why scale down slowly
--- ask
An autoscaler uses a stabilization window for scaling down but scales up immediately. What is the reason for the asymmetry?
--- choice
Scaling down is slower for the cloud provider to carry out.
--- choice correct
Running short drops or slows requests, while running long only costs money for a few minutes; so a rise is trusted at once and a fall only once it has lasted.
--- choice
Replicas cannot be removed until their cold start has finished.
--- choice
It makes the average replica count match the average load exactly.
--- why
The two mistakes have very different costs. A slow scale-down turns noise into a short period of extra capacity instead of a flap, while scale-up stays fast enough to meet real rises in load.

+++ question | The cold-start overshoot
--- ask
An autoscaler computes utilization over **ready** replicas only, and new replicas take 3 minutes to become ready. Traffic doubles suddenly. What happens over the next few minutes?
--- choice
It adds exactly the replicas needed, once.
--- choice correct
For 3 minutes the ready replicas still look overloaded, so it adds replicas again and again; when they all become ready it has far too many and scales down hard.
--- choice
It never scales up, because the new replicas are not ready.
--- why
While new replicas boot, the metric over ready replicas keeps saying "too few", and every tick multiplies the count again. Counting starting replicas in the denominator (or waiting for them) breaks that loop; the shortfall during the boot is covered by headroom.

+++ question | Queue depth
--- ask
Workers process jobs from a queue at 25 jobs per second each. Jobs arrive at 200 per second and 9,000 are waiting. How many workers keep up with arrivals and clear the backlog in 2 minutes?
--- answer
11
--- why
(λ + B / T) / r = (200 + 9,000 / 120) / 25 = (200 + 75) / 25 = 11. Utilization would say "100% busy" for any number of workers below that, which is why queue workers scale on the backlog.

+++ practice | Workers for a backlog
--- task
Write \`backlog_workers(backlog, arrival_rate, per_worker, drain_seconds)\`: the number of queue workers needed to keep up with \`arrival_rate\` new jobs per second **and** clear \`backlog\` waiting jobs within \`drain_seconds\`, when each worker does \`per_worker\` jobs per second. All inputs are whole numbers and \`drain_seconds\` and \`per_worker\` are positive. Return ⌈(arrival_rate + backlog / drain_seconds) / per_worker⌉ as an \`int\`, computed exactly.

For example, \`backlog_workers(6000, 100, 20, 60)\` is \`10\`.
--- starter
def backlog_workers(backlog, arrival_rate, per_worker, drain_seconds):
    return arrival_rate // per_worker
--- solution
def backlog_workers(backlog, arrival_rate, per_worker, drain_seconds):
    jobs = arrival_rate * drain_seconds + backlog
    return -(-jobs // (per_worker * drain_seconds))
--- hint
Multiply everything by \`drain_seconds\` to stay in whole numbers: over the drain period you must do arrival_rate × drain_seconds + backlog jobs, and one worker does per_worker × drain_seconds.
--- hint
Round up with \`-(-a // b)\`.
--- check case | The example from the task
backlog_workers(6000, 100, 20, 60)
=> 10
--- check case | No backlog: keep up with arrivals
backlog_workers(0, 100, 20, 60)
=> 5
--- check case | Nothing at all needs no workers
backlog_workers(0, 0, 20, 60)
=> 0
--- check case | One waiting job still needs a worker
backlog_workers(1, 0, 20, 60)
=> 1
--- check case | Rounding up
backlog_workers(1200, 50, 10, 30)
=> 9

+++ practice | The stabilization window, on its own
--- task
Write \`stabilized(recs, window)\`. \`recs\` is a list of replica recommendations, one per tick. Return the list of counts actually acted on: at tick i, the largest recommendation among ticks i − window + 1 to i (fewer at the start of the list, where there are not that many ticks yet). \`window\` is at least 1.

For example, \`stabilized([5, 8, 6, 4, 4, 4, 9, 3], 3)\` is \`[5, 8, 8, 8, 6, 4, 9, 9]\`.
--- starter
def stabilized(recs, window):
    return list(recs)
--- solution
def stabilized(recs, window):
    return [max(recs[max(0, i - window + 1): i + 1]) for i in range(len(recs))]
--- hint
For each position i, slice out the last \`window\` recommendations ending at i. Clamp the start of the slice at 0.
--- hint
\`recs[max(0, i - window + 1): i + 1]\` is that slice; its \`max\` is the answer for tick i.
--- check case | The example from the task
stabilized([5, 8, 6, 4, 4, 4, 9, 3], 3)
=> [5, 8, 8, 8, 6, 4, 9, 9]
--- check case | A window of 1 changes nothing
stabilized([5, 8, 6], 1)
=> [5, 8, 6]
--- check case | An empty history
stabilized([], 4)
=> []
--- check case | A window longer than the history
stabilized([3, 1, 2], 10)
=> [3, 3, 3]
--- check case | Rises are immediate, falls wait
stabilized([2, 2, 7, 3, 3, 3, 3], 2)
=> [2, 2, 7, 7, 3, 3, 3]

+++ practice | Debug: the autoscaler that overshoots
--- task
\`simulate(demand, per_replica, target, warmup, start, max_replicas)\` runs a simple autoscaler. Replicas are a list of the ticks they were started at; it begins with \`start\` replicas that are already warm (started at \`-warmup\`). A replica is ready once \`t - born >= warmup\`. Each tick t, with \`total\` replicas, it should compute the utilization over **all** replicas, \`demand[t] / (total * per_replica)\`, then desired = ⌈total × utilization / target⌉ clamped between 1 and \`max_replicas\`, start or remove replicas to match (removing the newest first), and record the count.

After a traffic step it overshoots to \`max_replicas\` and then crashes back, because it divides by the ready replicas only. For \`simulate([100] * 3 + [300] * 6, 10, 0.5, 3, 20, 100)\` it returns \`[20, 20, 20, 60, 100, 100, 100, 60, 60]\` instead of \`[20, 20, 20, 60, 60, 60, 60, 60, 60]\`. Fix it.
--- starter
import math


def simulate(demand, per_replica, target, warmup, start, max_replicas):
    born = [-warmup] * start
    counts = []
    for t, d in enumerate(demand):
        total = len(born)
        ready = sum(1 for b in born if t - b >= warmup)
        utilization = d / (ready * per_replica)
        desired = max(1, min(max_replicas, math.ceil(round(total * utilization / target, 9))))
        if desired > total:
            born += [t] * (desired - total)
        else:
            born = born[:desired]
        counts.append(len(born))
    return counts
--- solution
import math


def simulate(demand, per_replica, target, warmup, start, max_replicas):
    born = [-warmup] * start
    counts = []
    for t, d in enumerate(demand):
        total = len(born)
        utilization = d / (total * per_replica)
        desired = max(1, min(max_replicas, math.ceil(round(total * utilization / target, 9))))
        if desired > total:
            born += [t] * (desired - total)
        else:
            born = born[:desired]
        counts.append(len(born))
    return counts
--- hint
The recommendation multiplies the **total** count by the utilization. If the utilization is measured over fewer replicas than that, the two do not match while replicas boot.
--- hint
Measure utilization over the same replicas the recommendation multiplies: \`d / (total * per_replica)\`.
--- check case | The case from the task
simulate([100] * 3 + [300] * 6, 10, 0.5, 3, 20, 100)
=> [20, 20, 20, 60, 60, 60, 60, 60, 60]
--- check case | Scaling down follows the load
simulate([120, 80, 40], 10, 0.5, 2, 24, 100)
=> [24, 16, 8]
--- check case | Quiet traffic keeps one replica
simulate([50, 50, 0, 0], 10, 0.5, 2, 10, 50)
=> [10, 10, 1, 1]
--- check case | A longer boot makes no difference to the count
simulate([100] * 3 + [300] * 6, 10, 0.5, 6, 20, 100)
=> [20, 20, 20, 60, 60, 60, 60, 60, 60]

+++ practice | Headroom for the cold start
--- task
A new replica takes \`cold\` ticks to start serving. Traffic can rise by up to \`ramp\` requests per tick, and each replica serves \`per_replica\` requests per tick. Whatever the autoscaler does, extra capacity it asks for now arrives \`cold\` ticks later, so the service must already have spare capacity for the rise during that time.

Write two functions:

- \`spare_replicas(ramp, cold, per_replica)\`: the spare replicas needed to absorb a rise of \`ramp × cold\` requests per tick: ⌈ramp × cold / per_replica⌉.
- \`replicas_with_headroom(load, ramp, cold, per_replica, target)\`: the replicas to run for the current \`load\`: enough to serve \`load\` at utilization \`target\` (a \`Fraction\` between 0 and 1), that is ⌈load / (per_replica × target)⌉, plus the spare replicas.

All other inputs are whole numbers. Return \`int\`s, computed exactly.

For example, \`spare_replicas(50, 6, 10)\` is \`30\`, and \`replicas_with_headroom(1000, 50, 6, 10, Fraction(1, 2))\` is \`230\`.
--- starter
from fractions import Fraction


def spare_replicas(ramp, cold, per_replica):
    return 0


def replicas_with_headroom(load, ramp, cold, per_replica, target):
    return load // per_replica
--- solution
import math
from fractions import Fraction


def spare_replicas(ramp, cold, per_replica):
    return -(-ramp * cold // per_replica)


def replicas_with_headroom(load, ramp, cold, per_replica, target):
    base = math.ceil(Fraction(load) / (per_replica * Fraction(target)))
    return base + spare_replicas(ramp, cold, per_replica)
--- hint
During a cold start the load can grow by ramp × cold requests per tick, and none of the new replicas help yet.
--- hint
\`math.ceil\` works on a \`Fraction\`, so \`math.ceil(Fraction(load) / (per_replica * target))\` is exact.
--- check case | The examples from the task
(spare_replicas(50, 6, 10), replicas_with_headroom(1000, 50, 6, 10, __import__("fractions").Fraction(1, 2)))
=> (30, 230)
--- check case | No ramp or an instant start needs no spare
(spare_replicas(0, 6, 10), spare_replicas(50, 0, 10))
=> (0, 0)
--- check case | Rounding up
spare_replicas(7, 1, 10)
=> 1
--- check case | Exact at the boundary, no float rounding up
replicas_with_headroom(600, 0, 5, 10, __import__("fractions").Fraction(3, 5))
=> 100
--- check case | A slow model server needs a big warm margin
replicas_with_headroom(2000, 40, 30, 20, __import__("fractions").Fraction(7, 10))
=> 203

+++ practice | Keep-warm: cold starts against idle cost
--- task
A serverless platform runs a function on instances that it starts on demand and stops after they sit idle for \`idle_timeout\` ticks. Model it this way. \`arrivals\` lists the ticks at which requests arrive (it may contain repeats). Each request needs one instance for exactly the tick it arrives in; afterwards that instance becomes idle at the next tick.

At each tick with arrivals, in order:

1. every idle instance that has been idle for \`idle_timeout\` ticks or more (now − idle_since ≥ idle_timeout) is stopped, and is billed \`idle_timeout\` idle ticks;
2. each request takes a warm idle instance if there is one, preferring the one that became idle most recently; it is billed the ticks it sat idle (now − idle_since);
3. each request that found no warm instance is a **cold start** on a new instance;
4. every request is billed 1 tick of work, and its instance becomes idle at now + 1.

When the arrivals run out, every instance still idle is billed \`idle_timeout\` more ticks (until it is stopped).

Write \`serverless(arrivals, idle_timeout)\` that returns \`(cold_starts, billed_ticks)\`.

For example, \`serverless([0, 1, 5, 6, 20], 3)\` is \`(3, 14)\`, and with a timeout of 15 it is \`(1, 36)\`: fewer cold starts, more idle ticks paid for.
--- starter
def serverless(arrivals, idle_timeout):
    return len(arrivals), len(arrivals)
--- solution
from collections import Counter


def serverless(arrivals, idle_timeout):
    idle = []
    cold = billed = 0
    for now, n in sorted(Counter(arrivals).items()):
        warm = []
        for since in idle:
            if now - since >= idle_timeout:
                billed += idle_timeout
            else:
                warm.append(since)
        warm.sort(reverse=True)
        reuse = min(n, len(warm))
        billed += sum(now - since for since in warm[:reuse])
        idle = warm[reuse:]
        cold += n - reuse
        billed += n
        idle += [now + 1] * n
    billed += idle_timeout * len(idle)
    return cold, billed
--- hint
Keep a list of the ticks at which each idle instance became idle. Group the arrivals by tick (a \`Counter\` does it) and walk the ticks in order.
--- hint
At each tick: stop and bill the instances idle too long; sort the rest from most recent to oldest and reuse as many as there are requests; count the shortfall as cold starts; then add one idle-since entry per request.
--- check case | The examples from the task
(serverless([0, 1, 5, 6, 20], 3), serverless([0, 1, 5, 6, 20], 15))
=> ((3, 14), (1, 36))
--- check case | No requests, no cost
serverless([], 5)
=> (0, 0)
--- check case | Simultaneous requests each need an instance
serverless([4, 4, 4], 2)
=> (3, 9)
--- check case | Reuse picks the most recently idle instance
serverless([0, 0, 1, 3], 2)
=> (2, 9)
--- check case | A timeout of 1 never keeps anything warm across a gap
serverless([0, 2], 1)
=> (2, 4)
=== cloud-08 | Overload: rate limits, backpressure, load shedding and circuit breakers
--- teach
The autoscaler adds capacity when load rises, but it takes minutes, and some spikes are too sudden or too large: a retry storm, a viral link, a batch job pointed at the wrong service. For those minutes the service receives more work than it can do. This lesson is about what a service should do then. The surprising answer is that **doing less on purpose** keeps a service useful, while trying to do everything can drive its useful output to almost nothing.

### Throughput is not goodput

**Throughput** counts the requests a server completes. **Goodput** counts only the ones that were still useful when they completed: the client was still waiting, and the answer arrived within its timeout.

Picture an overloaded server with an unbounded queue. Requests wait longer and longer. Soon every request waits longer than its client's timeout: the client has given up (and probably retried, adding more load), but the server still does the work, and sends an answer nobody reads. The server is 100% busy, its throughput is at maximum, and its goodput is close to zero. This is **[[congestion collapse|collapse]]**. You will reproduce it in the lab: a server with capacity for 1,000 requests, offered 1,500, delivers fewer than 200 useful answers.

The cure is a single principle: **when you cannot do all the work, reject some of it early and cheaply**, so the rest is done in time.

### Rate limiting with a token bucket

A **rate limit** caps how fast a client may send. The standard tool is the **[[token bucket|tokens]]**:

- The bucket holds up to **burst** tokens and starts full.
- Tokens drip in at **rate** per second, but the bucket never holds more than burst.
- Each request takes one token. With no token, the request is rejected (typically with HTTP status 429, "Too Many Requests").

So a client can send a burst of up to burst requests at once, and in the long run no more than rate per second. It needs no timer: when a request arrives at time \`now\`, first add the tokens that dripped in since the last update, \`(now − last) × rate\`, cap at burst, then decide.

Here is the refill arithmetic on a bucket with rate 3 per tick and burst 4, last updated at tick 2 with 0.5 tokens:

\`\`\`python fragment
tokens = min(4, 0.5 + (5 - 2) * 3)    # at tick 5: 0.5 + 9 = 9.5, capped to 4
\`\`\`

A **leaky bucket** is the same idea seen from the other side: requests pour into a bucket that drains at a fixed rate, and what overflows is rejected. It smooths bursts out instead of allowing them.

### Backpressure

Between the stages of a pipeline (a front end, a queue, a worker pool), each queue should be **bounded**. When a bounded queue is full, the stage before it must slow down or get an error. That signal travelling upstream is **backpressure**. It moves the overload to the edge, where it can be handled once (rejected, or told to retry later), instead of piling up in the middle, where it uses memory and delays everything behind it.

A bounded queue is also the simplest load shedder: a request that would make the queue too long is rejected at once, while it is still cheap to reject.

### Load shedding: what to drop

Not all requests are equal. A payment matters more than a prefetch of recommendations. **Load shedding** chooses which work to drop.

- **By priority.** Tag each request with a criticality, such as 0 for critical, 1 for normal and 2 for sheddable. When the queue is over its limit, drop the least important first, and among those, the newest (it has had the least invested in it so far).
- **By deadline.** A request whose client has already timed out is worthless. Check the deadline before starting work, and skip expired requests. Deadlines that travel with the request across services (Distributed Systems I) let every layer do this check.
- **By order.** Under overload, serving the newest request first (LIFO) gives answers to clients still waiting, where FIFO serves the oldest, which are about to time out. Some servers switch to LIFO only when the queue is long.

### Circuit breakers

Overload also spreads *from* a failing dependency: if service B is down, every call from A waits for a timeout, A's threads fill up, and A falls over too. A **[[circuit breaker|breaker]]** in A stops calling B once B is clearly failing:

- **closed** (normal): calls go through; count failures in a row;
- **open**: after a threshold of failures, reject calls at once without trying, for a cooldown period;
- **half-open**: after the cooldown, let **one** trial call through; success closes the breaker, failure opens it again.

Failing fast keeps A healthy and gives B room to recover, instead of hammering it with traffic it cannot serve.

### Graceful degradation

Between "full answer" and "error" there is often a cheaper useful answer: a cached result, fewer search results, a page without the personalised part. Planning these degraded modes in advance, and switching to them under load, is **graceful degradation**. A service that degrades loses a little quality for some users instead of all of its availability.

### Where it is used

- API gateways and edge proxies apply per-client token buckets; cloud APIs publish their limits and return 429 with a "retry after" hint.
- Large RPC systems tag requests with criticality and shed by it, and propagate deadlines so no server works on an expired request.
- Client libraries and service meshes ship circuit breakers and adaptive concurrency limits that shrink when latency rises, the same additive-increase, multiplicative-decrease idea TCP uses.

**Watch out:**

- **Unbounded queues.** They turn a short overload into minutes of useless work. Bound every queue.
- **Shedding too late.** Rejecting a request after doing most of its work wastes the work. Reject at the front door.
- **Retries without limits.** Retries multiply load exactly when the service is weakest. Use budgets and backoff (Distributed Systems I), and respect "retry after".

::: context collapse Congestion collapse
The term comes from the early internet. In October 1986 the throughput between two sites on the network fell from 32 kilobits per second to 40 bits per second, a thousandfold drop, because senders kept retransmitting packets that were delayed, not lost, so the links filled with duplicates. Van Jacobson's fix, congestion control with additive increase and multiplicative decrease, is still the basis of TCP. The same dynamic appears whenever work keeps being done, or redone, after nobody needs it.
:::

::: context tokens Choosing rate and burst
The rate is the sustained load you can afford from one client; the burst is how much short-term unevenness you accept. A bucket of rate 100 per second and burst 1 forces perfectly even traffic, which real clients rarely send; a burst of 100 lets a client that was idle for a second send 100 requests at once. Limits can be per client, per API key, per endpoint or global, and they are usually enforced at the edge so rejected requests cost almost nothing.
:::

::: context breaker Why a breaker needs a half-open state
Without the half-open state, an open breaker would either stay open forever or close after the cooldown and immediately send full traffic to a dependency that may still be broken, or barely recovering. One trial request is a cheap probe: if it succeeds, normal traffic resumes; if it fails, the breaker waits another cooldown. The name comes from electrical circuit breakers, which also cut off flow to protect the rest of the system.
:::
--- task
The starter has the simulator's \`poisson\` and a \`traffic(seed, ticks, rate, mix)\` generator that returns, for each tick, a list of request priorities (0 critical, 1 normal, 2 sheddable). Write two things.

**\`TokenBucket(rate, burst)\`**: a class whose bucket starts full, with \`burst\` tokens, last updated at tick 0. Its method **\`allow(now, cost=1)\`** first refills: tokens = min(burst, tokens + (now − last) × rate), then sets \`last = now\`. If the bucket has at least \`cost\` tokens, it takes them and returns \`True\`; otherwise it returns \`False\` and takes nothing. \`rate\` and \`burst\` may be whole numbers or \`Fraction\`s: keep the tokens as a \`Fraction\`, never a float.

**\`serve(arrivals, per_tick, timeout, queue_limit, skip_expired)\`**: a server with one queue. \`arrivals[t]\` is the list of priorities arriving at tick t. Each request is waited for until tick \`t + timeout\` (its deadline). Each tick, in order:

1. append the new requests to the back of the queue, in the order given;
2. if \`queue_limit\` is not \`None\`, then while the queue is longer than \`queue_limit\`, **shed** the request with the largest priority number, choosing the newest among equals;
3. serve from the front, using at most \`per_tick\` units of work. A request whose deadline has passed (\`t > deadline\`) is skipped without using work if \`skip_expired\` is true; otherwise it is served anyway, uses a unit of work, and counts as **late**. Any other request served is **good**.

Return a dict: \`{"good": {priority: count, …} sorted by priority, "late": n, "shed": n, "skipped": n, "queued": requests left at the end}\`. Only priorities with at least one good request appear in \`"good"\`.

For example, \`serve([[2, 1, 0, 2], [], []], 1, 5, 2, False)\` sheds the two priority-2 requests and serves the other two: \`{"good": {0: 1, 1: 1}, "late": 0, "shed": 2, "skipped": 0, "queued": 0}\`.
--- starter
import math
import random
from fractions import Fraction


def poisson(rng, lam):
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


def traffic(seed, ticks, rate, mix):
    # mix = (share of priority 0, share of priority 1); the rest is priority 2.
    rng = random.Random(seed)
    out = []
    for _ in range(ticks):
        batch = []
        for _ in range(poisson(rng, rate)):
            r = rng.random()
            batch.append(0 if r < mix[0] else (1 if r < mix[0] + mix[1] else 2))
        out.append(batch)
    return out


class TokenBucket:
    def __init__(self, rate, burst):
        self.rate = rate
        self.burst = burst

    def allow(self, now, cost=1):
        return True


def serve(arrivals, per_tick, timeout, queue_limit, skip_expired):
    return {"good": {}, "late": 0, "shed": 0, "skipped": 0, "queued": 0}
--- solution
import math
import random
from fractions import Fraction


def poisson(rng, lam):
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


def traffic(seed, ticks, rate, mix):
    # mix = (share of priority 0, share of priority 1); the rest is priority 2.
    rng = random.Random(seed)
    out = []
    for _ in range(ticks):
        batch = []
        for _ in range(poisson(rng, rate)):
            r = rng.random()
            batch.append(0 if r < mix[0] else (1 if r < mix[0] + mix[1] else 2))
        out.append(batch)
    return out


class TokenBucket:
    def __init__(self, rate, burst):
        self.rate = Fraction(rate)
        self.burst = Fraction(burst)
        self.tokens = Fraction(burst)
        self.last = 0

    def allow(self, now, cost=1):
        self.tokens = min(self.burst, self.tokens + (now - self.last) * self.rate)
        self.last = now
        if self.tokens >= cost:
            self.tokens -= cost
            return True
        return False


def serve(arrivals, per_tick, timeout, queue_limit, skip_expired):
    queue = []
    seq = 0
    good = {}
    late = shed = skipped = 0
    for t, batch in enumerate(arrivals):
        for priority in batch:
            queue.append((seq, priority, t + timeout))
            seq += 1
        if queue_limit is not None:
            while len(queue) > queue_limit:
                victim = max(queue, key=lambda r: (r[1], r[0]))
                queue.remove(victim)
                shed += 1
        work = 0
        while queue and work < per_tick:
            _, priority, deadline = queue.pop(0)
            if t > deadline:
                if skip_expired:
                    skipped += 1
                    continue
                late += 1
            else:
                good[priority] = good.get(priority, 0) + 1
            work += 1
    return {"good": dict(sorted(good.items())), "late": late, "shed": shed, "skipped": skipped, "queued": len(queue)}
--- hint
For the bucket, store \`rate\`, \`burst\` and \`tokens\` as \`Fraction\`s and the tick of the last update. Refill before every decision, even one that ends in \`False\`, and always move \`last\` to \`now\`.
--- hint
In \`serve\`, give each request a sequence number when it arrives: \`(seq, priority, deadline)\`. The shedding victim is then \`max(queue, key=lambda r: (r[1], r[0]))\`: largest priority number, and among equals the largest sequence number, the newest.
--- hint
Serve with a loop that runs while the queue is not empty and less than \`per_tick\` work is used. A skipped expired request does not add to the work, so \`continue\` before counting it.
--- check case | A burst, then the steady rate
(b := TokenBucket(2, 5), [b.allow(0) for _ in range(6)], b.allow(1), b.allow(1), b.allow(1), b.allow(10), b.tokens)[1:]
=> ([True, True, True, True, True, False], True, True, False, True, __import__("fractions").Fraction(4))
--- check case | A fractional rate: one request every three ticks
(b := TokenBucket(__import__("fractions").Fraction(1, 3), 1), [b.allow(t) for t in range(7)])[-1]
=> [True, False, False, True, False, False, True]
--- check case | Bigger costs, and a refused request takes nothing
(b := TokenBucket(1, 10), b.allow(0, 7), b.allow(0, 7), b.allow(4, 7), b.tokens)[1:]
=> (True, False, True, __import__("fractions").Fraction(0))
--- check case | The example from the task
serve([[2, 1, 0, 2], [], []], 1, 5, 2, False)
=> {"good": {0: 1, 1: 1}, "late": 0, "shed": 2, "skipped": 0, "queued": 0}
--- check case | Served late or skipped: the deadline flag
(serve([[1, 1, 1], [], [], []], 1, 1, None, False), serve([[1, 1, 1], [], [], []], 1, 1, None, True))
=> ({"good": {1: 2}, "late": 1, "shed": 0, "skipped": 0, "queued": 0}, {"good": {1: 2}, "late": 0, "shed": 0, "skipped": 1, "queued": 0})
--- check case | Under normal load nothing is shed or late
serve(traffic(2, 100, 8, (0.2, 0.5)), 10, 5, None, False)
=> {"good": {0: 145, 1: 416, 2: 242}, "late": 0, "shed": 0, "skipped": 0, "queued": 4}
--- check case | Overload with an unbounded queue: congestion collapse
serve(traffic(1, 100, 15, (0.2, 0.5)), 10, 5, None, False)
=> {"good": {0: 40, 1: 78, 2: 56}, "late": 826, "shed": 0, "skipped": 0, "queued": 528}
?? The server does 1,000 units of work but only 174 answers arrive in time.
--- check case | Skipping expired requests restores goodput, but not by priority
serve(traffic(1, 100, 15, (0.2, 0.5)), 10, 5, None, True)
=> {"good": {0: 213, 1: 490, 2: 297}, "late": 0, "shed": 0, "skipped": 443, "queued": 85}
--- check case | A bounded queue with priority shedding protects critical traffic
serve(traffic(1, 100, 15, (0.2, 0.5)), 10, 5, 20, False)
=> {"good": {0: 310, 1: 617, 2: 73}, "late": 0, "shed": 518, "skipped": 0, "queued": 10}

+++ question | Throughput and goodput
--- ask
During an overload, a server's dashboard shows CPU at 100% and completed requests per second at their all-time high, yet users report that nothing works. What is the most likely explanation?
--- choice
The dashboard is broken; a server at full throughput is serving users well.
--- choice correct
The server is completing requests whose clients have already timed out: throughput is high but goodput is near zero, because the queue makes every request late.
--- choice
The users' network is down.
--- choice
The server needs a faster CPU, and then everything will work.
--- why
With an unbounded queue, every request waits behind all the others, and once the wait exceeds the client timeout, all the work is wasted. Bounding the queue, shedding early and skipping expired requests turn the same capacity back into useful answers.

+++ question | Reading a token bucket
--- ask
A client's token bucket has rate 10 per second and burst 50. The client has sent nothing for a minute, then sends 80 requests within one second. About how many are allowed?
--- choice
10
--- choice
50
--- choice correct
About 60: the 50 saved tokens, plus about 10 that drip in during that second.
--- choice
All 80, because the client was idle for a minute.
--- why
The bucket never holds more than the burst, so a minute of idleness saves only 50 tokens. During the second of sending, about 10 more drip in. The rest are rejected.

+++ question | Why half-open
--- ask
A circuit breaker opens after 5 failures in a row. Why does it go to half-open after the cooldown instead of straight back to closed?
--- choice
To log the failure for later analysis.
--- choice correct
So that one trial call tests whether the dependency has recovered, instead of sending it full traffic at once while it may still be failing or fragile.
--- choice
Because breakers can only close at the start of a new minute.
--- why
Half-open sends a single probe. Success means full traffic can resume; failure means another cooldown. Going straight to closed would hit a recovering dependency with everything at once, which can knock it over again.

+++ practice | The leaky bucket meter
--- task
A leaky bucket rejects traffic that arrives faster than it drains. The bucket holds a **level**, starting at 0. Between arrivals it drains at \`rate\` per tick (never below 0). Each arriving request adds 1 to the level if that keeps the level at most \`capacity\`; then it is accepted. Otherwise it is rejected and the level does not change.

Write \`leaky(arrivals, rate, capacity)\`. \`arrivals\` is a list of arrival ticks in time order (repeats mean several requests in the same tick); \`rate\` is a whole number or a \`Fraction\`. Drain by (this tick − previous arrival's tick) × rate before deciding each request (no drain before the first one). Return a list of \`True\` (accepted) or \`False\` (rejected), one per arrival.

For example, \`leaky([0, 0, 0, 0, 1, 1, 5], 1, 3)\` is \`[True, True, True, False, True, False, True]\`.
--- starter
from fractions import Fraction


def leaky(arrivals, rate, capacity):
    return [True] * len(arrivals)
--- solution
from fractions import Fraction


def leaky(arrivals, rate, capacity):
    level = Fraction(0)
    last = None
    out = []
    for t in arrivals:
        if last is not None:
            level = max(Fraction(0), level - (t - last) * Fraction(rate))
        last = t
        if level + 1 <= capacity:
            level += 1
            out.append(True)
        else:
            out.append(False)
    return out
--- hint
Keep the level and the tick of the previous arrival. For each arrival, drain first, then try to add 1.
--- hint
The drain is \`(t - last) * rate\`, and the level can never go below 0: use \`max(Fraction(0), …)\`.
--- check case | The example from the task
leaky([0, 0, 0, 0, 1, 1, 5], 1, 3)
=> [True, True, True, False, True, False, True]
--- check case | A slow drain
leaky([0, 0, 2, 2, 2], __import__("fractions").Fraction(1, 2), 2)
=> [True, True, True, False, False]
--- check case | No arrivals
leaky([], 1, 3)
=> []
--- check case | Capacity 0 accepts nothing
leaky([3, 3], 1, 0)
=> [False, False]
--- check case | A long gap empties the bucket but cannot make it negative
leaky([0, 0, 0, 100, 100, 100, 100], 1, 3)
=> [True, True, True, True, True, True, False]

+++ practice | A circuit breaker
--- task
Write a class \`CircuitBreaker(threshold, cooldown)\` with two methods. It starts **closed**, and its current state is in the attribute \`state\` (\`"closed"\`, \`"open"\` or \`"half-open"\`).

- \`allow(now)\`: may a call go out at tick \`now\`? When closed: yes. When open: if \`now - opened_at >= cooldown\`, switch to half-open; otherwise no. When half-open: yes for the **first** call only (the trial), no for any other until the trial's result is recorded.
- \`record(now, ok)\`: the result of a call that was allowed. When half-open: success closes the breaker (and clears the failure count); failure opens it again with \`opened_at = now\`. When closed: success resets the count of failures in a row to 0; a failure adds one, and reaching \`threshold\` opens the breaker with \`opened_at = now\`.

For example, with threshold 3 and cooldown 10: three failures at ticks 0, 1, 2 open it; a call at tick 3 is rejected; at tick 12 the trial goes through and, if it succeeds, the breaker is closed again.
--- starter
class CircuitBreaker:
    def __init__(self, threshold, cooldown):
        self.threshold = threshold
        self.cooldown = cooldown
        self.state = "closed"

    def allow(self, now):
        return True

    def record(self, now, ok):
        pass
--- solution
class CircuitBreaker:
    def __init__(self, threshold, cooldown):
        self.threshold = threshold
        self.cooldown = cooldown
        self.state = "closed"
        self.failures = 0
        self.opened_at = None
        self.trial_out = False

    def allow(self, now):
        if self.state == "closed":
            return True
        if self.state == "open" and now - self.opened_at >= self.cooldown:
            self.state = "half-open"
            self.trial_out = False
        if self.state == "half-open" and not self.trial_out:
            self.trial_out = True
            return True
        return False

    def record(self, now, ok):
        if self.state == "half-open":
            if ok:
                self.state = "closed"
                self.failures = 0
            else:
                self.state = "open"
                self.opened_at = now
            return
        if ok:
            self.failures = 0
        else:
            self.failures += 1
            if self.failures >= self.threshold:
                self.state = "open"
                self.opened_at = now
--- hint
Keep three extra attributes: failures in a row, the tick the breaker opened, and whether the half-open trial call has gone out.
--- hint
In \`allow\`, the open-to-half-open switch happens on the first call after the cooldown; that same call can then be the trial. In \`record\`, handle half-open first, then the closed case.
--- check case | Opens after the threshold, rejects, then closes after a good trial
(cb := CircuitBreaker(3, 10), [(t, cb.allow(t) and (cb.record(t, ok) or True), cb.state) for t, ok in [(0, False), (1, False), (2, False), (3, True), (12, True), (13, True)]])[-1]
=> [(0, True, "closed"), (1, True, "closed"), (2, True, "open"), (3, False, "open"), (12, True, "closed"), (13, True, "closed")]
--- check case | A failed trial reopens it for another cooldown
(cb := CircuitBreaker(2, 5), [(t, cb.allow(t) and (cb.record(t, ok) or True), cb.state) for t, ok in [(0, False), (1, False), (6, False), (7, True), (11, True), (12, False)]])[-1]
=> [(0, True, "closed"), (1, True, "open"), (6, True, "open"), (7, False, "open"), (11, True, "closed"), (12, True, "closed")]
--- check case | Failures must be in a row
(cb := CircuitBreaker(3, 5), [cb.allow(t) and (cb.record(t, ok) or True) for t, ok in [(0, False), (1, True), (2, False), (3, False), (4, True)]], cb.state)[-1]
=> "closed"
--- check case | Only one trial at a time while half-open
(cb := CircuitBreaker(1, 5), cb.allow(0), cb.record(0, False), cb.allow(5), cb.allow(5), cb.allow(6), cb.state)[3:]
=> (True, False, False, "half-open")

+++ practice | Debug: the token bucket that refills twice
--- task
\`Bucket(rate, burst)\` is a token bucket: it starts full, refills \`rate\` tokens per tick up to \`burst\`, and \`allow(now)\` takes one token if it can. It should allow at most \`burst\` requests at once and, over a long time, no more than \`rate\` per tick.

Under a flood of requests it lets far too many through. The refill keeps adding the same idle time again and again. Find the bug and fix it.
--- starter
from fractions import Fraction


class Bucket:
    def __init__(self, rate, burst):
        self.rate = Fraction(rate)
        self.burst = Fraction(burst)
        self.tokens = Fraction(burst)
        self.last = 0

    def allow(self, now):
        self.tokens = min(self.burst, self.tokens + (now - self.last) * self.rate)
        if self.tokens >= 1:
            self.tokens -= 1
            self.last = now
            return True
        return False
--- solution
from fractions import Fraction


class Bucket:
    def __init__(self, rate, burst):
        self.rate = Fraction(rate)
        self.burst = Fraction(burst)
        self.tokens = Fraction(burst)
        self.last = 0

    def allow(self, now):
        self.tokens = min(self.burst, self.tokens + (now - self.last) * self.rate)
        self.last = now
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False
--- hint
Follow two refused calls in a row. Which time does the second refill start counting from?
--- hint
The refill has already added the tokens up to \`now\`, whether or not the request is allowed. So \`last\` must move to \`now\` on every call.
--- check case | A flood at rate 1 per 4 ticks allows one every 4 ticks
(b := Bucket(__import__("fractions").Fraction(1, 4), 1), [b.allow(t) for t in range(9)])[-1]
=> [True, False, False, False, True, False, False, False, True]
--- check case | Long-run rate holds under a constant flood
(b := Bucket(__import__("fractions").Fraction(1, 2), 2), sum(b.allow(t) for t in range(100) for _ in range(3)))[-1]
=> 51
--- check case | The burst is still allowed after idling
(b := Bucket(1, 3), [b.allow(50) for _ in range(4)])[-1]
=> [True, True, True, False]

+++ practice | Adaptive concurrency: additive increase, multiplicative decrease
--- task
Instead of a fixed limit, a server can learn how many requests to run at once. After each window of requests it checks whether latency stayed under its target. If it did, the limit grows by 1 (up to \`max_limit\`); if not, it shrinks to ⌊limit × \`decrease\`⌋, but never below 1. This is **AIMD**: additive increase, multiplicative decrease, the rule TCP uses.

Write \`aimd(windows, start, decrease, max_limit)\`. \`windows\` is a list of booleans, \`True\` for a window whose latency was fine. Return the list of limits after each window.

For example, \`aimd([True, True, False, True], 10, 0.5, 100)\` is \`[11, 12, 6, 7]\`.
--- starter
def aimd(windows, start, decrease, max_limit):
    limit = start
    out = []
    for ok in windows:
        limit = limit + 1 if ok else limit - 1
        out.append(limit)
    return out
--- solution
import math


def aimd(windows, start, decrease, max_limit):
    limit = start
    out = []
    for ok in windows:
        if ok:
            limit = min(max_limit, limit + 1)
        else:
            limit = max(1, math.floor(limit * decrease))
        out.append(limit)
    return out
--- hint
Growth is +1 capped at \`max_limit\`; shrinking multiplies and rounds down, then is held at least 1.
--- hint
\`max(1, math.floor(limit * decrease))\` and \`min(max_limit, limit + 1)\`.
--- check case | The example from the task
aimd([True, True, False, True], 10, 0.5, 100)
=> [11, 12, 6, 7]
--- check case | Repeated trouble shrinks fast, but never below 1
aimd([False, False, False, False, False], 20, 0.5, 100)
=> [10, 5, 2, 1, 1]
--- check case | Growth stops at the maximum
aimd([True] * 5, 3, 0.5, 5)
=> [4, 5, 5, 5, 5]
--- check case | No windows, and a gentle decrease
(aimd([], 4, 0.5, 9), aimd([False, True], 7, 0.9, 9))
=> ([], [6, 7])

+++ practice | FIFO or LIFO under overload
--- task
A server with an unbounded queue serves \`per_tick\` requests each tick and never checks deadlines. \`arrivals[t]\` is how many requests arrive at tick t; each client waits up to \`timeout\` ticks, so a request that arrived at tick a and is served at tick s is **good** if s − a ≤ timeout and **late** otherwise.

Write \`goodput(arrivals, per_tick, timeout, order)\`. Each tick, first add the new requests to the queue, then serve up to \`per_tick\` of them: the **oldest** first if \`order\` is \`"fifo"\`, the **newest** first if \`order\` is \`"lifo"\`. Return \`(good, late, still_queued)\`.

For example, under steady overload, \`goodput([20] * 20, 10, 3, "fifo")\` is \`(70, 130, 200)\`, while \`"lifo"\` gives \`(200, 0, 200)\`: the same work, but LIFO answers clients who are still waiting.
--- starter
def goodput(arrivals, per_tick, timeout, order):
    total = sum(arrivals)
    served = min(total, per_tick * len(arrivals))
    return served, 0, total - served
--- solution
def goodput(arrivals, per_tick, timeout, order):
    queue = []
    good = late = 0
    for t, n in enumerate(arrivals):
        queue += [t] * n
        for _ in range(min(per_tick, len(queue))):
            arrived = queue.pop(0) if order == "fifo" else queue.pop()
            if t - arrived <= timeout:
                good += 1
            else:
                late += 1
    return good, late, len(queue)
--- hint
Keep the queue as a list of arrival ticks, in arrival order. FIFO takes from the front (\`pop(0)\`), LIFO from the back (\`pop()\`).
--- hint
Each served request is good or late depending on \`t - arrived <= timeout\`, where t is the tick it is served in.
--- check case | The examples from the task
(goodput([20] * 20, 10, 3, "fifo"), goodput([20] * 20, 10, 3, "lifo"))
=> ((70, 130, 200), (200, 0, 200))
--- check case | Under normal load the order does not matter
(goodput([8] * 20, 10, 3, "fifo"), goodput([8] * 20, 10, 3, "lifo"))
=> ((160, 0, 0), (160, 0, 0))
--- check case | After a burst, LIFO keeps the steady traffic fast
(goodput([30, 5, 5, 5, 5, 5], 5, 2, "fifo"), goodput([30, 5, 5, 5, 5, 5], 5, 2, "lifo"))
=> ((15, 15, 25), (30, 0, 25))
--- check case | Nothing arriving, or no capacity
(goodput([], 5, 2, "fifo"), goodput([3, 3], 0, 2, "lifo"))
=> ((0, 0, 0), (0, 0, 6))
=== cloud-09 | Caching at scale: hit-rate math, invalidation and stampedes
--- teach
The last two lessons handled more load by adding capacity or refusing work. The third way is to **not do the work again**. A **cache** keeps recent answers close by, so repeated requests are served without asking the slower system behind it, the **backend** (a database, another service, a model). Caches sit in front of almost everything at scale. They are also behind some of the worst outages, because a cache changes how much load the backend sees, and that can change suddenly. This lesson gives you the arithmetic, the write rules, and the one failure every cache designer must prevent: the stampede.

### The arithmetic of hits

A request found in the cache is a **hit**; one that is not is a **miss**, and goes to the backend. The **hit rate** h is the fraction of hits. Two formulas follow:

- **Backend load** = request rate × (1 − h).
- **Average latency** = h × hit latency + (1 − h) × miss latency.

The first one hides a trap. A service gets 100,000 requests per second through a cache with a 99% hit rate, so the database sees 1,000. If the hit rate drops to 98%, the database sees 2,000: **double**. A one-point change in the hit rate looks small on a dashboard, but what the backend feels is the **miss** rate, and 1% to 2% is a factor of two. A backend sized for the cache's normal hit rate cannot survive the cache going cold.

### What stays in the cache

A cache is smaller than the data, so it must **evict** something when it is full. The usual rule is **LRU**, least recently used: drop the entry that has gone longest without being read. LRU works because popularity is very uneven. Requests for web pages, products or videos roughly follow a **[[Zipf distribution|zipf]]**: the k-th most popular item is requested about 1/k as often as the most popular one. So a cache holding the top 5% of items can serve well over half of the requests.

### Freshness: TTLs and invalidation

A cached answer can become wrong when the data behind it changes. There are two defences, and real systems use both.

- A **TTL** (time to live) on each entry: after it, the entry expires and the next read fetches a fresh copy. The TTL bounds how stale an answer can be, at the cost of extra misses.
- **Invalidation** on writes: when the data changes, delete the cached copy, so the next read refetches it. The most common pattern, **cache-aside**, is: read from the cache; on a miss, read the database and fill the cache; on a write, update the database and then delete the cache entry.

[[Invalidation is famously hard|race]] because one piece of data often appears in many cached answers. Renaming a user must invalidate the user's own entry and also every cached list, page or count that contains the name. Miss one, and that answer stays wrong until its TTL runs out. A TTL is the safety net for the invalidation you forgot.

### Writing through a cache

When the cache also handles writes, there are three choices:

- **Write-through**: write to the cache and the backend together, and report success once both have it. Reads after a write are fresh; writes are as slow as the backend.
- **Write-back** (write-behind): write to the cache only, report success at once, and flush dirty entries to the backend later. Writes are fast, and several writes to one key become one backend write. But if the cache crashes before a flush, those writes are **lost**.
- **Write-around**: write to the backend only and leave the cache alone (or invalidate it). Good for data that is written once and rarely read soon after.

### The stampede

Here is the failure. A key is very popular: the home page, a configuration blob, the profile of a celebrity. Its entry expires. In the next few milliseconds, before any single fetch can finish, hundreds of requests miss at once, and each one sends its own query to the backend. The backend, sized for the 1% that normally misses, receives a flood for one key. It slows down, which keeps the key missing longer, which brings more misses. This is a **cache stampede** (also called a thundering herd or dog-piling).

Three fixes, often combined:

1. **Request coalescing**: when a fetch for a key is already in flight, later misses for that key **join** it and wait for its answer instead of starting their own. One backend call per key, however many requests miss. The pattern is often called *[[single-flight|singleflight]]*.
2. **TTL jitter**: give each entry a slightly random lifetime, so entries cached at the same moment (after a deploy or a cold start) do not all expire in the same second.
3. **Serving stale while refreshing**: when an entry has just expired, keep serving the old value for a moment while one background fetch refreshes it.

### Modelling a cache in time

To see a stampede you need time: a fetch takes \`latency\` ticks, and requests keep arriving meanwhile. In the lab, a fetch started at tick t completes at t + latency, and fills the cache with an entry that is valid while \`now < completed + ttl\`. Before handling the requests of a tick, complete every fetch that is due. You will run a hot key, 50 requests a tick, with and without coalescing.

### Where it is used

- Shared cache tiers (memcached, Redis) in front of databases; in-process caches inside each replica; CDNs caching whole responses near users.
- Model serving caches too: the KV cache and prefix caches of large language models (ML Systems II) follow the same hit-rate arithmetic.
- Every large site has a story of a stampede: a cache cluster restarting, every key cold at once, and the database falling over under traffic it never normally sees.

**Watch out:**

- **Sizing the backend for the hit rate.** If the cache empties (a restart, a failover, a bad deploy), the backend sees the full load. Know what happens then, and warm caches gradually.
- **Forgetting derived entries.** Invalidate everything that contains the changed data, and keep TTLs as a backstop.
- **Write-back without a plan for crashes.** Fast writes are lost writes if the cache dies before flushing.

::: context zipf Why a small cache goes a long way
In a Zipf distribution with exponent 1, the k-th item's share is proportional to 1/k. The total over n items is about ln n plus 0.58, so with a million items the top one takes about 7% of all requests, the top thousand about half, and the remaining 999,000 the other half. That is why caches with a few percent of the data reach hit rates of 80–95%, and why the last few points of hit rate are so expensive: they live in the long tail of rarely requested items.
:::

::: context race The invalidation race
Even cache-aside with deletes has a race. A reader misses and reads the old value from the database. Before it fills the cache, a writer updates the database and deletes the entry. Then the reader fills the cache with the old value, which stays until its TTL. Fixes include short TTLs, version numbers stored with values, and "leases" that let the cache refuse a fill that was started before the latest delete. Phil Karlton's joke that cache invalidation is one of the two hard things in computer science is popular for good reasons.
:::

::: context singleflight Coalescing, step by step
The cache keeps a table of keys with a fetch in flight. A miss on a key that is not in the table adds it and starts a fetch; a miss on a key that is in the table attaches to it and waits. When the fetch completes, the value fills the cache and every waiter gets it; the key leaves the table. If the fetch fails, the key must leave the table too, or every later request would wait on a fetch that will never finish. Within one process this is a map and a lock; across many replicas the same idea needs a shared lock or lease.
:::
--- task
Simulate a cache with time. Write \`run_cache(requests, ttl, latency, coalesce)\`.

\`requests\` is a list of \`(tick, key)\`, sorted by tick. A fetch from the backend started at tick t **completes** at tick t + \`latency\`; when it completes, the key's entry becomes valid until tick completed + \`ttl\` (valid while \`now < completed + ttl\`), keeping the later expiry if the key already had one. Several fetches for one key may be in flight at once when coalescing is off.

For each request, in order:

1. first complete every in-flight fetch (of any key) whose completion tick is at most the request's tick;
2. if the key has a valid entry: a **hit**, with a wait of 0;
3. otherwise, if \`coalesce\` is true and a fetch for this key is in flight: the request **joins** it, and waits until the earliest such fetch completes (that tick minus now);
4. otherwise: a **miss**: start a new fetch (one **backend** call), and wait \`latency\`.

Return a dict \`{"hit": n, "miss": n, "joined": n, "backend": n, "wait": total_wait}\`.

For example, with requests \`[(0, "a"), (1, "a"), (2, "a")]\`, \`ttl = 10\` and \`latency = 2\`, coalescing gives one miss, one joined request (waiting 1 tick) and one hit; without it, two misses and one hit.
--- starter
def run_cache(requests, ttl, latency, coalesce):
    cache = {}
    stats = {"hit": 0, "miss": 0, "joined": 0, "backend": 0, "wait": 0}
    for now, key in requests:
        if key in cache:
            stats["hit"] += 1
        else:
            stats["miss"] += 1
            stats["backend"] += 1
            stats["wait"] += latency
            cache[key] = now + ttl
    return stats
--- solution
def run_cache(requests, ttl, latency, coalesce):
    expires = {}
    inflight = {}
    stats = {"hit": 0, "miss": 0, "joined": 0, "backend": 0, "wait": 0}
    for now, key in requests:
        for k in list(inflight):
            for done in inflight[k]:
                if done <= now:
                    expires[k] = max(expires.get(k, 0), done + ttl)
            inflight[k] = [d for d in inflight[k] if d > now]
            if not inflight[k]:
                del inflight[k]
        if key in expires and now < expires[key]:
            stats["hit"] += 1
        elif coalesce and key in inflight:
            stats["joined"] += 1
            stats["wait"] += min(inflight[key]) - now
        else:
            stats["miss"] += 1
            stats["backend"] += 1
            stats["wait"] += latency
            inflight.setdefault(key, []).append(now + latency)
    return stats
--- hint
Keep two dicts: a key's expiry tick, and a key's list of in-flight completion ticks. The starter fills the cache the moment it misses, as if the backend answered instantly, which is exactly what hides a stampede.
--- hint
At the start of each request, walk every key's in-flight list: completions at or before \`now\` set \`expires[key] = max(old, done + ttl)\` and leave the list; delete keys whose list is empty.
--- hint
A request joins only when coalescing is on and its key has something in flight; its wait is \`min(inflight[key]) - now\`. Otherwise it starts a fetch completing at \`now + latency\`.
--- check case | The example: one miss, one joined, one hit
run_cache([(0, "a"), (1, "a"), (2, "a")], 10, 2, True)
=> {"hit": 1, "miss": 1, "joined": 1, "backend": 1, "wait": 3}
--- check case | The same without coalescing: two backend calls
run_cache([(0, "a"), (1, "a"), (2, "a")], 10, 2, False)
=> {"hit": 1, "miss": 2, "joined": 0, "backend": 2, "wait": 4}
--- check case | Expiry: valid while now < completed + ttl
run_cache([(0, "k"), (2, "k"), (6, "k"), (7, "k")], 5, 2, True)
=> {"hit": 2, "miss": 2, "joined": 0, "backend": 2, "wait": 4}
--- check case | Keys are cached separately
run_cache([(0, "a"), (1, "a"), (1, "b"), (2, "a"), (5, "a"), (12, "a"), (13, "a")], 10, 2, True)
=> {"hit": 2, "miss": 3, "joined": 2, "backend": 3, "wait": 8}
--- check case | No requests
run_cache([], 5, 1, True)
=> {"hit": 0, "miss": 0, "joined": 0, "backend": 0, "wait": 0}
--- check case | A hot key without coalescing: a stampede at every expiry
run_cache([(t, "home") for t in range(100) for _ in range(50)], 20, 3, False)
=> {"hit": 4400, "miss": 600, "joined": 0, "backend": 600, "wait": 1800}
--- check case | The same hot key with coalescing: five backend calls in all
run_cache([(t, "home") for t in range(100) for _ in range(50)], 20, 3, True)
=> {"hit": 4250, "miss": 5, "joined": 745, "backend": 5, "wait": 1500}

+++ question | The doubled database
--- ask
A cache's hit rate falls from 99.5% to 99.0% after a deploy. The database behind it was at 40% CPU. Roughly what should you expect?
--- choice
Almost no change: half a percent is noise.
--- choice correct
The database's load roughly doubles, to about 80% CPU, because the miss rate went from 0.5% to 1%.
--- choice
The database's load rises by half a percent.
--- choice
The cache's latency doubles, but the database is unaffected.
--- why
The backend sees request rate × (1 − h). Going from a 0.5% to a 1% miss rate doubles the traffic that reaches it. Watch the miss rate, not the hit rate, when you reason about the backend.

+++ question | Write-back risk
--- ask
A cache runs in write-back mode and flushes dirty entries to the database every 30 seconds. The cache node loses power. What is lost?
--- choice
Nothing: the database has every write.
--- choice correct
Every write made since the last flush that had not reached the database, up to about 30 seconds of changes.
--- choice
Only the reads that were in progress.
--- choice
The whole database, because the cache was in front of it.
--- why
Write-back acknowledges a write once the cache has it, before the database does. That makes writes fast and lets repeated writes to a key merge, but anything not yet flushed is gone if the cache dies. Write-through avoids the loss by waiting for the database.

+++ question | What coalescing fixes
--- ask
A key read 5,000 times a second expires; a refetch takes 40 ms. Without coalescing, about how many backend calls does that one expiry cause before the new value is cached?
--- choice
1
--- choice
40
--- choice correct
About 200: every request in the 40 ms before the first fetch returns misses and starts its own fetch.
--- choice
5,000
--- why
5,000 per second for 0.04 seconds is 200 requests, all missing. With coalescing, the first starts a fetch and the other 199 wait for it: one backend call.

+++ practice | Hit-rate arithmetic
--- task
Write three functions, using \`Fraction\` so every answer is exact. Hit rates are given as \`Fraction\`s or whole numbers (0 or 1).

- \`backend_rps(rps, hit_rate)\`: requests per second that reach the backend: rps × (1 − hit_rate).
- \`mean_latency(hit_rate, hit_ms, miss_ms)\`: the average latency: hit_rate × hit_ms + (1 − hit_rate) × miss_ms.
- \`hit_rate_needed(rps, backend_max)\`: the smallest hit rate that keeps the backend at or under \`backend_max\` requests per second: 1 − backend_max / rps, or 0 if the backend can take everything.

For example, \`backend_rps(100000, Fraction(99, 100))\` is \`Fraction(1000)\` and \`hit_rate_needed(100000, 2000)\` is \`Fraction(49, 50)\`.
--- starter
from fractions import Fraction


def backend_rps(rps, hit_rate):
    return Fraction(rps) * Fraction(hit_rate)


def mean_latency(hit_rate, hit_ms, miss_ms):
    return Fraction(hit_ms + miss_ms, 2)


def hit_rate_needed(rps, backend_max):
    return Fraction(backend_max, rps)
--- solution
from fractions import Fraction


def backend_rps(rps, hit_rate):
    return rps * (1 - Fraction(hit_rate))


def mean_latency(hit_rate, hit_ms, miss_ms):
    h = Fraction(hit_rate)
    return h * hit_ms + (1 - h) * miss_ms


def hit_rate_needed(rps, backend_max):
    return max(Fraction(0), 1 - Fraction(backend_max, rps))
--- hint
The backend sees the misses, not the hits: multiply by 1 − hit_rate.
--- hint
For the needed hit rate, solve rps × (1 − h) ≤ backend_max for h, and clamp at 0 with \`max\`.
--- check case | The examples from the task
(backend_rps(100000, __import__("fractions").Fraction(99, 100)), hit_rate_needed(100000, 2000))
=> (__import__("fractions").Fraction(1000), __import__("fractions").Fraction(49, 50))
--- check case | One point of hit rate doubles the backend
backend_rps(100000, __import__("fractions").Fraction(98, 100))
=> __import__("fractions").Fraction(2000)
--- check case | Average latency is dominated by misses
(mean_latency(__import__("fractions").Fraction(9, 10), 1, 50), mean_latency(__import__("fractions").Fraction(99, 100), 1, 50))
=> (__import__("fractions").Fraction(59, 10), __import__("fractions").Fraction(149, 100))
--- check case | Perfect and empty caches
(backend_rps(10, 1), mean_latency(0, 2, 30))
=> (__import__("fractions").Fraction(0), __import__("fractions").Fraction(30))
--- check case | A backend that can take everything needs no cache
hit_rate_needed(100, 500)
=> __import__("fractions").Fraction(0)

+++ practice | LRU on a skewed workload
--- task
Write \`lru_hits(trace, capacity)\`: run an LRU cache that holds at most \`capacity\` keys over \`trace\`, a list of keys requested in order, and return the number of hits. On a hit, the key becomes the most recently used. On a miss, the key is added as the most recently used; if that makes the cache hold more than \`capacity\` keys, remove the least recently used. A capacity of 0 caches nothing.

You may use \`collections.OrderedDict\`: \`move_to_end(key)\` marks a key as most recent, and \`popitem(last=False)\` removes the oldest.

For example, \`lru_hits([1, 2, 1, 3, 2, 1], 2)\` is \`1\`: only the second request for \`1\` hits.
--- starter
from collections import OrderedDict


def lru_hits(trace, capacity):
    seen = set()
    hits = 0
    for key in trace:
        if key in seen:
            hits += 1
        seen.add(key)
    return hits
--- solution
from collections import OrderedDict


def lru_hits(trace, capacity):
    cache = OrderedDict()
    hits = 0
    for key in trace:
        if key in cache:
            hits += 1
            cache.move_to_end(key)
        elif capacity > 0:
            cache[key] = True
            if len(cache) > capacity:
                cache.popitem(last=False)
    return hits
--- hint
Keep the keys in an \`OrderedDict\` in order of use, oldest first. A hit moves the key to the end.
--- hint
A miss adds the key at the end and, if the cache is now over capacity, pops the first (oldest) key. With capacity 0, never add anything.
--- check case | The example from the task
lru_hits([1, 2, 1, 3, 2, 1], 2)
=> 1
--- check case | Empty trace, and one key repeated
(lru_hits([], 3), lru_hits([5, 5, 5], 1))
=> (0, 2)
--- check case | Capacity 0 never hits
lru_hits([1, 1, 1], 0)
=> 0
--- check case | On a Zipf trace, a small cache gets most of the hits
(lambda tr: [lru_hits(tr, c) for c in (10, 50, 100, 500, 1000)])((lambda r: r.choices(range(1000), weights=[1 / (k + 1) for k in range(1000)], k=20000))(__import__("random").Random(1)))
=> [4167, 9209, 11524, 17172, 19015]
?? 5% of the keys (capacity 50) already give about 46% of the requests as hits.

+++ practice | Debug: the team list that never updates
--- task
\`Directory\` caches two kinds of answers in front of a small database of users: a user's name (\`user:<id>\`) and the sorted list of names in a team (\`team:<name>\`). It uses cache-aside: reads fill the cache on a miss, and writes update the database and delete the cache entries that are now wrong.

After a user is renamed, \`team_names\` keeps returning the old name; after a user moves team, their old team's list still includes them. Both writes forget to invalidate a derived entry. Fix \`rename\` and \`move\` so every read after a write is correct.
--- starter
class Directory:
    def __init__(self, users):
        self.db = dict(users)
        self.cache = {}
        self.db_reads = 0

    def name(self, uid):
        key = f"user:{uid}"
        if key not in self.cache:
            self.db_reads += 1
            self.cache[key] = self.db[uid][0]
        return self.cache[key]

    def team_names(self, team):
        key = f"team:{team}"
        if key not in self.cache:
            self.db_reads += 1
            self.cache[key] = sorted(n for n, t in self.db.values() if t == team)
        return self.cache[key]

    def rename(self, uid, new_name):
        team = self.db[uid][1]
        self.db[uid] = (new_name, team)
        self.cache.pop(f"user:{uid}", None)

    def move(self, uid, new_team):
        name = self.db[uid][0]
        self.db[uid] = (name, new_team)
        self.cache.pop(f"team:{new_team}", None)
--- solution
class Directory:
    def __init__(self, users):
        self.db = dict(users)
        self.cache = {}
        self.db_reads = 0

    def name(self, uid):
        key = f"user:{uid}"
        if key not in self.cache:
            self.db_reads += 1
            self.cache[key] = self.db[uid][0]
        return self.cache[key]

    def team_names(self, team):
        key = f"team:{team}"
        if key not in self.cache:
            self.db_reads += 1
            self.cache[key] = sorted(n for n, t in self.db.values() if t == team)
        return self.cache[key]

    def rename(self, uid, new_name):
        team = self.db[uid][1]
        self.db[uid] = (new_name, team)
        self.cache.pop(f"user:{uid}", None)
        self.cache.pop(f"team:{team}", None)

    def move(self, uid, new_team):
        name, old_team = self.db[uid]
        self.db[uid] = (name, new_team)
        self.cache.pop(f"team:{old_team}", None)
        self.cache.pop(f"team:{new_team}", None)
--- hint
List every cached answer that contains the data a write changes. A user's name appears in their own entry and in their team's list.
--- hint
A move changes two team lists: the one the user left and the one they joined.
--- check case | A rename shows in the team list
(d := Directory({1: ("ada", "core"), 2: ("lin", "core"), 3: ("sam", "web")}), d.team_names("core"), d.rename(1, "adele"), d.name(1), d.team_names("core"))[-2:]
=> ("adele", ["adele", "lin"])
--- check case | A move updates both teams
(d := Directory({1: ("ada", "core"), 2: ("lin", "core"), 3: ("sam", "web")}), d.team_names("core"), d.team_names("web"), d.move(2, "web"), d.team_names("core"), d.team_names("web"))[-2:]
=> (["ada"], ["lin", "sam"])
--- check case | Unaffected entries stay cached
(d := Directory({1: ("ada", "core"), 2: ("lin", "core"), 3: ("sam", "web")}), d.team_names("web"), d.name(3), d.rename(1, "adele"), d.team_names("web"), d.name(3), d.db_reads)[-1]
=> 2
--- check case | Repeated reads hit the cache
(d := Directory({1: ("ada", "core")}), d.name(1), d.name(1), d.team_names("core"), d.team_names("core"), d.db_reads)[-1]
=> 2

+++ practice | What a write-back crash loses
--- task
A write-back cache buffers writes and flushes them to the database every \`flush_every\` ticks. \`writes\` is a list of \`(tick, key, value)\`. Simulate ticks 0 up to (not including) \`crash_at\`. At each tick t: first apply that tick's writes, in list order, to the buffer of dirty entries (a later write to a key replaces the earlier one); then, if (t + 1) is a multiple of \`flush_every\`, write every dirty entry to the database (one database write per key) and empty the buffer. At tick \`crash_at\` the cache crashes: whatever is still dirty is lost.

Write \`write_back(writes, flush_every, crash_at)\` that returns \`(database_writes, sorted list of lost keys, database dict)\`.

For example, with writes \`[(0, "a", 1), (1, "b", 2), (2, "a", 3), (3, "c", 4), (4, "a", 5), (5, "b", 6)]\`, flushing every 3 ticks and crashing at 5, the answer is \`(2, ["a", "c"], {"a": 3, "b": 2})\`: the flush after tick 2 wrote \`a\` and \`b\`, and the later writes to \`a\` and \`c\` were never flushed.
--- starter
def write_back(writes, flush_every, crash_at):
    db = {}
    for t, key, value in writes:
        if t < crash_at:
            db[key] = value
    return len(db), [], db
--- solution
def write_back(writes, flush_every, crash_at):
    dirty = {}
    db = {}
    db_writes = 0
    for t in range(crash_at):
        for wt, key, value in writes:
            if wt == t:
                dirty[key] = value
        if (t + 1) % flush_every == 0:
            db.update(dirty)
            db_writes += len(dirty)
            dirty = {}
    return db_writes, sorted(dirty), db
--- hint
The dirty buffer is a dict, so two writes to one key before a flush become one database write.
--- hint
Loop over the ticks, not the writes: apply the tick's writes, then flush if \`(t + 1) % flush_every == 0\`. After the loop, the keys left in the buffer are the lost ones.
--- check case | The example from the task
write_back([(0, "a", 1), (1, "b", 2), (2, "a", 3), (3, "c", 4), (4, "a", 5), (5, "b", 6)], 3, 5)
=> (2, ["a", "c"], {"a": 3, "b": 2})
--- check case | A crash right after a flush loses nothing
write_back([(0, "a", 1), (1, "b", 2), (2, "a", 3), (3, "c", 4), (4, "a", 5), (5, "b", 6)], 3, 6)
=> (5, [], {"a": 5, "b": 6, "c": 4})
--- check case | Flushing every tick is write-through: no merging, no loss
write_back([(0, "a", 1), (1, "b", 2), (2, "a", 3), (3, "c", 4), (4, "a", 5), (5, "b", 6)], 1, 6)
=> (6, [], {"a": 5, "b": 6, "c": 4})
--- check case | Never flushed: everything is lost
write_back([(0, "a", 1), (1, "b", 2), (2, "a", 3)], 10, 6)
=> (0, ["a", "b"], {})
--- check case | No writes
write_back([], 2, 4)
=> (0, [], {})

+++ practice | TTL jitter and the synchronized expiry
--- task
After a cold start, \`n_keys\` keys are all cached at tick 0 with the same TTL, so they all expire together, and every expiry is a backend fetch. Jitter spreads them out.

Write \`expiry_burst(n_keys, ttl, jitter, seed, horizon)\`. Use one \`random.Random(seed)\`. Handle the keys one at a time: for each key, starting at tick 0, repeatedly draw its next lifetime, ttl − floor(rng.random() × jitter), and move forward by it; each tick it lands on, if before \`horizon\`, is one refetch at that tick (the key is refetched instantly and lives again). Stop that key when it reaches \`horizon\` or beyond, then go on to the next key.

Return \`(largest number of refetches in any single tick, total refetches)\`.

For example, \`expiry_burst(1000, 60, 0, 1, 300)\` is \`(1000, 4000)\`: with no jitter, all 1,000 keys refetch together at ticks 60, 120, 180 and 240. With \`jitter = 12\` the biggest burst falls to 94.
--- starter
import math
import random


def expiry_burst(n_keys, ttl, jitter, seed, horizon):
    refetches = n_keys * ((horizon - 1) // ttl)
    return n_keys, refetches
--- solution
import math
import random


def expiry_burst(n_keys, ttl, jitter, seed, horizon):
    rng = random.Random(seed)
    counts = [0] * horizon
    for _ in range(n_keys):
        t = 0
        while True:
            t += ttl - math.floor(rng.random() * jitter)
            if t >= horizon:
                break
            counts[t] += 1
    return max(counts, default=0), sum(counts)
--- hint
Keep a list of refetch counts, one per tick up to the horizon. For each key, walk forward lifetime by lifetime, adding one at each tick it lands on.
--- hint
Draw exactly one random number per lifetime, keys in order, so the same seed gives the same answer. The burst is the \`max\` of the counts.
--- check case | The examples from the task
(expiry_burst(1000, 60, 0, 1, 300), expiry_burst(1000, 60, 12, 1, 300)[0])
=> ((1000, 4000), 94)
--- check case | More jitter, smaller bursts, but a few more refetches
expiry_burst(1000, 60, 30, 1, 300)
=> (45, 6103)
--- check case | No keys
expiry_burst(0, 60, 5, 1, 100)
=> (0, 0)
--- check case | Jitter of 1 changes nothing
expiry_burst(10, 5, 1, 2, 12)
=> (10, 20)
=== cloud-10 | Observability and SLOs: mergeable histograms, error budgets and burn-rate alerts
--- teach
Every lesson so far has measured something: dropped requests, queue lengths, hit rates. In production nobody hands you those numbers; the system must report them, from thousands of machines, cheaply enough to keep forever and precisely enough to act on. That is **observability**. Then comes the harder question: given the numbers, *when should a person be woken up?* This lesson builds the two tools that answer it well: a latency histogram that can be merged across machines, and an alert based on how fast a service is spending its **error budget**.

### Three kinds of signal

- **Metrics**: numbers sampled over time, such as requests per second, error count, queue length, latency distribution. Each is [[cheap to store|cardinality]], so you can keep them for every replica, for months. They tell you *that* something is wrong.
- **Logs**: one record per event, with details (which user, which query, which error). Rich, but costly at volume, so they are often sampled. They tell you *what* happened.
- A **trace**: the path of one request through every service it touched, as a tree of **spans**. Each span is one unit of work (an RPC, a database query) with an id, its parent's id, a name, and a start and end time. Traces tell you *where* the time went.

Metrics come in a few shapes. A **counter** only goes up (requests served so far), and you read it as a rate: how much it rose per second. A **gauge** goes up and down (queue length now). A **histogram** counts values into buckets, so you can read a distribution.

### Percentiles do not average

Lesson 6 showed why the tail matters. So you want the 99th-percentile latency of a service with 200 replicas. Each replica can compute its own p99, but the service's p99 is **not** the average of the replicas' p99s. Suppose 99 replicas answer everything in 10 ms and one sick replica answers half its requests in 900 ms. The average of the p99s is close to 10 ms; the true p99 of all requests together is 900 ms, because the sick replica's slow half is more than 1% of the total traffic. Averaging percentiles hides exactly the problem you are looking for.

What you can combine is **counts**. If every replica counts its latencies into the **same buckets**, the service-wide histogram is the bucket-by-bucket sum, and any percentile can be read from it. A histogram whose buckets are fixed in advance is **mergeable**: merging is addition, which also works across time (add the minutes to get an hour).

### Buckets with bounded relative error

Which buckets? Latencies range from microseconds to minutes, and what matters is *relative* precision: 10% of 1 ms is as interesting as 10% of 1 s. So bucket boundaries should grow geometrically.

Choose a [[relative accuracy|ddsketch]] α, say 0.01 (1%). Let **γ = (1 + α) / (1 − α)**, a number just above 1 (about 1.0202). Bucket i holds the values v with γ^(i−1) < v ≤ γ^i, so a positive value goes to bucket

**i = ⌈ log v / log γ ⌉**

and when reading a percentile, report the bucket's representative value **2 · γ^i / (γ + 1)**. Every value in the bucket is within a factor (1 ± α) of it, so the answer is within 1% of the true value, whatever the distribution. And the bucket count is small: from 1 microsecond to 100 seconds is a factor of 10^8, which is about log(10^8) / log(1.0202) ≈ 920 buckets at most, and only the buckets that are used need storing.

Here is the bucket arithmetic for the value 37, with a coarser accuracy (5%) than the lab's:

\`\`\`python fragment
gamma = (1 + 0.05) / (1 - 0.05)            # about 1.105
i = math.ceil(math.log(37.0) / math.log(gamma))
print(i, 2 * gamma ** i / (gamma + 1))      # bucket 37 covers 36.7 to 40.6; reported as 38.5
\`\`\`

To read the q-quantile from n counted values, use the **nearest-rank** rule: the value at rank ⌈q · n⌉ (at least 1) in sorted order. Walk the buckets from smallest to largest, adding up counts, until the running total reaches that rank.

### Traces and the critical path

A trace's spans form a tree through their parent ids. Some children of a span run in parallel and some one after another, so the slowest request is not explained by the sum of its spans. What explains it is the **critical path**: the chain of spans that the end time actually waited on. Find it backwards: from a span's end, the child that finished last (not after that point) is on the path; then the child that finished last before *that* one started; and so on, descending into each chosen child the same way. Speeding up anything off the critical path does not make the request faster.

### SLIs, SLOs and error budgets

Which number should page someone? Not CPU, and not a single error. The useful answer starts from what users experience.

- A **service level indicator** (SLI) is a ratio of good events to valid events, measured where users feel it: the fraction of requests answered successfully within 300 ms, say.
- A **service level objective** (SLO) is the target for that ratio over a window: **99.9% over 30 days**.
- The **error budget** is what the SLO allows to go wrong: 1 − 0.999 = 0.1% of requests. In time terms, 0.001 × 30 days × 24 × 60 = **43.2 minutes** of total outage in 30 days.

The budget turns reliability into something a team can spend. While budget remains, ship features and take risks. When it is spent, slow down, and put engineering effort into reliability. [[Aiming for 100% is a mistake|nines]]: users cannot tell 99.999% from 100%, and the last nines cost more than everything before them.

### Alerting on burn rate

The **burn rate** is how fast the budget is being spent, relative to the pace that would use it up exactly by the end of the window:

**burn rate = (error rate over some recent window) / (1 − SLO)**

A burn rate of 1 spends the 30-day budget in exactly 30 days. A burn rate of 14.4 sustained for one hour spends 14.4 × 1 / 720 = 2% of a 30-day budget (30 days is 720 hours), a significant chunk in a short time. So a good alert says: **page when the burn rate over the last hour is at least 14.4**.

One window is not enough. A long window alone keeps firing for an hour after the problem is fixed, since the bad minutes are still inside it. A short window alone fires on every five-minute blip. The fix is to require **both**: the burn rate over a long window **and** over a short window must reach the threshold. The long window shows the problem is real; the short window shows it is still happening, so the alert stops soon after the fix. A [[common pair of rules|burn]], in minutes:

| long window | short window | burn rate at least | spends of a 30-day budget |
| --- | --- | --- | --- |
| 60 | 5 | 14.4 | 2% in an hour |
| 360 | 30 | 6 | 5% in six hours |

At the start of a series, a window simply covers the minutes that exist. A window with no requests has burn rate 0.

### Where it is used

- Metrics systems store histograms with fixed or exponential buckets precisely so that they merge (the "native histograms" of modern metrics systems, and sketches such as DDSketch, use the γ construction of this lesson).
- Distributed tracing systems collect spans from every service and draw the critical path of slow requests.
- SRE teams define SLOs per user journey and page on multi-window burn rates, with slower burns sent as tickets instead of pages.

**Watch out:**

- **Averaging percentiles.** Merge counts, then read the percentile.
- **Alerting on causes.** High CPU or one failed health check may not hurt any user. Alert on the SLI; use the rest for diagnosis.
- **Burn rate with the wrong denominator.** Divide the error rate by the allowed error rate, 1 − SLO, not by the SLO.

::: context cardinality Why metrics must stay small
Every distinct combination of labels on a metric (service, endpoint, status code, replica) is a separate time series that must be stored. Adding a label such as user id multiplies the series by millions and can take a metrics system down. That is why per-user detail belongs in logs and traces, which are sampled, while metrics keep a small, fixed set of labels, and why a histogram with a few hundred fixed buckets is affordable where storing every latency is not.
:::

::: context ddsketch The sketch behind the buckets
The construction with γ = (1 + α) / (1 − α) is the core of DDSketch, published by Datadog engineers in 2019. The representative value 2γ^i / (γ + 1) is the point in the bucket (γ^(i−1), γ^i] that is at the same relative distance from both ends, which is what makes the error at most α everywhere. Real implementations add a cap on the number of buckets, collapsing the lowest ones when it is reached, so memory stays bounded even for strange data.
:::

::: context nines Counting nines
Availability targets are often named by their nines: 99.9% is "three nines", 99.99% "four nines". Each extra nine divides the allowed downtime by ten: in a 30-day month, three nines allow 43.2 minutes, four nines 4.32 minutes, five nines about 26 seconds. A service can never be more available than the things it depends on in series: three dependencies at 99.9% each give at most about 99.7%.
:::

::: context burn Where 14.4 comes from
The thresholds are chosen backwards from how much budget an alert may let burn before someone acts. If paging after 2% of a 30-day budget is spent in one hour is the goal, the burn rate is 0.02 × 720 hours / 1 hour = 14.4. For 5% in six hours it is 0.05 × 720 / 6 = 6. The pairs of windows, and the convention of a short window about a twelfth of the long one, come from Google's Site Reliability Workbook.
:::
--- task
Build both halves of SLO monitoring.

**\`Histogram(alpha)\`**: a mergeable latency histogram. Store \`alpha\`, γ = (1 + alpha) / (1 − alpha), a dict of bucket counts, a count of zero-or-negative values, and the total count \`n\`.

- \`record(value)\`: add 1 to \`n\`; a value ≤ 0 goes to the zero count; a positive value goes to bucket \`math.ceil(math.log(value) / math.log(gamma))\`.
- \`merge(other)\`: add the other histogram's buckets, zero count and \`n\` into this one. If the two \`alpha\`s differ, raise \`ValueError\`.
- \`quantile(q)\`: \`None\` if empty. Otherwise the rank is \`max(1, math.ceil(q * n))\`. The zero count comes first: if it reaches the rank, return \`0.0\`. Then walk the buckets in increasing index, adding counts, and return 2 · γ^i / (γ + 1) for the first bucket i where the running total reaches the rank.

**\`burn_rate(errors, totals, end, window, slo)\`**: \`errors[m]\` and \`totals[m]\` are the failed and total requests in minute m. Over the minutes from \`max(0, end - window + 1)\` to \`end\` inclusive, return (errors / totals) / (1 − slo) as a \`Fraction\`, or \`Fraction(0)\` if there were no requests. \`slo\` is a \`Fraction\`.

**\`alerting(errors, totals, slo, rules)\`**: each rule is \`(long_window, short_window, threshold)\`. Return the sorted list of minutes m at which **some** rule has both \`burn_rate(…, m, long_window, slo)\` and \`burn_rate(…, m, short_window, slo)\` at least its threshold.

For example, a histogram with alpha 0.01 holding 12, 15, 15, 20, 100 and 250 gives about 15.03 for \`quantile(0.5)\`.
--- starter
import math
from fractions import Fraction


class Histogram:
    def __init__(self, alpha):
        self.alpha = alpha
        self.values = []

    def record(self, value):
        self.values.append(value)

    def merge(self, other):
        pass

    def quantile(self, q):
        return sum(self.values) / len(self.values) if self.values else None


def burn_rate(errors, totals, end, window, slo):
    return Fraction(0)


def alerting(errors, totals, slo, rules):
    return []
--- solution
import math
from fractions import Fraction


class Histogram:
    def __init__(self, alpha):
        self.alpha = alpha
        self.gamma = (1 + alpha) / (1 - alpha)
        self.counts = {}
        self.zeros = 0
        self.n = 0

    def record(self, value):
        self.n += 1
        if value <= 0:
            self.zeros += 1
            return
        i = math.ceil(math.log(value) / math.log(self.gamma))
        self.counts[i] = self.counts.get(i, 0) + 1

    def merge(self, other):
        if other.alpha != self.alpha:
            raise ValueError("histograms with different accuracy cannot be merged")
        for i, c in other.counts.items():
            self.counts[i] = self.counts.get(i, 0) + c
        self.zeros += other.zeros
        self.n += other.n

    def quantile(self, q):
        if self.n == 0:
            return None
        rank = max(1, math.ceil(q * self.n))
        seen = self.zeros
        if seen >= rank:
            return 0.0
        for i in sorted(self.counts):
            seen += self.counts[i]
            if seen >= rank:
                return 2 * self.gamma ** i / (self.gamma + 1)


def burn_rate(errors, totals, end, window, slo):
    start = max(0, end - window + 1)
    bad = sum(errors[start:end + 1])
    total = sum(totals[start:end + 1])
    if total == 0:
        return Fraction(0)
    return Fraction(bad, total) / (1 - slo)


def alerting(errors, totals, slo, rules):
    firing = []
    for m in range(len(totals)):
        for long_window, short_window, threshold in rules:
            if burn_rate(errors, totals, m, long_window, slo) >= threshold and burn_rate(errors, totals, m, short_window, slo) >= threshold:
                firing.append(m)
                break
    return firing
--- hint
The histogram never stores values, only counts per bucket index, which is why two of them merge by adding counts index by index.
--- hint
In \`quantile\`, start the running total at the zero count, then go through \`sorted(self.counts)\`. The representative value of bucket i is \`2 * gamma ** i / (gamma + 1)\`.
--- hint
\`burn_rate\` sums the slices \`errors[start:end + 1]\` and \`totals[start:end + 1]\`. In \`alerting\`, a minute fires if any rule passes on both windows; \`break\` after the first rule that passes so the minute is listed once.
--- check case | The example: median, p99 and the minimum, within 1%
(h := Histogram(0.01), [h.record(v) for v in [12, 15, 15, 20, 100, 250]], round(h.quantile(0.5), 3), round(h.quantile(0.99), 3), round(h.quantile(0), 3), h.n)[2:]
=> (15.03, 252.178, 12.062, 6)
--- check case | Empty histograms have no quantiles; zeros come first
((h := Histogram(0.01)).quantile(0.5), [h.record(v) for v in [0, 0, 5]], h.quantile(0.5), round(h.quantile(1), 3))
=> (None, [None, None, None], 0.0, 5.003)
--- check test | Merged halves give every quantile within 1% of the exact answer
(lambda vals: (lambda a, b: ([a.record(v) for i, v in enumerate(vals) if i % 2], [b.record(v) for i, v in enumerate(vals) if not i % 2], a.merge(b), all(abs(a.quantile(q) - sorted(vals)[max(1, math.ceil(q * len(vals))) - 1]) <= 0.01 * sorted(vals)[max(1, math.ceil(q * len(vals))) - 1] for q in (0.5, 0.9, 0.99, 0.999)) and a.n == 10000))(Histogram(0.01), Histogram(0.01))[-1])((lambda r: [r.lognormvariate(3, 1) for _ in range(10000)])(__import__("random").Random(7)))
--- check test | Merging is the same as recording everything in one histogram
(lambda vals: (lambda one, a, b: ([one.record(v) for v in vals], [a.record(v) for v in vals[:300]], [b.record(v) for v in vals[300:]], a.merge(b), a.counts == one.counts and a.n == one.n)[-1])(Histogram(0.02), Histogram(0.02), Histogram(0.02)))((lambda r: [r.expovariate(0.1) for _ in range(1000)])(__import__("random").Random(3)))
--- check test | Ten thousand values need only a few hundred buckets
(lambda h: ([h.record(v) for v in (lambda r: [r.lognormvariate(3, 1) for _ in range(10000)])(__import__("random").Random(7))], len(h.counts) < 400)[-1])(Histogram(0.01))
--- check test | Different accuracies refuse to merge
raises(ValueError, lambda: Histogram(0.01).merge(Histogram(0.02)))
--- check case | Burn rate over a window, as an exact Fraction
(burn_rate([0, 2, 8, 0], [1000, 1000, 1000, 1000], 2, 2, __import__("fractions").Fraction(999, 1000)), burn_rate([0, 2, 8, 0], [1000, 1000, 1000, 1000], 3, 60, __import__("fractions").Fraction(999, 1000)))
=> (__import__("fractions").Fraction(5), __import__("fractions").Fraction(5, 2))
--- check case | No requests means no burn
burn_rate([0, 0], [0, 0], 1, 5, __import__("fractions").Fraction(99, 100))
=> __import__("fractions").Fraction(0)
--- check case | Multi-window alerts: a sharp incident and a slow burn
(lambda e: (lambda f: (f[0], len(f), [m for m in (110, 111, 155, 156, 320, 321) if m in f]))(alerting(e, [1000] * 600, __import__("fractions").Fraction(999, 1000), [(60, 5, __import__("fractions").Fraction(144, 10)), (360, 30, __import__("fractions").Fraction(6))])))([1] * 100 + [50] * 30 + [1] * 170 + [8] * 300)
=> (111, 245, [111, 155, 321])
--- check case | A five-minute blip of 10% errors pages nobody
alerting([1] * 100 + [100] * 5 + [1] * 100, [1000] * 205, __import__("fractions").Fraction(999, 1000), [(60, 5, __import__("fractions").Fraction(144, 10))])
=> []

+++ question | Averaging p99s
--- ask
A service has 100 replicas. Each reports its own p99 latency every minute, and the dashboard shows the average of the 100 values. Why is that number misleading?
--- choice
It is not misleading: the average of the p99s is the p99 of the service.
--- choice correct
Percentiles do not combine by averaging; one slow replica can push the service's true p99 far above the average of the p99s. Merge the replicas' histogram counts and read the percentile from the sum.
--- choice
It is too slow to compute every minute.
--- choice
It should be the median of the p99s instead.
--- why
The service-wide p99 depends on how many requests in total were slow, and that is a matter of counts. Fixed buckets make counts additive, so a merged histogram gives the real answer.

+++ question | The budget in minutes
--- ask
A service has an availability SLO of 99.95% over 30 days. How many minutes of complete outage does its error budget allow in that window?
--- answer
21.6
21.6 minutes
--- why
1 − 0.9995 = 0.0005, and 30 days are 30 × 24 × 60 = 43,200 minutes. 0.0005 × 43,200 = 21.6 minutes.

+++ question | Why two windows
--- ask
An alert fires when the error budget's burn rate over the last hour is at least 14.4. A bad deploy causes 20 minutes of errors and is rolled back. What problem does adding a short window (the last 5 minutes must also burn at 14.4 or more) solve?
--- choice
It makes the alert fire sooner when the incident starts.
--- choice correct
Without it, the alert keeps firing for up to an hour after the rollback, because the bad minutes stay in the one-hour window; requiring the 5-minute window too makes it stop within minutes of the fix.
--- choice
It stops the alert from firing during the incident.
--- choice
It halves the number of metrics stored.
--- why
The long window gives significance (the problem is big enough to matter); the short window gives recency (it is still happening). Requiring both means the alert starts when the problem is real and ends soon after it is gone.

+++ practice | Error budgets in numbers
--- task
Write two functions, exact with \`Fraction\`. An SLO is given as a \`Fraction\` (or the whole number 1).

- \`budget_minutes(slo, days)\`: the minutes of complete outage the error budget allows in a window of \`days\` days: (1 − slo) × days × 24 × 60.
- \`budget_left(slo, total, bad)\`: the fraction of the error budget still unspent after \`total\` requests of which \`bad\` failed: 1 − bad / ((1 − slo) × total). It is negative when the budget is overspent. If the SLO allows no failures at all (the allowed number is 0), return 1 when \`bad\` is 0 and 0 otherwise.

For example, \`budget_minutes(Fraction(999, 1000), 30)\` is \`Fraction(216, 5)\` (43.2 minutes) and \`budget_left(Fraction(999, 1000), 1000000, 250)\` is \`Fraction(3, 4)\`.
--- starter
from fractions import Fraction


def budget_minutes(slo, days):
    return Fraction(slo) * days * 24 * 60


def budget_left(slo, total, bad):
    return Fraction(1)
--- solution
from fractions import Fraction


def budget_minutes(slo, days):
    return (1 - Fraction(slo)) * days * 24 * 60


def budget_left(slo, total, bad):
    allowed = (1 - Fraction(slo)) * total
    if allowed == 0:
        return Fraction(1) if bad == 0 else Fraction(0)
    return 1 - Fraction(bad) / allowed
--- hint
The budget is the part the SLO allows to fail, 1 − slo, applied to the window or to the requests.
--- hint
For \`budget_left\`, the allowed failures are (1 − slo) × total. Check for 0 before dividing.
--- check case | The examples from the task
(budget_minutes(__import__("fractions").Fraction(999, 1000), 30), budget_left(__import__("fractions").Fraction(999, 1000), 1000000, 250))
=> (__import__("fractions").Fraction(216, 5), __import__("fractions").Fraction(3, 4))
--- check case | Each nine divides the budget by ten
(budget_minutes(__import__("fractions").Fraction(9999, 10000), 30), budget_minutes(__import__("fractions").Fraction(99, 100), 7))
=> (__import__("fractions").Fraction(108, 25), __import__("fractions").Fraction(504, 5))
--- check case | Overspent budgets go negative
budget_left(__import__("fractions").Fraction(999, 1000), 1000000, 1500)
=> __import__("fractions").Fraction(-1, 2)
--- check case | A 100% SLO has no budget to spend
(budget_left(1, 10, 0), budget_left(1, 10, 1), budget_minutes(1, 30))
=> (__import__("fractions").Fraction(1), __import__("fractions").Fraction(0), __import__("fractions").Fraction(0))

+++ practice | The p99 that averaging hides
--- task
Write \`nearest_rank(samples, q)\`: the q-quantile of a list of numbers by the nearest-rank rule (sort them; take the value at position ⌈q × n⌉ counting from 1, but at least position 1). \`q\` may be a float or a \`Fraction\`.

Then write \`merged_vs_average(hosts, q)\`, where \`hosts\` is a list of lists of latencies, one list per host. Return a pair: the q-quantile of **all** latencies together, and the average of the hosts' own q-quantiles as a \`Fraction\`.

For example, with three hosts \`[10] * 99 + [500]\`, \`[10] * 100\` and \`[20] * 50 + [900] * 50\`, and q = 99/100, the true p99 is 900 while the average of the p99s is 920/3, about 307.
--- starter
import math
from fractions import Fraction


def nearest_rank(samples, q):
    s = sorted(samples)
    return s[int(q * len(s))]


def merged_vs_average(hosts, q):
    return 0, Fraction(0)
--- solution
import math
from fractions import Fraction


def nearest_rank(samples, q):
    s = sorted(samples)
    return s[max(1, math.ceil(q * len(s))) - 1]


def merged_vs_average(hosts, q):
    merged = nearest_rank([x for h in hosts for x in h], q)
    average = Fraction(sum(nearest_rank(h, q) for h in hosts), len(hosts))
    return merged, average
--- hint
Positions count from 1 in the rule but from 0 in a Python list: take index ⌈q × n⌉ − 1, and never less than 0.
--- hint
For the merged answer, flatten all the hosts' lists into one list first. For the average, compute each host's own quantile and divide the sum by the number of hosts with \`Fraction\`.
--- check case | The example from the task
merged_vs_average([[10] * 99 + [500], [10] * 100, [20] * 50 + [900] * 50], __import__("fractions").Fraction(99, 100))
=> (900, __import__("fractions").Fraction(920, 3))
--- check case | nearest_rank on small lists
(nearest_rank([3, 1, 2], 0.5), nearest_rank([3, 1, 2], 0), nearest_rank([3, 1, 2], 1), nearest_rank([7], 0.99))
=> (2, 1, 3, 7)
--- check case | Exact ranks with a Fraction
nearest_rank(list(range(1, 101)), __import__("fractions").Fraction(99, 100))
=> 99
--- check case | One host: both answers agree
merged_vs_average([[1, 2, 3]], __import__("fractions").Fraction(1, 2))
=> (2, __import__("fractions").Fraction(2))
--- check case | The maximum of all hosts versus the average of maxima
merged_vs_average([[5], [7]], 1)
=> (7, __import__("fractions").Fraction(6))

+++ practice | Counters that reset
--- task
A counter metric only goes up, but it drops back to 0 when its process restarts. A metrics system samples the counter now and then, and must compute how much it increased over a run of samples without being fooled by restarts.

Write \`increase(samples)\`: for each pair of neighbouring samples, if the counter did not go down, add the difference; if it went down, the process restarted and counted from 0, so add the new value itself. Return the total. Fewer than two samples give 0.

For example, \`increase([10, 15, 22, 3, 9, 9])\` is \`21\`: 5 + 7, then a restart that counted 3, then 6 + 0.
--- starter
def increase(samples):
    if len(samples) < 2:
        return 0
    return samples[-1] - samples[0]
--- solution
def increase(samples):
    total = 0
    for prev, cur in zip(samples, samples[1:]):
        if cur >= prev:
            total += cur - prev
        else:
            total += cur
    return total
--- hint
Walk neighbouring pairs with \`zip(samples, samples[1:])\`. A drop means the counter started again from 0.
--- hint
After a restart, everything the new process counted is the new sample's value, so add \`cur\` rather than \`cur - prev\`.
--- check case | The example from the task
increase([10, 15, 22, 3, 9, 9])
=> 21
--- check case | Too few samples
(increase([]), increase([5]))
=> (0, 0)
--- check case | A flat counter
increase([0, 0, 0])
=> 0
--- check case | Two restarts in a row
increase([7, 2, 1])
=> 3
--- check case | No restarts: last minus first
increase([100, 140, 190, 260])
=> 160

+++ practice | Debug: the burn rate that never fires
--- task
\`burn(bad, total, slo)\` should return the error budget's burn rate for one window: the error rate \`bad / total\` divided by the error rate the SLO allows, \`1 - slo\`, as a \`Fraction\` (0 when \`total\` is 0). \`page(bad, total, slo)\` should return \`True\` when the burn rate is at least 14.4.

During a real incident, with 2% of requests failing against a 99.9% SLO (a burn rate of 20), it did not page. Find the bug and fix it.
--- starter
from fractions import Fraction


def burn(bad, total, slo):
    if total == 0:
        return Fraction(0)
    return Fraction(bad, total) / slo


def page(bad, total, slo):
    return burn(bad, total, slo) >= Fraction(144, 10)
--- solution
from fractions import Fraction


def burn(bad, total, slo):
    if total == 0:
        return Fraction(0)
    return Fraction(bad, total) / (1 - slo)


def page(bad, total, slo):
    return burn(bad, total, slo) >= Fraction(144, 10)
--- hint
With a 99.9% SLO, the allowed error rate is 0.1%. What does the code divide by?
--- hint
Divide by the error budget, \`1 - slo\`, not by the SLO itself.
--- check case | The incident from the task
(burn(20, 1000, __import__("fractions").Fraction(999, 1000)), page(20, 1000, __import__("fractions").Fraction(999, 1000)))
=> (__import__("fractions").Fraction(20), True)
--- check case | Spending exactly on pace is a burn rate of 1
burn(1, 1000, __import__("fractions").Fraction(999, 1000))
=> __import__("fractions").Fraction(1)
--- check case | Just under the paging threshold
page(14, 1000, __import__("fractions").Fraction(999, 1000))
=> False
--- check case | No traffic, no burn
burn(0, 0, __import__("fractions").Fraction(99, 100))
=> __import__("fractions").Fraction(0)

+++ practice | Availability of a dependency tree
--- task
A request may need several services in **series** (it fails if any of them fails) or have **parallel** replicas or fallbacks (it fails only if all of them fail). Treating failures as independent:

- the availability of parts in series is the product of their availabilities;
- the availability of parts in parallel is 1 − the product of their unavailabilities (1 − a).

Write \`availability(node)\`. A node is either a number (an availability, a \`Fraction\` or a whole number 0 or 1) or a pair \`(kind, parts)\` where \`kind\` is \`"serial"\` or \`"parallel"\` and \`parts\` is a list of nodes. Return the availability as an exact \`Fraction\`. A serial node with no parts has availability 1; a parallel node with no parts has availability 0.

For example, two replicas at 99% in parallel give 1 − 0.01 × 0.01 = 0.9999.
--- starter
from fractions import Fraction


def availability(node):
    if isinstance(node, tuple):
        kind, parts = node
        return min(availability(p) for p in parts)
    return Fraction(node)
--- solution
from fractions import Fraction


def availability(node):
    if not isinstance(node, tuple):
        return Fraction(node)
    kind, parts = node
    values = [availability(p) for p in parts]
    product = Fraction(1)
    if kind == "serial":
        for v in values:
            product *= v
        return product
    for v in values:
        product *= 1 - v
    return 1 - product
--- hint
Recurse: compute each part's availability first, then combine them according to the kind.
--- hint
Start both products at 1. For serial, multiply the availabilities; for parallel, multiply the unavailabilities and subtract the result from 1. The empty cases then come out right on their own.
--- check case | Two replicas in parallel
availability(("parallel", [__import__("fractions").Fraction(99, 100), __import__("fractions").Fraction(99, 100)]))
=> __import__("fractions").Fraction(9999, 10000)
--- check case | Three dependencies in series cost a nine
availability(("serial", [__import__("fractions").Fraction(999, 1000), __import__("fractions").Fraction(999, 1000), __import__("fractions").Fraction(9999, 10000)]))
=> __import__("fractions").Fraction(9979011999, 10000000000)
--- check case | A nested tree
availability(("serial", [__import__("fractions").Fraction(9999, 10000), ("parallel", [__import__("fractions").Fraction(99, 100), __import__("fractions").Fraction(99, 100)]), ("parallel", [__import__("fractions").Fraction(999, 1000)])]))
=> __import__("fractions").Fraction(99880020999, 100000000000)
--- check case | Empty nodes, and plain numbers
(availability(("serial", [])), availability(("parallel", [])), availability(1), availability(("parallel", [0, 1])))
=> (__import__("fractions").Fraction(1), __import__("fractions").Fraction(0), __import__("fractions").Fraction(1), __import__("fractions").Fraction(1))

+++ practice | The critical path of a trace
--- task
A trace is a list of spans \`(span_id, parent_id, name, start, end)\`; exactly one span (the root) has \`parent_id\` \`None\`, and every other span's parent is in the list.

Write \`critical_path(spans)\` that returns the names on the critical path, in this order: a span's name, then the critical paths of its chosen children in time order. Choose a span's children backwards from its end: start a cursor at the span's \`end\`; repeatedly pick, among its children not yet chosen whose \`end\` is at most the cursor, the one with the latest \`end\` (ties: the later \`start\`, then the larger name), and move the cursor to that child's \`start\`; stop when no child qualifies. Return \`[]\` for an empty trace.

For example, for a request \`GET /feed\` (0 to 120) with children \`auth\` (2 to 10), \`fetch posts\` (10 to 90), \`ads\` (10 to 60, in parallel with \`fetch posts\`) and \`render\` (90 to 118), the root's chosen children are \`render\`, then \`fetch posts\`, then \`auth\`; \`ads\` is not on the path.
--- starter
def critical_path(spans):
    return [name for sid, parent, name, start, end in sorted(spans, key=lambda s: s[3])]
--- solution
def critical_path(spans):
    kids = {}
    root = None
    for sid, parent, name, start, end in spans:
        if parent is None:
            root = (sid, name, start, end)
        else:
            kids.setdefault(parent, []).append((sid, name, start, end))

    def walk(span):
        sid, name, start, end = span
        chosen = []
        cursor = end
        while True:
            ready = [k for k in kids.get(sid, []) if k[3] <= cursor and k not in chosen]
            if not ready:
                break
            pick = max(ready, key=lambda k: (k[3], k[2], k[1]))
            chosen.append(pick)
            cursor = pick[2]
        path = [name]
        for k in reversed(chosen):
            path += walk(k)
        return path

    return walk(root) if root else []
--- hint
Build a dict from each span id to its children. Then write a recursive function for one span.
--- hint
Inside it, walk backwards with a cursor starting at the span's end, picking the child with the latest end at or before the cursor and moving the cursor to that child's start. The children were chosen latest first, so reverse them before descending into each.
--- check case | The example from the task, with one more level
critical_path([("a", None, "GET /feed", 0, 120), ("b", "a", "auth", 2, 10), ("c", "a", "fetch posts", 10, 90), ("d", "c", "db query", 12, 85), ("e", "a", "render", 90, 118), ("f", "c", "cache get", 11, 12), ("g", "a", "ads", 10, 60), ("h", "c", "spell check", 12, 40)])
=> ["GET /feed", "auth", "fetch posts", "cache get", "db query", "render"]
--- check case | Overlapping children: only the chain that ends the parent counts
critical_path([("r", None, "batch", 0, 100), ("x", "r", "a", 0, 50), ("y", "r", "b", 0, 70), ("z", "r", "c", 60, 95)])
=> ["batch", "a", "c"]
--- check case | A single span, and no spans
(critical_path([("r", None, "only", 0, 5)]), critical_path([]))
=> (["only"], [])
--- check case | Spans given in any order
critical_path([("z", "r", "c", 60, 95), ("r", None, "batch", 0, 100), ("x", "r", "a", 0, 50)])
=> ["batch", "a", "c"]
=== cloud-11 | Infrastructure as code and disaster recovery: plan, apply, drift and failover
--- teach
Lesson 2's controllers kept tasks matching a spec. But the cluster itself — networks, machines, disks, load balancers, DNS names, whole regions — also has to come from somewhere. If people create it by clicking in a console, nobody can say exactly what exists, rebuild it after a disaster, or review a change before it happens. **Infrastructure as code** applies the reconcile idea to everything: describe the infrastructure in files, keep them in version control, and let a tool compute and apply the difference. This last lesson builds that tool's core, the **plan**, and then uses the simulator for the reason it matters most: recovering when a whole region is gone.

### Declarative resources

Each piece of infrastructure is a **resource** with a type, some properties and the resources it depends on:

\`\`\`python fragment
config = {
    "vpc":   {"type": "network", "props": {"cidr": "10.2.0.0/16", "region": "west"}, "deps": []},
    "queue": {"type": "vm", "props": {"image": "mq-3", "zone": "west-1", "size": "medium"}, "deps": ["vpc"]},
}
\`\`\`

The tool also keeps a **[[state|state]]** file: what it created last time, in the same shape. A change is made by editing the configuration and running two steps:

1. **plan**: diff the configuration against the state and list the actions, without touching anything;
2. **apply**: carry the plan out, then record the new state.

The plan is the review step. "1 to create, 1 to update, **1 to replace**" in a pull request has stopped many outages before they happened.

### Four kinds of action

For each resource name:

- in the configuration but not the state: **create**;
- in the state but not the configuration: **delete**;
- in both, with different properties: **update** in place, if the provider can change those properties on a live resource;
- in both, but with a different type or a changed **immutable** property: **replace**, meaning destroy and recreate. You cannot change a disk's size class or a machine's base image in place on many platforms; the only way is a new one.

Replace is the dangerous one. An update to a VM's size might restart it; a replace gives you a new VM, with a new address and an empty disk unless something else holds the data. Good plans make replaces loud.

### Dependency order

Resources refer to each other: a VM lives in a network; a load balancer points at VMs; a DNS name points at the load balancer. So the plan must be ordered. Treat "B depends on A" as an edge from A to B; then:

- creates and updates go in **topological order**: every resource after the ones it depends on (DSA II);
- deletes go in **reverse** topological order of the old state: a resource goes only after everything that depended on it, so the network is deleted last.

To make a plan reproducible, break ties the same way every time, for example by name: [[Kahn's algorithm|topo]] with a min-heap of the resources whose dependencies are all placed. A **cycle** (A needs B, B needs A) has no valid order and is an error to report, not to guess around.

### Drift

Someone fixes an incident at 3 a.m. by resizing a VM in the console. Now the real world differs from the state, and the next apply will quietly undo the fix, or fail. That difference is **drift**. Tools detect it by reading the real resources and comparing them with the state: resources that are **missing**, **changed**, or **unmanaged** (exist but are not in the state at all). The cure is cultural as much as technical: changes go through code, and drift is reported, then either imported into the code or reverted.

### Zones, regions and disaster recovery

Lesson 3 spread replicas across **zones**, which fail independently but sit in one region. A **region** is a separate geographic area with its own set of zones, hundreds of kilometres away. Some events take out a whole region: a large power or network failure, a bad configuration pushed to the region's control plane, a natural disaster. Surviving them is **disaster recovery** (DR), and it is measured with two numbers:

- **RPO** (recovery point objective): how much recent data you can afford to lose, measured in time. With [[asynchronous replication|storage]] that is behind by 3 seconds, the RPO cannot be better than about 3 seconds of writes.
- **RTO** (recovery time objective): how long the service may be down before it works again in another region: detecting the failure, deciding, promoting the standby, moving traffic.

The strategies trade cost against those two numbers, from **backup and restore** (cheap; RPO of hours, RTO of hours), through **pilot light** (data replicated, minimal servers ready to scale up) and **warm standby** (a smaller full copy running), to **active-active** (every region serving, RPO and RTO near zero, at least double the cost). [[Cost is a design input|cost]]: the right answer is the cheapest one that meets the objectives the business actually needs.

There is a capacity rule too. With load spread over Z zones (or regions) and the need to survive losing one, each must be able to carry 1/(Z − 1) of the load, not 1/Z, so the fleet needs Z/(Z − 1) times the capacity: 1.5× for three zones, 2× for two. And a plan never tested is a hope: teams run regular **failover drills**, on purpose, to measure the real RPO and RTO. You will run one on the simulator in the last practice problem.

### Where it is used

- Terraform, OpenTofu, Pulumi and cloud-native template tools all work as plan and apply over a dependency graph, with state and drift detection.
- Cluster managers apply the same pattern continuously (lesson 2), so many teams use infrastructure as code for the platform and controllers for the workloads on it.
- Large services run their DR as code too: the standby region is built from the same configuration, so it really matches the primary.

**Watch out:**

- **Applying without reading the plan.** A rename can look harmless and be a replace that destroys data.
- **Deleting in creation order.** The network cannot go while VMs are still in it. Delete in reverse.
- **Hand edits.** Every console change is drift that the next apply will fight. Put it in code or revert it.

::: context state Why the tool keeps state
Without state, the tool could only compare the configuration with the real world, and it could not tell "a VM I created and you removed from the file" (delete it) from "a VM someone else created" (leave it alone). State records ownership: what this configuration manages. It also maps names in the code to real identifiers, which providers assign at creation time. Because state is so important, teams store it remotely, with locking so that two people cannot apply at once.
:::

::: context topo Kahn's algorithm, briefly
Count each resource's unplaced dependencies. Every resource with a count of 0 is ready; put them in a min-heap so the smallest name comes out first. Repeatedly take one out, append it to the order, and decrease the count of every resource that depends on it, pushing any that reach 0. If the order ends up shorter than the number of resources, the rest form at least one cycle. With a heap, it takes O((V + E) log V) time for V resources and E dependencies.
:::

::: context storage Keeping data through a disaster
Data survives failures by being stored more than once. Plain **replication** keeps 3 full copies, so it costs 3× the space and survives losing any 2. **Erasure coding** splits data into k pieces and adds m parity pieces, so any k of the k + m pieces rebuild it: a 10 + 4 code costs 1.4× the space and survives losing any 4 pieces. Object stores use erasure coding across zones for durability at low cost, and replicate to other regions for disaster recovery. Durability is quoted in nines too: losing one object in 10^11 per year is "eleven nines".
:::

::: context cost Cost as a design input
An active-active deployment across two regions roughly doubles the cost of the serving fleet and adds the cost of cross-region data transfer, which providers charge for. For a service whose downtime costs little, that is money badly spent; for a payment system, it may be cheap insurance. Framing DR as "which RPO and RTO does each part of the business need?" lets different parts of one system pick different strategies.
:::
--- task
Build the core of an infrastructure-as-code tool. A resource is a dict \`{"type": t, "props": {...}, "deps": [names]}\`; a configuration or a state is a dict from resource name to resource. \`IMMUTABLE\` (in the starter) maps each type to the set of properties that cannot change in place.

**\`topo_order(resources)\`** returns all the names in dependency order: every resource after all the resources in its \`deps\`. Among the resources that are ready at the same time, the smallest name comes first (Kahn's algorithm with a min-heap, \`heapq\`). Raise \`ValueError\` if a dependency names a resource that does not exist, or if there is a cycle.

**\`plan(desired, state)\`** returns the list of actions, each \`(kind, name)\`:

1. go through \`topo_order(desired)\`; for each name: \`"create"\` if it is not in \`state\`; \`"replace"\` if its type differs from the state's, or if any property whose value differs (compare the union of both sets of property names, a missing property counting as \`None\`) is in \`IMMUTABLE\` for its type; \`"update"\` if some property differs but none is immutable; nothing if all properties are equal (dependencies are not compared);
2. then, for every name in \`state\` but not in \`desired\`, a \`"delete"\`, in the **reverse** of \`topo_order(state)\`.

For example, if the configuration adds a \`dns\` resource that depends on an existing \`lb\`, and drops a \`vm-old\` that the old \`lb\` depended on, the plan ends \`[..., ("create", "dns"), ("delete", "vm-old")]\`.
--- starter
import heapq

IMMUTABLE = {"network": {"cidr", "region"}, "vm": {"image", "zone"}, "disk": {"size_gb"}, "dns": set(), "lb": set()}


def topo_order(resources):
    return sorted(resources)


def plan(desired, state):
    return [("create", name) for name in desired if name not in state]
--- solution
import heapq

IMMUTABLE = {"network": {"cidr", "region"}, "vm": {"image", "zone"}, "disk": {"size_gb"}, "dns": set(), "lb": set()}


def topo_order(resources):
    waiting = {}
    users = {name: [] for name in resources}
    for name, res in resources.items():
        for dep in res["deps"]:
            if dep not in resources:
                raise ValueError(f"{name} depends on unknown resource {dep}")
            users[dep].append(name)
        waiting[name] = len(set(res["deps"]))
    ready = [name for name in resources if waiting[name] == 0]
    heapq.heapify(ready)
    order = []
    while ready:
        name = heapq.heappop(ready)
        order.append(name)
        for user in users[name]:
            waiting[user] -= 1
            if waiting[user] == 0:
                heapq.heappush(ready, user)
    if len(order) != len(resources):
        raise ValueError("dependency cycle")
    return order


def plan(desired, state):
    actions = []
    for name in topo_order(desired):
        want = desired[name]
        if name not in state:
            actions.append(("create", name))
            continue
        have = state[name]
        if have["type"] != want["type"]:
            actions.append(("replace", name))
            continue
        keys = set(want["props"]) | set(have["props"])
        changed = [k for k in keys if want["props"].get(k) != have["props"].get(k)]
        if not changed:
            continue
        if any(k in IMMUTABLE.get(want["type"], set()) for k in changed):
            actions.append(("replace", name))
        else:
            actions.append(("update", name))
    for name in reversed(topo_order(state)):
        if name not in desired:
            actions.append(("delete", name))
    return actions
--- hint
For \`topo_order\`, count each resource's dependencies and keep, for each resource, the list of resources that depend on it. Start a heap with the zero-count names; each name popped lowers the counts of its users.
--- hint
If the finished order is shorter than the number of resources, some never reached zero: they are in a cycle. Check unknown dependencies first, while building the counts.
--- hint
In \`plan\`, compare properties with \`want["props"].get(k) != have["props"].get(k)\` over the union of keys, so an added or removed property counts as a change. The deletes come from walking \`reversed(topo_order(state))\` and keeping the names missing from \`desired\`.
--- check case | Dependency order, ties by name
topo_order({"net": {"type": "network", "props": {}, "deps": []}, "disk-a": {"type": "disk", "props": {}, "deps": ["net"]}, "vm-a": {"type": "vm", "props": {}, "deps": ["net", "disk-a"]}, "vm-b": {"type": "vm", "props": {}, "deps": ["net"]}, "lb": {"type": "lb", "props": {}, "deps": ["vm-a", "vm-b"]}, "dns": {"type": "dns", "props": {}, "deps": ["lb"]}})
=> ["net", "disk-a", "vm-a", "vm-b", "lb", "dns"]
--- check case | Independent resources come out by name
topo_order({"b": {"type": "dns", "props": {}, "deps": []}, "c": {"type": "dns", "props": {}, "deps": []}, "a": {"type": "dns", "props": {}, "deps": ["c"]}})
=> ["b", "c", "a"]
--- check test | A cycle and an unknown dependency are errors
raises(ValueError, lambda: topo_order({"a": {"type": "vm", "props": {}, "deps": ["b"]}, "b": {"type": "vm", "props": {}, "deps": ["a"]}})) and raises(ValueError, lambda: topo_order({"a": {"type": "vm", "props": {}, "deps": ["ghost"]}}))
--- check case | A full plan: replace, update, create, and deletes in reverse order
(R := lambda t, deps=(), **p: {"type": t, "props": p, "deps": list(deps)}, plan({"net": R("network", cidr="10.0.0.0/16", region="east"), "disk-a": R("disk", ["net"], size_gb=100), "vm-a": R("vm", ["net", "disk-a"], image="v2", zone="east-1", size="large"), "vm-b": R("vm", ["net"], image="v1", zone="east-2", size="small"), "lb": R("lb", ["vm-a", "vm-b"], port=443), "dns": R("dns", ["lb"], name="shop.example.com")}, {"net": R("network", cidr="10.0.0.0/16", region="east"), "disk-a": R("disk", ["net"], size_gb=50), "vm-a": R("vm", ["net", "disk-a"], image="v2", zone="east-1", size="small"), "vm-b": R("vm", ["net"], image="v1", zone="east-2", size="small"), "vm-old": R("vm", ["net"], image="v0", zone="east-1", size="small"), "lb": R("lb", ["vm-a", "vm-b", "vm-old"], port=80), "metrics": R("vm", ["net"], image="m1", zone="east-1"), "alerts": R("dns", ["metrics"], name="alerts.example.com")}))[-1]
=> [("replace", "disk-a"), ("update", "vm-a"), ("update", "lb"), ("create", "dns"), ("delete", "vm-old"), ("delete", "alerts"), ("delete", "metrics")]
--- check case | Applying a plan to itself does nothing
(R := lambda t, deps=(), **p: {"type": t, "props": p, "deps": list(deps)}, c := {"net": R("network", cidr="10.1.0.0/16"), "vm": R("vm", ["net"], image="v3", zone="z1")}, plan(c, c), plan({}, {}))[-2:]
=> ([], [])
--- check case | A changed type or an added immutable property forces a replace
(R := lambda t, deps=(), **p: {"type": t, "props": p, "deps": list(deps)}, plan({"x": R("lb", port=80), "y": R("vm", image="v1", zone="z2")}, {"x": R("dns", port=80), "y": R("vm", image="v1")}))[-1]
=> [("replace", "x"), ("replace", "y")]
--- check case | Removing a mutable property is an update
(R := lambda t, deps=(), **p: {"type": t, "props": p, "deps": list(deps)}, plan({"vm": R("vm", image="v1")}, {"vm": R("vm", image="v1", size="big")}))[-1]
=> [("update", "vm")]
--- check case | Tearing everything down deletes dependents first
(R := lambda t, deps=(), **p: {"type": t, "props": p, "deps": list(deps)}, plan({}, {"net": R("network"), "vm-1": R("vm", ["net"]), "vm-2": R("vm", ["net"]), "lb": R("lb", ["vm-1", "vm-2"])}))[-1]
=> [("delete", "lb"), ("delete", "vm-2"), ("delete", "vm-1"), ("delete", "net")]

+++ question | The surprising replace
--- ask
A plan for a one-line change says: "1 to replace: db-disk". The change renamed nothing; it raised the disk's size class, which the provider cannot change in place. What should happen next?
--- choice
Apply it: replacing is the same as updating.
--- choice correct
Stop and look: a replace destroys the old disk and creates a new, empty one, so the data must be moved or the change done another way.
--- choice
Run plan again until it says update.
--- choice
Delete the state file so the tool forgets the disk.
--- why
Replace means destroy and recreate. For stateless resources that may be fine; for anything holding data it is a data-loss event unless handled. Making replaces visible before apply is the main point of a plan.

+++ question | RPO and RTO
--- ask
A database replicates asynchronously to another region, typically 5 seconds behind. When the primary region fails, it takes 2 minutes to detect the failure and 8 minutes to promote the standby and move traffic. What are the RPO and RTO you can actually achieve?
--- choice
RPO 10 minutes, RTO 5 seconds.
--- choice correct
RPO about 5 seconds of writes, RTO about 10 minutes.
--- choice
RPO 0, RTO 0, because there is a standby.
--- choice
RPO 2 minutes, RTO 8 minutes.
--- why
Writes that had not reached the standby when the primary died are lost: about the replication lag, 5 seconds. The service is down from the failure until the standby serves: detection plus promotion, about 10 minutes.

+++ question | Capacity to survive a zone
--- ask
A service needs 600 cores at peak and runs in 3 zones. To keep serving the full peak after losing any one zone, how many cores must each zone have?
--- answer
300
--- why
After losing one zone, the other 2 must carry all 600 cores of load: 300 each. So the fleet needs 900 cores, 1.5 times the peak, which is Z/(Z − 1) for Z = 3 zones.

+++ practice | Detecting drift
--- task
Write \`drift(state, real)\`. Both map a resource name to its properties (a dict). Return a list, ordered by name, with one entry for each resource that does not match:

- \`(name, "missing")\` if it is in \`state\` but not in \`real\`;
- \`(name, "unmanaged")\` if it is in \`real\` but not in \`state\`;
- \`(name, "changed", keys)\` if it is in both with different properties, where \`keys\` is the sorted list of property names whose values differ (a property missing on one side counts as different).

Matching resources produce nothing.

For example, if the state says \`vm-a\` is \`{"size": "large"}\` and the real one is \`{"size": "xlarge"}\`, the entry is \`("vm-a", "changed", ["size"])\`.
--- starter
def drift(state, real):
    return [(name, "missing") for name in sorted(state) if name not in real]
--- solution
def drift(state, real):
    out = []
    for name in sorted(set(state) | set(real)):
        if name not in real:
            out.append((name, "missing"))
        elif name not in state:
            out.append((name, "unmanaged"))
        elif state[name] != real[name]:
            keys = sorted(k for k in set(state[name]) | set(real[name]) if state[name].get(k) != real[name].get(k))
            out.append((name, "changed", keys))
    return out
--- hint
Walk every name in either dict, sorted. Three cases need an entry; a resource in both with equal properties needs none.
--- hint
For changed resources, compare over the union of property names with \`.get\`, so an added or removed property shows up.
--- check case | All three kinds
drift({"vm-a": {"size": "large", "image": "v2"}, "net": {"cidr": "10.0.0.0/16"}, "vm-b": {"size": "small"}}, {"vm-a": {"size": "xlarge", "image": "v2", "tag": "x"}, "net": {"cidr": "10.0.0.0/16"}, "debug-box": {"size": "tiny"}})
=> [("debug-box", "unmanaged"), ("vm-a", "changed", ["size", "tag"]), ("vm-b", "missing")]
--- check case | No drift
drift({"a": {"x": 1}}, {"a": {"x": 1}})
=> []
--- check case | Empty on either side
(drift({}, {"z": {}}), drift({"z": {}}, {}), drift({}, {}))
=> ([("z", "unmanaged")], [("z", "missing")], [])
--- check case | A removed property is a change
drift({"lb": {"port": 443, "tls": True}}, {"lb": {"port": 443}})
=> [("lb", "changed", ["tls"])]

+++ practice | Applying in parallel waves
--- task
An apply can create independent resources at the same time. Group the resources into **waves**: wave 0 holds those with no dependencies; a resource's wave is one more than the highest wave among its dependencies. Everything in a wave can be created in parallel, once the earlier waves are done, so the number of waves is the length of the longest dependency chain.

Write \`waves(deps)\`, where \`deps\` maps every resource name to the list of names it depends on. Return the list of waves, each a sorted list of names. Raise \`ValueError\` if there is a cycle.

For example, \`waves({"net": [], "vm": ["net"], "bucket": []})\` is \`[["bucket", "net"], ["vm"]]\`.
--- starter
def waves(deps):
    return [sorted(deps)] if deps else []
--- solution
def waves(deps):
    level = {}

    def depth(name, path):
        if name in level:
            return level[name]
        if name in path:
            raise ValueError("dependency cycle")
        parents = deps[name]
        level[name] = 0 if not parents else 1 + max(depth(p, path | {name}) for p in parents)
        return level[name]

    for name in deps:
        depth(name, frozenset())
    out = []
    for name in sorted(deps):
        while len(out) <= level[name]:
            out.append([])
        out[level[name]].append(name)
    return out
--- hint
A resource's wave depends only on its dependencies' waves, so compute it recursively and remember each answer.
--- hint
To catch a cycle, pass along the set of names on the current path of the recursion; meeting one of them again means a cycle.
--- check case | The example from the task
waves({"net": [], "vm": ["net"], "bucket": []})
=> [["bucket", "net"], ["vm"]]
--- check case | A deeper graph
waves({"net": [], "disk": ["net"], "vm-a": ["net", "disk"], "vm-b": ["net"], "lb": ["vm-a", "vm-b"], "dns": ["lb"], "bucket": []})
=> [["bucket", "net"], ["disk", "vm-b"], ["vm-a"], ["lb"], ["dns"]]
--- check case | Nothing, and nothing depending on anything
(waves({}), waves({"a": [], "b": []}))
=> ([], [["a", "b"]])
--- check test | A cycle is an error
raises(ValueError, lambda: waves({"a": ["b"], "b": ["c"], "c": ["a"]}))

+++ practice | Debug: the teardown that deletes the network first
--- task
\`teardown(state)\` should return the order in which to delete every resource of a state (a dict from name to a list of the names it depends on), so that no resource is deleted while something that depends on it still exists: the reverse of a dependency order. The dependency order places a resource after its dependencies, choosing the smallest name among the ready ones.

It tries to delete the network while VMs are still in it, and the cloud API refuses. Find the bug and fix it.
--- starter
import heapq


def creation_order(state):
    waiting = {n: len(d) for n, d in state.items()}
    users = {n: [] for n in state}
    for n, d in state.items():
        for dep in d:
            users[dep].append(n)
    ready = [n for n in state if waiting[n] == 0]
    heapq.heapify(ready)
    order = []
    while ready:
        n = heapq.heappop(ready)
        order.append(n)
        for u in users[n]:
            waiting[u] -= 1
            if waiting[u] == 0:
                heapq.heappush(ready, u)
    return order


def teardown(state):
    return creation_order(state)
--- solution
import heapq


def creation_order(state):
    waiting = {n: len(d) for n, d in state.items()}
    users = {n: [] for n in state}
    for n, d in state.items():
        for dep in d:
            users[dep].append(n)
    ready = [n for n in state if waiting[n] == 0]
    heapq.heapify(ready)
    order = []
    while ready:
        n = heapq.heappop(ready)
        order.append(n)
        for u in users[n]:
            waiting[u] -= 1
            if waiting[u] == 0:
                heapq.heappush(ready, u)
    return order


def teardown(state):
    return list(reversed(creation_order(state)))
--- hint
The creation order puts the network first, because everything needs it. Is that also the right order to remove things?
--- hint
Deleting is creating backwards: reverse the creation order.
--- check case | VMs go before their network, the load balancer before its VMs
teardown({"net": [], "vm-1": ["net"], "vm-2": ["net"], "lb": ["vm-1", "vm-2"]})
=> ["lb", "vm-2", "vm-1", "net"]
--- check test | No resource is deleted before something that depends on it
(lambda st: (lambda order: all(order.index(n) < order.index(d) for n, ds in st.items() for d in ds))(teardown(st)))({"net": [], "subnet": ["net"], "disk": ["subnet"], "vm": ["subnet", "disk"], "dns": ["vm"], "bucket": []})
--- check case | Nothing to tear down
teardown({})
=> []

+++ practice | Resolving references between resources
--- task
Real configurations refer to values that only exist after another resource is created, like a network's id. A property can hold references written \`\${name.attribute}\` inside a string, and \`outputs\` maps each created resource's name to a dict of its attributes.

Write \`resolve(props, outputs)\` that returns a new dict with every reference in every **string** property replaced by \`str()\` of the referenced value. A string may contain several references, mixed with other text. Non-string values are copied unchanged. If a reference names a resource or attribute not in \`outputs\`, raise \`KeyError\`. Names and attributes are made of letters, digits, \`_\` and \`-\`; you may use the regular expression \`\\$\\{([\\w-]+)\\.([\\w-]+)\\}\` with \`re.sub\` and a function.

For example, with \`outputs = {"vm-a": {"ip": "10.0.1.5"}}\`, the property \`"http://\${vm-a.ip}:8080/"\` becomes \`"http://10.0.1.5:8080/"\`.
--- starter
import re


def resolve(props, outputs):
    return dict(props)
--- solution
import re

REF = re.compile(r"\\$\\{([\\w-]+)\\.([\\w-]+)\\}")


def resolve(props, outputs):
    def value(match):
        name, attr = match.group(1), match.group(2)
        if name not in outputs or attr not in outputs[name]:
            raise KeyError(f"{name}.{attr}")
        return str(outputs[name][attr])

    out = {}
    for key, v in props.items():
        out[key] = REF.sub(value, v) if isinstance(v, str) else v
    return out
--- hint
\`re.sub(pattern, function, text)\` calls the function with each match and puts its return value in place of the match.
--- hint
In that function, look up \`outputs[name][attr]\`, raising \`KeyError\` if either is missing, and return it as a string. Only apply it to values that are strings.
--- check case | Several references, mixed with text, and a number left alone
resolve({"network": "\${net.id}", "count": 3, "url": "http://\${vm-a.ip}:8080/", "both": "\${net.id}/\${vm-a.id}"}, {"net": {"id": "net-123"}, "vm-a": {"ip": "10.0.1.5", "id": "i-9"}})
=> {"network": "net-123", "count": 3, "url": "http://10.0.1.5:8080/", "both": "net-123/i-9"}
--- check test | An unknown attribute or resource raises KeyError
raises(KeyError, lambda: resolve({"x": "\${net.missing}"}, {"net": {"id": "n"}})) and raises(KeyError, lambda: resolve({"x": "\${ghost.id}"}, {}))
--- check case | No references, no properties
(resolve({}, {}), resolve({"plain": "no refs here", "n": None}, {}))
=> ({}, {"plain": "no refs here", "n": None})
--- check case | Values become strings when substituted
resolve({"port": "\${lb.port}"}, {"lb": {"port": 443}})
=> {"port": "443"}

+++ practice | Choosing a disaster-recovery strategy
--- task
Each DR strategy is a tuple \`(name, rpo_minutes, rto_minutes, monthly_cost)\`. Write \`cheapest(strategies, rpo, rto)\` that returns the name of the cheapest strategy whose RPO is at most \`rpo\` and whose RTO is at most \`rto\`. On a tie in cost, return the name that sorts first. Return \`None\` if no strategy meets both objectives.

For example, with \`[("backup-restore", 1440, 480, 100), ("pilot-light", 15, 60, 400), ("warm-standby", 1, 15, 1200), ("active-active", 0, 1, 2500)]\`, objectives of 60 minutes RPO and 120 minutes RTO give \`"pilot-light"\`.
--- starter
def cheapest(strategies, rpo, rto):
    return min(strategies, key=lambda s: s[3])[0] if strategies else None
--- solution
def cheapest(strategies, rpo, rto):
    good = [s for s in strategies if s[1] <= rpo and s[2] <= rto]
    if not good:
        return None
    return min(good, key=lambda s: (s[3], s[0]))[0]
--- hint
Filter first: keep only the strategies that meet both objectives. Then pick the cheapest of those.
--- hint
\`min\` with the key \`(cost, name)\` breaks ties by name. An empty filtered list means \`None\`.
--- check case | The example from the task
cheapest([("backup-restore", 1440, 480, 100), ("pilot-light", 15, 60, 400), ("warm-standby", 1, 15, 1200), ("active-active", 0, 1, 2500)], 60, 120)
=> "pilot-light"
--- check case | Loose objectives allow the cheapest
cheapest([("backup-restore", 1440, 480, 100), ("pilot-light", 15, 60, 400), ("warm-standby", 1, 15, 1200), ("active-active", 0, 1, 2500)], 1440, 1440)
=> "backup-restore"
--- check case | Tight objectives cost more
(cheapest([("backup-restore", 1440, 480, 100), ("pilot-light", 15, 60, 400), ("warm-standby", 1, 15, 1200), ("active-active", 0, 1, 2500)], 5, 30), cheapest([("backup-restore", 1440, 480, 100), ("pilot-light", 15, 60, 400), ("warm-standby", 1, 15, 1200), ("active-active", 0, 1, 2500)], 0, 1))
=> ("warm-standby", "active-active")
--- check case | Impossible objectives, and no strategies
(cheapest([("active-active", 0, 1, 2500)], 0, 0), cheapest([], 10, 10))
=> (None, None)
--- check case | Equal cost: the name that sorts first
cheapest([("zeta", 5, 5, 300), ("alpha", 5, 5, 300)], 10, 10)
=> "alpha"

+++ practice | A regional failover drill
--- task
Run a failover drill on the simulator and measure the real RPO and RTO. The starter has the simulator. Write \`failover_drill(writes_per_tick, lag, fail_at, detect, promote, ticks)\`:

1. Build a \`Cluster\` (seed 0) of machines \`e1\`, \`e2\` in zone \`"east"\` and \`w1\`, \`w2\` in zone \`"west"\`, each with 8 cores and 16 GiB. Place the primary database \`db-0\` on \`e1\` and the standby \`db-1\` on \`w1\`, each reserving 4 cores and 8 GiB.
2. Schedule, at tick \`fail_at\`, an action that fails \`e1\` and \`e2\` (the east region goes dark).
3. Add a failover controller loop. It remembers which task is the primary (first \`db-0\`), how many ticks in a row the primary has been missing, and when a promotion will finish. Each run: if the primary is running, reset the missing count and stop. Otherwise add 1 to the count; when the count **equals** \`detect\`, a promotion starts and will be ready at \`now + promote\`; if a promotion is ready (\`now\` at least its ready tick), \`db-1\` becomes the primary.
4. Run \`ticks\` ticks. After each \`cluster.tick()\`, if the primary is running, it accepts \`writes_per_tick\` writes, each recorded with the tick and the primary's name; otherwise count one tick of downtime.

A write accepted by \`db-0\` at tick t had reached the standby only if t + \`lag\` < \`fail_at\`; writes accepted by \`db-0\` with t + \`lag\` ≥ \`fail_at\` are lost (if the failure happened within the run). Return \`(lost_writes, downtime_ticks, accepted_writes)\`.

For example, \`failover_drill(100, 3, 10, 2, 5, 30)\` is \`(300, 6, 2400)\`: three ticks of writes were still in flight to the standby, and the service was down from tick 10 until the promotion finished.
--- starter
import math
import random


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1


def failover_drill(writes_per_tick, lag, fail_at, detect, promote, ticks):
    return 0, 0, writes_per_tick * ticks
--- solution
import math
import random


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1


def failover_drill(writes_per_tick, lag, fail_at, detect, promote, ticks):
    cluster = Cluster([Machine("e1", 8, 16, "east"), Machine("e2", 8, 16, "east"), Machine("w1", 8, 16, "west"), Machine("w2", 8, 16, "west")])
    cluster.place("db-0", "e1", 4, 8)
    cluster.place("db-1", "w1", 4, 8)
    cluster.at(fail_at, lambda c: [c.fail(name) for name in ("e1", "e2")])
    state = {"primary": "db-0", "missing": 0, "ready_at": None}

    def controller(c):
        if c.where(state["primary"]) is not None:
            state["missing"] = 0
            return
        state["missing"] += 1
        if state["missing"] == detect:
            state["ready_at"] = c.now + promote
        if state["ready_at"] is not None and c.now >= state["ready_at"]:
            state["primary"] = "db-1"

    cluster.loops.append(controller)
    accepted = []
    downtime = 0
    for t in range(ticks):
        cluster.tick()
        if cluster.where(state["primary"]) is not None:
            accepted += [(t, state["primary"])] * writes_per_tick
        else:
            downtime += 1
    failed = fail_at < ticks
    lost = sum(1 for at, primary in accepted if failed and primary == "db-0" and at + lag >= fail_at)
    return lost, downtime, len(accepted)
--- hint
Keep the controller's memory in a dict the loop function can change: the primary's name, the missing count and the ready tick.
--- hint
Record each accepted write as \`(tick, primary)\`. At the end, a write is lost when it was accepted by \`db-0\` and \`tick + lag >= fail_at\`.
--- hint
With \`detect\` ticks to notice and \`promote\` ticks to switch, the downtime is detect − 1 + promote ticks, because the first missing tick already counts towards detection.
--- check case | The example from the task
failover_drill(100, 3, 10, 2, 5, 30)
=> (300, 6, 2400)
--- check case | Synchronous replication (lag 0) loses nothing, but the downtime stays
failover_drill(100, 0, 10, 2, 5, 30)
=> (0, 6, 2400)
--- check case | No failure within the run
failover_drill(100, 3, 50, 2, 5, 30)
=> (0, 0, 3000)
--- check case | A lag longer than the run so far loses every write, even with instant failover
failover_drill(10, 20, 5, 1, 0, 12)
=> (50, 0, 120)
--- check case | Failure at tick 0: nothing to lose, only downtime
failover_drill(50, 2, 0, 3, 3, 10)
=> (0, 5, 250)
=== cloud-gate | Cloud Infrastructure: mastery gate
--- teach
The gate covers the whole course: the simulated fleet and its control loops, reconciliation, scheduling and spreading, rollouts and canary analysis, load balancing and rendezvous hashing, queueing and capacity planning, autoscaling, overload control, caching, histograms and SLOs, and infrastructure as code with disaster recovery. Most problems combine two or three lessons, and none is a practice problem with new numbers. To prepare, redo the practice problems of the lessons that felt hardest, and make sure you can write Erlang C, a token bucket, an LRU cache and a topological sort from memory.
--- gate
pass 7
questions 8
minutes 120

+++ problem | Spread replicas, then check they survive a zone
--- task
The starter has the course's simulator. Write two functions.

**\`place_replicas(cluster, service, replicas, cpu, mem)\`** places the tasks \`f"{service}-{slot}"\` for slot 0 to \`replicas − 1\`, one at a time, in slot order. Each goes on the machine, among those it fits on, with the smallest tuple: (tasks of this service already in the machine's zone, tasks of this service already on this machine, free CPU left after placing it, free memory left after placing it, machine name). A task of this service is one whose name starts with \`service + "-"\`. Return the list of machine names chosen, with \`None\` for a slot that fits nowhere (that slot is skipped).

**\`zone_safe(cluster, service, minimum)\`** returns \`True\` if, for **every** zone that has at least one machine, losing all the machines of that zone would still leave at least \`minimum\` tasks of the service running elsewhere.

For example, with machines \`a1\` (8 cores, 16 GiB) and \`a2\` (4, 8) in zone \`za\`, \`b1\` (8, 16) in \`zb\` and \`c1\` (4, 8) in \`zc\`, placing 5 replicas of 2 cores and 4 GiB gives \`["a2", "c1", "b1", "a1", "c1"]\`.
--- starter
import math
import random


def poisson(rng, lam):
    # How many requests arrive in one tick, when they come at lam per tick on average.
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def remove(self, task):
        name = self.where(task)
        if name is None:
            return False
        del self.machines[name].tasks[task]
        self.log.append((self.now, "remove", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def recover(self, name):
        self.machines[name].up = True
        self.log.append((self.now, "recover", name, 0))

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def place_replicas(cluster, service, replicas, cpu, mem):
    return []


def zone_safe(cluster, service, minimum):
    return True
--- solution
import math
import random


def poisson(rng, lam):
    # How many requests arrive in one tick, when they come at lam per tick on average.
    k = 0
    while lam > 30:
        k += poisson(rng, 30)
        lam -= 30
    limit = math.exp(-lam)
    p = rng.random()
    while p > limit:
        k += 1
        p *= rng.random()
    return k


class Machine:
    def __init__(self, name, cpu, mem, zone="z1"):
        self.name = name
        self.cpu = cpu
        self.mem = mem
        self.zone = zone
        self.up = True
        self.tasks = {}

    def free(self):
        cpu = self.cpu - sum(c for c, m in self.tasks.values())
        mem = self.mem - sum(m for c, m in self.tasks.values())
        return cpu, mem

    def fits(self, cpu, mem):
        free_cpu, free_mem = self.free()
        return self.up and cpu <= free_cpu and mem <= free_mem


class Cluster:
    def __init__(self, machines, seed=0):
        self.machines = {m.name: m for m in machines}
        self.now = 0
        self.rng = random.Random(seed)
        self.loops = []
        self.pending = []
        self.count = 0
        self.log = []

    def place(self, task, name, cpu, mem):
        if self.where(task) is not None or not self.machines[name].fits(cpu, mem):
            return False
        self.machines[name].tasks[task] = (cpu, mem)
        self.log.append((self.now, "place", task, name))
        return True

    def remove(self, task):
        name = self.where(task)
        if name is None:
            return False
        del self.machines[name].tasks[task]
        self.log.append((self.now, "remove", task, name))
        return True

    def where(self, task):
        for m in self.machines.values():
            if task in m.tasks:
                return m.name
        return None

    def running(self, prefix=""):
        return sorted(t for m in self.machines.values() for t in m.tasks if t.startswith(prefix))

    def fail(self, name):
        m = self.machines[name]
        lost = sorted(m.tasks)
        m.up = False
        m.tasks = {}
        self.log.append((self.now, "fail", name, len(lost)))
        return lost

    def recover(self, name):
        self.machines[name].up = True
        self.log.append((self.now, "recover", name, 0))

    def at(self, t, action):
        self.count += 1
        self.pending.append((t, self.count, action))

    def tick(self):
        due = sorted((p for p in self.pending if p[0] <= self.now), key=lambda p: (p[0], p[1]))
        self.pending = [p for p in self.pending if p[0] > self.now]
        for t, n, action in due:
            action(self)
        for loop in list(self.loops):
            loop(self)
        self.now += 1

    def run(self, ticks):
        for _ in range(ticks):
            self.tick()


def place_replicas(cluster, service, replicas, cpu, mem):
    prefix = service + "-"
    chosen = []
    for slot in range(replicas):
        spots = [m for m in cluster.machines.values() if m.fits(cpu, mem)]
        if not spots:
            chosen.append(None)
            continue

        def key(m):
            in_zone = sum(1 for x in cluster.machines.values() if x.zone == m.zone for t in x.tasks if t.startswith(prefix))
            here = sum(1 for t in m.tasks if t.startswith(prefix))
            free_cpu, free_mem = m.free()
            return (in_zone, here, free_cpu - cpu, free_mem - mem, m.name)

        best = min(spots, key=key)
        cluster.place(f"{service}-{slot}", best.name, cpu, mem)
        chosen.append(best.name)
    return chosen


def zone_safe(cluster, service, minimum):
    prefix = service + "-"
    per_zone = {}
    for m in cluster.machines.values():
        per_zone[m.zone] = per_zone.get(m.zone, 0) + sum(1 for t in m.tasks if t.startswith(prefix))
    total = sum(per_zone.values())
    return all(total - n >= minimum for n in per_zone.values())
--- check case | The example, and what it survives
(c := Cluster([Machine("a1", 8, 16, "za"), Machine("a2", 4, 8, "za"), Machine("b1", 8, 16, "zb"), Machine("c1", 4, 8, "zc")]), place_replicas(c, "api", 5, 2, 4), zone_safe(c, "api", 3), zone_safe(c, "api", 4))[1:]
=> (["a2", "c1", "b1", "a1", "c1"], True, False)
--- check case | A full machine pushes replicas elsewhere
(c := Cluster([Machine("a1", 8, 16, "za"), Machine("a2", 4, 8, "za"), Machine("b1", 8, 16, "zb"), Machine("c1", 4, 8, "zc")]), c.place("batch-0", "c1", 4, 8), place_replicas(c, "api", 4, 2, 4), zone_safe(c, "api", 2), zone_safe(c, "api", 3))[2:]
=> (["a2", "b1", "a1", "b1"], True, False)
--- check case | Big tasks that do not all fit
(c := Cluster([Machine("a1", 8, 16, "za"), Machine("a2", 4, 8, "za"), Machine("b1", 8, 16, "zb"), Machine("c1", 4, 8, "zc")]), place_replicas(c, "big", 3, 6, 4), c.running("big-"), zone_safe(c, "big", 2))[1:]
=> (["a1", "b1", None], ["big-0", "big-1"], False)
--- check case | A service with no tasks survives only a minimum of 0
(c := Cluster([Machine("a1", 8, 16, "za"), Machine("b1", 8, 16, "zb")]), zone_safe(c, "none", 0), zone_safe(c, "none", 1))[1:]
=> (True, False)

+++ problem | Capacity that survives losing a zone
--- task
A service receives \`lam\` requests per second; each server completes \`mu\` per second; requests share one queue across all servers (M/M/c). The servers are split evenly over \`zones\` zones, k per zone, and the service must still keep its \`p\`-percentile queueing wait at or below \`target\` seconds after one whole zone is lost, that is with (zones − 1) × k servers.

Write \`servers_for_zone_loss(lam, mu, p, target, zones)\` that returns the smallest total zones × k (k at least 1) meeting that. Use the M/M/c results: with offered load a = lam/mu and c servers, the probability of waiting C comes from b = 1, then b ← a·b / (i + a·b) for i = 1 … c, and C = c·b / (c − a(1 − b)) (C = 1 if a ≥ c); the wait at percentile p is infinite if lam ≥ c·mu, 0 if C ≤ 1 − p, and ln(C / (1 − p)) / (c·mu − lam) otherwise. \`zones\` is at least 2.

For example, \`servers_for_zone_loss(800, 100, 0.99, 0.01, 3)\` is \`18\`: 6 servers per zone, so 12 remain after a zone is lost, which is the smallest count that meets the target.
--- starter
import math


def servers_for_zone_loss(lam, mu, p, target, zones):
    return math.ceil(lam / mu)
--- solution
import math


def erlang_c(c, a):
    if a >= c:
        return 1.0
    b = 1.0
    for i in range(1, c + 1):
        b = a * b / (i + a * b)
    return c * b / (c - a * (1 - b))


def wait_percentile(lam, mu, c, p):
    if lam >= c * mu:
        return float("inf")
    waits = erlang_c(c, lam / mu)
    if waits <= 1 - p:
        return 0.0
    return math.log(waits / (1 - p)) / (c * mu - lam)


def servers_for_zone_loss(lam, mu, p, target, zones):
    k = 1
    while wait_percentile(lam, mu, (zones - 1) * k, p) > target:
        k += 1
    return zones * k
--- check case | The example from the task
servers_for_zone_loss(800, 100, 0.99, 0.01, 3)
=> 18
--- check case | Two zones need double
servers_for_zone_loss(800, 100, 0.99, 0.01, 2)
=> 24
--- check case | More zones waste less
servers_for_zone_loss(800, 100, 0.99, 0.01, 5)
=> 15
--- check case | A tiny service still needs one server per zone
servers_for_zone_loss(50, 100, 0.99, 0.05, 3)
=> 3
--- check case | A large fleet with a strict percentile
servers_for_zone_loss(9000, 10, 0.999, 0.01, 4)
=> 1260

+++ problem | A release gate on the error budget and the canary
--- task
A deploy system decides whether a release goes ahead. Write \`release_decision(budget_left, base, canary, min_requests, z_limit, freeze_below)\`:

- \`budget_left\` is the unspent fraction of the service's error budget (a \`Fraction\`; it can be negative). If it is below \`freeze_below\`, return \`"freeze"\`: no releases until reliability recovers.
- Otherwise judge the canary. \`base\` and \`canary\` are \`(requests, errors)\` pairs. If either has fewer than \`min_requests\` requests, return \`"wait"\`. Pool the error rates; if the pooled rate is 0 or 1, return \`"promote"\`. Otherwise compute the two-proportion z-score of the canary's rate minus the baseline's, and return \`"rollback"\` if it is above \`z_limit\`, else \`"promote"\`.

For example, \`release_decision(Fraction(1, 2), (1000, 10), (100, 6), 50, 3, Fraction(1, 10))\` is \`"rollback"\`.
--- starter
from fractions import Fraction


def release_decision(budget_left, base, canary, min_requests, z_limit, freeze_below):
    return "promote"
--- solution
import math
from fractions import Fraction


def release_decision(budget_left, base, canary, min_requests, z_limit, freeze_below):
    if budget_left < freeze_below:
        return "freeze"
    base_n, base_err = base
    can_n, can_err = canary
    if base_n < min_requests or can_n < min_requests:
        return "wait"
    pool = (base_err + can_err) / (base_n + can_n)
    if pool == 0 or pool == 1:
        return "promote"
    se = math.sqrt(pool * (1 - pool) * (1 / base_n + 1 / can_n))
    z = (can_err / can_n - base_err / base_n) / se
    return "rollback" if z > z_limit else "promote"
--- check case | The example: a clearly worse canary
release_decision(__import__("fractions").Fraction(1, 2), (1000, 10), (100, 6), 50, 3, __import__("fractions").Fraction(1, 10))
=> "rollback"
--- check case | A spent budget freezes even a perfect canary
release_decision(__import__("fractions").Fraction(1, 20), (1000, 10), (100, 0), 50, 3, __import__("fractions").Fraction(1, 10))
=> "freeze"
--- check case | A canary as good as the baseline is promoted
release_decision(__import__("fractions").Fraction(1, 2), (1000, 10), (100, 1), 50, 3, __import__("fractions").Fraction(1, 10))
=> "promote"
--- check case | Too little baseline traffic: wait
release_decision(__import__("fractions").Fraction(1, 2), (40, 0), (100, 0), 50, 3, 0)
=> "wait"
--- check case | Overspent and exactly empty budgets, with no errors anywhere
(release_decision(__import__("fractions").Fraction(-1, 4), (1000, 0), (1000, 0), 50, 3, 0), release_decision(0, (1000, 0), (1000, 0), 50, 3, 0))
=> ("freeze", "promote")

+++ problem | Cache shards behind rendezvous routing, and a shard failure
--- task
A cache tier has several shards, each an LRU cache holding at most \`capacity\` keys. A router sends each key to the shard with the highest score \`int(hashlib.sha256(f"{key}|{shard}".encode()).hexdigest(), 16)\` among the shards that are alive (ties: the larger name).

Write \`shard_hits(trace, shards, capacity, fail_at, failed)\`. Process the keys of \`trace\` in order. If \`fail_at\` is not \`None\`, then just before request number \`fail_at\` (counting from 0) the shard \`failed\` dies: it stops receiving keys, and its cache is lost. For each request, if the key is in its shard's cache, it is a hit (and becomes most recently used); otherwise it is a miss: add it as most recently used, evicting the least recently used key if the shard now holds more than \`capacity\`.

Return \`(hits, misses)\`, where \`hits\` maps every shard in \`shards\` to its number of hits and \`misses\` is the total number of misses.

For example, \`shard_hits(["a", "b", "a", "a"], ["x"], 1, None, None)\` is \`({"x": 1}, 3)\`.
--- starter
import hashlib
from collections import OrderedDict


def shard_hits(trace, shards, capacity, fail_at, failed):
    return {s: 0 for s in shards}, len(trace)
--- solution
import hashlib
from collections import OrderedDict


def score(key, shard):
    return int(hashlib.sha256(f"{key}|{shard}".encode()).hexdigest(), 16)


def shard_hits(trace, shards, capacity, fail_at, failed):
    caches = {s: OrderedDict() for s in shards}
    hits = {s: 0 for s in shards}
    misses = 0
    alive = list(shards)
    for i, key in enumerate(trace):
        if fail_at is not None and i == fail_at:
            alive.remove(failed)
            caches[failed] = OrderedDict()
        shard = max(alive, key=lambda s: (score(key, s), s))
        cache = caches[shard]
        if key in cache:
            hits[shard] += 1
            cache.move_to_end(key)
        else:
            misses += 1
            cache[key] = True
            if len(cache) > capacity:
                cache.popitem(last=False)
    return hits, misses
--- check case | The example from the task
shard_hits(["a", "b", "a", "a"], ["x"], 1, None, None)
=> ({"x": 1}, 3)
--- check case | Three shards on a skewed trace
(lambda tr: shard_hits(tr, ["s1", "s2", "s3"], 40, None, None))([f"k{x}" for x in (lambda r: r.choices(range(300), weights=[1 / (k + 1) for k in range(300)], k=4000))(__import__("random").Random(4))])
=> ({"s1": 414, "s2": 1142, "s3": 1563}, 881)
--- check case | Losing a shard halfway: its keys move, and the misses rise
(lambda tr: shard_hits(tr, ["s1", "s2", "s3"], 40, 2000, "s2"))([f"k{x}" for x in (lambda r: r.choices(range(300), weights=[1 / (k + 1) for k in range(300)], k=4000))(__import__("random").Random(4))])
=> ({"s1": 722, "s2": 549, "s3": 1667}, 1062)
--- check case | No requests
shard_hits([], ["x", "y"], 5, None, None)
=> ({"x": 0, "y": 0}, 0)

+++ problem | Per-client rate limits in front of a priority shedder
--- task
An API front end applies two controls. \`requests\` is a list of \`(tick, client, priority)\`, sorted by tick; give each request its position in the list as its id. Every client has its own token bucket with \`rate\` tokens per tick and room for \`burst\` (it starts full when the client first appears, at that tick). Then the server can serve at most \`per_tick\` requests per tick.

For each tick, in order:

1. go through that tick's requests in id order; refill the client's bucket for the time since its last update (capped at \`burst\`); if it holds at least 1 token, take one and the request passes, otherwise it is **limited**;
2. sort the requests that passed by priority (lower number first), then id; serve the first \`per_tick\`; the rest are **shed**.

Write \`admit(requests, rate, burst, per_tick)\` that returns \`(counts, served_ids)\`, where \`counts\` is \`{"limited": n, "shed": n, "served": n}\` and \`served_ids\` lists the served ids, in increasing order within each tick and tick by tick. Keep tokens exact (\`rate\` may be a \`Fraction\`).

For example, with \`rate = Fraction(1, 2)\`, \`burst = 2\` and \`per_tick = 2\`, the requests \`[(0, "a", 1), (0, "a", 1), (0, "a", 0), (0, "b", 2), (0, "c", 0), (1, "a", 0), (1, "b", 1), (3, "a", 2)]\` give \`({"limited": 2, "shed": 2, "served": 4}, [0, 4, 6, 7])\`.
--- starter
from fractions import Fraction


def admit(requests, rate, burst, per_tick):
    return {"limited": 0, "shed": 0, "served": len(requests)}, list(range(len(requests)))
--- solution
from fractions import Fraction


def admit(requests, rate, burst, per_tick):
    buckets = {}
    counts = {"limited": 0, "shed": 0, "served": 0}
    by_tick = {}
    for i, (t, client, priority) in enumerate(requests):
        by_tick.setdefault(t, []).append((i, client, priority))
    served = []
    for t in sorted(by_tick):
        passed = []
        for i, client, priority in by_tick[t]:
            tokens, last = buckets.get(client, (Fraction(burst), t))
            tokens = min(Fraction(burst), tokens + (t - last) * Fraction(rate))
            if tokens >= 1:
                buckets[client] = (tokens - 1, t)
                passed.append((priority, i))
            else:
                buckets[client] = (tokens, t)
                counts["limited"] += 1
        passed.sort()
        counts["served"] += min(per_tick, len(passed))
        counts["shed"] += max(0, len(passed) - per_tick)
        served += sorted(i for _, i in passed[:per_tick])
    return counts, served
--- check case | The example from the task
admit([(0, "a", 1), (0, "a", 1), (0, "a", 0), (0, "b", 2), (0, "c", 0), (1, "a", 0), (1, "b", 1), (3, "a", 2)], __import__("fractions").Fraction(1, 2), 2, 2)
=> ({"limited": 2, "shed": 2, "served": 4}, [0, 4, 6, 7])
--- check case | Generous limits and capacity serve everything
admit([(0, "a", 1), (0, "a", 1), (0, "a", 0), (0, "b", 2), (0, "c", 0), (1, "a", 0), (1, "b", 1), (3, "a", 2)], 1, 5, 10)
=> ({"limited": 0, "shed": 0, "served": 8}, [0, 1, 2, 3, 4, 5, 6, 7])
--- check case | No requests
admit([], 1, 1, 1)
=> ({"limited": 0, "shed": 0, "served": 0}, [])
--- check case | A bucket starts full when its client first appears, not at tick 0
admit([(5, "late", 0), (5, "late", 0), (5, "late", 0)], 1, 2, 9)
=> ({"limited": 1, "shed": 0, "served": 2}, [0, 1])

+++ problem | A percentile from merged bucket counts
--- task
Each replica reports a latency histogram with the same fixed bucket bounds: \`bounds\` is an increasing list of upper bounds in milliseconds, and a replica's list of counts says how many requests fell in each bucket, where bucket i holds latencies above \`bounds[i − 1]\` (above 0 for the first bucket) and at most \`bounds[i]\`.

Write \`histogram_quantile(q, bounds, replicas)\`: merge the replicas by adding their counts bucket by bucket, then estimate the q-quantile by linear interpolation. Let total be the merged count and rank = q × total. Walk the buckets in order with a running count \`seen\`; at the first bucket i with a non-zero count c where seen + c ≥ rank, return lo + (hi − lo) × (rank − seen) / c, where lo is the bucket's lower edge and hi its upper bound. Return \`None\` if there are no requests at all.

For example, with bounds \`[5, 10, 25, 50, 100, 250]\` and replicas \`[10, 30, 40, 15, 4, 1]\` and \`[0, 10, 20, 20, 30, 20]\`, the median is \`22.5\`.
--- starter
def histogram_quantile(q, bounds, replicas):
    medians = []
    for counts in replicas:
        total = sum(counts)
        seen = 0
        for i, c in enumerate(counts):
            seen += c
            if seen >= q * total:
                medians.append(bounds[i])
                break
    return sum(medians) / len(medians) if medians else None
--- solution
def histogram_quantile(q, bounds, replicas):
    counts = [sum(r[i] for r in replicas) for i in range(len(bounds))]
    total = sum(counts)
    if total == 0:
        return None
    rank = q * total
    seen = 0
    for i, c in enumerate(counts):
        if c and seen + c >= rank:
            lo = 0 if i == 0 else bounds[i - 1]
            return lo + (bounds[i] - lo) * (rank - seen) / c
        seen += c
    return bounds[-1]
--- check case | The example from the task
histogram_quantile(0.5, [5, 10, 25, 50, 100, 250], [[10, 30, 40, 15, 4, 1], [0, 10, 20, 20, 30, 20]])
=> 22.5
--- check case | The p99 sits in the top bucket
round(histogram_quantile(0.99, [5, 10, 25, 50, 100, 250], [[10, 30, 40, 15, 4, 1], [0, 10, 20, 20, 30, 20]]), 4)
=> 235.7143
--- check case | No requests
histogram_quantile(0.5, [5, 10, 25, 50, 100, 250], [[0, 0, 0, 0, 0, 0]])
=> None
--- check case | Empty buckets are skipped; the ends of the range
(histogram_quantile(0, [5, 10, 25, 50, 100, 250], [[0, 4, 0, 0, 0, 0]]), histogram_quantile(1, [5, 10, 25, 50, 100, 250], [[1, 0, 0, 0, 0, 1]]))
=> (5.0, 250.0)
--- check case | One replica alone
histogram_quantile(0.25, [10, 20], [[2, 2]])
=> 5.0

+++ problem | An autoscaler for queue workers
--- task
Simulate an autoscaler for workers that drain a queue. It starts with \`start\` workers and an empty backlog. For each tick t:

1. the tick's \`arrivals[t]\` jobs join the backlog;
2. the current workers each finish up to \`per_worker\` jobs from the backlog (never below 0);
3. the recommendation is enough workers to handle this tick's arrivals and clear the remaining backlog within \`drain\` ticks: ⌈(arrivals[t] × drain + backlog) / (per_worker × drain)⌉, clamped between 1 and \`max_workers\`;
4. the worker count for the **next** tick is the largest recommendation among the last \`window\` ticks (this one included);
5. record that worker count.

Write \`queue_scaler(arrivals, per_worker, drain, window, start, max_workers)\` that returns \`(recorded_counts, backlog_at_the_end)\`. Use whole-number arithmetic.

For example, \`queue_scaler([1000, 0, 0, 0, 0, 0], 10, 2, 1, 1, 30)\` is \`([30, 30, 20, 10, 5, 2], 40)\`.
--- starter
def queue_scaler(arrivals, per_worker, drain, window, start, max_workers):
    counts = [max(1, min(max_workers, -(-a // per_worker))) for a in arrivals]
    return counts, 0
--- solution
def queue_scaler(arrivals, per_worker, drain, window, start, max_workers):
    workers = start
    backlog = 0
    recs = []
    counts = []
    for a in arrivals:
        backlog += a
        backlog -= min(backlog, workers * per_worker)
        rec = -(-(a * drain + backlog) // (per_worker * drain))
        rec = max(1, min(max_workers, rec))
        recs.append(rec)
        workers = max(recs[-window:])
        counts.append(workers)
    return counts, backlog
--- check case | The example: a burst drained at the maximum, then scaled down
queue_scaler([1000, 0, 0, 0, 0, 0], 10, 2, 1, 1, 30)
=> ([30, 30, 20, 10, 5, 2], 40)
--- check case | A traffic step with a three-tick window
queue_scaler([100] * 3 + [400] * 5 + [100] * 6, 50, 4, 3, 2, 20)
=> ([2, 2, 2, 10, 10, 10, 9, 9, 8, 8, 2, 2, 2, 2], 0)
--- check case | Idle and empty
(queue_scaler([0, 0, 0], 10, 5, 2, 3, 9), queue_scaler([], 10, 5, 2, 3, 9))
=> (([1, 1, 1], 0), ([], 0))

+++ problem | A plan that understands renames
--- task
Renaming a resource in configuration should not destroy and recreate it. Infrastructure tools let you declare **moves**: a dict from an old name to a new name. Write \`plan_with_moves(desired, state, moves)\`, where \`desired\` and \`state\` map names to \`{"type": …, "props": {…}, "deps": […]}\`.

1. For each old name in \`moves\`, in sorted order: if the old name is in the state and the new name is not, rename the entry in a copy of the state and emit \`("move", old, new)\`; otherwise ignore that move.
2. Then, for each name of \`desired\` in sorted order: \`("create", name)\` if it is not in the (renamed) state, or \`("update", name)\` if its \`props\` differ from the state's.
3. Then, for each name of the renamed state in sorted order that is not in \`desired\`: \`("delete", name)\`.

Do not change the dicts you are given.

For example, if the state has \`web\` and the configuration calls it \`frontend\`, the move \`{"web": "frontend"}\` turns a delete plus a create into \`("move", "web", "frontend")\`.
--- starter
def plan_with_moves(desired, state, moves):
    actions = [("create", n) for n in sorted(desired) if n not in state]
    actions += [("delete", n) for n in sorted(state) if n not in desired]
    return actions
--- solution
def plan_with_moves(desired, state, moves):
    actions = []
    current = dict(state)
    for old in sorted(moves):
        new = moves[old]
        if old in current and new not in current:
            current[new] = current.pop(old)
            actions.append(("move", old, new))
    for name in sorted(desired):
        if name not in current:
            actions.append(("create", name))
        elif desired[name]["props"] != current[name]["props"]:
            actions.append(("update", name))
    for name in sorted(current):
        if name not in desired:
            actions.append(("delete", name))
    return actions
--- check case | Moves, a create, an update of a moved resource, and a delete
(R := lambda t, deps=(), **p: {"type": t, "props": p, "deps": list(deps)}, plan_with_moves({"net": R("network", cidr="10.0.0.0/16"), "frontend": R("vm", ["net"], size="m"), "db": R("vm", ["net"], size="xl"), "cache": R("vm", ["net"], size="s")}, {"net": R("network", cidr="10.0.0.0/16"), "web": R("vm", ["net"], size="m"), "old-db": R("vm", ["net"], size="l"), "tmp": R("vm", [], size="s")}, {"web": "frontend", "old-db": "db"}))[-1]
=> [("move", "old-db", "db"), ("move", "web", "frontend"), ("create", "cache"), ("update", "db"), ("delete", "tmp")]
--- check case | Without the moves, the same change destroys and recreates
(R := lambda t, deps=(), **p: {"type": t, "props": p, "deps": list(deps)}, plan_with_moves({"net": R("network", cidr="10.0.0.0/16"), "frontend": R("vm", ["net"], size="m"), "db": R("vm", ["net"], size="xl"), "cache": R("vm", ["net"], size="s")}, {"net": R("network", cidr="10.0.0.0/16"), "web": R("vm", ["net"], size="m"), "old-db": R("vm", ["net"], size="l"), "tmp": R("vm", [], size="s")}, {}))[-1]
=> [("create", "cache"), ("create", "db"), ("create", "frontend"), ("delete", "old-db"), ("delete", "tmp"), ("delete", "web")]
--- check case | A move whose target already exists is ignored
(R := lambda t, deps=(), **p: {"type": t, "props": p, "deps": list(deps)}, plan_with_moves({"a": R("vm", size="s"), "b": R("vm", size="s")}, {"a": R("vm", size="s"), "b": R("vm", size="s")}, {"a": "b", "ghost": "x"}))[-1]
=> []
--- check test | The inputs are not changed
(R := lambda t, deps=(), **p: {"type": t, "props": p, "deps": list(deps)}, st := {"old": R("vm", size="s")}, plan_with_moves({"new": R("vm", size="s")}, st, {"old": "new"}) == [("move", "old", "new")] and list(st) == ["old"])[-1]

+++ problem | The smallest cache that protects the database
--- task
A service receives \`rps\` requests per second, with keys in the proportions of \`trace\` (a list of keys in request order). It will put an LRU cache in front of its database, which can take at most \`backend_max\` requests per second. Run on the trace, a cache of capacity c has some number of misses; the database load is rps × misses / len(trace).

Write \`smallest_cache(trace, rps, backend_max)\` that returns the smallest capacity c (0 or more) whose database load is at most \`backend_max\`, comparing in whole numbers (misses × rps ≤ backend_max × len(trace)). If even a cache big enough for every distinct key is not enough (the first request for each key always misses), return \`None\`. An LRU cache's misses never increase when its capacity grows, so you may binary search between 0 and the number of distinct keys; a scan that tries every capacity would be too slow on the large check.

An LRU of capacity 0 caches nothing; otherwise a hit moves the key to most recently used, and a miss adds it, evicting the least recently used key when over capacity.

For example, \`smallest_cache([1, 2, 3, 1, 2, 3], 6, 3)\` is \`3\`.
--- starter
def smallest_cache(trace, rps, backend_max):
    return len(set(trace))
--- solution
from collections import OrderedDict


def lru_misses(trace, capacity):
    cache = OrderedDict()
    misses = 0
    for key in trace:
        if key in cache:
            cache.move_to_end(key)
        else:
            misses += 1
            if capacity > 0:
                cache[key] = True
                if len(cache) > capacity:
                    cache.popitem(last=False)
    return misses


def smallest_cache(trace, rps, backend_max):
    n = len(trace)

    def ok(capacity):
        return lru_misses(trace, capacity) * rps <= backend_max * n

    hi = len(set(trace))
    if not ok(hi):
        return None
    lo = 0
    while lo < hi:
        mid = (lo + hi) // 2
        if ok(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
--- check case | The example, and an impossible target
(smallest_cache([1, 2, 3, 1, 2, 3], 6, 3), smallest_cache([1, 2, 3, 1, 2, 3], 6, 2))
=> (3, None)
--- check case | A database that can take everything needs no cache
smallest_cache([1, 1, 2], 10, 10)
=> 0
--- check case | A skewed trace of 30,000 requests over 2,000 keys
(lambda tr: (smallest_cache(tr, 50000, 20000), smallest_cache(tr, 50000, 10000), smallest_cache(tr, 50000, 1000)))((lambda r: r.choices(range(2000), weights=[1 / (k + 1) for k in range(2000)], k=30000))(__import__("random").Random(9)))
=> (183, 666, None)

+++ problem | One pass of a rolling-update controller
--- task
A controller rolls a service to a new version, one reconcile pass at a time. The service wants \`replicas\` slots, 0 to \`replicas − 1\`, all at \`version\`. \`running\` maps a slot number to \`(its_version, ready)\`. Write \`rollout_pass(replicas, running, version, max_unavailable)\` that returns the actions of one pass, in this order:

1. \`("delete", slot)\` for every running slot at or above \`replicas\`, highest first;
2. \`("create", slot)\` for every slot below \`replicas\` that is not running, lowest first;
3. then, counting \`available\` = the number of running slots below \`replicas\` that are ready, go through the running slots below \`replicas\` in order, and for each one at an old version: if it is not ready, \`("replace", slot)\` (it serves nothing, so replacing it costs no availability); if it is ready, \`("replace", slot)\` only if \`available − 1 ≥ replicas − max_unavailable\`, and then lower \`available\` by 1.

Do not change \`running\`.

For example, with 4 ready slots at \`"v1"\`, version \`"v2"\` and \`max_unavailable = 1\`, the pass is \`[("replace", 0)]\`; the next pass, with slot 0 at \`"v2"\` but not ready yet, does nothing.
--- starter
def rollout_pass(replicas, running, version, max_unavailable):
    return [("replace", s) for s in sorted(running) if running[s][0] != version]
--- solution
def rollout_pass(replicas, running, version, max_unavailable):
    actions = []
    for slot in sorted((s for s in running if s >= replicas), reverse=True):
        actions.append(("delete", slot))
    for slot in range(replicas):
        if slot not in running:
            actions.append(("create", slot))
    live = {s: running[s] for s in running if s < replicas}
    available = sum(1 for v, ready in live.values() if ready)
    for slot in sorted(live):
        v, ready = live[slot]
        if v == version:
            continue
        if not ready:
            actions.append(("replace", slot))
        elif available - 1 >= replicas - max_unavailable:
            actions.append(("replace", slot))
            available -= 1
    return actions
--- check case | The example: one at a time
(rollout_pass(4, {0: ("v1", True), 1: ("v1", True), 2: ("v1", True), 3: ("v1", True)}, "v2", 1), rollout_pass(4, {0: ("v2", False), 1: ("v1", True), 2: ("v1", True), 3: ("v1", True)}, "v2", 1))
=> ([("replace", 0)], [])
--- check case | A bigger budget replaces two at once
rollout_pass(4, {0: ("v2", True), 1: ("v1", True), 2: ("v1", True), 3: ("v1", True)}, "v2", 2)
=> [("replace", 1), ("replace", 2)]
--- check case | Deletes, creates, and a broken old replica replaced for free
rollout_pass(3, {0: ("v1", True), 2: ("v1", False), 5: ("v1", True)}, "v2", 1)
=> [("delete", 5), ("create", 1), ("replace", 2)]
--- check case | Done, and stuck with no budget
(rollout_pass(2, {0: ("v2", True), 1: ("v2", True)}, "v2", 1), rollout_pass(2, {0: ("v1", True), 1: ("v1", True)}, "v2", 0))
=> ([], [])
--- check test | The input is not changed
(r := {0: ("v1", True), 3: ("v1", True)}, rollout_pass(1, r, "v2", 1), r == {0: ("v1", True), 3: ("v1", True)})[-1]

+++ question | Why read the world every pass
--- ask
A controller remembers which tasks it started and diffs the spec against that memory, instead of listing what is actually running. What goes wrong first?
--- choice
Nothing: its memory is always accurate, since it started the tasks itself.
--- choice correct
The first time a task dies, or someone changes something behind its back, its memory is wrong and it never repairs the difference.
--- choice
It uses too much memory for large clusters.
--- choice
It starts every task twice.
--- why
A controller's decisions are only as good as its picture of the world. Observing the real state on every pass (level-triggered) makes it repair failures and outside changes it was never told about.

+++ question | The cost of best fit alone
--- ask
A scheduler scores machines by best fit on CPU only. Tasks come in two shapes: CPU-heavy (4 cores, 2 GiB) and memory-heavy (1 core, 16 GiB). After a while many machines have plenty of free memory and no free cores, or the reverse. What is this, and what helps?
--- choice
Fragmentation from too few machines; buy more machines.
--- choice correct
Stranded resources: one dimension fills while the other sits unusable. Scoring that considers both dimensions, such as aligning the task's shape with the machine's free space, keeps leftovers balanced.
--- choice
A bug in the filter step; the scheduler is placing tasks that do not fit.
--- choice
Overcommit; requests should be raised to match limits.
--- why
Packing in one dimension ignores the other, so machines end up with unusable leftovers. Multi-dimensional scoring, or placing complementary shapes together, recovers that capacity.

+++ question | A small regression in a small canary
--- ask
A canary takes 1% of traffic and is judged once it has 100 requests. The new version fails 2.5% of requests against the baseline's 1%. Why might it pass?
--- choice
Because 2.5% is within the SLO.
--- choice correct
With only about 100 requests, 1 to 4 errors are likely from either version, so the difference is not statistically distinguishable yet; more traffic at later steps is needed to see it.
--- choice
Because a z-test only detects improvements.
--- choice
Because the baseline's errors are counted twice.
--- why
The minimum sample decides the smallest regression a canary can catch. Judging again at each step, as the canary's share and its sample grow, is what eventually exposes small regressions.

+++ question | Round robin and uneven requests
--- ask
Ten identical replicas sit behind a round-robin balancer, and 10% of requests cost ten times as much as the rest. Compared with power of two choices on fresh queue lengths, what do you expect?
--- choice
Round robin is better, because it gives every replica exactly the same number of requests.
--- choice correct
Round robin builds much longer queues: equal request counts are not equal work, and it keeps sending new requests to a replica stuck on expensive ones.
--- choice
They behave the same, because the replicas are identical.
--- why
Round robin balances counts, not work. Load-aware rules see that a replica is backed up and steer around it; two random choices are enough to get most of that benefit.

+++ question | Latency at 75%
--- ask
A single server (M/M/1) has an average service time of 20 ms and runs at 75% utilization. What is the average time a request spends in the system, in milliseconds?
--- answer
80
80 ms
--- why
W = service time / (1 − ρ) = 20 / 0.25 = 80 ms. At 75% busy, requests already spend three quarters of their time waiting.

+++ question | Fan-out at scale
--- ask
A request fans out to 200 leaf servers and waits for all of them. Each leaf is slow 0.5% of the time, independently. Roughly what share of requests are slow?
--- choice
0.5%
--- choice
About 10%
--- choice correct
About 63%
--- choice
Nearly all of them
--- why
All 200 are fast with probability 0.995^200 ≈ 0.367, so about 63% of requests wait on at least one slow leaf. Leaf tails become the common case under fan-out.

+++ question | The flapping autoscaler
--- ask
An autoscaler recomputes ⌈replicas × utilization / target⌉ every 15 seconds and applies it at once. Traffic is steady on average but noisy from one interval to the next. What do you see, and which change fixes it most directly?
--- choice
A steady replica count; no change is needed.
--- choice correct
The count moves up and down every interval; add a tolerance band and scale down only after recommendations have stayed low for a stabilization window.
--- choice
The count only ever rises; lower the target.
--- choice
The count only ever falls; raise the minimum.
--- why
Without hysteresis, every wobble of a noisy metric becomes a scaling action. A band ignores small deviations, and a scale-down window waits until a fall has lasted, while rises are still met at once.

+++ question | Shedding at the door
--- ask
Under overload, why is it better to reject a request when it arrives than to queue it and drop it later if it waits too long?
--- choice
Rejected requests are not counted in the error rate.
--- choice correct
A rejection at the door is cheap and immediate, so the client can retry elsewhere or back off, and the capacity goes to requests that can still finish in time; a request dropped late has used queue space and delayed everyone behind it.
--- choice
Queues cannot hold more than a few requests.
--- choice
Clients prefer slow answers to errors.
--- why
Late drops waste work and add delay to every request behind them, which is how unbounded queues lead to congestion collapse. Early, cheap rejection keeps goodput high.

+++ question | Stampede arithmetic
--- ask
A key is read 2,000 times a second. When its cache entry expires, refetching it from the database takes 50 ms. Without request coalescing, about how many database queries does that one expiry cause?
--- answer
100
about 100
--- why
Every request in the 50 ms before the first fetch returns also misses: 2,000 × 0.05 = 100 queries for one key. With coalescing, it is 1.

+++ question | Reading a burn rate
--- ask
An SLO is 99.9% of requests successful over 30 days. Over the last hour, 0.5% of requests failed. What is the burn rate over that hour?
--- answer
5
5x
--- why
Burn rate = error rate / (1 − SLO) = 0.005 / 0.001 = 5: the budget is being spent five times faster than the pace that would last the whole 30 days. Sustained, the month's budget would be gone in 6 days.
`;export{e as default};