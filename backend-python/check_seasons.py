from flask import Flask
from extensions import db
from models import Season
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('NEON_DB_URI', 'sqlite:///instance/kidslabs.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    count = Season.query.count()
    print(f"Total Seasons in DB: {count}")
    
    seasons = Season.query.all()
    for s in seasons:
        print(f"ID: {s.id}, Title: {s.titulo}")
