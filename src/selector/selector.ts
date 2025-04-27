import { AlloraPredictor } from './alloraPredictor';
import { FeatureVector } from '../types';

export interface TradeIntent {
  pair: string;
  side: 'buy' | 'sell';
  notionalUSD: number;
  hash: string;
}

export class Selector {
  private predictor: AlloraPredictor;

  constructor() {
    this.predictor = new AlloraPredictor();
  }

  async select(feature: FeatureVector): Promise<TradeIntent | null> {
    const { predSharpe } = await this.predictor.predict(feature);
    if (predSharpe > 1.0) {
      // Mock intent
      return {
        pair: 'ETH-USD',
        side: 'buy',
        notionalUSD: 1000,
        hash: this.hashIntent(feature, 'ETH-USD', 'buy'),
      };
    }
    return null;
  }

  private hashIntent(feature: FeatureVector, pair: string, side: string): string {
    // Simple hash stub (should use sha256 in real impl)
    return `${feature.ts}|${pair}|${side}`;
  }
}
