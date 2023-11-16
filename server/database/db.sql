CREATE DATABASE base_auth;

CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE "role" (
    role_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO "role" (name) VALUES ('USER'), ('ADMIN');

CREATE TABLE "user_role" (
    user_id BIGINT REFERENCES "user" (user_id),
    role_id BIGINT REFERENCES "role" (role_id),
    PRIMARY KEY (user_id, role_id) -- створюємо спільний ключ з ключів user_id та role_id
);