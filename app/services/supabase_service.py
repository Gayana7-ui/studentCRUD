import requests
from app.config.config import Config
from app.utils.error_handlers import handle_supabase_error, APIError


class SupabaseService:
    def __init__(self):
        self.url = Config.SUPABASE_URL
        self.key = Config.SUPABASE_KEY
        self.table = Config.TABLE_NAME
        self.headers = {
            "apikey": self.key,
            "Authorization": f"Bearer {self.key}",
            "Content-Type": "application/json"
        }
        
        if not self.url or not self.key:
            raise ValueError("Supabase URL and Key must be configured")

    def create(self, data):
        try:
            response = requests.post(
                f"{self.url}/rest/v1/{self.table}",
                json=data,
                headers=self.headers
            )
            handle_supabase_error(response)
            return response.json() if response.text else {"message": "Success"}
        except requests.RequestException as e:
            raise APIError(f"Network error: {str(e)}", 503)

    def read_all(self):
        try:
            response = requests.get(
                f"{self.url}/rest/v1/{self.table}?select=*",
                headers=self.headers
            )
            handle_supabase_error(response)
            return response.json()
        except requests.RequestException as e:
            raise APIError(f"Network error: {str(e)}", 503)

    def read_by_id(self, id):
        try:
            response = requests.get(
                f"{self.url}/rest/v1/{self.table}?id=eq.{id}&select=*",
                headers=self.headers
            )
            handle_supabase_error(response)
            data = response.json()
            return data[0] if data else None
        except requests.RequestException as e:
            raise APIError(f"Network error: {str(e)}", 503)

    def update(self, id, data):
        try:
            response = requests.patch(
                f"{self.url}/rest/v1/{self.table}?id=eq.{id}",
                json=data,
                headers=self.headers
            )
            handle_supabase_error(response)
            return {"message": "Updated"}
        except requests.RequestException as e:
            raise APIError(f"Network error: {str(e)}", 503)

    def delete(self, id):
        try:
            response = requests.delete(
                f"{self.url}/rest/v1/{self.table}?id=eq.{id}",
                headers=self.headers
            )
            handle_supabase_error(response)
            return {"message": "Deleted"}
        except requests.RequestException as e:
            raise APIError(f"Network error: {str(e)}", 503)
