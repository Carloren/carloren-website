from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

# Database setup
DB_PATH = os.path.join(os.path.dirname(__file__), 'database.db')

def get_db_connection():
    """Create a database connection"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize database with table and sample data"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create table if not exists
    cursor.execute('''CREATE TABLE IF NOT EXISTS doblajes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        year INTEGER NOT NULL,
        category TEXT NOT NULL,
        image TEXT,
        video TEXT,
        mainCharacter TEXT,
        important INTEGER DEFAULT 0
    )''')
    
    # Insert sample data if table is empty
    cursor.execute('SELECT COUNT(*) as count FROM doblajes')
    count = cursor.fetchone()[0]
    
    if count == 0:
        sample_data = [
            ('Breaking Bad', 2008, 'Series', 'breaking-bad.jpg', '', 'Walter White', 1),
            ('The Godfather', 1972, 'Películas', 'godfather.jpg', '', 'Vito Corleone', 1),
            ('Planet Earth', 2006, 'Documentales', 'planet-earth.jpg', '', 'Narrador', 0),
            ('Comercial Coca-Cola', 2022, 'Locuciones', 'coca-cola.jpg', '', 'Voz en Off', 0),
            ('El Quijote', 2021, 'Audiolibros', 'quijote.jpg', '', 'Don Quijote', 1),
            ('Game of Thrones', 2011, 'Series', 'got.jpg', '', 'Tyrion Lannister', 1),
            ('Inception', 2010, 'Películas', 'inception.jpg', '', 'Cobb', 0),
            ('Blue Planet II', 2017, 'Documentales', 'blue-planet.jpg', '', 'Narrador', 1),
            ('Anuncio Nike', 2023, 'Locuciones', 'nike.jpg', '', 'Voz en Off', 1),
            ('Harry Potter y la Piedra Filosofal', 2020, 'Audiolibros', 'harry-potter.jpg', '', 'Harry Potter', 0),
            ('The Last of Us', 2013, 'Videojuegos', 'tlou.jpg', '', 'Joel', 1),
            ('God of War', 2018, 'Videojuegos', 'gow.jpg', '', 'Kratos', 0)
        ]
        
        cursor.executemany(
            'INSERT INTO doblajes (title, year, category, image, video, mainCharacter, important) VALUES (?, ?, ?, ?, ?, ?, ?)',
            sample_data
        )
        conn.commit()
        print('Sample data inserted')
    
    conn.close()

# API endpoint with filters
@app.route('/api/doblajes', methods=['GET'])
def get_doblajes():
    year = request.args.get('year')
    title = request.args.get('title')
    category = request.args.get('category')
    important = request.args.get('important')
    
    query = 'SELECT * FROM doblajes WHERE 1=1'
    params = []
    
    if year:
        query += ' AND year = ?'
        params.append(year)
    
    if title:
        query += ' AND title LIKE ?'
        params.append(f'%{title}%')
    
    if category:
        query += ' AND category = ?'
        params.append(category)
    
    if important is not None:
        query += ' AND important = ?'
        params.append(1 if important.lower() in ['true', '1'] else 0)
    
    query += ' ORDER BY year DESC'
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, params)
        rows = cursor.fetchall()
        conn.close()
        
        # Convert rows to dictionaries
        results = [dict(row) for row in rows]
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Get all categories
@app.route('/api/categories', methods=['GET'])
def get_categories():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT DISTINCT category FROM doblajes ORDER BY category')
        rows = cursor.fetchall()
        conn.close()
        
        categories = [row['category'] for row in rows]
        return jsonify(categories)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=port, debug=True)
