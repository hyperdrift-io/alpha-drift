import { PositionSizer } from '../src/strategy/positionSizer';
import { FeatureVector } from '../src/types';

describe('PositionSizer', () => {
  it('returns tvl / 10000 or 1 if tvl missing', () => {
    const sizer = new PositionSizer();
    expect(sizer.size({ ts: '', price: 0, vol1h: 0, tvl: 20000 })).toBe(2);
    expect(sizer.size({ ts: '', price: 0, vol1h: 0 })).toBe(1);
  });
});
