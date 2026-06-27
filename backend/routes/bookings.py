from fastapi import APIRouter
from config import supabase

router = APIRouter()

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
    response = supabase.table('bookings').insert(data).execute()
    return response.data

@router.put("/bookings/{id}")
def update_booking(id: int, data: dict):
    response = supabase.table('bookings').update(data).eq('id', id).execute()
    return response.data

@router.delete("/bookings/{id}")
def delete_booking(id: int):
    supabase.table('bookings').delete().eq('id', id).execute()
    return {"message": "Booking deleted successfully"}