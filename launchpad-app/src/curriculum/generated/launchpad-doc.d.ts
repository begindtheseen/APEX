/* Types for launchpad-doc.js, generated from ../AI_ENGINEERING_CURRICULUM.md:
   every section of the document that is not a module or a layer banner. */
export interface LpDocSection {
  id: string
  title: string
  /** The top-level heading the section sits under. */
  part: string
  markdown: string
}
export declare const LAUNCHPAD_DOC: LpDocSection[]
