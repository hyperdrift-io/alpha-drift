import { MomentumStrategy } from '../src/strategy/momentum';
import { FeatureVector } from '../src/types';

describe('MomentumStrategy', () => {
  it('returns price * vol1h', () => {
    const strat = new MomentumStrategy();
    const vector: FeatureVector = {
      ts: '2024-01-01T00:00:00Z',
      price: 100,
      vol1h: 2,
    };
    expect(strat.score(vector)).toBe(200);
  });
});
