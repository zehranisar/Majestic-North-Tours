from fastapi import APIRouter
import resend
import os
from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")

router = APIRouter()

def send_booking_confirmation(
    customer_name: str,
    customer_email: str,
    tour_name: str,
    travel_date: str,
    num_people: int,
    total_price: int,
    booking_id: str,
    payment_method: str
):
    try:
        resend.Emails.send({
            "from": "Majestic North Tours <onboarding@resend.dev>",
            "to": customer_email,
            "subject": f"Booking Confirmed — {tour_name}",
            "html": f"""
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
                <div style="background: #0d1f3c; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">Majestic North Tours</h1>
                    <p style="color: #93c5fd; margin: 5px 0 0;">Booking Confirmation</p>
                </div>
                <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #0d1f3c;">Dear {customer_name},</h2>
                    <p style="color: #666;">Your booking has been confirmed! Here are your booking details:</p>
                    <div style="background: #f0f4ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr style="border-bottom: 1px solid #e0e0e0;">
                                <td style="padding: 10px 0; color: #666; font-size: 14px;">Booking ID</td>
                                <td style="padding: 10px 0; color: #0d1f3c; font-weight: bold; font-size: 14px;">{booking_id}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e0e0e0;">
                                <td style="padding: 10px 0; color: #666; font-size: 14px;">Tour</td>
                                <td style="padding: 10px 0; color: #0d1f3c; font-weight: bold; font-size: 14px;">{tour_name}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e0e0e0;">
                                <td style="padding: 10px 0; color: #666; font-size: 14px;">Travel Date</td>
                                <td style="padding: 10px 0; color: #0d1f3c; font-weight: bold; font-size: 14px;">{travel_date}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e0e0e0;">
                                <td style="padding: 10px 0; color: #666; font-size: 14px;">Number of People</td>
                                <td style="padding: 10px 0; color: #0d1f3c; font-weight: bold; font-size: 14px;">{num_people}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e0e0e0;">
                                <td style="padding: 10px 0; color: #666; font-size: 14px;">Payment Method</td>
                                <td style="padding: 10px 0; color: #0d1f3c; font-weight: bold; font-size: 14px;">{payment_method}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #666; font-size: 14px;">Total Amount</td>
                                <td style="padding: 10px 0; color: #c0392b; font-weight: bold; font-size: 18px;">PKR {total_price:,}</td>
                            </tr>
                        </table>
                    </div>
                    <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
                        <p style="margin: 0; color: #856404; font-size: 14px;">
                            <strong>Next Steps:</strong><br>
                            Please pay 30% deposit (PKR {int(total_price * 0.3):,}) via {payment_method} to confirm your booking.<br>
                            Send payment screenshot to WhatsApp: <strong>+92 325 1002509</strong>
                        </p>
                    </div>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://wa.me/923251002509" style="background: #25d366; color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; font-size: 14px;">
                            WhatsApp Us
                        </a>
                    </div>
                    <p style="color: #666; font-size: 13px; text-align: center; margin-top: 20px;">
                        Khaplu Main Bazar, Ghanche, Gilgit-Baltistan<br>
                        📞 +92 355 4252699 | +92 325 1002509<br>
                        ✉️ info@majesticnorthtours.com
                    </p>
                </div>
            </div>
            """
        })
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False


def send_contact_notification(name: str, email: str, subject: str, message: str):
    try:
        resend.Emails.send({
            "from": "Majestic North Tours <onboarding@resend.dev>",
            "to": "info@majesticnorthtours.com",
            "subject": f"New Contact: {subject}",
            "html": f"""
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #0d1f3c;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Subject:</strong> {subject}</p>
                <p><strong>Message:</strong></p>
                <p style="background: #f0f4ff; padding: 15px; border-radius: 8px;">{message}</p>
            </div>
            """
        })
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False