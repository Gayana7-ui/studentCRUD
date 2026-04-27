import requests
try:
    res = requests.get("http://127.0.0.1:5000/students", timeout=5)
    print(res.status_code)
except Exception as e:
    print(f"Error: {e}")
