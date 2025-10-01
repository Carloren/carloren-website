import sqlite3
import os
import re

# Database setup
DB_PATH = os.path.join(os.path.dirname(__file__), 'doblajes.db')

def create_database():
    """Create the doblajes database with the same structure as database.db"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create table with same structure
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
    
    return conn

def parse_txt_file():
    """Parse the txt file and extract doblajes data"""
    # Read the content from the txt file (using the attachment content)
    content = """Doblaje Series: ----------------------------
2019 ---
Mar de amores

2020 ---
Matrimonio por sorpresa
Afili Ask
Nudes
Winter
Jack Taylor
Commander
Paramparça
My home my Destiny

2021 ---
Goldies Oldies
Nuestra historia
Alas rotas
Melek
La hija del embajador
The dead ones
Are you afraid of the dark
Butchers
Ask Mantik

2022 ---
Huérfanas
Overlord
La guerra de las rosas
Bana sevmeyi
Zelenski
Soko
Tiger and Bunny
Mob Psycho 100
Mashle
That time i got reincarnated as a slime
Los Imperfectos
Junji Ito Maniac
Jujutsu Kaisen
Roswell Nuevo Mexico
Warped

2023 ---
Megalobox
Yona
Bring Back Alice
Ooku
The Ark
Flash: Escape the Midnight Circus

2024 ---
Blue Lock

2025 ---
Campamento Desventura
Hinchas enemigos
Witch Watch
One Piece (no ha salido)


Doblaje pelis: ----------------------------
2020 ---
USS Seaviper
Skyfire

2021 ---
Saving Leningrad

2022 --- 
Litchi Hikari Club
Tokyo Revengers

2023 ---
Yu Yu Hakusho

2025 ---
Lost in the Spotlight (no ha salido)


Docus: ----------------------------
2020 ---
Maestros del metal
Los futbolistas se quedan en casa
New york post investiga
PDCAM
Teen Mom
Curvys
MTV Cribs

2021 ---
Naked Atractions
The end of the storm
Mi vida en el zoo
Mad dogs
Dra Emma
La cocina de Mary
Mas allá de las fronteras
Madres adolescentes
Maestros del Kitesurf
Breskell
Floribama
Jed Raid Grecia
Jed Raid España
3 días
Beach sprint finals
Ríos patagónicos
Kayak Alpino
Aquarium 
Vigilando a la policía
Realidad
P1 USA 2019
Kate crossing Cabo Verde
Fei Ride Show
The polo show
Maestros de las Reformas
Global Champions League NY
Inside Sailing 
Descubriendo Cárpatos
Fei Icons
Dis-traction
P1 AQUAX Daytona 2021
P1 USA 2021 UIM Class powerboat
Depredadores
Rapsodia
Sabores de Bretaña
Isla Tiburones
ICF 2021 Sprint
Time Well Spent
Sabores del mar 
Tiburones Alien
Tiburones Shaq
Global Champions Tour Valkenswaard 2020
Global Champions Tour Valkenswaard 2021
El sospechoso 
Tierra a la vista
Historia Terror
Shark Academy
Un asesino entre nosotros
Persiguiendo Jaguares
Polo Rider Cup
Longines Global Champions Tour Mónaco 2021 Highlights
Misterios de la naturales
South to Sian
Locked In
Fei equestrian world 2019
Sailing to tokyo
Envidia de patio
Psicópata
Vaya jardines
Gran Bretaña animales al rescate
Speed Catamarans
Maxiboat 2021
Menuda Familia
Trans Jacques Vabre 2021

2022 ---
Spirit of Yacting
World sailing awards 2021
Cita millonarios
Clipper the race of their lives
Muchachos del estadio
Salón náutico parís
PWA World Tour Tiberias
Generación Drag
Ocean Safari South África
Historias Queer
Amor a primera mentira

2023 ---
10 parejas 10
The challenge

2024 ---
I want my MTV Yungblud



Publi: ---------------------------- 

2021 ---
Samsung Hands On
Samsung Epicos tus días
Swcheppes

2022 --- 
La historia interminable, el musical

2023 ---
Everak
Lodgerin
Numericco corporativo
Numericco Evento X aniversario
EAE Business School
Corporativo SIMA PropTech
Corporativo Agrovoltaica

2024 ---
Anuncio Día de la Educación Financiera 2024
Spot TV y radio de la Agencia Tributaria 2024

2025 ---
Impacto económico Mercadona


Audiolibros: ----------------------------
2025 --- 
Vivir entre cuervos
Un plan catastrófico

Videojuegos: ----------------------------
2024 ---
Star Wars Outlaws
Starfield"""

    doblajes_data = []
    current_section = None
    current_year = None
    
    lines = content.strip().split('\n')
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Check for section headers
        if 'Doblaje Series:' in line:
            current_section = 'Series'
            continue
        elif 'Doblaje pelis:' in line:
            current_section = 'Películas'
            continue
        elif 'Docus:' in line:
            current_section = 'Documentales'
            continue
        elif 'Publi:' in line:
            current_section = 'Locuciones'
            continue
        elif 'Audiolibros:' in line:
            current_section = 'Audiolibros'
            continue
        elif 'Videojuegos:' in line:
            current_section = 'Videojuegos'
            continue
        
        # Check for year headers
        year_match = re.match(r'^(\d{4})\s*---', line)
        if year_match:
            current_year = int(year_match.group(1))
            continue
        
        # Check for separator lines
        if '---' in line and not re.match(r'^\d{4}', line):
            continue
        
        # If we have a section, year, and a non-empty line, it's a title
        if current_section and current_year and line:
            # Remove notes like "(no ha salido)"
            title = re.sub(r'\s*\([^)]*\)\s*$', '', line).strip()
            if title:
                # Determine importance (you can adjust these criteria)
                important = 1 if any(keyword in title.lower() for keyword in [
                    'one piece', 'jujutsu kaisen', 'breaking bad', 'game of thrones',
                    'star wars', 'overlord', 'mob psycho', 'blue lock'
                ]) else 0
                
                doblajes_data.append({
                    'title': title,
                    'year': current_year,
                    'category': current_section,
                    'image': '',  # Empty for now, can be populated later
                    'video': '',  # Empty for now, can be populated later
                    'mainCharacter': '',  # Empty for now, can be populated later
                    'important': important
                })
    
    return doblajes_data

def insert_data(conn, data):
    """Insert parsed data into the database"""
    cursor = conn.cursor()
    
    # Clear existing data
    cursor.execute('DELETE FROM doblajes')
    
    # Insert new data
    for item in data:
        cursor.execute('''
            INSERT INTO doblajes (title, year, category, image, video, mainCharacter, important) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            item['title'],
            item['year'],
            item['category'],
            item['image'],
            item['video'],
            item['mainCharacter'],
            item['important']
        ))
    
    conn.commit()
    print(f'Inserted {len(data)} records into the database')

def main():
    """Main function to create database and populate it"""
    print('Creating doblajes.db database...')
    
    # Create database
    conn = create_database()
    
    # Parse txt file
    print('Parsing txt file...')
    data = parse_txt_file()
    
    # Insert data
    print('Inserting data...')
    insert_data(conn, data)
    
    # Close connection
    conn.close()
    
    print(f'Database created successfully at: {DB_PATH}')
    print(f'Total records: {len(data)}')
    
    # Show summary by category
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT category, COUNT(*) as count FROM doblajes GROUP BY category ORDER BY count DESC')
    results = cursor.fetchall()
    
    print('\nSummary by category:')
    for category, count in results:
        print(f'  {category}: {count} items')
    
    conn.close()

if __name__ == '__main__':
    main()