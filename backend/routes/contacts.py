from flask import Blueprint, jsonify, request
from config import supabase

contacts_bp = Blueprint('contacts', __name__)

# Get all contacts
@contacts_bp.route('/contacts', methods=['GET'])
def get_contacts():
    response = supabase.table('contacts').select('*').execute()
    return jsonify(response.data)

# Submit contact form
@contacts_bp.route('/contacts', methods=['POST'])
def submit_contact():
    data = request.get_json()
    data['is_read'] = False
    response = supabase.table('contacts').insert(data).execute()
    return jsonify({
        "message": "Message sent successfully! We will contact you soon."
    })

# Mark as read
@contacts_bp.route('/contacts/<int:id>/read', methods=['PUT'])
def mark_read(id):
    response = supabase.table('contacts').update({'is_read': True}).eq('id', id).execute()
    return jsonify(response.data)

# Delete contact
@contacts_bp.route('/contacts/<int:id>', methods=['DELETE'])
def delete_contact(id):
    response = supabase.table('contacts').delete().eq('id', id).execute()
    return jsonify({"message": "Contact deleted successfully"})