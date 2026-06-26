from flask import Blueprint, jsonify, request
from config import supabase

bookings_bp = Blueprint('bookings', __name__)

# Get all bookings
@bookings_bp.route('/bookings', methods=['GET'])
def get_bookings():
    response = supabase.table('bookings').select('*').execute()
    return jsonify(response.data)

# Get single booking
@bookings_bp.route('/bookings/<int:id>', methods=['GET'])
def get_booking(id):
    response = supabase.table('bookings').select('*').eq('id', id).execute()
    return jsonify(response.data[0] if response.data else {})

# Create booking
@bookings_bp.route('/bookings', methods=['POST'])
def create_booking():
    data = request.get_json()
    response = supabase.table('bookings').insert(data).execute()
    return jsonify(response.data)

# Update booking status
@bookings_bp.route('/bookings/<int:id>', methods=['PUT'])
def update_booking(id):
    data = request.get_json()
    response = supabase.table('bookings').update(data).eq('id', id).execute()
    return jsonify(response.data)

# Delete booking
@bookings_bp.route('/bookings/<int:id>', methods=['DELETE'])
def delete_booking(id):
    response = supabase.table('bookings').delete().eq('id', id).execute()
    return jsonify({"message": "Booking deleted successfully"})