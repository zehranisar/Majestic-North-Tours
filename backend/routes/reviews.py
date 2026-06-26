from flask import Blueprint, jsonify, request
from config import supabase

reviews_bp = Blueprint('reviews', __name__)

# Get all reviews
@reviews_bp.route('/reviews', methods=['GET'])
def get_reviews():
    response = supabase.table('reviews').select('*').execute()
    return jsonify(response.data)

# Get reviews by tour
@reviews_bp.route('/reviews/tour/<int:tour_id>', methods=['GET'])
def get_tour_reviews(tour_id):
    response = supabase.table('reviews').select('*').eq('tour_id', tour_id).eq('is_approved', True).execute()
    return jsonify(response.data)

# Add review
@reviews_bp.route('/reviews', methods=['POST'])
def add_review():
    data = request.get_json()
    data['is_approved'] = False
    response = supabase.table('reviews').insert(data).execute()
    return jsonify(response.data)

# Approve review
@reviews_bp.route('/reviews/<int:id>/approve', methods=['PUT'])
def approve_review(id):
    response = supabase.table('reviews').update({'is_approved': True}).eq('id', id).execute()
    return jsonify(response.data)

# Delete review
@reviews_bp.route('/reviews/<int:id>', methods=['DELETE'])
def delete_review(id):
    response = supabase.table('reviews').delete().eq('id', id).execute()
    return jsonify({"message": "Review deleted successfully"})