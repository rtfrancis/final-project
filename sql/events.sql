DROP TABLE IF EXISTS events;

CREATE TABLE events(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(300) NOT NULL,
    artist VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    dates TEXT NOT NULL,
    category VARCHAR(100),
    language VARCHAR(100),
    subtitles VARCHAR(100),
    url VARCHAR(100),
    notes TEXT
)
