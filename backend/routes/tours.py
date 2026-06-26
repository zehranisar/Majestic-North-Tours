from flask import Blueprint, jsonify, request
from config import supabase

tours_bp = Blueprint('tours', __name__)

# Get all tours
@tours_bp.route('/tours', methods=['GET'])
def get_tours():
    response = supabase.table('tours').select('*').execute()
    return jsonify(response.data)

# Get single tour
@tours_bp.route('/tours/<int:id>', methods=['GET'])
def get_tour(id):
    response = supabase.table('tours').select('*').eq('id', id).execute()
    return jsonify(response.data[0] if response.data else {})

# Get featured tours
@tours_bp.route('/tours/featured', methods=['GET'])
def get_featured_tours():
    response = supabase.table('tours').select('*').eq('is_featured', True).execute()
    return jsonify(response.data)

# Add tour
@tours_bp.route('/tours', methods=['POST'])
def add_tour():
    data = request.get_json()
    response = supabase.table('tours').insert(data).execute()
    return jsonify(response.data)

# Update tour
@tours_bp.route('/tours/<int:id>', methods=['PUT'])
def update_tour(id):
    data = request.get_json()
    response = supabase.table('tours').update(data).eq('id', id).execute()
    return jsonify(response.data)

# Delete tour
@tours_bp.route('/tours/<int:id>', methods=['DELETE'])
def delete_tour(id):
    response = supabase.table('tours').delete().eq('id', id).execute()
    return jsonify({"message": "Tour deleted successfully"})