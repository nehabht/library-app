create database library-app;

create table books (
    id VARCHAR(225) PRIMARY KEY,
    user_email VARCHAR(225),
    title VARCHAR(30),
    author VARCHAR(30),
    isbn VARCHAR(225),
    plot VARCHAR(225),
    progress INT,
    date VARCHAR(300)
);

create table users (
    name VARCHAR(30),
    lastname VARCHAR(30),
    email VARCHAR(225) PRIMARY KEY,
    hashed_password VARCHAR(225)
);

