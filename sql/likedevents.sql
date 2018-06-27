DROP TABLE IF EXISTS likedevents;

CREATE TABLE likedevents(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    date_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    event_date VARCHAR (100) NOT NULL,
    status INTEGER
)
