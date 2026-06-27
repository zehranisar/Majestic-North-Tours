from fastapi import APIRouter
from config import supabase

router = APIRouter()

@router.get("/reviews")
def get_reviews():
    response = supabase.table('reviews').select('*').execute()
    return response.data

@router.get("/reviews/tour/{tour_id}")
def get_tour_reviews(tour_id: int):
    response = supabase.table('reviews').select('*').eq('tour_id', tour_id).eq('is_approved', True).execute()
    return response.data

@router.post("/reviews")
def add_review(data: dict):
    data['is_approved'] = False
    response = supabase.table('reviews').insert(data).execute()
    return response.data

@router.put("/reviews/{id}/approve")
def approve_review(id: int):
    response = supabase.table('reviews').update({'is_approved': True}).eq('id', id).execute()
    return response.data

@router.delete("/reviews/{id}")
def delete_review(id: int):
    supabase.table('reviews').delete().eq('id', id).execute()
    return {"message": "Review deleted successfully"}