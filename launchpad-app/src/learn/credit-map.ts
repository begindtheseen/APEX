/* Which Learn to code lessons and courses teach the same things as which module lessons and modules (see
   credit.ts for how it is used, credit.test.ts for the checks). LAUNCHPAD's modules are worked through
   claims and gates, not module tests, and none of them is taught by a Learn course at the same depth, so
   nothing is credited either way. An entry goes here only when the Learn side teaches everything the
   module side does. */
import type { CreditMap } from './credit'

export const CREDIT: CreditMap = {
  lessons: {},
  modules: {},
  courses: {},
  overlap: {},
}
