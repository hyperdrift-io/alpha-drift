from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any

app = FastAPI()

class FeatureVector(BaseModel):
    ts: str
    price: float
    vol1h: float
    funding8h: float = None
    tvl: float = None
    dexDepth: float = None

class PredictResponse(BaseModel):
    predSharpe: float
    edgeProb: float

@app.post('/predict', response_model=PredictResponse)
def predict(feature: FeatureVector):
    # Mocked prediction
    return PredictResponse(predSharpe=1.23, edgeProb=0.67)

@app.post('/train')
def train():
    # Mocked training endpoint
    return {"status": "training started"}

@app.get('/health')
def health():
    return {"status": "ok"}
