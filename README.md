# Flask-Supabase CRUD Application

A production-ready Flask web application with Supabase backend for student CRUD operations.

## Project Structure

```
supabase-flask-app/
├── app/
│   ├── __init__.py          # Flask app factory
│   ├── config/
│   │   ├── __init__.py
│   │   └── config.py        # Environment configuration
│   ├── routes/
│   │   ├── __init__.py
│   │   └── student_routes.py  # API endpoints
│   ├── services/
│   │   ├── __init__.py
│   │   └── supabase_service.py  # Supabase client
│   └── utils/
│       ├── __init__.py
│       └── error_handlers.py    # Error handling
├── static/                   # CSS, JS files
├── templates/                # HTML templates
├── .env                      # Environment variables (not in git)
├── .env.example              # Environment template
├── .gitignore
├── requirements.txt
├── wsgi.py                   # Production WSGI entry point
└── app.py                    # Development entry point
```

## Features

- **Modular Architecture**: Separated routes, services, and configuration
- **Environment Variables**: Secure configuration via .env
- **Error Handling**: Comprehensive error handling with custom exceptions
- **Production Ready**: WSGI support for deployment
- **Clean Code**: Follows Flask best practices

## Prerequisites

- Python 3.8+
- Supabase account and project
- Virtual environment (recommended)

## Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd supabase-flask-app
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   TABLE_NAME=students
   ```

5. **Run the application**
   ```bash
   python app.py
   ```
   The app will be available at `http://localhost:5000`

## API Endpoints

- `GET /` - Home page
- `POST /add` - Create a new student
- `GET /students` - Get all students
- `PUT /update/<id>` - Update a student by ID
- `DELETE /delete/<id>` - Delete a student by ID

## Deployment on Render

1. **Push your code to GitHub**

2. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `gunicorn wsgi:app`
   - Select Python runtime

3. **Add Environment Variables in Render**
   - Go to your service settings
   - Add the following environment variables:
     - `SUPABASE_URL`: Your Supabase project URL
     - `SUPABASE_KEY`: Your Supabase anon key
     - `TABLE_NAME`: Your table name (e.g., students)

4. **Deploy**
   - Render will automatically deploy on push
   - Your app will be available at `https://your-app.onrender.com`

## Development

### Adding New Routes

1. Create a new file in `app/routes/`
2. Create a Blueprint and register it in `app/__init__.py`

### Adding New Services

1. Create a new service file in `app/services/`
2. Import and use it in your routes

### Configuration

All configuration is managed in `app/config/config.py`. Add new environment variables there as needed.

## Best Practices Implemented

- **Separation of Concerns**: Routes, services, and config are separated
- **Environment Variables**: No hardcoded secrets
- **Error Handling**: Custom APIError class for consistent error responses
- **WSGI Support**: Production-ready with gunicorn
- **Virtual Environment**: Isolated dependencies
- **Git Ignore**: Sensitive files excluded from version control

## License

MIT
