from flask import Flask
from app.config.config import Config
import os


def create_app():
    template_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'templates'))
    static_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'static'))
    
    app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
    app.config.from_object(Config)
    
    from app.routes.student_routes import student_bp
    app.register_blueprint(student_bp)
    
    return app
