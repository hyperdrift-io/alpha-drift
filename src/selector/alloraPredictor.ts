export class AlloraPredictor {
  async predict(featureVector: any): Promise<{ predSharpe: number; edgeProb: number }> {
    // Mocked prediction
    return {
      predSharpe: 1.23,
      edgeProb: 0.67,
    };
  }
}
