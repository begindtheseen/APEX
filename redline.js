// ============================================================
// APEX — REDLINE: SOCIAL MEDIA OPERATOR MASTERCLASS
// ============================================================
// Zero experience to professional creator, strategist, account manager, and
// agency operator. Durable principles are taught as mechanisms; volatile UI,
// feature, eligibility, and policy details are marked [VERIFY LIVE]. Research
// notes and first-party sources live in REDLINE_RESEARCH.md.
// ES5 only: this file is consumed directly by the shared dark-realm engine.

(function () {
  'use strict';

  var MODULES = [];
  var RAW = [];

  function mod(k, name, blurb) { MODULES.push({ k:k, name:name, blurb:blurb }); }
  function add(sub, id, title, predict, core, mechanism, playbook, diagnose, assignment, testQ, testA) {
    RAW.push({ sub:sub, id:id, title:title, predict:predict, core:core, mechanism:mechanism,
      playbook:playbook, diagnose:diagnose, assignment:assignment, testQ:testQ, testA:testA });
  }
  function pos(id, salt) {
    var n = salt || 0, i;
    for (i = 0; i < id.length; i++) n = (n + id.charCodeAt(i) * (i + 3)) % 997;
    return n % 4;
  }
  function choices(correct, id, salt, wrong) {
    var out = [], p = pos(id, salt), i, w = 0;
    for (i = 0; i < 4; i++) out.push(i === p ? correct : wrong[w++]);
    return { c:out, a:p };
  }
  function lesson(r) {
    var one = choices(r.testA, r.id, 1, [
      'Copy the largest account and treat its result as a universal rule.',
      'Change the topic, format, hook, and audience simultaneously.',
      'Judge success from raw views without checking audience or business outcome.'
    ]);
    var two = choices(r.diagnose, r.id, 2, [
      'Assume the account is suppressed and start over immediately.',
      'Increase posting volume before identifying the failed stage.',
      'Ignore the evidence and follow the original plan unchanged.'
    ]);
    return {
      id:r.id, sub:r.sub, title:r.title, predict:r.predict,
      concept:'<p><b>The professional standard.</b> '+r.core+'</p>'
        +'<p><b>How the machine works.</b> '+r.mechanism+'</p>'
        +'<p><b>Operating playbook.</b> '+r.playbook+'</p>'
        +'<p><b>Diagnosis before tactics.</b> '+r.diagnose+'</p>'
        +'<p><b>Field rep.</b> '+r.assignment+' Save the artifact and the result. A claim without a record is a story; a dated artifact plus outcome is evidence.</p>',
      example:'<p><b>Applied example.</b> Imagine the result missed. Do not call it a flop. Locate the broken stage, write one hypothesis, change one meaningful variable, and run the next rep. In this lesson the first suspect is: '+r.diagnose+'</p>',
      teach:'Teach this lesson without jargon: state the principle, trace the mechanism, show the procedure, name the failure signal, and explain the field rep.',
      cards:[
        { f:r.title+' — principle', b:r.core },
        { f:'What mechanism produces the result?', b:r.mechanism },
        { f:'What does the operator actually do?', b:r.playbook },
        { f:'What evidence proves the rep happened?', b:r.assignment }
      ],
      quiz:[
        { q:r.testQ, c:one.c, a:one.a, e:r.testA },
        { q:'What is the most useful first diagnosis when this lesson’s result misses?', c:two.c, a:two.a, e:r.diagnose }
      ]
    };
  }

  // ── Z0 · TRUE ZERO ───────────────────────────────────────
  mod('Z0', 'Level 0 · Start at True Zero', 'Accounts, language, safety, tools, and the first publish. No experience is assumed.');
  add('Z0','z0_map','The social media map — media, network, search, and marketplace',
    'Why can the same video win on TikTok and fail on LinkedIn without either platform being random?',
    'A platform is not an empty stage. It is a product with a user job: entertainment, connection, search, professional identity, inspiration, or purchase. Strategy begins with that job.',
    'Ranking systems match eligible content to a person and surface. The same creative creates different predictions because intent, relationships, format norms, and feedback signals differ.',
    'Map Instagram, TikTok, YouTube, Facebook, Threads, LinkedIn, X, and Pinterest by user job, discovery surface, relationship surface, search behavior, native formats, and likely business role.',
    'If every platform receives the same file and caption, platform fit—not effort—is the first suspect.',
    'Create a one-page platform map and label one primary, one secondary, and one listening platform for a practice brand.',
    'What decides whether content is native to a platform?', 'It serves the user job and surface while using the platform’s expected format and behavior.');
  add('Z0','z0_language','The operator vocabulary — reach is not revenue',
    'A post has 100,000 views and produces no followers, leads, or sales. Was it successful?',
    'Impressions, reach, views, watch time, retention, engagement, followers, leads, conversions, revenue, and profit answer different questions. Professionals never collapse them into “engagement.”',
    'A funnel is a chain of denominators: impressions become viewers, some viewers consume, some act, some identify themselves, and some buy. Each ratio locates a different leak.',
    'Build a metric dictionary with the exact platform definition, numerator, denominator, business meaning, and known limitation. [VERIFY LIVE] because platforms rename and recount metrics.',
    'A large total beside a weak rate often hides the problem; a strong rate on a tiny sample often exaggerates certainty.',
    'Translate one creator analytics screenshot into a funnel and write what can and cannot be concluded.',
    'Why should a report use rates and denominators?', 'They reveal where the audience journey leaked and prevent large totals from disguising weak performance.');
  add('Z0','z0_accounts','Account architecture, access, and security',
    'Why should an agency never run a client account from a shared password in a group chat?',
    'Ownership and access are business infrastructure. The client should own the account and assets; operators should receive role-based access that can be revoked without destroying history.',
    'Shared passwords erase accountability and magnify compromise. Native business managers, permission levels, two-factor authentication, recovery contacts, and documented asset ownership create a chain of custody.',
    'Create the account, professional/business profile, business manager, ad account, pixel/data source, billing owner, 2FA, password manager record, backup codes, and offboarding checklist. [VERIFY LIVE] menus.',
    'If nobody can say who owns the email, phone, page, ad account, data, and payment method, the account is not client-ready.',
    'Run a security audit on your own practice account and create an access register with owner, role, date granted, and revoke procedure.',
    'What is the correct client account ownership model?', 'The client owns assets and operators receive named, least-privilege access through native permission tools.');
  add('Z0','z0_toolchain','The minimum viable creator toolchain',
    'What is the first equipment upgrade when your phone footage looks fine but people leave because they cannot understand you?',
    'Clarity beats expensive gear. A phone, clean lens, stable support, intelligible audio, controlled light, storage, editor, design tool, scheduler, analytics sheet, and backup system can run a professional starter workflow.',
    'Image quality has diminishing returns; bad sound, exposure, framing, or file loss can make usable ideas unusable. The toolchain exists to remove failure points and shorten cycle time.',
    'Standardize capture, naming, ingest, two-copy backup, edit, captions, review, export, publish, and archive. Upgrade only the bottleneck proven by repeated work.',
    'Buying gear before identifying a constraint creates prettier procrastination; recurring audio failures justify a microphone before a new camera.',
    'Build the complete workflow using only tools already available and publish a 20-second test with clean voice, captions, and stable exposure.',
    'What should determine the next tool purchase?', 'A repeated, measured production bottleneck—not the prestige or novelty of the tool.');
  add('Z0','z0_firstpost','Your first post and the anti-perfection contract',
    'How can a beginner improve retention without yet knowing what good retention looks like?',
    'Skill arrives after contact with the work. The first posts are calibration samples, not verdicts on talent. Publishing creates the footage, timing, audience reaction, and emotional exposure needed to learn.',
    'Perfectionism delays the feedback loop. A controlled volume of complete reps reveals recurring failure patterns faster than endlessly polishing an untested premise.',
    'Use one audience, one useful promise, one clear opening, one idea, one proof/example, one next step, captions, and a clean export. Log the result after the platform has had time to distribute.',
    'If the draft count rises while the published count stays at zero, fear—not quality control—is governing the system.',
    'Publish a 20–45 second introduction: who you are, what you are learning/building, who it is for, and what the next documented rep will show.',
    'What is the purpose of the first ten posts?', 'To create complete feedback loops and reveal patterns—not to prove permanent talent or guarantee virality.');
  add('Z0','z0_observation','Train the eye before chasing tactics',
    'What can you learn from a viral post that its public view count cannot tell you?',
    'A strong operator separates observation from explanation. You can see the hook, structure, comments, packaging, and public outcome; you cannot see private retention, audience mix, distribution history, conversion, or causality.',
    'Reverse engineering works when it names observable choices and generates a testable hypothesis. It fails when one winner becomes a superstition such as “red text makes videos viral.”',
    'Maintain a swipe file with link, date, audience, promise, opening device, structure, proof, emotion, format, CTA, and a hypothesis worth testing. Save failures too.',
    'If the explanation depends on hidden data or a single example, label it hypothesis rather than fact.',
    'Deconstruct ten posts in one niche: five winners and five ordinary posts. Extract three differences that can be tested.',
    'What makes a swipe-file observation professionally useful?', 'It records observable choices, acknowledges hidden variables, and produces a testable hypothesis.');

  // ── B0 · RALSTON BRAND SPINE ─────────────────────────────
  mod('B0', 'Level 1 · Brand Architecture (Ralston Spine)', 'Caleb Ralston’s Brand Journey and Catalyst/Core Truth/Proof frameworks, expanded into a complete positioning system.');
  add('B0','b0_journey','The Brand Journey — reverse-engineer what you want',
    'If your content succeeds, what exact life or business outcome should it cause one year from now?',
    'Caleb Ralston’s Brand Journey starts at the outcome and works backward: what must happen, what must you be known for, what must you repeatedly do, and what must you learn to do it.',
    'The chain prevents random content. Outcomes require reputation; reputation is an association in other people’s minds; associations are reinforced by visible actions; actions require capability.',
    'Write one concrete outcome, three required associations, recurring public proof for each association, and the skills still missing. Reject vague goals such as “grow a following.”',
    'If a proposed post cannot strengthen a required association, serve the audience, or test a needed skill, it is probably noise.',
    'Complete the four-question Brand Journey and turn it into a 90-day learning-and-publishing roadmap.',
    'What is the correct order of the Brand Journey?', 'Desired outcome → needed reputation → repeated actions that prove it → skills required to execute.');
  add('B0','b0_catalyst','The Catalyst — why this brand must exist',
    'What did you see that made remaining silent or staying the same unacceptable?',
    'Ralston’s Catalyst is the change, gap, or opportunity that makes the brand necessary. It is not a dramatic trauma requirement; it is the honest reason the work deserves to exist.',
    'A catalyst creates narrative tension between the current reality and a better one. It supplies stakes, audience relevance, and a durable source of topics.',
    'Write the current broken state, what you noticed that others ignore, who pays the cost, what better state you pursue, and why you are willing to act publicly.',
    'If the catalyst is interchangeable with thousands of bios, it has not reached a specific tension or audience cost.',
    'Record three 30-second catalyst versions: factual, emotional, and contrarian. Test which creates the clearest audience response.',
    'What makes a useful brand catalyst?', 'A specific change or opportunity with real stakes that explains why the work exists and why the audience should care.');
  add('B0','b0_coretruth','The Core Truth — the belief you can own',
    'What do you believe about your field that a smart competitor could honestly disagree with?',
    'Ralston’s Core Truth is a defensible conviction that distinguishes the brand. It is not controversy for attention; it is a useful belief that changes what you do.',
    'Distinct beliefs create memory because they compress many choices into one association. The belief becomes credible when content, offers, decisions, and tradeoffs consistently express it.',
    'Write ten beliefs, remove clichés and claims you cannot defend, then choose one with evidence, audience consequence, and enough depth to generate a year of demonstrations.',
    'If the belief never costs a choice, changes a method, or risks disagreement, it is probably a slogan rather than a core truth.',
    'Publish a belief post that states the common assumption, your alternative, evidence, limitations, and what the audience should do differently.',
    'How is a Core Truth different from empty controversy?', 'It is defensible, useful, reflected in real decisions, and changes audience action—not disagreement manufactured for reach.');
  add('B0','b0_proof','The Proof — identity is a pattern, not a claim',
    'Which artifact would make a stranger believe your positioning without reading your bio?',
    'Ralston’s Proof is repeated visible evidence of the identity you want the market to assign you. Saying “strategist” is cheap; showing research, decisions, experiments, and outcomes builds the association.',
    'Audiences infer identity from repeated behavior. Process footage, before/after work, annotated analytics, client artifacts, informed predictions, and honest lessons turn a claim into a record.',
    'Build a proof ladder: personal reps first, then practice projects, collaborations, testimonials, client outcomes, and durable intellectual property. Never invent access, metrics, or results.',
    'If the proof cannot be inspected, dated, or connected to your contribution, its credibility is weak.',
    'Create a proof inventory and publish one artifact with context: problem, your decision, work shown, result, limitation, and next iteration.',
    'What establishes a brand association over time?', 'A repeated pattern of inspectable actions and outcomes that proves the identity, not a one-time self-description.');
  add('B0','b0_positioning','Positioning — category, person, problem, promise, proof',
    'Can a stranger tell in four seconds who the account is for and why it is worth following?',
    'Positioning chooses the mental shelf the brand should occupy. It defines the audience, costly problem or desired identity, distinct promise, category context, and reason to believe.',
    'Specificity reduces the number of people who initially identify while increasing recognition and relevance among the right people. Broad reach and clear positioning are not opposites: topics can broaden while the promise remains coherent.',
    'Write: “For [specific person] who [tension], this account helps [valuable change] through [distinct mechanism], proven by [evidence].” Then remove every word that could describe a competitor.',
    'If content attracts people who will never value the offer, reach is growing outside the positioning.',
    'Interview five target people and ask them to paraphrase the positioning after seeing only the profile and three posts.',
    'What is the test of strong positioning?', 'The right stranger can quickly name who it is for, the valuable change, the distinct mechanism, and a reason to believe.');
  add('B0','b0_identity','Identity system — recognizable without becoming repetitive',
    'If the logo disappeared, what repeated cues would still make a post recognizable?',
    'Brand identity is a memory system: voice, beliefs, recurring series, visual grammar, sonic cues, environments, vocabulary, and behavior. A logo is one cue, not the brand.',
    'Consistent cues lower recognition effort while varied ideas protect novelty. The goal is coherent range: many executions that feel authored by the same mind.',
    'Define five voice traits with do/don’t examples, color/type rules, caption style, framing, recurring opening or sign-off, series names, thumbnail grammar, and accessibility rules.',
    'If consistency requires every post to look identical, the identity system is too shallow; if nothing repeats, memory cannot compound.',
    'Build a one-page brand system and restyle three different formats so they remain recognizable without a logo.',
    'What balance should an identity system create?', 'Repeated recognizable cues with enough format and idea variation to preserve novelty.');

  // ── A0 · AUDIENCE ────────────────────────────────────────
  mod('A0', 'Level 2 · Audience Intelligence', 'Research people deeply enough to predict attention, language, objections, sharing, and purchase.');
  add('A0','a0_segments','Segments, jobs, and moments',
    'Why is “women 18–34” usually too weak to direct a useful piece of content?',
    'A useful audience is grouped by shared situation, desired progress, constraint, awareness, and context—not demographics alone. People use content to accomplish emotional, social, and practical jobs.',
    'The same person enters different intent moments: discovering a problem, comparing options, seeking identity, solving now, or validating a purchase. Each moment needs different content.',
    'Map segment, triggering moment, desired progress, current workaround, fear, objection, vocabulary, trusted proof, share recipient, and next action.',
    'If the brief describes who people are but not what is happening when they need the content, it cannot guide an idea.',
    'Create three audience moment cards for one niche and write a distinct post premise for each.',
    'What makes an audience segment actionable for content?', 'A shared situation, desired progress, constraints, language, and intent moment that can direct a specific message.');
  add('A0','a0_listening','Social listening without guessing',
    'Where do you find the phrases an audience uses before marketers sanitize them?',
    'Social listening collects naturally occurring questions, complaints, comparisons, jokes, search phrases, reviews, comments, support tickets, community discussions, and competitor reactions.',
    'Repeated language reveals demand and emotional stakes; gaps between what people ask and what brands publish reveal opportunity. Listening is evidence collection, not silent imitation.',
    'Search platform autocomplete, Creator Search Insights, forums, reviews, comments, FAQs, ad libraries, and sales/support logs. Tag entries by pain, desire, objection, trigger, proof, and phrase.',
    'If research produces only topic nouns and no verbatim tensions or situations, it is too shallow.',
    'Collect fifty audience statements and cluster them into five recurring jobs with exact phrases preserved.',
    'What is the most valuable output of social listening?', 'Recurring audience tensions and language that reveal demand, context, objections, and content gaps.');
  add('A0','a0_interviews','Audience interviews that uncover decisions',
    'Why does asking “Would you buy this?” often produce misleading research?',
    'People are poor at predicting hypothetical behavior and often answer politely. Strong interviews reconstruct a real recent event: trigger, search, alternatives, doubts, decision, and aftermath.',
    'Specific past behavior exposes the forces that moved or blocked action. Follow-up questions turn broad opinions into scenes, language, tradeoffs, and proof requirements.',
    'Ask for the last time the problem happened, what changed, first action, exact searches, considered options, hesitation, decision rule, and what would have made the process easier. Do not pitch.',
    'If most answers are adjectives or future promises, return to a real episode and ask “what happened next?”',
    'Conduct five 20-minute interviews, transcribe key phrases, and update the audience moment cards.',
    'What should an audience interview reconstruct?', 'A real recent decision journey from trigger through search, alternatives, objection, choice, and outcome.');
  add('A0','a0_competitors','Competitor and category intelligence',
    'Should you copy the best-performing format in your niche?',
    'Competitor research maps category promises, conventions, proof, formats, gaps, and audience reactions. It should reveal where to conform for comprehension and where to differ for memory.',
    'A content winner may reflect distribution history, brand equity, timing, or hidden spend. Pattern frequency across competitors is stronger evidence than one visible outlier.',
    'Audit ten accounts across positioning, series, formats, hooks, proof, cadence, comments, offers, funnels, and creative quality. Mark table stakes, overused claims, white space, and stealable principles.',
    'If the plan can be described as “do what they do, but better,” it lacks a distinct strategic choice.',
    'Build a category map with sameness clusters and design three concepts that exploit verified white space.',
    'What is the goal of competitor research?', 'To understand category conventions and gaps so the brand can be legible where needed and meaningfully distinct where it matters.');
  add('A0','a0_personas','Behavioral personas and anti-personas',
    'Who should your content intentionally repel or decline to serve?',
    'A persona is useful only when it changes choices. It captures behavior, awareness, motivation, barriers, evidence standards, content habits, and decision power; an anti-persona protects positioning and service fit.',
    'Trying to satisfy incompatible audiences weakens voice, offer, and community. Clear exclusions improve qualification and reduce future client or customer conflict.',
    'Create primary, secondary, and anti-persona cards. For each, define what to say, show, avoid, ask, offer, and measure.',
    'If two personas require opposite promises or tones, they may need separate series, channels, or offers.',
    'Use the cards to accept, revise, or kill ten draft ideas and record the decision logic.',
    'When is a persona valuable?', 'When its behavioral details and exclusions change content, proof, CTA, channel, or offer decisions.');
  add('A0','a0_insight','Turn research into an insight',
    'What separates a fact about an audience from a strategic insight?',
    'An observation states what happens. An insight explains a meaningful tension or cause and creates a new decision. “People save tutorials” is data; the reason they save but never act may change the format and offer.',
    'Strong insights connect evidence, human tension, implication, and action while remaining falsifiable. They compress many observations into a useful explanation.',
    'Use: “We observed [pattern] among [people/context]. This likely happens because [tension]. Therefore we will [decision] and expect [measurable change].”',
    'If the “insight” does not alter a choice or cannot be disproved, it is description or opinion.',
    'Write five insight statements from the listening dataset and rank them by evidence strength and strategic consequence.',
    'What must a strategic insight produce?', 'A falsifiable explanation of a meaningful pattern that changes a decision and predicts an outcome.');

  // ── C0 · CONTENT STRATEGY + IDEAS ────────────────────────
  mod('C0', 'Level 3 · Content Strategy &amp; Idea Engine', 'Goals, pillars, formats, editorial systems, trend judgment, and an idea bank that never depends on inspiration.');
  add('C0','c0_goal','Business goal → audience behavior → content job',
    'Why is “increase engagement” not a complete content objective?',
    'Content is a means to an audience behavior that supports a business outcome. Awareness, consideration, conversion, retention, advocacy, and recruiting require different messages and measures.',
    'A clear objective links business goal, audience, desired behavior, content job, distribution, CTA, KPI, and time horizon. Vanity activity cannot substitute for the chain.',
    'Write one objective per funnel stage using a single primary behavior and KPI. Define guardrails so growth does not damage trust, margin, or positioning.',
    'If a post cannot be evaluated without saying “it got good engagement,” its intended job was never specified.',
    'Turn a vague brand goal into a 90-day objective tree with leading and lagging indicators.',
    'What makes a content objective complete?', 'It connects a business goal to a specific audience behavior, content job, primary KPI, and time horizon.');
  add('C0','c0_pillars','Pillars that generate range instead of cages',
    'How many distinct audience needs can one useful content pillar serve?',
    'A pillar is a repeatable territory at the intersection of brand authority, audience demand, and business relevance. It is not a broad noun such as “motivation.”',
    'Each pillar needs subtopics, audience moments, points of view, proof sources, native formats, and a business role. Series create recognizable containers inside pillars.',
    'Choose three to five pillars. Build a matrix crossing each with educate, entertain, inspire, prove, converse, and convert; then name recurring series.',
    'If a pillar cannot generate fifty distinct premises without repetition, it is either too narrow or insufficiently understood.',
    'Produce a 100-idea matrix and flag the first twenty balanced across jobs and funnel stages.',
    'What three forces should every pillar intersect?', 'Brand authority or right to speak, demonstrated audience demand, and relevance to the business goal.');
  add('C0','c0_formats','Format follows the communication problem',
    'When should one idea become a carousel instead of a short video?',
    'Format is a delivery mechanism. Demonstration, transformation, argument, reference, intimacy, conversation, search answer, and spectacle have different native containers.',
    'Video carries motion, voice, and emotion; carousels support sequence and reference; text supports precision and dialogue; live supports depth and interaction; long-form compounds search and trust.',
    'For each idea, choose the format by required evidence, complexity, consumption context, platform surface, production cost, and desired action—not trend pressure alone.',
    'If changing format destroys the core value, identify what affordance the idea actually needs.',
    'Express one premise as short video, carousel, text post, live segment, and long-form outline; compare what each gains and loses.',
    'What should determine content format?', 'The communication job, evidence, complexity, consumption context, platform surface, and desired audience action.');
  add('C0','c0_ideaquality','The idea score — demand before polish',
    'Can excellent editing rescue an idea nobody wants?',
    'Creative performance begins with the premise: who cares, why now, what tension, what novelty, what payoff, and what proof. Production multiplies an idea; it rarely creates demand from nothing.',
    'A high-potential idea combines audience relevance, clear stakes, curiosity or utility, credible proof, platform fit, and brand alignment. Broad appeal may come from universal framing, not diluted positioning.',
    'Score ideas 1–5 on demand evidence, clarity, stakes, novelty, proof, visual potential, brand fit, conversion role, and production feasibility. Kill weak premises before scripting.',
    'Strong retention on low reach can still indicate narrow demand; weak retention after strong selection points to delivery.',
    'Score twenty ideas, script the top five, and record why the bottom five should not be produced.',
    'What is the earliest major performance lever?', 'The strength and clarity of the premise—audience demand, stakes, novelty, payoff, proof, and fit.');
  add('C0','c0_trends','Trend intelligence — borrow the structure, not the costume',
    'When does joining a trend weaken a brand even if it increases reach?',
    'A trend is a rising shared behavior, topic, format, sound, phrase, aesthetic, or cultural tension. Use it only when the brand has a native contribution and timing remains open.',
    'Trend value depends on velocity, saturation, audience overlap, creative fit, production speed, and reputational risk. Mimicry borrows attention but may build no memory.',
    'Track source, date, velocity, lifecycle, examples, audience, adaptable structure, brand angle, risk, and deadline. Decide join, adapt, counter, explain, or ignore.',
    'If removing the trend leaves no valuable message, the concept is rented attention with no brand residue.',
    'Use TikTok Creative Center, platform search, Google Trends, Pinterest Trends, news, and communities to build a weekly trend brief. [VERIFY LIVE] tools.',
    'What is the correct use of a trend?', 'Apply a relevant structure or cultural moment to a native brand contribution while timing, fit, and risk remain favorable.');
  add('C0','c0_calendar','The editorial calendar as a decision system',
    'Why can a full calendar still represent a broken strategy?',
    'A calendar should encode strategic balance and production reality, not merely dates. It makes audience job, pillar, format, funnel stage, owner, status, CTA, and measurement visible.',
    'Capacity, dependencies, approvals, platform windows, campaigns, cultural moments, and evergreen inventory interact. A backlog and status workflow prevent urgency from consuming strategy.',
    'Use idea → brief → script → capture → edit → review → approved → scheduled → live → measured → repurpose. Reserve capacity for reactive content and experimentation.',
    'If most work becomes urgent near publish time, the bottleneck is probably upstream planning or approval—not creator speed.',
    'Build a four-week calendar at 80% planned capacity, including evergreen, campaign, community, experimental, and conversion content.',
    'What should an editorial calendar make visible?', 'Strategic purpose, production status, ownership, dependencies, capacity, distribution, CTA, and measurement.');
  add('C0','c0_brief','The creative brief that protects the idea',
    'What must every editor know before opening the timeline?',
    'A brief aligns outcome, audience, insight, single-minded message, proof, format, tone, mandatories, CTA, references, deliverables, deadlines, and success measure. It protects intent through production.',
    'Without a brief, reviewers introduce conflicting opinions late. With excessive prescription, specialists cannot improve the work. The brief should fix the problem and guardrails while leaving execution room.',
    'Write the audience moment, desired change, one sentence they should remember, why they should believe it, required assets, platform versions, accessibility, approval owner, and definition of done.',
    'If reviewers argue about the objective after the edit exists, the brief failed before production began.',
    'Brief one of the scored concepts, hand it to another person, and ask them to explain the intended piece without further context.',
    'What is the brief’s single most important job?', 'Preserve a shared understanding of the audience problem, intended change, message, proof, and definition of success.');

  // ── W0 · WRITING + STORY ─────────────────────────────────
  mod('W0', 'Level 4 · Hooks, Scripts &amp; Story (Ralston Spine)', 'Attention, retention, persuasion, Caleb Ralston’s story framework, interviews, CTAs, and ethical copy.');
  add('W0','w0_hook','Hooks are promises under time pressure',
    'Why does a loud first sentence fail when the next seconds do not deliver it?',
    'A hook earns the next moment by making a clear, credible promise: useful change, unresolved tension, surprising evidence, identity relevance, spectacle, or emotional stakes.',
    'The opening frame, spoken line, on-screen text, title, thumbnail, and first action work together. Curiosity without clarity becomes confusion; exaggeration creates selection but destroys satisfaction.',
    'Draft at least ten openings per premise using outcome, mistake, question, contrast, proof-first, demonstration, confession, prediction, challenge, and open loop. Select for audience fit and payoff integrity.',
    'High selection with early abandonment means the package promised something the delivery did not immediately confirm.',
    'Film five opening variants against the same body and test them with a small audience or trial feature where available. [VERIFY LIVE].',
    'What makes a hook sustainable?', 'It creates fast, specific interest and immediately begins fulfilling the exact promise it made.');
  add('W0','w0_structure','Short-form structure — promise, proof, progression, payoff',
    'What should happen immediately after a short-form hook?',
    'Strong short-form removes orientation debt. It confirms the promise, supplies proof, advances through meaningful beats, varies attention, and delivers a payoff before asking for action.',
    'Retention falls when information stops progressing. New evidence, visual change, escalating stakes, questions, pattern interruption, and compression renew attention when they serve the idea.',
    'Outline beats before sentences: hook, confirmation, context, value beat one, complication, value beat two, payoff, CTA or loop. Cut any beat that repeats without increasing value.',
    'A retention cliff after the hook often means context arrived before evidence or the script delayed the promised value.',
    'Rewrite a 60-second script to 35 seconds without removing the central proof or payoff; label every beat’s job.',
    'What should the first beat after the hook do?', 'Confirm the promised value or tension immediately so the viewer knows the content will deliver.');
  add('W0','w0_story','Ralston story structure — hook, problem, journey, lesson, action',
    'Why is a chronological life story usually weaker than one shaped around a lesson?',
    'Caleb Ralston’s content story moves through hook, specific problem/stakes, messy journey, useful lesson, and natural action. Origin, failure, success, customer, and industry stories supply different proof.',
    'Stories hold attention through change and causality. Details create scenes; obstacles create tension; decisions reveal character; the lesson transfers personal experience into audience value.',
    'Start near the moment of change, specify stakes, select only events that alter the outcome, show the decision, earn the lesson, and connect the CTA to what the story proved.',
    'If removing the chronology leaves no changed belief, decision, or useful takeaway, the story is an anecdote without strategic purpose.',
    'Write one failure story in seven beats and record it under 90 seconds without hiding the mistake or overstating the lesson.',
    'What are the five moves in Ralston’s storytelling playbook?', 'Hook → specific problem and stakes → journey through change → useful lesson → natural next action.');
  add('W0','w0_interview','Extract stories from founders, experts, and clients',
    'What follow-up turns “we finally closed the deal” into usable content?',
    'The interviewer’s job is to locate scenes, decisions, contrast, proof, and transferable lessons—not merely collect polished answers. Ralston emphasizes process, universality, and replicable advice follow-ups.',
    'Good follow-ups ask what changed, what happened next, what almost failed, what the person noticed, what evidence mattered, whether the lesson generalizes, and what someone can repeat.',
    'Prepare themes, not a rigid script. Listen for compression words such as “eventually” or “somehow,” then reopen the hidden sequence. Capture room tone, names, dates, and permissions.',
    'If every answer sounds like a keynote summary, the interviewer did not reach the scene or decision.',
    'Interview someone for 20 minutes and extract three standalone clips, one written post, and one long-form outline.',
    'What are three high-value follow-up directions?', 'Ask for the process that changed the result, test whether it generalizes, and extract replicable advice.');
  add('W0','w0_copy','Clarity, specificity, and voice',
    'Which is more persuasive: a bigger adjective or a concrete detail?',
    'Strong social copy is clear enough to understand, specific enough to believe, and voiced enough to remember. Concrete nouns, active verbs, numbers with context, sensory detail, and clean sentence rhythm beat inflated claims.',
    'Specificity lowers interpretation effort and raises credibility. Voice comes from consistent judgment, vocabulary, cadence, humor, and omissions—not intentional confusion or misspelling.',
    'Draft for meaning, rewrite for structure, read aloud for rhythm, cut throat-clearing, replace abstraction with proof, verify claims, and adapt to the platform without erasing identity.',
    'If the copy could be pasted onto a competitor’s post unchanged, it lacks proprietary observation or voice.',
    'Rewrite ten generic captions into specific claims supported by a detail, example, or artifact.',
    'What creates credible social copy?', 'Clear meaning, concrete specificity, supportable proof, active language, and a consistent point of view.');
  add('W0','w0_cta','Calls to action that continue the value',
    'Why can “follow for more” reduce an otherwise strong ending?',
    'A CTA asks for the next behavior appropriate to the audience’s readiness and the content’s job. It should feel like the next useful step, not rent demanded after attention.',
    'Low-friction actions include watch, save, share, reply, comment, or follow; higher-friction actions include DM, click, subscribe, book, trial, or purchase. Too many simultaneous asks split response.',
    'Choose one primary action, state the user benefit, remove uncertainty, match the platform, and track the correct denominator. Use conversational CTAs only when the answer genuinely matters.',
    'High attention with weak action can mean the CTA is misaligned, vague, too costly, or offered before sufficient proof.',
    'Write six CTAs for one post at different commitment levels and select the one matched to its funnel job.',
    'What makes a CTA effective?', 'One clear, valuable next step matched to audience readiness, content proof, platform behavior, and measurement.');

  // ── P0 · PRODUCTION + EDITING ────────────────────────────
  mod('P0', 'Level 5 · Production, Editing &amp; Design (Ralston Spine)', 'Phone-to-studio capture, talent direction, visual grammar, editing, audio, graphics, accessibility, and file systems.');
  add('P0','p0_prepro','Pre-production — spend thought before money',
    'Which production problem is cheapest to solve before filming starts?',
    'Pre-production turns a strategy into a shootable plan: objective, concept, script or beats, locations, people, props, permissions, shot list, schedule, gear, risk, deliverables, and backups.',
    'Every unresolved decision becomes time pressure on set. Shot planning protects the opening, proof, transitions, coverage, and platform crops instead of hoping the edit can invent missing evidence.',
    'Run a creative brief review, feasibility check, visual treatment, shot list, call sheet, releases, weather/noise check, gear test, storage check, and contingency plan.',
    'If the edit lacks the exact image that proves the claim, pre-production failed even if the footage is beautiful.',
    'Pre-produce a 60-minute batch shoot that yields three shorts, one carousel asset set, and one long-form segment.',
    'What does pre-production primarily protect?', 'The idea and required proof by resolving people, place, shots, assets, schedule, risk, and deliverables before capture.');
  add('P0','p0_camera','Phone camera fundamentals',
    'Why does moving closer to a window often improve video more than buying a camera?',
    'Exposure, light direction, focus, lens choice, composition, stability, frame rate, shutter behavior, white balance, and clean lenses determine whether footage communicates clearly.',
    'Large soft light creates readable faces; backlight without compensation creates silhouettes; digital zoom destroys detail; mixed color temperatures weaken skin tone; unstable framing raises cognitive friction.',
    'Clean the lens, select resolution and frame rate intentionally, lock focus/exposure where useful, protect highlights, compose for the final crop, create depth, and record a ten-second test.',
    'If skin tone shifts between cuts or the subject competes with the background, control white balance, light, and composition before adding filters.',
    'Film the same 15-second delivery in window light, overhead light, and backlight; compare exposure, skin, and background separation.',
    'What is the highest-leverage beginner lighting move?', 'Use a large soft source such as a window, place the subject intentionally, and remove conflicting or harsh light.');
  add('P0','p0_audio','Audio that keeps attention',
    'Why can viewers tolerate imperfect images but leave clear ideas with bad sound?',
    'Speech intelligibility is non-negotiable. Microphone distance, room reflections, clothing noise, wind, gain, monitoring, backup capture, music balance, and loudness consistency shape comprehension and trust.',
    'A microphone close to the mouth captures more voice relative to noise. Soft rooms reduce reflections. Monitoring catches failures the camera meter cannot explain.',
    'Choose the quietest workable space, place and conceal the mic correctly, monitor with headphones, record a backup, capture room tone, prevent clipping, and mix dialogue before music.',
    'If captions are required to decipher rather than support speech, fix capture or dialogue mixing first.',
    'Record and compare phone-distance audio, lav audio, and close directional audio in the same room; document the failure modes.',
    'What usually improves spoken audio most?', 'Reduce microphone distance and environmental noise, monitor the signal, and protect a clean backup.');
  add('P0','p0_talent','Directing talent and the filming environment',
    'How does the person behind the camera change the performance in front of it?',
    'Ralston’s filming playbook treats trust and energy as production variables. Prepared gear, a comfortable environment, clear expectations, active listening, positive reinforcement, and useful follow-ups improve performance.',
    'Self-conscious talent monitors themselves instead of communicating. Warm-up time, conversational prompts, visible engagement, hydration, breaks, and specific feedback reduce that load.',
    'Set tone early, explain the process, begin with easy wins, film in chunks, keep rolling through useful moments, ask deeper follow-ups, mark strong soundbites, and end by naming what worked.',
    'If talent becomes flatter across the session, examine fatigue, interruption, unclear direction, excessive correction, or loss of psychological safety.',
    'Direct a 30-minute interview and produce a talent note: energy pattern, strongest prompt, weak prompt, best clip, and next-session adjustment.',
    'What is the director’s core responsibility with talent?', 'Create a prepared, trusting environment and use attentive prompts and feedback to help the person communicate naturally.');
  add('P0','p0_edit','Editing for comprehension and retention',
    'Should every pause be removed from a social video?',
    'Editing controls information, emotion, time, and attention. The goal is not maximum cut density; it is minimum confusion and purposeful progression.',
    'Cuts remove dead time, reorder logic, emphasize reactions, reveal proof, and vary stimulus. B-roll, punch-ins, graphics, captions, sound, and pacing should support meaning rather than camouflage a weak premise.',
    'Build the clean story first, tighten redundancies, strengthen the opening, place visual proof at the spoken claim, vary only when attention needs renewal, mix audio, caption, and watch without sound.',
    'If the edit feels fast but viewers cannot restate the point, stimulation replaced comprehension.',
    'Create restrained and high-stimulation edits from the same footage; test recall, perceived credibility, and retention.',
    'What is the editor optimizing before cut frequency?', 'Clear progression, proof, emotion, comprehension, and delivery of the promised payoff.');
  add('P0','p0_design','On-screen text, thumbnails, carousels, and accessibility',
    'What must a thumbnail communicate before a viewer reads every word?',
    'Design creates hierarchy under small-screen constraints. Contrast, scale, spacing, type, color, safe zones, imagery, sequence, and accessibility guide attention and communicate value.',
    'A thumbnail or first slide makes a selection promise; captions provide access and silent comprehension; carousel pacing turns slides into beats; alt text and readable contrast expand usability.',
    'Use one focal idea, minimal high-value text, tested mobile legibility, safe margins, consistent identity, accurate captions, meaningful alt text, and platform-specific crops. [VERIFY LIVE] dimensions.',
    'If the asset works only when enlarged on a desktop, it fails the actual consumption context.',
    'Design three thumbnail directions and a seven-slide carousel; run a five-second clarity test on a phone.',
    'What is the first job of social design?', 'Create immediate hierarchy and comprehension on the actual device while preserving accuracy, identity, and accessibility.');

  // ── D0 · WATERFALL DISTRIBUTION ──────────────────────────
  mod('D0', 'Level 6 · Waterfall Distribution (Ralston Spine)', 'Pillar content, native adaptation, cadence, publishing QA, engagement, and content lifecycle.');
  add('D0','d0_pillar','Choose pillar content worth mining',
    'If the audience consumed only one piece this week, what would deserve that attention?',
    'Ralston’s Waterfall starts with a dense pillar: long-form video, podcast, newsletter, deep post, interview, live, or research asset containing multiple complete insights.',
    'A strong pillar supplies proof, stories, examples, objections, quotes, demonstrations, and clear sections. Thin source material creates repetitive micro-content.',
    'Choose one strategic question, build a deep answer, capture clean chapter boundaries and visual moments, then mark standalone ideas while recording.',
    'If clips require missing context or all repeat the same claim, improve the pillar before asking editors for more output.',
    'Create one 15–30 minute pillar designed to yield at least twelve distinct derivatives.',
    'What makes content suitable as a Waterfall pillar?', 'It is a high-value, structured source with enough distinct proof, stories, examples, and sections to create native derivatives.');
  add('D0','d0_mining','Mine micro-content without making leftovers',
    'When does a clip from a great interview still become weak short-form?',
    'Micro-content must stand alone. Mining finds complete tensions, claims, stories, demonstrations, questions, quotes, and objections, then rebuilds context and packaging for each unit.',
    'A timestamp is not a finished clip. The derivative needs its own opening, setup, progression, payoff, captions, crop, and CTA; sometimes the best derivative is rewritten rather than clipped.',
    'Log candidate moment, audience job, premise, missing context, format, new hook, proof, platform, CTA, and status. Rank by independent value, not celebrity of the source.',
    'If a viewer must have watched the full episode to understand the clip, it has not been adapted.',
    'Extract twelve derivatives: clips, carousel, thread, quote graphic, email, story sequence, and follow-up premise.',
    'What turns an excerpt into true micro-content?', 'A complete standalone promise, context, progression, payoff, and native package for its audience and surface.');
  add('D0','d0_native','Native adaptation across platforms',
    'Why is changing aspect ratio not enough to call content repurposed?',
    'The Waterfall preserves the core message while adapting presentation to audience expectations and platform behavior. Native does not mean abandoning brand identity.',
    'Hook language, pacing, duration, title, thumbnail, caption, search terms, interaction, CTA, and format conventions alter selection and satisfaction on each surface.',
    'Create a master message and platform briefs: what remains true, what changes, what surface receives it, what action fits, and what metric evaluates it.',
    'If every version shares the same first frame, caption, duration, and CTA, distribution has become duplication.',
    'Adapt one idea into TikTok, Reel, Short, LinkedIn post, X thread, Pinterest pin, Story, and email without losing the core claim.',
    'What should repurposing preserve and what should it change?', 'Preserve the core truth and proof; change packaging, pacing, context, format, CTA, and metadata for the platform and surface.');
  add('D0','d0_cadence','Cadence is a capacity promise',
    'Is the highest sustainable posting frequency always the best cadence?',
    'Cadence balances strategic coverage, audience expectation, quality threshold, learning speed, production capacity, and team health. Consistency means a reliable system, not daily punishment.',
    'Publishing more creates samples but also consumes ideas, review capacity, and community attention. Quality over quantity does not excuse an insufficient sample; volume does not excuse low value.',
    'Estimate weekly capacity by stage, set a minimum viable cadence, batch compatible work, protect reactive space, and review whether frequency improves learning or merely output.',
    'Repeated missed dates indicate a capacity, scope, or approval problem—not a motivation slogan shortage.',
    'Run a four-week cadence experiment and log planned vs shipped, hours, quality misses, response, and recovery cost.',
    'How should a professional set cadence?', 'At the highest sustainable level that preserves strategic value, learning speed, community care, quality, and team health.');
  add('D0','d0_publish','Publishing QA, metadata, and timing',
    'Can an excellent video underperform because the upload package is careless?',
    'Publishing is the final production stage: account, file, cover, title, caption, tags, links, location, disclosure, accessibility, collaborators, permissions, and timing must be correct.',
    'Metadata helps humans and systems classify the content; timing can affect initial audience availability but rarely repairs weak demand. Eligibility and policy issues can limit recommendation.',
    'Use a two-person checklist for high-risk posts. Confirm correct account, clean master, safe zones, spelling, claims, rights, disclosures, CTA destination, tracking, and scheduled time. [VERIFY LIVE] features.',
    'If results collapse after a workflow change, inspect export, rights, eligibility, audience settings, link, and publish configuration before rewriting strategy.',
    'Build and use a platform QA checklist on the next ten posts; record every prevented error.',
    'What is the correct view of posting time?', 'A contextual distribution variable worth testing—not a substitute for audience demand, packaging, or content satisfaction.');
  add('D0','d0_aftercare','The first 24 hours and the content lifecycle',
    'Does a creator’s job end when the post becomes public?',
    'Publishing opens a feedback event. Community response, moderation, corrections, story support, collaborator activation, comment mining, and early diagnostics create value beyond the upload.',
    'Comments reveal confusion and new premises; shares and saves reveal utility or identity value; platform-specific curves differ. Evergreen winners can be reframed, updated, expanded, or redistributed.',
    'Monitor appropriately, answer real comments, pin useful context, correct errors visibly, capture questions, log initial signals, avoid compulsive refreshing, and schedule later measurement windows.',
    'Deleting a slow starter too early destroys evidence and may interrupt delayed discovery; ignoring a harmful error protects neither trust nor performance.',
    'Run a 24-hour aftercare protocol and convert at least five audience responses into backlog entries or improvements.',
    'What should happen after publishing?', 'Community care, risk monitoring, question capture, measured diagnostics, and lifecycle decisions—not panic or abandonment.');

  // ── V0 · VIRALITY OPERATING SYSTEM ──────────────────────
  mod('V0', 'Level 7 · The Virality Operating System', 'A rigorous formula for increasing viral probability: demand, packaging, hold, retention, satisfaction, spread, and iteration.');
  add('V0','v0_formula','The virality formula — probability, not magic',
    'If two posts have identical retention, why might one reach ten times more people?',
    'Virality is nonlinear distribution created when a strong idea repeatedly satisfies expanding groups of suitable viewers. No formula guarantees it; a formula makes the controllable stages visible.',
    'Use: qualified demand × eligibility × packaging/selection × opening hold × sustained consumption × satisfaction × spread × audience expansion × iteration speed. A near-zero stage constrains the product.',
    'Score every concept and published post across the stages. Improve the weakest plausible constraint before polishing an already-strong stage.',
    'Strong retention with limited expansion can mean narrow demand, weak share motive, competition, seasonality, or insufficient evidence—not necessarily suppression.',
    'Create a virality scorecard for twenty posts and write one next-test hypothesis for each.',
    'What is the value of a virality formula if it cannot guarantee virality?', 'It decomposes a nonlinear outcome into controllable stages, diagnostics, and testable improvements.');
  add('V0','v0_demand','Demand, timing, and addressable audience',
    'Can a perfectly delivered idea exceed the number of people who care about it?',
    'Reach begins with addressable demand: the number and intensity of people for whom the idea is relevant now or can be framed through a universal tension.',
    'Topic interest, seasonality, novelty, news cycles, cultural context, competition, and audience saturation change the available pool. Strong framing can widen entry without falsifying the specialist value.',
    'Validate through search behavior, comment frequency, competitor patterns, community intensity, trend velocity, recurring questions, and sales evidence. Classify evergreen, seasonal, reactive, and emerging ideas.',
    'High satisfaction among a tiny expert group can be a strategic win even when it is not a mass-distribution candidate.',
    'Take one narrow expert topic and produce three accurate framings: specialist, adjacent, and universal.',
    'What sets the upper boundary on viral reach?', 'The size and intensity of qualified demand, modified by timing, framing, competition, and audience expansion.');
  add('V0','v0_selection','Selection — win the click, stop, or swipe',
    'What does a viewer know before deciding to consume?',
    'Selection is the content’s external promise: topic, first frame, title, thumbnail, opening motion, source, and context. It must communicate value and tension faster than competing options.',
    'Feeds measure stops or watches; YouTube exposes impressions and CTR; short-form surfaces expose viewed-versus-swiped or early hold where available. Selection must be interpreted by traffic source and audience breadth.',
    'Generate multiple packages before production, clarity-test them with target people, ensure each truthfully predicts the payoff, and preserve learning by changing one main variable.',
    'High selection plus a first-seconds cliff means packaging overpromised, confused, or attracted the wrong person.',
    'Create ten packages for one body of content and run a blind five-second promise test.',
    'What should selection packaging accomplish?', 'Make the right person quickly understand and desire the truthful value the content will immediately begin delivering.');
  add('V0','v0_retention','Retention engineering — every second earns the next',
    'Is completion rate alone enough to compare a 12-second clip and a 90-second explanation?',
    'Retention is a curve, not one number. Opening hold, average watch time, percentage viewed, completion, rewatches, peaks, dips, and exits reveal different behavior and depend on length and intent.',
    'Progression, unanswered questions, stakes, proof, pattern changes, emotional turns, visual causality, compression, and anticipated payoff maintain attention. Filler and delayed value create avoidable exits.',
    'Annotate the curve against script beats. Move late peaks earlier, inspect steep dips, distinguish satisfying completion from accidental loops, and compare like lengths and traffic sources.',
    'A dip at a specific claim may indicate confusion, disbelief, repetition, or an unwanted CTA—not simply “short attention spans.”',
    'Perform a second-by-second retention autopsy on five videos and rewrite the weakest segment.',
    'How should retention be analyzed?', 'As a length- and source-aware curve aligned to content beats, not as one universal completion benchmark.');
  add('V0','v0_satisfaction','Satisfaction — the hidden reason watch time is insufficient',
    'Why might people finish a video and still teach the platform not to recommend it?',
    'Platforms aim to create useful or enjoyable sessions, so completion without satisfaction can be hollow. Positive actions, survey feedback, continued viewing, follows, saves, shares, comments, and negative feedback add context.',
    'Content can hold attention through outrage or deception while producing regret, hiding, dislikes, distrust, or no future consumption. Durable growth aligns the click, experience, and after-effect.',
    'Define the intended after-effect: informed, entertained, moved, capable, connected, curious, or ready to act. Ask whether the payoff and CTA created it.',
    'High watch with weak follows, saves, shares, return viewers, or conversion may mean passive curiosity rather than brand value.',
    'Survey ten viewers immediately and one day later: expected value, actual value, recall, feeling, and next action.',
    'What is content satisfaction?', 'The viewer’s positive evaluation and after-effect after consumption—not merely time spent.');
  add('V0','v0_spread','Share psychology and social transmission',
    'What does a share allow the sender to say about themselves or their relationship?',
    'People share to help, entertain, signal identity, strengthen a relationship, participate culturally, express emotion, warn, advocate, or start a conversation. Spread is a human motive before it is a metric.',
    'Private sends often carry stronger relational intent than public likes. The recipient and message context determine whether a piece can travel beyond its initial audience.',
    'Design for a named transfer: “who sends this to whom, and why now?” Create useful compression, quotable language, identity recognition, emotional charge, or timely relevance without begging.',
    'Strong consumption with weak sharing may mean the content was personally useful but not socially useful—or the receiver was unclear.',
    'Rewrite five good ideas around five distinct share motives and predict the sender-recipient pair.',
    'What is the core question behind shareable content?', 'Who will send this to whom, what relationship or identity does the send serve, and why now?');
  add('V0','v0_loops','Growth loops, series, and viral follow-through',
    'What should happen after a post breaks out so the attention compounds?',
    'A viral event becomes growth only when the profile, content library, series, follow-up, community, and offer help new viewers continue. Otherwise reach evaporates.',
    'Loops connect output to new input: comments create response posts, winners create sequels, viewers contribute examples, collaborations merge audiences, customers create proof, and owned channels return attention.',
    'Prepare pinned orientation, clear bio, strongest proof, next episode, response capacity, email/lead path, and sequel rules. Protect quality instead of flooding copies of the winner.',
    'A view spike with flat profile actions, followers, return viewers, or leads signals a capture problem or wrong-audience breakout.',
    'Build a breakout checklist and a five-part sequel tree for the highest-potential series.',
    'What converts a viral post into durable growth?', 'A profile, library, series, follow-up, community, and funnel that capture and continue the new viewer’s interest.');

  // ── N0 · ANALYTICS + EXPERIMENTATION ────────────────────
  mod('N0', 'Level 8 · Analytics &amp; Experimentation', 'Metric trees, clean tests, retention diagnosis, attribution, reporting, and decision-making under uncertainty.');
  add('N0','n0_tree','Build a metric tree from revenue backward',
    'Which leading metric would you monitor before monthly revenue can answer?',
    'A metric tree links business outcome to conversion, qualified demand, traffic, content response, and production inputs. It distinguishes controllable leading indicators from delayed lagging results.',
    'Revenue may equal customers × average value; customers depend on qualified leads × close rate; leads depend on CTA response × qualified reach; reach depends on output and content performance.',
    'Draw the tree, define each metric and source, select one north-star outcome plus stage KPIs and guardrails, and assign review frequency and owner.',
    'If the team celebrates reach while qualified demand, retention, or profit falls, the dashboard is optimizing a disconnected branch.',
    'Build metric trees for a creator brand, local service, ecommerce brand, and B2B expert.',
    'Why use a metric tree?', 'To connect daily content signals and controllable inputs to funnel behavior and the actual business outcome.');
  add('N0','n0_measure','Measurement hygiene and data dictionary',
    'Can two platforms report “views” that mean different things?',
    'Metrics are products with definitions, windows, exclusions, estimates, and revisions. Professional analysis records exactly what was counted, where, when, and for which population.',
    'Inconsistent naming, timezone, organic/paid mixing, duplicated conversions, missing UTM parameters, and changing attribution windows create false comparisons.',
    'Maintain metric name, platform definition, formula, source, timezone, window, extraction date, limitations, owner, and change log. Freeze snapshots before platforms age out details. [VERIFY LIVE].',
    'A sudden performance jump that coincides with a definition or reporting change is a data-quality suspect before a strategy victory.',
    'Create a data dictionary and QA one month of exported analytics for missing, duplicated, or incompatible fields.',
    'What makes cross-platform reporting trustworthy?', 'Explicit definitions, compatible denominators and windows, source records, change logs, and separation of unlike metrics.');
  add('N0','n0_test','Single-variable creative experiments',
    'Why does changing the hook and topic together destroy useful learning?',
    'An experiment starts with a falsifiable hypothesis, primary metric, controlled variable, comparable audience, sufficient exposure, decision rule, and documented result.',
    'Simultaneous changes confound cause. Platform delivery also introduces noise, so repeated directional tests and native split-test tools are stronger than comparing two unrelated posts.',
    'Write “If we change X for audience Y, metric Z should move because mechanism M.” Keep other high-impact variables stable, predefine duration/sample and stopping rule, then record outcome and limitation.',
    'A winner on a tiny or mismatched sample is a lead for replication, not a law.',
    'Run a four-variant hook test against one content body and replicate the winner on a second premise.',
    'What makes a creative test interpretable?', 'A clear hypothesis, one main variable, comparable exposure, predefined metric and rule, and documented limitations.');
  add('N0','n0_stats','Sample size, variance, and false certainty',
    'Does a 40% improvement on 20 views prove a creative winner?',
    'Organic distribution is noisy. Audience composition, timing, competition, topic, and random exposure can produce large percentage swings on small samples.',
    'Confidence grows through more observations, replication, similar comparison groups, effect size, and consistent direction. Statistical significance does not guarantee business significance.',
    'Report sample, absolute counts, rate, baseline, range, test conditions, and confidence level. Label anecdotal, directional, and decision-grade evidence.',
    'If one outlier dominates the average, inspect median, distribution, and content mix before declaring a new baseline.',
    'Analyze a 30-post dataset using totals, medians, rates, ranges, and outliers; write what remains uncertain.',
    'How should small-sample wins be treated?', 'As directional hypotheses requiring more exposure or replication, with absolute counts and uncertainty disclosed.');
  add('N0','n0_attribution','Attribution, UTMs, pixels, and incrementality',
    'If three platforms claim credit for one sale, which one caused it?',
    'Attribution assigns observed credit under a rule; incrementality estimates what would not have happened without the activity. They are related but not identical.',
    'Clicks, views, cookies, device changes, privacy controls, offline actions, branded search, and multiple touches create competing claims. Pixels/server events, UTMs, CRM source, promo codes, surveys, and experiments provide partial evidence.',
    'Define conversion events, UTM taxonomy, platform data connections, deduplication, CRM capture, attribution windows, and periodic holdout or lift tests where feasible. [VERIFY LIVE] consent and tools.',
    'A platform-reported ROAS that ignores returns, margin, existing demand, or duplicate credit can overstate business value.',
    'Trace five mock customer journeys and show how last-click, first-click, platform view-through, and incrementality would differ.',
    'What is the difference between attribution and incrementality?', 'Attribution distributes observed credit; incrementality asks what outcome was caused beyond what would have occurred anyway.');
  add('N0','n0_report','Reporting that causes decisions',
    'What should a client know after reading the first page of a report?',
    'A report is a decision document: objective, executive result, why it happened, evidence, risk, next action, owner, and expected effect. Data dumps transfer interpretation work to the client.',
    'Separate output, audience, creative, funnel, and business layers. Compare with target and relevant baseline, explain anomalies, surface learning, and connect recommendations to evidence.',
    'Use summary, KPI scorecard, winners/losers with diagnosis, audience insight, funnel impact, experiments, risks, next-month plan, and appendix definitions.',
    'If every metric is green but the client is unsure what changed in the business, the report lacks a decision narrative.',
    'Build a one-page executive report and a detailed appendix from the same mock dataset; present it in ten minutes.',
    'What is the primary purpose of client reporting?', 'Turn evidence into shared understanding, decisions, ownership, and a testable next plan.');

  // ── IG · INSTAGRAM ───────────────────────────────────────
  mod('IG', 'Platform Lab · Instagram', 'Reels, Feed, Stories, search, DMs, collaborations, trials, profiles, Insights, and conversion.');
  add('IG','ig_surfaces','One app, many ranking surfaces',
    'Why does a tactic that improves Story reach not necessarily improve Explore distribution?',
    'Instagram Feed, Stories, Reels, Explore, Search, profile, DMs, broadcast/community features, and ads serve different user jobs and use distinct ranking or retrieval systems.',
    'Connected surfaces emphasize relationship and predicted interaction; unconnected discovery retrieves and ranks eligible content for likely interest. No single “Instagram algorithm” controls everything.',
    'Assign each format a surface job: Reels for discovery and entertainment, Feed/carousels for value and identity, Stories/DMs for relationship, Search for intent, profile for conversion. [VERIFY LIVE].',
    'If reach is strong but concentrated only among existing followers, inspect discovery eligibility, idea breadth, share behavior, and surface fit.',
    'Audit thirty posts by format, surface, follower/non-follower reach, action, and business outcome.',
    'How should Instagram strategy treat its surfaces?', 'As distinct user contexts with different jobs, signals, formats, and success measures.');
  add('IG','ig_reels','Reels — discovery, watch, and sends',
    'What makes a Reel travel beyond people who already know the account?',
    'Reels compete for unconnected discovery through eligible, original, relevant content that viewers choose, watch, enjoy, and share. Messaging and resharing are central to how Reels move between people.',
    'The idea, first frame, spoken/on-screen promise, progression, payoff, audio, visual legibility, and send motive create the response the recommender observes.',
    'Produce vertical, mobile-first, clean-original exports; make the topic and value obvious; use speech/text classification cues; earn sends; and inspect retention and follower mix. [VERIFY LIVE] guidance.',
    'High plays with weak watch and sends usually indicate selection without delivery; good watch with no expansion may indicate narrow demand or weak transmission.',
    'Publish twelve Reels across three repeatable series and run weekly formula-stage diagnoses.',
    'What combination most supports Reels discovery?', 'Eligible original content with clear demand, strong selection and watch behavior, satisfaction, and genuine person-to-person sharing.');
  add('IG','ig_feed','Carousels and Feed — reference value and identity',
    'Why can a carousel be more valuable than a Reel with more views?',
    'Feed posts and carousels can build depth, saves, shares, comments, profile understanding, and durable brand associations. Sequential slides support teaching, proof, comparison, and narrative.',
    'The cover earns entry; each slide resolves and opens tension; hierarchy makes scanning easy; concrete value earns saves; a coherent ending directs action.',
    'Use one promise per carousel, mobile-readable design, progressive beats, examples/proof, no filler slides, a strong final synthesis, accessibility, and a matched caption.',
    'High cover exposure with few swipes or actions points to unclear promise; strong saves with weak follows points to profile or positioning capture.',
    'Create six carousel archetypes: guide, teardown, before/after, myth, checklist, and story.',
    'When is a carousel strategically superior?', 'When sequence, reference value, proof, comparison, or saveable instruction matters more than motion or personality.');
  add('IG','ig_stories','Stories — relationship, research, and conversion',
    'Are Stories primarily a cold-audience growth tool?',
    'Stories serve the connected audience: daily presence, intimacy, context, research, objection handling, launch sequencing, social proof, and low-friction response.',
    'Replies, sticker interactions, completion, exits, and relationship history help determine relevance. Story sequences can move from attention to tension, proof, interaction, and action.',
    'Mix pulse, process, proof, participation, teaching, offer, and response. Use polls/questions for real decisions, not decorative engagement. Keep text readable and disclose paid relationships.',
    'Consistent first-card exits suggest weak relevance or excessive setup; views without replies or clicks may indicate passive documentation with no audience role.',
    'Run a seven-day Story arc with one audience research question and one conversion sequence.',
    'What is Stories’ primary strategic advantage?', 'Deepening relationships and moving known viewers through context, participation, proof, conversation, and action.');
  add('IG','ig_profile','Profile, search, collaborations, and Trial Reels',
    'What happens between a non-follower seeing a Reel and deciding to follow?',
    'The profile converts attention into understanding: recognizable identity, searchable name/category, clear promise, proof, pinned orientation, highlights, link, and recent content consistency.',
    'Collab posts merge distribution and social proof; search uses content and query relevance; Trial Reels can test with non-followers before broader sharing. Availability and behavior change. [VERIFY LIVE].',
    'Optimize photo/name/bio, pin premise/proof/start-here, organize highlights, use descriptive spoken/text/caption language, propose aligned collaborations, and test ideas through available trial tools.',
    'Strong non-follower reach with weak profile visits or follows points to off-positioning content, weak curiosity, or a leaking profile.',
    'Run a four-second profile test with ten target strangers and deploy one aligned Collab or Trial Reel experiment.',
    'What should an Instagram profile answer immediately?', 'Who this is for, what valuable change it offers, why to believe it, and what to do next.');
  add('IG','ig_dm','Comments, DMs, broadcast, and community operations',
    'When should a public comment move into a private conversation?',
    'Instagram’s relationship layer turns content into conversation and qualification. Comments provide public value; DMs handle personal context, sensitive details, service qualification, and follow-up.',
    'Response quality affects trust and produces research. Keyword automation can route useful resources when platform/API rules permit, but spam, deceptive bait, and unconsented outreach damage accounts and brand.',
    'Create response tiers, saved replies with human customization, escalation rules, lead qualification, service-level targets, moderation, privacy limits, and CRM handoff. [VERIFY LIVE] automation.',
    'Many comments with empty qualified conversations may mean the CTA attracts low-intent participation or the handoff adds friction.',
    'Process fifty interactions, tag intent, response type, sentiment, and outcome, then improve the reply library.',
    'What distinguishes community management from replying quickly?', 'Intentional public value, human conversation, qualification, moderation, escalation, privacy, and recorded learning.');
  add('IG','ig_insights','Instagram diagnostics and the 14-day launch',
    'What should a new account optimize before follower count?',
    'A new Instagram account needs a coherent profile, enough posts to create a baseline, and disciplined reps. Views are noisy; the machine is the early asset.',
    'Read accounts reached, follower mix, watch/retention where available, shares/sends, saves, comments, profile activity, follows, link/DM actions, and content-type patterns. [VERIFY LIVE] metric names.',
    'Days 1–2: profile, security, research, series. Day 3: premise, proof, useful reference. Days 4–14: one sustainable daily rep, Stories, community response, two hook tests, one collaboration ask, and two diagnostics.',
    'Do not diagnose “shadowban” until checking eligibility/status, originality, policy, export, demand, packaging, retention, satisfaction, audience, and sample.',
    'Execute the launch, save every creative and metric snapshot, then write a stage-by-stage review.',
    'What is the correct success standard for the first 14 days?', 'A secure coherent account, complete publishing/measurement loops, baseline evidence, and installed iteration habits.');

  // ── TT · TIKTOK ──────────────────────────────────────────
  mod('TT', 'Platform Lab · TikTok', 'For You, search, Creative Center, native creative, community, LIVE, Shop/brand work, analytics, and launch.');
  add('TT','tt_recommender','For You ranking and eligibility',
    'Which generally weighs more on TikTok For You: device settings or watch behavior?',
    'TikTok describes recommendation factors as user interactions, content information, and user information; for most users, interactions including time spent watching generally weigh more than device or location signals.',
    'Each feed ranks eligible candidates for an individual. Full watches, skips, shares, comments, follows, content/topic/audio information, language, and context help prediction; safety eligibility limits some allowed content.',
    'Make topic and payoff legible, create strong early hold and ongoing value, use native format, avoid policy/eligibility traps, and analyze viewer response instead of hunting a mythical account-wide trick. [VERIFY LIVE].',
    'Large initial exposure followed by a stop suggests the next audience cohort responded worse; inspect the response curve rather than inventing fixed test-pool numbers.',
    'Deconstruct twenty For You videos and tag interaction, content, user-context, and eligibility hypotheses.',
    'What factor group generally carries strong weight in TikTok recommendations?', 'User interactions—especially consumption behavior such as time watched, completion, or skipping—alongside content and user information.');
  add('TT','tt_native','TikTok-first creative grammar',
    'Why can over-polished brand creative feel easier to skip?',
    'TikTok-first creative is vertical, mobile-native, human, sound-aware, culturally fluent, fast to value, and designed for participation or entertainment rather than adapted television.',
    'Official creative guidance emphasizes 9:16, safe zones, clear proposition, hook/body/close, people, captions/text, sound, trend relevance, and continuous testing; organic work still requires audience-specific judgment.',
    'Study native openings, direct address, demonstration, POV, reply videos, green screen, stitches/duets where available, lists, stories, and search answers. Use polish only when it supports the idea.',
    'If the video looks like an ad before it creates value, selection may fall even when production quality is high.',
    'Produce one premise in five native TikTok formats and compare hold, watch, comments, and profile actions.',
    'What does “TikTok-first” mean?', 'Creative built for vertical mobile behavior, native culture, human delivery, sound, fast value, and platform interaction—not merely resized.');
  add('TT','tt_search','Creator Search Insights and TikTok SEO',
    'Where can a creator find frequently searched topics with possible content gaps?',
    'TikTok is both recommendation and search. Creator Search Insights exposes popular searches, content gaps, related topics, and search analytics where available. [VERIFY LIVE].',
    'Search ranking considers query match and content information alongside behavior. Spoken words, on-screen text, captions, topic clarity, and useful completion help a post answer intent.',
    'Research exact queries, choose one intent, say and show the phrase naturally, answer early, demonstrate proof, cover follow-up questions, and monitor search traffic and inspired-post performance.',
    'High search impressions with weak watch suggests the content matched the phrase but not the answer quality or expectation.',
    'Build a 30-query map from Creator Search Insights and publish five content-gap answers.',
    'What is the correct TikTok SEO priority?', 'Match a real query with clearly classified content that provides an immediate, satisfying answer—not keyword stuffing.');
  add('TT','tt_trends','Creative Center, trends, and cultural permission',
    'Does a trending sound automatically transfer its reach to a brand?',
    'TikTok Creative Center provides trend, keyword, ad, and creative-pattern intelligence. Trends are community templates, not free distribution coupons. [VERIFY LIVE].',
    'A trend works when the audience understands the reference, timing remains alive, and the brand adds a fitting twist. Late or forced use signals distance from the culture.',
    'Track region, industry, growth curve, examples, semantic meaning, creator/community origin, commercial music rights, saturation, brand angle, and production deadline.',
    'If the idea depends entirely on recognition of the trend and says nothing distinctive, it builds the trend more than the brand.',
    'Create a weekly TikTok trend memo and execute one join, one adaptation, and one intentional rejection.',
    'What determines whether a trend is usable?', 'Audience relevance, cultural understanding, timing, a native brand contribution, rights, and acceptable risk.');
  add('TT','tt_community','Comments, replies, LIVE, and community loops',
    'Why can a critical comment become a stronger post than the original?',
    'TikTok communities co-create meaning through comments, reply videos, stitches/duets, LIVE, recurring jokes, and creator interaction. The response surface is an idea engine and trust layer.',
    'Public questions reveal unmet context; reply videos inherit a visible prompt; LIVE creates depth and real-time feedback; recurring audience contributions create participation loops.',
    'Tag comments by question, objection, story, sentiment, request, and risk. Reply publicly when useful, privately when personal, escalate threats, and convert repeated questions into series.',
    'High comments dominated by confusion may signal a clarity failure, not successful community engagement.',
    'Run one LIVE or structured Q&A, create five reply posts, and document recurring language and moderation needs.',
    'What is the most strategic use of TikTok comments?', 'Serve people publicly while converting repeated questions, objections, and stories into research, replies, and series.');
  add('TT','tt_commerce','Creators, brands, Spark Ads, Shop, and disclosure',
    'Who owns approval and disclosure when creator content becomes a paid ad?',
    'TikTok brand work can include organic partnerships, creator marketplace tools, Spark Ads, paid content, affiliate/Shop content, and direct ads. Each adds rights, disclosure, claims, measurement, and approval obligations.',
    'Spark-style amplification uses organic creator or brand posts with authorization; commerce content must preserve truthful experience and clear material-connection disclosure. Features vary by market. [VERIFY LIVE].',
    'Document brief, deliverables, usage term, territories, paid amplification, whitelisting/authorization, exclusivity, revisions, disclosure, claims, music rights, reporting, and payment.',
    'A high-view creator post can still fail commercially when audience fit, offer, landing experience, tracking, or usage rights were weak.',
    'Draft a creator partnership brief and rights matrix for organic-only, 30-day paid use, and extended usage.',
    'What must be agreed before using creator content commercially?', 'Deliverables, rights and duration, paid amplification authorization, disclosure, claims, approvals, measurement, and payment.');
  add('TT','tt_analytics','TikTok analytics and the 30-post apprenticeship',
    'What does a strong average watch time hide if the opening loses most viewers?',
    'TikTok diagnosis combines traffic source, viewed/skipped or early hold where shown, average watch, percentage viewed, completion, shares, saves/favorites, comments, follows, profile actions, search, and audience data. [VERIFY LIVE].',
    'One average can hide an opening cliff and a small highly engaged remainder. Analyze the curve or available retention moments, content length, cohort, and outcome together.',
    'Publish 30 controlled reps across three series: ten search-led, ten share-led, ten story/personality-led. Review every five posts and alter one stage at a time.',
    'If a post earns views but no profile action, verify whether the premise represents the brand and whether the profile continues the promise.',
    'Complete the apprenticeship with a scorecard, five replicated learnings, five disproved beliefs, and the next 30-post plan.',
    'What is the purpose of the 30-post apprenticeship?', 'Create enough structured evidence to distinguish recurring audience and creative patterns from isolated wins or losses.');

  // ── YT · YOUTUBE ─────────────────────────────────────────
  mod('YT', 'Platform Lab · YouTube', 'Long-form, Shorts, Search, Home, Suggested, packaging, retention, channel architecture, monetization, and analytics.');
  add('YT','yt_system','YouTube recommendations — appeal, engagement, satisfaction',
    'Does YouTube push videos to an audience, or find videos for viewers?',
    'YouTube describes recommendations as helping each viewer find videos they want and maximizing long-term satisfaction. Content performance can be understood through appeal, engagement, and satisfaction.',
    'Personalization and context shape candidate fit; when offered, the viewer chooses or ignores, watches or leaves, and reports satisfaction through behavior and feedback. Topic interest and competition affect impressions.',
    'Know the audience, make a compelling truthful package, deliver the promise, use series/playlists/end screens to continue value, and prioritize sustainable quality over arbitrary volume.',
    'Good CTR and watch time do not guarantee unlimited impressions when the addressable audience is small or competing videos perform better.',
    'Audit ten channel videos across traffic source, appeal, engagement, satisfaction proxies, and audience size.',
    'What are YouTube’s three useful content-performance buckets?', 'Appeal—did they choose it; engagement—did they keep watching; satisfaction—did they value the experience.');
  add('YT','yt_ideas','YouTube ideas and audience expansion',
    'How can a specialist topic become broadly clickable without becoming inaccurate?',
    'YouTube ideas scale when a core audience cares intensely and an adjacent audience has an accessible entry. Universal stakes, familiar objects, timely events, surprising questions, or transformations can widen framing.',
    'Search-led ideas answer explicit demand; browse-led ideas create desire before a query; suggested-led series continue an existing viewing path. Each requires different packaging and expectations.',
    'Write the core viewer, potential viewer, tension, promise, proof, visual concept, traffic-source hypothesis, and follow-on video before production.',
    'A topic that performs only in Search may solve a narrow need; forcing it into broad entertainment packaging can reduce qualified satisfaction.',
    'Build a 25-idea slate split across search, browse, suggested-series, and Shorts discovery.',
    'How should a YouTube idea widen its audience?', 'Use an accessible truthful framing around universal stakes or curiosity while preserving the specialist payoff and proof.');
  add('YT','yt_package','Titles and thumbnails — one promise, two assets',
    'Should the title repeat every word shown on the thumbnail?',
    'The title and thumbnail cooperate to communicate topic, value, tension, and credibility. Redundancy wastes limited space; contradiction or deception destroys satisfaction.',
    'Impressions and CTR measure opportunity and selection within traffic-source context. CTR often changes as the video expands beyond core viewers; a lower CTR can accompany healthy larger reach.',
    'Develop packages before filming, create distinct concepts rather than cosmetic variations, test mobile legibility, ensure the opening confirms the package, and use native Test & Compare where available. [VERIFY LIVE].',
    'High CTR with weak early retention means the package attracted a click the video did not quickly justify.',
    'Create twenty title/thumbnail pairs for three ideas and run a blind expectation test.',
    'How should title and thumbnail work together?', 'They communicate one truthful promise through complementary—not wastefully duplicated—information.');
  add('YT','yt_long','Long-form structure and retention',
    'Is there one ideal YouTube video length?',
    'YouTube states there is no universal optimal length; the right length delivers the value without filler. Long-form earns time through structured progression and satisfying depth.',
    'The opening confirms the package; roadmap reduces uncertainty; chapters create progression; stories, examples, proof, contrast, and open questions renew attention; the ending resolves and continues the session.',
    'Outline cold open, promise confirmation, stakes, roadmap, escalating sections, pattern changes, midpoint re-hook, payoff, synthesis, and next-view bridge. Remove repeated introductions and premature CTAs.',
    'A late retention spike suggests the compelling material should have appeared earlier; a sudden dip can mark confusion, repetition, or an unwanted segment.',
    'Produce an 8–15 minute video and annotate every retention change against its edit/script beat.',
    'What determines ideal YouTube length?', 'The precise time needed to deliver and sustain the promised value for that audience—without filler.');
  add('YT','yt_shorts','YouTube Shorts as discovery and format',
    'Will a Shorts viewer automatically become a long-form viewer?',
    'Shorts are their own viewing format and discovery surface. Cross-format recommendation is possible, but viewer preferences differ; format bridges must be designed rather than assumed.',
    'Stayed-to-watch or early selection, consumption, satisfaction, topic fit, and continued viewing matter. A Short can test premises, tell complete stories, answer queries, or open a path to related depth.',
    'Make a complete short-form payoff, then connect interested viewers through related video tools, pinned context, series, profile organization, and topic consistency. [VERIFY LIVE].',
    'High Shorts reach with no long-form movement may reflect format preference, weak bridge, or a promise not represented in long-form.',
    'Create six Shorts: two complete originals, two long-form derivatives, and two search answers; compare audience and continuation.',
    'What is the correct role of Shorts?', 'A complete native format for discovery and value that can bridge to depth when the topic, viewer intent, and path align.');
  add('YT','yt_channel','Channel architecture, Search, and session continuation',
    'What should a new viewer watch after the first useful video?',
    'A channel is a library and recommendation graph. Clear topic clusters, series, playlists, home sections, descriptions, end screens, cards, comments, and follow-on promises help people discover more.',
    'Search matches query relevance and engagement; Home predicts broad personalized appeal; Suggested continues a viewing context. Architecture should serve all without keyword stuffing.',
    'Create a start-here path, three series, consistent packaging grammar, playlists by viewer job, end-screen logic, description/search context, and a next-video CTA tied to unresolved need.',
    'Many one-off views with few return viewers or second videos indicate isolated answers rather than a coherent viewing proposition.',
    'Map a 12-video cluster where each video answers one question and creates a legitimate next question.',
    'How does channel architecture compound growth?', 'It helps viewers and recommendation systems understand the promise and find a satisfying next video or series.');
  add('YT','yt_analytics','YouTube Studio diagnostics and monetization integrity',
    'What does rising impressions with falling CTR sometimes indicate?',
    'YouTube Studio connects impressions, CTR, views, watch time, average duration, retention moments, traffic sources, viewers, return behavior, subscribers, end screens, revenue, and format-specific signals.',
    'Context prevents false diagnosis: Browse CTR differs from Search; broader expansion can lower CTR; revenue varies by audience, geography, topic, season, advertiser demand, and format.',
    'Review idea demand, package, opening, curve, satisfaction actions, traffic source, viewer type, continuation, and business result. Separate monetization from editorial integrity and disclose sponsorships.',
    'Changing a thumbnail may help when CTR is low and impressions are weak, but it cannot repair a video that fails its promise after the click.',
    'Produce a full video postmortem and choose exactly one package test plus one future-content learning.',
    'How should YouTube CTR be interpreted?', 'With impressions, traffic source, audience breadth, watch behavior, satisfaction, and business context—not as an isolated universal benchmark.');

  // ── PX · FACEBOOK, THREADS, LINKEDIN, X, PINTEREST ──────
  mod('PX', 'Platform Lab · Facebook, Threads, LinkedIn, X &amp; Pinterest', 'Master the remaining major networks by user intent instead of treating them as repost bins.');
  add('PX','px_facebook','Facebook — communities, Pages, Groups, Reels, and local reach',
    'Why might a useful post thrive in a Facebook Group and fail on a brand Page?',
    'Facebook combines relationship Feed, recommended content, Groups, Pages, Events, Marketplace, video/Reels, messaging, and ads. Each surface carries different trust, identity, and intent.',
    'Groups reward relevant participation within a community context; Pages create an owned public identity; Reels support discovery; local features and Events can translate attention into real-world action.',
    'Build Page fundamentals, participate before promoting in Groups, adapt Reels natively, use Events and local proof where relevant, and avoid unrelated captions, engagement gaming, or mass repost spam. [VERIFY LIVE].',
    'Reach without meaningful comments, messages, event responses, or site behavior can indicate entertainment detached from the business job.',
    'Create a Page audit, a community participation plan, one native Reel, one discussion post, and one local/event concept.',
    'What determines the correct Facebook surface?', 'The audience relationship and job: discovery, community discussion, public brand identity, local action, event participation, or conversion.');
  add('PX','px_threads','Threads — conversational authority and fast feedback',
    'What makes a short text post start a real conversation instead of collecting empty agreement?',
    'Threads is a public conversation network connected to Instagram identity. It favors timely ideas, replies, distinct voice, community participation, and text-led experimentation more than polished campaign broadcasting.',
    'A useful post creates a clear claim, observation, question, tension, or story that leaves room for others. Replies reveal language and objections that can become deeper assets elsewhere.',
    'Publish compact original thoughts, respond with substance, quote/repost with added context, build recurring themes, and use links or promotion selectively. [VERIFY LIVE] features and analytics.',
    'Many impressions with shallow replies may mean the prompt invited reflex rather than a meaningful point of view.',
    'Run a 14-day conversational sprint: one original idea and ten valuable replies daily, then cluster what resonated.',
    'What is Threads’ strongest strategic role?', 'Fast public conversation that develops voice, relationships, audience language, and testable ideas.');
  add('PX','px_linkedin','LinkedIn — professional identity, expertise, and demand',
    'Why is a useful LinkedIn audience often more valuable than a larger general audience?',
    'LinkedIn connects professional identity, network relationships, expertise, hiring, partnerships, and B2B demand. Viewer demographics and downstream conversations can matter more than raw reach.',
    'Text, images, documents/carousels, native video, articles, newsletters, comments, and profiles create different depths. Specific experience and business consequence outperform generic inspiration.',
    'Optimize the profile promise and proof, publish lessons with concrete decisions/results, teach frameworks, comment where the right network gathers, use newsletters for recurring depth, and measure viewer quality. [VERIFY LIVE].',
    'High impressions with the wrong titles, industries, geographies, or seniority can be an audience-quality failure rather than success.',
    'Publish six formats and compare out-of-network reach, viewer demographics, profile actions, qualified connections, and conversations.',
    'How should LinkedIn performance be judged?', 'By relevant professional reach, authority, relationships, qualified opportunities, and business action—not impressions alone.');
  add('PX','px_x','X — real-time ideas, networks, and information velocity',
    'When does a reply create more strategic value than an original post?',
    'X is an interest graph and real-time information network where concise ideas, news response, threads, replies, lists, Spaces, and network position shape discovery and authority.',
    'Strong participation depends on timing, information value, distinct interpretation, conversational density, and credible sources. Replies can place expertise inside an existing high-relevance discussion.',
    'Build source lists, monitor the niche, publish original observations and useful threads, reply with additional evidence, use media intentionally, and move durable insight into owned archives.',
    'A spike from outrage or unrelated news may create followers with no durable interest in the brand’s work.',
    'Run a two-week listening-and-contribution protocol, then turn the best discussion into a sourced long-form asset.',
    'What makes an X reply strategically valuable?', 'It adds timely evidence or interpretation inside a relevant conversation where the intended network is already paying attention.');
  add('PX','px_pinterest','Pinterest — visual search, planning, and evergreen discovery',
    'Why can a Pin continue driving discovery after a short-form trend disappears?',
    'Pinterest is a visual discovery and planning system where people search, save, compare, and prepare future actions. Content can compound through evergreen queries and seasonal planning.',
    'Keyword relevance, image clarity, useful destination, board/topic context, freshness, saves, clicks, and commercial intent work differently from personality-first feeds. Trends often begin before the event itself.',
    'Research Pinterest Trends, create search-led titles/descriptions, design vertical legible assets, organize boards by audience job, link to a relevant destination, and plan seasonal content early. [VERIFY LIVE].',
    'High saves with weak outbound clicks can mean the Pin satisfies inspiration but the destination promise or CTA is weak.',
    'Build three boards and fifteen Pins across evergreen, seasonal, tutorial, product, and idea formats.',
    'What makes Pinterest strategically distinct?', 'Users arrive to discover, plan, save, and act, creating search-led and often longer-lived distribution.');
  add('PX','px_portfolio','Cross-platform portfolio strategy',
    'Should a beginner attempt to publish every day on every major platform?',
    'Platform mastery is demonstrated by native decisions, not account count. A primary platform builds deep feedback; secondary distribution expands useful assets; listening platforms supply intelligence.',
    'Audience overlap, content affordances, business model, production capacity, shelf life, conversion path, and operator skill determine channel priority. Spreading too early prevents sufficient reps anywhere.',
    'Score channels on audience, intent, format fit, business role, organic opportunity, paid opportunity, conversion, measurement, risk, and sustainable capacity. Revisit quarterly.',
    'If every platform is underfed and no dataset reaches a useful sample, reduce scope before increasing effort.',
    'Choose a 90-day primary/secondary/listening portfolio and define the conditions that would earn expansion.',
    'When should a brand add another active platform?', 'When audience and business value are clear and the team can execute natively without starving the proven primary system.');

  // ── F0 · COMMUNITY, FUNNEL, AND REVENUE ──────────────────
  mod('F0', 'Level 10 · Community, Funnel &amp; Conversion', 'Turn attention into trust, owned audience, qualified demand, sales, retention, and advocacy without corrupting the brand.');
  add('F0','f0_profile','The profile storefront and conversion path',
    'What are the four questions a profile must answer before a stranger leaves?',
    'A profile converts a moment of interest into continued relationship. It must communicate identity, audience, valuable change, proof, and a low-friction next step.',
    'Photo/name create recognition; bio positions; pinned work demonstrates; highlights organize proof; link hub or landing page routes intent; recent content confirms consistency.',
    'Audit promise, proof, navigation, offer, CTA, mobile load, tracking, accessibility, and message continuity from post to destination.',
    'Strong content reach with weak profile-to-follow or profile-to-action rates indicates a storefront or audience-fit leak.',
    'Run a four-second test and a task test with ten target users; revise until they can explain and act without coaching.',
    'What must the profile make obvious?', 'Who it serves, what valuable change it creates, why to believe it, and the best next action.');
  add('F0','f0_value','Value ladder, lead magnets, and owned audience',
    'Why should a creator move some audience relationship off algorithmic platforms?',
    'Social reach is rented access. Email, SMS, community, CRM records, and direct customer relationships create permission-based continuity, but only when the exchange gives real value and respects consent.',
    'A value ladder can move from free content to resource, conversation, diagnostic, entry offer, core service, and ongoing relationship. Each step should solve a complete problem and qualify the next.',
    'Create a useful resource tied to a repeated audience job, a clear landing promise, minimal form, consent language, delivery, welcome sequence, tagging, and UTM tracking.',
    'High clicks with weak signups indicate message/landing friction; high signups with no later activity means the resource attracted curiosity without ongoing fit.',
    'Build and test one lead magnet with a three-message welcome sequence and explicit opt-out.',
    'What is the strategic purpose of an owned channel?', 'Create permission-based continuity and customer knowledge that does not depend entirely on future platform distribution.');
  add('F0','f0_dm','DM qualification and ethical outreach',
    'What is the difference between a conversation and a copied sales pitch?',
    'DMs can discover context, help, qualify, and schedule the next step. Ethical outreach is relevant, specific, permission-aware, truthful, and easy to decline.',
    'Qualification identifies situation, desired outcome, current effort, urgency, authority, resources, constraints, fit, and next action without interrogating or manipulating.',
    'Open from genuine context, ask one useful question, diagnose before offering, state fit and limits honestly, obtain consent for follow-up, record the interaction, and stop when declined.',
    'Many replies but few qualified next steps may mean the opener earns curiosity while the offer, audience, or qualification path lacks fit.',
    'Conduct twenty permission-based conversations and grade response, qualification, next step, and reason for loss.',
    'What makes social outreach ethical and effective?', 'Specific relevance, honest intent, useful diagnosis, permission, easy refusal, privacy, and a fit-based next step.');
  add('F0','f0_community','Community design and moderation',
    'What transforms an audience that watches into a community that participates?',
    'Community forms around shared identity, repeated rituals, useful member-to-member interaction, safety, recognition, leadership access, and meaningful contribution—not follower count alone.',
    'Norms and moderation shape who remains. Prompts, challenges, office hours, member spotlights, feedback loops, and roles create participation; enforcement protects trust.',
    'Define purpose, ideal member, norms, prohibited behavior, moderation ladder, response times, rituals, member journey, feedback channels, privacy, crisis escalation, and success measures.',
    'High member count with low returning participation or unsafe behavior indicates acquisition without community health.',
    'Design a 30-day community pilot with three rituals and a moderation simulation.',
    'What creates durable community?', 'Shared purpose and identity, safe norms, recurring rituals, member contribution, relationships, recognition, and responsive leadership.');
  add('F0','f0_conversion','Conversion content and offer-message fit',
    'Why can an account build trust yet never produce a sale?',
    'Conversion content makes the problem, desired outcome, mechanism, proof, offer, risk, fit, and next step explicit. Valuable organic content does not automatically explain what can be purchased.',
    'Growth content earns new attention; authority content builds belief; conversion content resolves objections and routes demand. A healthy mix depends on business maturity and campaign stage.',
    'Build problem, method, case study, FAQ, comparison, process, behind-the-scenes, testimonial, offer, deadline, and objection formats. Keep claims truthful and typicality clear.',
    'Reach and trust signals with empty demand may mean the offer is invisible, unclear, poorly matched, weakly proven, or difficult to access.',
    'Publish a ten-piece conversion sequence and map each item to one buyer question.',
    'What does conversion content add to valuable content?', 'A clear offer, fit, mechanism, proof, objection resolution, risk context, and next step.');
  add('F0','f0_retention','Customer content, retention, and advocacy',
    'Does social strategy end when a lead becomes a customer?',
    'Social content can onboard, educate, support, retain, expand, and turn customers into advocates. Existing customers supply high-value questions and credible proof.',
    'Expectation-setting reduces churn; education increases success; recognition deepens identity; customer stories provide proof; feedback reveals product and messaging gaps.',
    'Map post-purchase moments, common failure points, onboarding content, success milestones, support routes, review/testimonial consent, referral invitation, and customer community.',
    'Strong acquisition with weak retention may mean content promised an experience the product or service cannot deliver.',
    'Build a 30-day customer content journey and an ethical case-study request process.',
    'How does content support retention?', 'It sets expectations, helps customers succeed, reinforces progress and belonging, captures feedback, and enables advocacy.');

  // ── AD · PAID SOCIAL ─────────────────────────────────────
  mod('AD', 'Level 11 · Paid Social &amp; Creative Performance', 'Objectives, tracking, audiences, creative, testing, economics, scaling, and the relationship between organic and paid.');
  add('AD','ad_foundation','Paid media is an auction and optimization system',
    'Why can the highest bidder still lose an ad opportunity?',
    'Paid social delivery balances bid or budget, predicted action, creative/ad quality, user experience, objective, eligibility, and auction competition. Buying impressions does not buy attention or profit.',
    'The chosen objective tells the system which behavior to seek. Wrong events, weak data, bad creative, poor offer, or broken landing experience teach optimization toward the wrong outcome.',
    'Define business outcome, conversion event, objective, audience, budget, bid/optimization, placements, creative, destination, attribution, guardrails, and stopping rules before launch.',
    'Cheap clicks with expensive qualified acquisition indicate the campaign optimized an upstream behavior disconnected from value.',
    'Build three campaign plans for awareness, lead generation, and sales, each with a different event and KPI chain.',
    'What does a paid-social objective do?', 'It directs delivery toward people and placements predicted to produce the selected behavior, so it must match business value.');
  add('AD','ad_tracking','Pixels, server events, consent, and event quality',
    'Why install both browser and server-side event connections where appropriate?',
    'Measurement and optimization depend on reliable, consented event data. Browser pixels and server/event APIs can complement each other when deduplicated and implemented under platform, privacy, and legal requirements.',
    'A full event journey—view, lead, add-to-cart, checkout, purchase, value, CRM/offline outcome—helps systems learn, but collecting unnecessary data creates privacy and governance risk.',
    'Create an event map, data owner, consent basis, parameter specification, deduplication key, test procedure, diagnostics review, retention rule, access control, and privacy notice. [VERIFY LIVE].',
    'If platform conversions disagree sharply with analytics and CRM, inspect firing, deduplication, event value, windows, consent loss, and source definitions.',
    'QA a mock web journey with test-event tools and reconcile browser, server, analytics, and CRM records.',
    'What makes conversion tracking decision-grade?', 'Correct events, consent, tested firing, browser/server deduplication, consistent values, documented windows, and reconciliation.');
  add('AD','ad_audience','Audience strategy — broad, signal, retargeting, exclusion',
    'When can broad targeting outperform an elaborate interest stack?',
    'Modern systems can use conversion signals and creative to find responders, while custom, lookalike/similar, interest, demographic, contextual, and retargeting approaches shape the candidate pool. [VERIFY LIVE].',
    'Broad gives optimization room but needs event quality and creative variety. Narrow can improve relevance yet restrict learning and raise cost. Retargeting captures intent but can overclaim conversions that would happen anyway.',
    'Segment by funnel and economics, exclude existing customers where appropriate, control overlap, limit sensitive or discriminatory targeting, tailor creative, and compare incrementality—not platform ROAS alone.',
    'Rising frequency with flat conversions and worsening cost suggests saturation, weak novelty, or an audience too small for spend.',
    'Design a broad-vs-signal test with equal offer, creative, optimization, budget logic, and a predefined business metric.',
    'How should broad and narrow targeting be chosen?', 'By event quality, audience size, creative relevance, economics, policy, and controlled test evidence—not ideology.');
  add('AD','ad_creative','Performance creative — hook, body, proof, offer, action',
    'What is the biggest paid-social lever after the campaign is technically sound?',
    'Creative determines who stops, what they understand, what they believe, and whether they act. Strong ads feel native while clearly presenting a relevant problem, mechanism, proof, offer, and CTA.',
    'Angle, concept, format, creator, hook, body, proof, offer, CTA, and execution are separate test levels. Tiny caption changes cannot rescue a weak concept or offer.',
    'Build a matrix of audience tension × angle × format × proof. Produce multiple genuine concepts, then variations inside winners. Use platform-safe music, disclosures, and substantiated claims.',
    'High thumb-stop with low conversion may mean entertaining delivery without belief or offer fit; strong clicks with weak landing conversion moves the suspect downstream.',
    'Produce twelve ads from three concepts, two hooks, and two proof executions; label the variable hierarchy.',
    'What should creative testing prioritize?', 'Large meaningful differences in premise, angle, format, proof, and offer before cosmetic micro-variations.');
  add('AD','ad_testing','Paid experiments and creative fatigue',
    'How do split tests avoid two variants competing for the same people?',
    'Native experiment tools can divide audiences into exclusive groups and hold key variables stable. TikTok, Meta, Google/YouTube, and LinkedIn capabilities differ and change. [VERIFY LIVE].',
    'A valid test uses one main variable, enough budget/time, a preselected metric, comparable exposure, and a no-peeking decision rule. Fatigue appears when repeated exposure reduces response; it is not fixed by duplicating chaos.',
    'Maintain hypothesis, control, treatment, audience, event, budget, duration, power/confidence guidance, result, limitation, and replication. Refresh concepts before the account exhausts them.',
    'Performance decline can be fatigue, audience saturation, auction change, seasonality, tracking failure, offer decay, or landing problems; diagnose before replacing creative.',
    'Design a platform-native split test and a four-week creative refresh plan with triggers.',
    'Why use an exclusive split test?', 'It isolates one variable and prevents audience overlap or delivery competition from contaminating the comparison.');
  add('AD','ad_economics','Unit economics, attribution, scaling, and guardrails',
    'Can a campaign with positive platform ROAS still lose money?',
    'Paid growth is constrained by contribution margin, customer acquisition cost, payback, lifetime value quality, refunds, fulfillment, cash flow, capacity, and incrementality—not revenue alone.',
    'Scaling changes auction, audience breadth, frequency, and marginal performance. Vertical scaling raises spend; horizontal scaling adds audiences, markets, placements, offers, or concepts; both require operational capacity.',
    'Model revenue, COGS, variable fulfillment, fees, refunds, gross/contribution margin, CAC, payback, repeat behavior, attribution uncertainty, and capacity. Increase spend in controlled steps with guardrails.',
    'Average ROAS can hide declining marginal returns; blended business results and cohort quality reveal whether additional spend creates value.',
    'Build a campaign P&L and three scaling scenarios: conservative, target, and failure case.',
    'What determines whether paid social is truly profitable?', 'Incremental contribution after acquisition, product, fulfillment, fees, refunds, cash timing, and customer quality—not reported revenue alone.');

  // ── S0 · SELL THE SERVICE ────────────────────────────────
  mod('S0', 'Level 12 · Build and Sell the Service', 'Choose a niche, productize value, prospect, diagnose, propose, price, contract, and close without fake authority.');
  add('S0','s0_skillproof','Earn the right to sell',
    'What can a beginner show before claiming client results?',
    'Professional credibility begins with demonstrated skills and honest scope. A self-directed account, practice brand, teardown, sample strategy, spec creative, measured experiment, and documented process can prove ability without inventing clients.',
    'The proof ladder moves from knowledge artifact to executed work, measured personal result, collaboration, pilot, client outcome, and repeatable system. Each level supports larger claims and prices.',
    'Choose one niche, grow or operate a real practice account, build a portfolio of briefs/scripts/edits/reports, disclose which work is spec, and request narrow pilots with clear success criteria.',
    'If the portfolio is screenshots without objectives, decisions, contribution, or outcomes, it shows activity rather than capability.',
    'Complete three practice case studies: organic strategy, content production, and analytics diagnosis.',
    'How can a beginner market honestly?', 'Show executed practice work, artifacts, reasoning, and measured personal experiments while clearly labeling spec and avoiding fake results.');
  add('S0','s0_niche','Niche and ideal client profile',
    'Which is better: a wealthy industry you cannot reach or a modest niche with urgent demand and access?',
    'A service niche should combine painful valuable problems, ability to pay, reachable decision-makers, repeatable content opportunity, measurable outcomes, ethical fit, and your credible access or interest.',
    'The ideal client profile includes business model, stage, margin, sales cycle, audience, current content system, internal resources, decision structure, constraints, and disqualifiers.',
    'Score candidate niches on demand, economics, access, proof path, content richness, measurement, fulfillment complexity, competition, regulation, and personal durability.',
    'Many calls with low urgency or no budget can mean the niche problem is admired but not purchased.',
    'Interview ten businesses in the leading niche before finalizing the service.',
    'What makes a strong SMMA niche?', 'Valuable urgent problems, paying capacity, reachable buyers, repeatable delivery, measurable impact, proof opportunity, and ethical fit.');
  add('S0','s0_offer','Productize the offer around an outcome',
    'Why is “30 posts per month” a weak offer by itself?',
    'An offer connects a qualified client problem to a defined outcome through a credible mechanism, scope, deliverables, responsibilities, timeline, measurement, limits, and price.',
    'Deliverables make work tangible but outcomes create value. The agency can promise process and quality; it should not guarantee virality, revenue, or platform behavior outside its control.',
    'Define diagnose, strategy, production, publishing, community, reporting, paid media, or consulting modules; state inputs, exclusions, revision limits, approval windows, KPIs, and change-order rules.',
    'If every prospect needs a completely new delivery system, the offer is consulting-shaped but priced like a repeatable package.',
    'Create good/better/best packages and a one-page service boundary for the chosen niche.',
    'What makes a social service productized?', 'A repeatable problem, mechanism, scope, responsibilities, timeline, evidence, limits, and pricing logic with room for justified customization.');
  add('S0','s0_prospect','Prospecting with relevance and proof',
    'What should a prospect learn from your first message before accepting a call?',
    'Good prospecting demonstrates relevance, observation, and a plausible useful next step. It does not manufacture urgency, spam generic compliments, or pretend a relationship.',
    'Trigger events, visible content gaps, hiring, launches, new locations, weak funnels, and active campaigns create timely reasons to reach out. Proof reduces perceived risk.',
    'Research the business, identify one consequential observation, show a small useful artifact or question, state credible relevance, ask permission for the next step, follow up finitely, and record outcomes.',
    'Low replies point to list, timing, relevance, credibility, or message; replies without calls often reveal an unclear or costly next step.',
    'Send fifty high-relevance outreaches across two message hypotheses and grade each stage.',
    'What belongs in a strong cold outreach?', 'A timely specific observation, credible relevance, useful value, honest intent, and a low-friction permission-based next step.');
  add('S0','s0_discovery','Discovery calls and social audits',
    'Why should a proposal never be written before understanding the sales and fulfillment system?',
    'Discovery diagnoses the business, not merely the Instagram feed. Content cannot repair a weak offer, poor close rate, capacity shortage, broken site, or absent proof without coordinated change.',
    'Understand goals, economics, audience, offer, sales path, past performance, channels, brand constraints, approvals, assets, team, budget, risk, and decision process. Separate symptoms from root causes.',
    'Open with agenda, ask current-state and consequence questions, inspect data/artifacts, summarize the diagnosis, test priority and fit, explain limits, and agree the next decision.',
    'If the prospect wants “more followers” but cannot name business value, qualification must clarify the objective before tactics.',
    'Run five mock discoveries using different business models and produce an evidence-based audit for each.',
    'What must discovery connect social activity to?', 'The client’s audience, offer, sales process, unit economics, operations, constraints, and decision criteria.');
  add('S0','s0_proposal','Proposal, pricing, contract, and close',
    'Should price be based only on the number of posts?',
    'A proposal translates diagnosis into objective, strategy, scope, timeline, roles, KPIs, assumptions, investment, risks, and next step. Pricing should reflect value, complexity, expertise, capacity, risk, and market—not fantasy income claims.',
    'Common models include project, monthly retainer, day rate, performance component, paid-media percentage, or hybrid. Performance pay requires clean definitions, tracking, control, caps, and legal review.',
    'Include situation, diagnosis, desired state, approach, deliverables, client inputs, schedule, communication, measurement, exclusions, fees, payment, IP/usage, termination, confidentiality, and signatures. Use counsel for contracts.',
    'Scope ambiguity, unlimited revisions, missing client duties, or vague ownership creates unpriced risk even when the fee looks attractive.',
    'Create a proposal and statement of work, then role-play procurement, price, scope, guarantee, and timeline objections.',
    'What should pricing account for?', 'Client value and economics, scope, complexity, expertise, capacity, risk, usage, and delivery cost—not content quantity alone.');

  // ── O0 · CLIENT DELIVERY + TEAM ──────────────────────────
  mod('O0', 'Level 13 · Client Delivery &amp; Agency Operations (Ralston Spine)', 'Onboarding, workflow, approvals, reporting, hiring, 30/60/90, 1:1s, and maker/manager systems.');
  add('O0','o0_onboard','Client onboarding and the first 30 days',
    'What must be true before the agency publishes the first client post?',
    'Onboarding converts a signed promise into shared operating reality. It secures access, context, assets, strategy, communication, approvals, measurement, safety, and expectations before speed.',
    'The first month should move through discovery, audit, access, research, strategy, baseline, production test, approval calibration, launch, and review. Skipping alignment creates expensive rework.',
    'Use kickoff, stakeholder map, asset/access register, brand and legal intake, past data, audience interviews, competitor map, content workshop, KPI baseline, calendar, escalation, and definition of done.',
    'If the team cannot say who approves what by when, missed dates will be misdiagnosed as creative failure.',
    'Build and simulate the full onboarding checklist for a mock client.',
    'What is onboarding designed to prevent?', 'Misaligned strategy, unsafe access, missing inputs, unclear approvals, measurement gaps, and expectation failure.');
  add('O0','o0_workflow','The content operating system and approval chain',
    'Where should feedback live so the team does not edit from conflicting messages?',
    'A delivery system creates one source of truth from idea through measurement. Status, owner, version, deadline, dependencies, feedback, approval, publish record, and performance must remain traceable.',
    'Review stages should separate strategy, factual/legal, brand, and final QA. Consolidated feedback from one client owner prevents contradictory revision loops.',
    'Define RACI, intake, backlog, brief, production, internal review, client review, versioning, approval cutoff, scheduling, aftercare, reporting, archive, and retrospective.',
    'Growing work-in-progress with low throughput means a bottleneck—often approval, editing, or unclear briefs—not insufficient task creation.',
    'Map the workflow, set WIP limits and service levels, then run a ten-asset simulation including a late change.',
    'What creates a reliable approval process?', 'Named decision rights, one source of truth, consolidated feedback, version control, deadlines, escalation, and explicit approval.');
  add('O0','o0_account','Account management, communication, and renewal',
    'What should happen when results miss before the client asks?',
    'Account management protects trust through proactive context, honest evidence, expectation control, fast risk communication, decision records, and consistent business understanding.',
    'Clients judge results and the experience of reaching them. Surprises, unexplained silence, and hidden scope tension destroy confidence faster than one weak content week.',
    'Run weekly async update, regular decision call, risk log, action register, scope tracker, report, quarterly review, renewal plan, stakeholder map, and documented wins/lessons.',
    'Repeated emergency requests can signal unclear priorities, weak planning, or an unspoken trust gap; accepting all of them worsens the system.',
    'Role-play an underperformance conversation and produce a recovery memo with facts, diagnosis, plan, owner, and checkpoint.',
    'What sustains client trust during weak performance?', 'Early truthful communication, clear diagnosis, owned actions, documented decisions, and a credible checkpointed recovery plan.');
  add('O0','o0_hire','Ralston hiring funnel and role design',
    'Should the first hire be the role everyone else seems to hire?',
    'Caleb Ralston’s hiring approach begins at the bottleneck: define the role, responsibilities, requirements, results, availability, compensation, and values before sourcing people.',
    'The funnel uses application, screening, technical interview, realistic paid skill test, culture/working-style evaluation, and final alignment. Early specialists may wear adjacent hats; fake generalists create quality risk.',
    'Choose employee, contractor, or agency based on duration, control, flexibility, expertise, speed, cost, integration, and legal classification. Never use unpaid speculative client work.',
    'If a job description lists tasks but cannot define success at 90 days, hiring cannot reliably evaluate fit.',
    'Write one results-based role scorecard and run a structured mock interview plus paid test rubric.',
    'What should determine the next hire?', 'The highest-value recurring bottleneck and a clearly defined result—not industry fashion or vague overwhelm.');
  add('O0','o0_306090','Ralston 30/60/90 onboarding and quality standards',
    'When should a new hire begin owning measurable work?',
    'Ralston’s 30/60/90 model moves from learning and immersion to contribution and execution to ownership and impact. Each phase needs objectives, tasks, artifacts, metrics, support, and review.',
    'Quality becomes scalable when examples, checklists, definitions, decision principles, feedback, and escalation teach judgment—not when every task waits for founder approval.',
    'Days 1–30: context, shadowing, standards, small wins. Days 31–60: independent recurring work and feedback. Days 61–90: own a result, improve a system, and present learning.',
    'If the new hire remains dependent at day 90, inspect unclear outcomes, missing documentation, weak feedback, wrong scope, or selection—not just effort.',
    'Build a role-specific 30/60/90 plan with weekly evidence and a final ownership project.',
    'What is the progression of a strong 30/60/90 plan?', 'Learning and immersion → contribution and execution → ownership and measurable impact.');
  add('O0','o0_lead','Ralston 1:1s, maker time, culture, and retention',
    'Why should an editor’s calendar look different from an account manager’s?',
    'Ralston distinguishes makers who need uninterrupted creative blocks from managers whose work depends on coordination. Team systems should protect both while maintaining accountability.',
    'Effective 1:1s cover wins, roadblocks, priorities, two-way feedback, and growth; managers listen, follow up, and avoid turning them into status reports. Content hackathons create protected experimentation.',
    'Block maker mornings or days, cluster meetings, use async status, run weekly/biweekly 1:1s, hold retrospectives, create growth paths, pay fairly, and schedule periodic hackathons with real tests.',
    'High output with burnout, turnover, or declining originality is an operating failure even if this month’s dashboard is green.',
    'Design a weekly maker/manager schedule, 1:1 template, quarterly hackathon, and team-health scorecard.',
    'What is the purpose of maker/manager separation?', 'Protect deep creative work while giving coordination predictable space, reducing context switching and burnout.');

  // ── X0 · LEGAL, RISK, AND CAPSTONE ───────────────────────
  mod('X0', 'Level X · Law, Risk, Crisis &amp; Professional Capstone', 'Copyright, disclosure, privacy, accessibility, platform safety, crisis response, AI ethics, portfolio, and graduation.');
  add('X0','x0_rights','Copyright, music, trademarks, releases, and usage rights',
    'Does crediting a creator automatically give permission to reuse their work?',
    'Credit is not a license. Social operators must understand ownership, licensed use, platform music terms, fair-use uncertainty, trademarks, publicity/privacy rights, model/location releases, and client/contractor IP assignment.',
    'Organic platform music may not permit brand, ad, cross-platform, or perpetual use. Creator content rights differ by term, territory, media, edit, exclusivity, whitelisting, and paid amplification.',
    'Maintain source, owner, license, receipt, permitted media, commercial use, term, territory, modifications, attribution, release, expiration, and archive. Get legal advice for uncertain or high-risk use.',
    'If the team cannot produce a license or signed permission, assume the asset is not cleared rather than relying on “everyone uses it.”',
    'Build a rights ledger and clear every asset in a mock campaign across organic, paid, and website use.',
    'Why is creator credit insufficient?', 'Attribution acknowledges authorship but does not itself grant the legal rights required to copy, edit, publish, or advertise.');
  add('X0','x0_disclosure','FTC endorsements, testimonials, claims, and disclosure',
    'Must a creator disclose a free product they were not explicitly paid to mention?',
    'Material connections—payment, free products, discounts, employment, family, or other value—can affect how people evaluate endorsements and generally require clear, conspicuous disclosure.',
    'The FTC emphasizes disclosure with the endorsement, hard to miss, understandable, and appropriate to format; video may require visual and audible disclosure. Endorsements must be honest and claims substantiated.',
    'Use clear language such as ad or sponsored where appropriate, disclose each qualifying post, place it before avoidance points, train creators, pre-approve high-risk claims, monitor, and correct. Get counsel for campaigns.',
    'A disclosure buried after “more,” in hashtags, comments, a profile, or vague language may not be clear and conspicuous.',
    'Audit ten mock posts for connection, claim, substantiation, placement, readability, language, and platform tool use.',
    'What is the practical FTC disclosure standard?', 'Clearly and conspicuously reveal a material connection where people will notice and understand it with the endorsement itself.');
  add('X0','x0_privacy','Privacy, data, children, accessibility, and sensitive categories',
    'Should a social agency collect every audience field a platform makes available?',
    'Data minimization, consent, purpose limitation, security, retention, deletion, access control, children’s protections, sensitive-category rules, and accessibility are professional requirements, not optional polish.',
    'Pixels, forms, DMs, CRM, contests, uploads, custom audiences, and location or health/financial information create distinct risks. Laws vary by place and facts; platform policies may be stricter. [VERIFY LIVE].',
    'Inventory data, document purpose and lawful/consent basis with counsel, collect the minimum, secure access, honor rights, create retention/deletion rules, caption video, add alt text, and test readability.',
    'If nobody can explain why a field is collected, who sees it, and when it is deleted, stop collecting it.',
    'Complete a data-flow map and accessibility audit for a mock lead campaign.',
    'What is data minimization?', 'Collect and retain only the information genuinely needed for a defined purpose, with appropriate consent, security, access, and deletion.');
  add('X0','x0_crisis','Moderation, account incidents, and crisis response',
    'What should happen in the first hour after a harmful post or account compromise?',
    'A crisis plan separates detection, containment, fact-finding, decision authority, legal/safety escalation, communication, recovery, and retrospective. Speed matters, but unverified statements can magnify harm.',
    'Incidents include compromise, impersonation, misinformation, harmful comments, leaked information, employee posts, campaign backlash, rights claims, platform enforcement, or real-world threats.',
    'Secure accounts and evidence, pause risky automation/scheduling, classify severity, alert named owners, protect affected people, verify facts, choose holding/correction response, monitor, document, and learn.',
    'Deleting criticism without preserving evidence or addressing valid harm can worsen trust; public debate with a threat should never replace safety escalation.',
    'Run tabletop exercises for compromise, false claim, creator misconduct, and campaign backlash.',
    'What is the correct first crisis sequence?', 'Contain harm and access, preserve evidence, classify and escalate, verify facts, then communicate and recover under named authority.');
  add('X0','x0_ai','AI-assisted social media without synthetic slop',
    'Which parts of creative judgment should never be delegated blindly to a model?',
    'AI can accelerate research organization, transcription, ideation, variants, rough cuts, captions, translation, tagging, reporting, and workflow—but the operator remains responsible for truth, taste, rights, privacy, bias, and brand voice.',
    'Models can fabricate facts, flatten distinctiveness, leak confidential inputs, reproduce bias, and create unauthorized likeness or voice. Human review and source verification are required.',
    'Define allowed tools/data, prohibited inputs, disclosure rules, rights checks, source requirements, approval, human sign-off, provenance, quality rubric, and incident process. Use AI to widen options, not outsource accountability.',
    'If output is faster but indistinguishable, unverified, or disconnected from real audience evidence, efficiency has reduced strategic value.',
    'Create an AI policy and compare human-only, AI-assisted, and AI-led outputs against accuracy, voice, novelty, time, and performance.',
    'What is the operator’s responsibility when using AI?', 'Remain accountable for accuracy, originality, rights, privacy, bias, disclosure, brand fit, and final judgment.');
  add('X0','x0_capstone','The professional capstone — prove you can run the machine',
    'What evidence would convince a skeptical brand to trust you with its account and reputation?',
    'Graduation requires demonstrated operation, not lesson completion: research, positioning, strategy, creation, distribution, community, analytics, conversion, paid plan, client systems, legal controls, and reflective judgment.',
    'The capstone uses a real self-owned account, consenting business, nonprofit, or clearly labeled practice brand. It runs long enough to create a baseline, experiments, failures, iteration, and a defensible case study.',
    'Deliver audit, audience research, Ralston Brand Journey/story, platform plan, 30-piece system, six-week publishing record, analytics, three experiments, funnel, report, crisis/legal checklist, proposal, and retrospective.',
    'A polished deck without raw artifacts, dated results, failed tests, limitations, or proof of contribution does not meet the professional standard.',
    'Complete the capstone, present it to three skeptical reviewers, revise from objections, and publish an honest portfolio case study.',
    'What proves professional readiness?', 'A complete body of inspectable work showing research, judgment, execution, measurement, iteration, ethics, communication, and business relevance.');

  // ── BUILD THE ENGINE DATA ────────────────────────────────
  var subjects = {}, order = [], i, built = [], qbank = {};
  for (i = 0; i < MODULES.length; i++) {
    subjects[MODULES[i].k] = { name:MODULES[i].name, blurb:MODULES[i].blurb };
    order.push(MODULES[i].k);
    qbank[MODULES[i].k] = [];
  }
  for (i = 0; i < RAW.length; i++) {
    var t = lesson(RAW[i]), q, j;
    built.push(t);
    for (j = 0; j < t.quiz.length; j++) {
      q = t.quiz[j];
      qbank[t.sub].push({ q:q.q, c:q.c, a:q.a, e:q.e, d:(i + j) % 3 + 1 });
    }
  }

  window.REDLINE_CONFIG = {
    brand:'REDLINE',
    name:'REDLINE — Social Media Operator Masterclass',
    tagline:'True zero to professional creator, strategist, account manager, and agency operator. Build a real brand, increase viral probability with evidence, master the major platforms, convert attention into business, and deliver client work ethically.',
    subjects:subjects,
    order:order,
    drills:{ n:12, min:18, gate:85 },
    srs:[1,1,3,7,21,45],
    perfectTo:3,
    reps:[
      {k:'observe',tier:'Z0',name:'Post Deconstruction',target:100,hint:'Deconstruct one winner or ordinary post into audience, premise, hook, structure, proof, emotion, CTA, and a testable hypothesis.'},
      {k:'publish',tier:'Z0',name:'Published Rep',daily:true,target:100,hint:'Ship one complete native content rep. Record platform, idea, format, goal, and link. The first 100 are the apprenticeship.'},
      {k:'journey',tier:'B0',name:'Brand Proof Artifact',target:25,hint:'Publish an artifact that reinforces one Brand Journey association through visible action or evidence.'},
      {k:'listen',tier:'A0',name:'Audience Evidence',target:100,hint:'Capture one real question, phrase, objection, review, search, or interview insight with source and context.'},
      {k:'idea',tier:'C0',name:'Idea Scored',target:100,hint:'Score a premise for demand, clarity, stakes, novelty, proof, visual potential, brand fit, and business role.'},
      {k:'hook',tier:'W0',name:'Hook Variant',target:100,hint:'Write or film a distinct truthful opening against the same core idea. Variants create learning only when the body stays comparable.'},
      {k:'shoot',tier:'P0',name:'Production Session',target:25,hint:'Run a prepared capture session with shot list, audio check, backups, and post-shoot notes.'},
      {k:'waterfall',tier:'D0',name:'Native Derivative',target:100,hint:'Turn pillar material into a standalone, platform-native asset—not a contextless leftover.'},
      {k:'diagnose',tier:'V0',name:'Formula Diagnosis',g:true,target:100,hint:'Diagnose one post to demand, eligibility, selection, hold, retention, satisfaction, spread, capture, or conversion; later grade whether the next test supported it.'},
      {k:'test',tier:'N0',name:'Controlled Experiment',g:true,target:25,hint:'Run one falsifiable, single-variable test with metric and decision rule defined before results.'},
      {k:'igrep',tier:'IG',name:'Instagram Native Rep',target:30,hint:'Publish one Reel, carousel, Story sequence, Collab, search-led asset, or community conversion rep and log the native job.'},
      {k:'ttrep',tier:'TT',name:'TikTok Native Rep',target:30,hint:'Publish one TikTok-first search, trend, story, reply, community, or creator-commerce rep and log the signal hypothesis.'},
      {k:'ytrep',tier:'YT',name:'YouTube Native Rep',target:20,hint:'Publish or package a long-form, Short, search, browse, or series rep and record appeal, engagement, and satisfaction evidence.'},
      {k:'cross',tier:'PX',name:'Cross-Platform Adaptation',target:30,hint:'Adapt one core truth to another platform by changing the native package, context, format, CTA, and metadata.'},
      {k:'community',tier:'F0',name:'Qualified Conversation',g:true,target:50,hint:'Run one relevant, permission-aware conversation to a clear fit/no-fit or next step; grade the outcome honestly.'},
      {k:'adtest',tier:'AD',name:'Paid Creative Analysis',target:25,hint:'Build or analyze one paid creative against audience, hook, body, proof, offer, CTA, tracking, and unit economics.'},
      {k:'prospect',tier:'S0',name:'Relevant Outreach',g:true,target:50,hint:'Send one researched, useful, permission-based prospect message; grade reply, qualification, and next step.'},
      {k:'client',tier:'O0',name:'Client System Artifact',target:25,hint:'Create or improve one brief, calendar, report, SOP, approval, onboarding, meeting, hiring, or quality artifact.'},
      {k:'risk',tier:'X0',name:'Rights &amp; Risk Check',target:25,hint:'Audit one asset or campaign for claims, disclosures, copyright, releases, privacy, accessibility, platform policy, and escalation.'},
      {k:'capstone',tier:'X0',name:'Capstone Milestone',target:12,hint:'Complete one inspectable milestone in the professional portfolio: research, system, content, test, report, funnel, proposal, or retrospective.'}
    ]
  };

  window.REDLINE_CURRICULUM = built;
  window.REDLINE_QBANK = qbank;
}());
