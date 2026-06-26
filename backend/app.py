from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# Import routes
from routes.tours import tours_bp
from routes.bookings import bookings_bp
from routes.reviews import reviews_bp
from routes.contacts import contacts_bp
from routes.blogs import blogs_bp

# Register routes
app.register_blueprint(tours_bp, url_prefix='/api')
app.register_blueprint(bookings_bp, url_prefix='/api')
app.register_blueprint(reviews_bp, url_prefix='/api')
app.register_blueprint(contacts_bp, url_prefix='/api')
app.register_blueprint(blogs_bp, url_prefix='/api')

@app.route("/")
def home():
    return {
        "project": "Majestic North Tours",
        "status": "Backend Running Successfully 🏔️"
    }

if __name__ == "__main__":
    app.run(debug=True)