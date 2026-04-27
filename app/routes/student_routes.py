from flask import Blueprint, request, jsonify, render_template, current_app
from app.services.supabase_service import SupabaseService
from app.utils.error_handlers import APIError

student_bp = Blueprint('students', __name__)


def get_supabase_service():
    return SupabaseService()


@student_bp.route('/')
def home():
    return render_template("index.html")


@student_bp.route('/add', methods=['POST'])
def add_student():
    try:
        data = request.json
        if not data:
            raise APIError("No data provided", 400)
        supabase_service = get_supabase_service()
        result = supabase_service.create(data)
        return jsonify(result), 201
    except APIError as e:
        return jsonify(e.to_dict()), e.status_code
    except Exception as e:
        return jsonify({"message": str(e), "status": 500}), 500


@student_bp.route('/students', methods=['GET'])
def get_students():
    try:
        supabase_service = get_supabase_service()
        result = supabase_service.read_all()
        return jsonify(result), 200
    except APIError as e:
        return jsonify(e.to_dict()), e.status_code
    except Exception as e:
        return jsonify({"message": str(e), "status": 500}), 500


@student_bp.route('/update/<id>', methods=['PUT'])
def update_student(id):
    try:
        data = request.json
        if not data:
            raise APIError("No data provided", 400)
        supabase_service = get_supabase_service()
        result = supabase_service.update(id, data)
        return jsonify(result), 200
    except APIError as e:
        return jsonify(e.to_dict()), e.status_code
    except Exception as e:
        return jsonify({"message": str(e), "status": 500}), 500


@student_bp.route('/delete/<id>', methods=['DELETE'])
def delete_student(id):
    try:
        supabase_service = get_supabase_service()
        result = supabase_service.delete(id)
        return jsonify(result), 200
    except APIError as e:
        return jsonify(e.to_dict()), e.status_code
    except Exception as e:
        return jsonify({"message": str(e), "status": 500}), 500
