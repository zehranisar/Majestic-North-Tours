from fastapi import APIRouter
from config import supabase
from routes.notifications import send_contact_notification

router = APIRouter()

@router.get("/contacts")
def get_contacts():
    response = supabase.table('contacts').select('*').execute()
    return response.data

@router.post("/contacts")
def submit_contact(data: dict):
    data['is_read'] = False
    response = supabase.table('contacts').insert(data).execute()
    
    # Send notification email
    send_contact_notification(
        name=data.get('name', ''),
        email=data.get('email', ''),
        subject=data.get('subject', 'General'),
        message=data.get('message', '')
    )
    
    return {"message": "Message sent successfully! We will contact you soon."}

@router.put("/contacts/{id}/read")
def mark_read(id: int):
    response = supabase.table('contacts').update({'is_read': True}).eq('id', id).execute()
    return response.data

@router.delete("/contacts/{id}")
def delete_contact(id: int):
    supabase.table('contacts').delete().eq('id', id).execute()
    return {"message": "Contact deleted successfully"}