import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health():
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"

def test_predict():
    payload = {
        "ts": "2024-01-01T00:00:00Z",
        "price": 100.0,
        "vol1h": 2.0
    }
    resp = client.post("/predict", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert "predSharpe" in data
    assert "edgeProb" in data
