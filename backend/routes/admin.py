from fastapi import APIRouter, HTTPException, Header
from config import supabase
import os

router = APIRouter()

ADMIN_SECRET = os.getenv("ADMIN_SECRET", "majestic-admin-2026")

def verify_admin(x_admin_key: str = Header(...)):
    if x_admin_key != ADMIN_SECRET:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True

# Dashboard Stats
@router.get("/admin/stats")
def get_stats(x_admin_key: str = Header(...)):
    verify_admin(x_admin_key)
    
    bookings = supabase.table('bookings').select('*').execute()
    contacts = supabase.table('contacts').select('*').execute()
    reviews = supabase.table('reviews').select('*').execute()
    tours = supabase.table('tours').select('*').execute()
    
    total_revenue = sum(b.get('total_price', 0) for b in bookings.data)
    pending_bookings = len([b for b in bookings.data if b.get('status') == 'pending'])
    unread_contacts = len([c for c in contacts.data if not c.get('is_read')])
    pending_reviews = len([r for r in reviews.data if not r.get('is_approved')])
    
    return {
        "total_bookings": len(bookings.data),
        "pending_bookings": pending_bookings,
        "total_revenue": total_revenue,
        "total_contacts": len(contacts.data),
        "unread_contacts": unread_contacts,
        "total_reviews": len(reviews.data),
        "pending_reviews": pending_reviews,
        "total_tours": len(tours.data),
    }

# Get all bookings with filters
@router.get("/admin/bookings")
def admin_get_bookings(
    status: str = None,
    x_admin_key: str = Header(...)
):
    verify_admin(x_admin_key)
    query = supabase.table('bookings').select('*').order('created_at', desc=True)
    if status:
        query = query.eq('status', status)
    response = query.execute()
    return response.data

# Update booking status
@router.put("/admin/bookings/{id}/status")
def update_booking_status(id: int, data: dict, x_admin_key: str = Header(...)):
    verify_admin(x_admin_key)
    response = supabase.table('bookings').update({
        'status': data.get('status')
    }).eq('id', id).execute()
    return response.data

# Get all contacts
@router.get("/admin/contacts")
def admin_get_contacts(x_admin_key: str = Header(...)):
    verify_admin(x_admin_key)
    response = supabase.table('contacts').select('*').order('created_at', desc=True).execute()
    return response.data

# Get pending reviews
@router.get("/admin/reviews/pending")
def get_pending_reviews(x_admin_key: str = Header(...)):
    verify_admin(x_admin_key)
    response = supabase.table('reviews').select('*').eq('is_approved', False).execute()
    return response.data

# Approve review
@router.put("/admin/reviews/{id}/approve")
def approve_review(id: int, x_admin_key: str = Header(...)):
    verify_admin(x_admin_key)
    response = supabase.table('reviews').update({'is_approved': True}).eq('id', id).execute()
    return response.data

# Delete review
@router.delete("/admin/reviews/{id}")
def delete_review(id: int, x_admin_key: str = Header(...)):
    verify_admin(x_admin_key)
    supabase.table('reviews').delete().eq('id', id).execute()
    return {"message": "Review deleted"}

# Add tour
@router.post("/admin/tours")
def admin_add_tour(data: dict, x_admin_key: str = Header(...)):
    verify_admin(x_admin_key)
    response = supabase.table('tours').insert(data).execute()
    return response.data

# Update tour
@router.put("/admin/tours/{id}")
def admin_update_tour(id: int, data: dict, x_admin_key: str = Header(...)):
    verify_admin(x_admin_key)
    response = supabase.table('tours').update(data).eq('id', id).execute()
    return response.data

# Delete tour
@router.delete("/admin/tours/{id}")
def admin_delete_tour(id: int, x_admin_key: str = Header(...)):
    verify_admin(x_admin_key)
    supabase.table('tours').delete().eq('id', id).execute()
    return {"message": "Tour deleted"}