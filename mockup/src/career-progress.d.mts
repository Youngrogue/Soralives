export type CareerFrame = {
  chapter: number;
  within: number;
  turn: number;
  phase: 'front' | 'turn' | 'back' | 'return' | 'advance' | 'complete';
  progression: number;
};
export function careerFrame(progress: number, count: number): CareerFrame;
export function careerChapterProgress(index: number, count: number): number;
export function careerFaceProgress(index: number, count: number, back: boolean): number;
