import { FeatureStore } from '../src/store/featureStore';
import { FeatureVector } from '../src/types';
import { Pool } from 'pg';

describe('FeatureStore', () => {
  it('calls query with correct params', async () => {
    // Spy on the Pool prototype
    // @ts-expect-error: test mock, Pool.prototype.query type is too strict
    const querySpy = jest.spyOn(Pool.prototype, 'query').mockResolvedValueOnce({ rows: [] });

    const store = new FeatureStore();
    const vector: FeatureVector = {
      ts: '2024-01-01T00:00:00Z',
      price: 42000,
      vol1h: 0.03,
      funding8h: 0.1,
      tvl: 1000000,
      dexDepth: 50000,
    };
    await store.upsertRaw(vector);

    expect(querySpy).toHaveBeenCalled();
    const [query, values] = querySpy.mock.calls[0];
    expect(query).toMatch(/INSERT INTO feature_raw/);
    expect(values).toEqual([
      vector.ts,
      vector.price,
      vector.vol1h,
      vector.funding8h,
      vector.tvl,
      vector.dexDepth,
    ]);

    querySpy.mockRestore();
  });
});
