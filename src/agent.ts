import { ProviderPool } from './providers/providerPool';
import { PythProvider, DexscreenerProvider, ChainbaseProvider, BirdeyeProvider } from './providers/abstract';
import { FeatureStore } from './store/featureStore';
import { MomentumStrategy } from './strategy/momentum';
import { MeanRevStrategy } from './strategy/meanRev';
import { FundingStrategy } from './strategy/funding';
import { ArbStrategy } from './strategy/arb';
import { PositionSizer } from './strategy/positionSizer';
import { IdleRestakeStrategy } from './strategy/idleRestake';

// Example agent wiring (no-op, for structure)
export class ElizaAgent {
  private pool: ProviderPool;
  private store: FeatureStore;
  private strategies: any[];
  private sizer: PositionSizer;
  private idle: IdleRestakeStrategy;

  constructor() {
    this.pool = new ProviderPool([
      new PythProvider(),
      new DexscreenerProvider(),
      new ChainbaseProvider(),
      new BirdeyeProvider(),
    ]);
    this.store = new FeatureStore();
    this.strategies = [
      new MomentumStrategy(),
      new MeanRevStrategy(),
      new FundingStrategy(),
      new ArbStrategy(),
    ];
    this.sizer = new PositionSizer();
    this.idle = new IdleRestakeStrategy();
  }

  async tick() {
    // Would fetch, score, size, and store
    // (Stub for now)
  }
}
