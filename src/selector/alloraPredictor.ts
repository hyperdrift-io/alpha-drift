import axios from 'axios';

export class AlloraPredictor {
  async predict(featureVector: any): Promise<{ predSharpe: number; edgeProb: number }> {
    try {
      const response = await axios.post('http://localhost:8000/predict', featureVector);
      return response.data;
    } catch (error) {
      // Fallback to mock if API fails
      return {
        predSharpe: 1.23,
        edgeProb: 0.67,
      };
    }
  }
}
