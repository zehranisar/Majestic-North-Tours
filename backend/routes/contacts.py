from fastapi import APIRouter
from config import supabase

router = APIRouter()

@router.get("/contacts")
def get_contacts():
    response = supabase.table('contacts').select('*').execute()
    return response.data

@router.post("/contacts")
def submit_contact(data: dict):
    data['is_read'] = False
    response = supabase.table('contacts').insert(data).execute()
    return {"message": "Message sent successfully! We will contact you soon."}

@router.put("/contacts/{id}/read")
def mark_read(id: int):
    response = supabase.table('contacts').update({'is_read': True}).eq('id', id).execute()
    return response.data

@router.delete("/contacts/{id}")
def delete_contact(id: int):
    supabase.table('contacts').delete().eq('id', id).execute()
    return {"message": "Contact deleted successfully"}