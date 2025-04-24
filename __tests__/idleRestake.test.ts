import { IdleRestakeStrategy } from '../src/strategy/idleRestake';
import { FeatureVector } from '../src/types';

describe('IdleRestakeStrategy', () => {
  it('returns restake string', () => {
    const strat = new IdleRestakeStrategy();
    expect(strat.restake({ ts: '', price: 0, vol1h: 0 })).toBe('Restaked idle funds');
  });
});
