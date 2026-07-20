from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Majestic North Tours API",
    description="Professional Tourism API for Gilgit-Baltistan",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://majesticnorthtours.com", "https://majestic-north-tours.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from routes.tours import router as tours_router
from routes.bookings import router as bookings_router
from routes.reviews import router as reviews_router
from routes.contacts import router as contacts_router
from routes.blogs import router as blogs_router
from routes.notifications import router as notifications_router

app.include_router(tours_router, prefix="/api")
app.include_router(bookings_router, prefix="/api")
app.include_router(reviews_router, prefix="/api")
app.include_router(contacts_router, prefix="/api")
app.include_router(blogs_router, prefix="/api")
app.include_router(notifications_router, prefix="/api")

@app.get("/")
def home():
    return {
        "project": "Majestic North Tours",
        "status": "Backend Running Successfully 🏔️",
        "docs": "/docs"
    }