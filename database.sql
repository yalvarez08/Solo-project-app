-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "f_name" VARCHAR (100) NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "home_address" VARCHAR (180) NOT NULL
);

CREATE TABLE "home_item" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "re_date" TIMESTAMP NOT NULL,
    "location" VARCHAR (80) NOT NULL,
    "priority_level" INTEGER NOT NULL,
    "is_complete" BOOLEAN DEFAULT FALSE,
    "user_id" INTEGER REFERENCES "user"
);

CREATE TABLE "reminders" (
    "id" SERIAL PRIMARY KEY,
    "frequency" VARCHAR NOT NULL,
    "next_date" TIMESTAMP NOT NULL,
    "description_notes" VARCHAR (200),
    "home_item_id" INTEGER REFERENCES "home_item"
);