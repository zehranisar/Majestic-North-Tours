from fastapi import APIRouter
from config import supabase
from routes.notifications import send_booking_confirmation
import random
import string

router = APIRouter()

def generate_booking_id():
    return 'MNT-' + ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

@router.get("/bookings")
def get_bookings():
    response = supabase.table('bookings').select('*').execute()
    return response.data

@router.get("/bookings/{id}")
def get_booking(id: int):
    response = supabase.table('bookings').select('*').eq('id', id).execute()
    return response.data[0] if response.data else {}

@router.post("/bookings")
def create_booking(data: dict):
    booking_id = generate_booking_id()
    data['booking_ref'] = booking_id
    data['status'] = 'pending'
    response = supabase.table('bookings').insert(data).execute()
    
    # Send email notification
    send_booking_confirmation(
        customer_name=data.get('customer_name', ''),
        customer_email=data.get('customer_email', ''),
        tour_name=data.get('tour_name', 'Tour'),
        travel_date=data.get('travel_date', ''),
        num_people=data.get('num_people', 1),
        total_price=data.get('total_price', 0),
        booking_id=booking_id,
        payment_method=data.get('payment_method', '')
    )
    
    return {"data": response.data, "booking_ref": booking_id}

@router.put("/bookings/{id}")
def update_booking(id: int, data: dict):
    response = supabase.table('bookings').update(data).eq('id', id).execute()
    return response.data

@router.delete("/bookings/{id}")
def delete_booking(id: int):
    supabase.table('bookings').delete().eq('id', id).execute()
    return {"message": "Booking deleted successfully"}