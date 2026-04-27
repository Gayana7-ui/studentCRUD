from app import create_app
from app.config.config import Config

Config.validate_config()

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5000)

