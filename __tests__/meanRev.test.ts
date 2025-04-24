import { MeanRevStrategy } from '../src/strategy/meanRev';
import { FeatureVector } from '../src/types';

describe('MeanRevStrategy', () => {
  it('returns vol1h - price', () => {
    const strat = new MeanRevStrategy();
    const vector: FeatureVector = {
      ts: '2024-01-01T00:00:00Z',
      price: 10,
      vol1h: 15,
    };
    expect(strat.score(vector)).toBe(5);
  });
});
