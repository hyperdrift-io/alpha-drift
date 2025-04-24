* Use `#model: gpt-4.1` for all code.
* Use `#model: claude-3.7-sonnet` for documentation >2 000 words.
* Emit git diff then full file.
* Keep requests ≤1500 tokens; chunk if needed.
* Mock external HTTP in tests.