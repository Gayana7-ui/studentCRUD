class APIError(Exception):
    def __init__(self, message, status_code=500, payload=None):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        rv['status'] = self.status_code
        return rv


def handle_supabase_error(response):
    if response.status_code >= 400:
        try:
            error_data = response.json()
            error_message = error_data.get('message', 'An error occurred with Supabase')
            raise APIError(error_message, response.status_code, error_data)
        except ValueError:
            raise APIError(f"Supabase error: {response.text}", response.status_code)
    return response
