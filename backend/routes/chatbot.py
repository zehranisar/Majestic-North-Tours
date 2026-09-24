from fastapi import APIRouter
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

router = APIRouter()

SYSTEM_PROMPT = """You are Zuko, a friendly tour guide assistant for Majestic North Tours based in Khaplu, Gilgit-Baltistan, Pakistan.

Only help with:
1. Our 12 tours: Hunza Valley, Skardu Adventure, Fairy Meadows Trek, Deosai Plains, Naltar Valley, Attabad Lake, Shigar Valley, Rama Meadows, Passu Cones, Khaplu Highlights, Thagas Valley, Chitral & Kalash
2. Pricing per person: Hunza PKR 75000 | Skardu PKR 47500 | Fairy Meadows PKR 47500 | Deosai PKR 35000 | Naltar PKR 37500 | Attabad PKR 17500 | Shigar PKR 32500 | Rama PKR 30000 | Passu PKR 42500 | Khaplu PKR 42500 | Thagas PKR 50000 | Chitral PKR 60000
3. Booking process and cancellation policy (free cancellation 30 days before, 30% deposit)
4. Best time to visit, packing tips
5. Contact: Phone +92 355 4252699, WhatsApp +92 325 1002509, Email info@majesticnorthtours.com

Rules:
- ONLY answer Majestic North Tours related questions
- If asked anything else say: I can only help with Majestic North Tours related questions
- Be friendly and concise
- Respond in same language as user (Urdu or English)"""

@router.post("/chatbot")
async def chat(data: dict):
    try:
        user_message = data.get("message", "")
        history = data.get("history", [])
        
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=SYSTEM_PROMPT
        )
        
        chat_history = []
        for msg in history:
            chat_history.append({
                "role": "user" if msg["role"] == "user" else "model",
                "parts": [msg["content"]]
            })
        
        chat = model.start_chat(history=chat_history)
        response = chat.send_message(user_message)
        
        return {"response": response.text}
    except Exception as e:
        print(f"Chatbot error: {e}")
        return {"response": "Sorry, there was an issue. Please contact us on WhatsApp: +92 325 1002509"}