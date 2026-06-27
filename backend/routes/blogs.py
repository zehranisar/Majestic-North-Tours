from fastapi import APIRouter
from config import supabase

router = APIRouter()

@router.get("/blogs")
def get_blogs():
    response = supabase.table('blogs').select('*').eq('is_published', True).execute()
    return response.data

@router.get("/blogs/category/{category}")
def get_blogs_by_category(category: str):
    response = supabase.table('blogs').select('*').eq('category', category).eq('is_published', True).execute()
    return response.data

@router.get("/blogs/{slug}")
def get_blog(slug: str):
    response = supabase.table('blogs').select('*').eq('slug', slug).execute()
    return response.data[0] if response.data else {}

@router.post("/blogs")
def create_blog(data: dict):
    response = supabase.table('blogs').insert(data).execute()
    return response.data

@router.put("/blogs/{id}")
def update_blog(id: int, data: dict):
    response = supabase.table('blogs').update(data).eq('id', id).execute()
    return response.data

@router.delete("/blogs/{id}")
def delete_blog(id: int):
    supabase.table('blogs').delete().eq('id', id).execute()
    return {"message": "Blog deleted successfully"}