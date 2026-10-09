/** Each chapter returns to its cover before the next company takes focus. */
const FRONT_END = 0.16;
const TURN_END = 0.3;
const RETURN_START = 0.72;
const RETURN_END = 0.86;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function careerFrame(progress, count) {
  const chapters = Math.max(1, Math.trunc(count) || 1);
  const bounded = clamp(Number.isFinite(progress) ? progress : 0, 0, 1);
  const position = bounded * chapters;
  const chapter = Math.min(chapters - 1, Math.floor(position));
  const within = position - chapter;
  const opening = clamp((within - FRONT_END) / (TURN_END - FRONT_END), 0, 1);
  const closing = clamp((within - RETURN_START) / (RETURN_END - RETURN_START), 0, 1);
  const turn = opening * (1 - closing);
  const phase = bounded === 1 ? 'complete'
    : within < FRONT_END ? 'front'
    : within < TURN_END ? 'turn'
    : within < RETURN_START ? 'back'
    : within < RETURN_END ? 'return'
    : 'advance';
  return { chapter, within, turn, phase, progression: bounded };
}

/** A year shortcut lands on the cover, with room to start scrolling. */
export function careerChapterProgress(index, count) {
  return careerFaceProgress(index, count, false);
}

/** Preserve a chosen face when moving between the scroll and manual layouts. */
export function careerFaceProgress(index, count, back) {
  const chapters = Math.max(1, Math.trunc(count) || 1);
  return (clamp(index, 0, chapters - 1) + (back ? 0.51 : 0.08)) / chapters;
}
