import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    TABLE_NAME = os.getenv("TABLE_NAME", "students")
    
    @staticmethod
    def validate_config():
        required_vars = ["SUPABASE_URL", "SUPABASE_KEY", "TABLE_NAME"]
        missing_vars = [var for var in required_vars if not os.getenv(var)]
        if missing_vars:
            raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")
