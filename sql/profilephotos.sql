DROP TABLE IF EXISTS profilephotos;

CREATE TABLE profilephotos(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    photo VARCHAR (300),
    status INTEGER
)
