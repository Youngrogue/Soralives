import test from 'node:test';
import assert from 'node:assert/strict';
import { careerFrame, careerChapterProgress, careerFaceProgress } from '../src/career-progress.mjs';

const at = (company, interval) => careerFrame((company + interval) / 4, 4);

test('each company has stable cover and story reading intervals', () => {
  for (let company = 0; company < 4; company++) {
    const front = at(company, 0.08);
    const back = at(company, 0.51);
    assert.equal(front.chapter, company);
    assert.equal(front.turn, 0);
    assert.equal(front.phase, 'front');
    assert.equal(back.chapter, company);
    assert.equal(back.turn, 1);
    assert.equal(back.phase, 'back');
  }
});

test('every card turns back to its cover before the next company takes focus', () => {
  for (let company = 0; company < 4; company++) {
    assert.ok(Math.abs(at(company, 0.23).turn - 0.5) < 1e-10);
    assert.equal(at(company, 0.23).phase, 'turn');
    assert.ok(Math.abs(at(company, 0.79).turn - 0.5) < 1e-10);
    assert.equal(at(company, 0.79).phase, 'return');
    assert.equal(at(company, 0.94).turn, 0);
    assert.equal(at(company, 0.94).phase, 'advance');
    if (company < 3) {
      const before = at(company, 1 - 1e-8);
      const after = at(company + 1, 0);
      assert.equal(before.turn, 0);
      assert.equal(after.turn, 0);
      assert.equal(after.chapter, company + 1);
    }
  }
});

test('KPMG returns to its cover before the timeline releases to normal page scrolling', () => {
  assert.equal(at(3, 0.7).turn, 1);
  assert.equal(at(3, 0.9).turn, 0);
  const last = careerFrame(1, 4);
  assert.equal(last.chapter, 3);
  assert.equal(last.turn, 0);
  assert.equal(last.phase, 'complete');
  assert.equal(last.progression, 1);
});

test('reverse scrolling retraces the same card faces without remembered direction', () => {
  const path = Array.from({ length: 401 }, (_, step) => step / 400);
  const forward = path.map(value => careerFrame(value, 4));
  const backward = [...path].reverse().map(value => careerFrame(value, 4)).reverse();
  assert.deepEqual(forward, backward);
  for (const frame of forward) {
    assert.ok(frame.turn >= 0 && frame.turn <= 1);
    assert.ok(frame.chapter >= 0 && frame.chapter < 4);
  }
});

test('out of range and invalid progress cannot turn a card after completion', () => {
  assert.equal(careerFrame(-1, 4).turn, 0);
  assert.equal(careerFrame(10, 4).turn, 0);
  assert.equal(careerFrame(Number.NaN, 4).chapter, 0);
  assert.equal(careerFrame(1, 1).phase, 'complete');
  assert.equal(careerFrame(0, 0).chapter, 0);
});

test('year controls and responsive restoration land in stable reading intervals', () => {
  for (let chapter = 0; chapter < 4; chapter++) {
    const selected = careerFrame(careerChapterProgress(chapter, 4), 4);
    assert.equal(selected.chapter, chapter);
    assert.equal(selected.phase, 'front');
    for (const back of [true, false]) {
      const restored = careerFrame(careerFaceProgress(chapter, 4, back), 4);
      assert.equal(restored.chapter, chapter);
      assert.equal(restored.turn, Number(back));
      assert.equal(restored.phase, back ? 'back' : 'front');
    }
  }
});
