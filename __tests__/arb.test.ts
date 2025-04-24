import { ArbStrategy } from '../src/strategy/arb';
import { FeatureVector } from '../src/types';

describe('ArbStrategy', () => {
  it('returns tvl / 1000', () => {
    const strat = new ArbStrategy();
    const vector: FeatureVector = {
      ts: '2024-01-01T00:00:00Z',
      price: 0,
      vol1h: 0,
      tvl: 5000,
    };
    expect(strat.score(vector)).toBe(5);
  });
});
