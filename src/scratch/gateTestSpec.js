import { GATE_TEST_VALUE } from './gateTest.js';

describe('gate test', () => {
  it('exports a value', () => {
    expect(GATE_TEST_VALUE).toBe(1);
  });
});
