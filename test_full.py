import requests
import json

base_url = "http://127.0.0.1:5000"

print("--- Testing List Students ---")
res = requests.get(f"{base_url}/students")
print(f"Status: {res.status_code}")
print(f"Data: {res.json()}")

print("\n--- Testing Add Student ---")
new_student = {
    "name": "Jane Smith",
    "age": 22,
    "course": "Art",
    "phone": "555-0199",
    "id_num": "ID9988",
    "email": "jane@example.com"
}
res = requests.post(f"{base_url}/add", json=new_student)
print(f"Status: {res.status_code}")
print(f"Response: {res.json()}")

print("\n--- Testing List Students again ---")
res = requests.get(f"{base_url}/students")
print(f"Data: {res.json()}")
