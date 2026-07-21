from fastapi import APIRouter, UploadFile, File, HTTPException
from config import supabase
import uuid
import os

router = APIRouter()

@router.post("/upload/tour-image")
async def upload_tour_image(file: UploadFile = File(...)):
    try:
        # Validate file type
        allowed_types = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
        if file.content_type not in allowed_types:
            raise HTTPException(status_code=400, detail="Only JPEG, PNG and WebP images allowed")

        # Generate unique filename
        ext = file.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{ext}"

        # Read file
        contents = await file.read()

        # Upload to Supabase Storage
        response = supabase.storage.from_("tour-images").upload(
            path=filename,
            file=contents,
            file_options={"content-type": file.content_type}
        )

        # Get public URL
        public_url = supabase.storage.from_("tour-images").get_public_url(filename)

        return {
            "message": "Image uploaded successfully",
            "url": public_url,
            "filename": filename
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/upload/tour-image/{filename}")
def delete_tour_image(filename: str):
    try:
        supabase.storage.from_("tour-images").remove([filename])
        return {"message": "Image deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/upload/tour-images")
def list_tour_images():
    try:
        response = supabase.storage.from_("tour-images").list()
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))