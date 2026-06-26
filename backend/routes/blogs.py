from flask import Blueprint, jsonify, request
from config import supabase

blogs_bp = Blueprint('blogs', __name__)

# Get all published blogs
@blogs_bp.route('/blogs', methods=['GET'])
def get_blogs():
    response = supabase.table('blogs').select('*').eq('is_published', True).execute()
    return jsonify(response.data)

# Get single blog by slug
@blogs_bp.route('/blogs/<slug>', methods=['GET'])
def get_blog(slug):
    response = supabase.table('blogs').select('*').eq('slug', slug).execute()
    return jsonify(response.data[0] if response.data else {})

# Get blogs by category
@blogs_bp.route('/blogs/category/<category>', methods=['GET'])
def get_blogs_by_category(category):
    response = supabase.table('blogs').select('*').eq('category', category).eq('is_published', True).execute()
    return jsonify(response.data)

# Create blog
@blogs_bp.route('/blogs', methods=['POST'])
def create_blog():
    data = request.get_json()
    response = supabase.table('blogs').insert(data).execute()
    return jsonify(response.data)

# Update blog
@blogs_bp.route('/blogs/<int:id>', methods=['PUT'])
def update_blog(id):
    data = request.get_json()
    response = supabase.table('blogs').update(data).eq('id', id).execute()
    return jsonify(response.data)

# Delete blog
@blogs_bp.route('/blogs/<int:id>', methods=['DELETE'])
def delete_blog(id):
    response = supabase.table('blogs').delete().eq('id', id).execute()
    return jsonify({"message": "Blog deleted successfully"})