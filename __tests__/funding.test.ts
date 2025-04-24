import { FundingStrategy } from '../src/strategy/funding';
import { FeatureVector } from '../src/types';

describe('FundingStrategy', () => {
  it('returns funding8h * 10', () => {
    const strat = new FundingStrategy();
    const vector: FeatureVector = {
      ts: '2024-01-01T00:00:00Z',
      price: 0,
      vol1h: 0,
      funding8h: 2,
    };
    expect(strat.score(vector)).toBe(20);
  });
});
