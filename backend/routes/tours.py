from fastapi import APIRouter
from config import supabase

router = APIRouter()

@router.get("/tours")
def get_tours():
    response = supabase.table('tours').select('*').execute()
    return response.data

@router.get("/tours/featured")
def get_featured_tours():
    response = supabase.table('tours').select('*').eq('is_featured', True).execute()
    return response.data

@router.get("/tours/{id}")
def get_tour(id: int):
    response = supabase.table('tours').select('*').eq('id', id).execute()
    return response.data[0] if response.data else {}

@router.post("/tours")
def add_tour(data: dict):
    response = supabase.table('tours').insert(data).execute()
    return response.data

@router.put("/tours/{id}")
def update_tour(id: int, data: dict):
    response = supabase.table('tours').update(data).eq('id', id).execute()
    return response.data

@router.delete("/tours/{id}")
def delete_tour(id: int):
    supabase.table('tours').delete().eq('id', id).execute()
    return {"message": "Tour deleted successfully"}