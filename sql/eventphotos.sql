DROP TABLE IF EXISTS eventphotos;

CREATE TABLE eventphotos(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    photo VARCHAR (300),
    status INTEGER
)
