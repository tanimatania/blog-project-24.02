-- this script should create a database named : blog_db
-- the database holds a 5 columns table named : posts
-- the table will have 15 posts by 15 insert queries. it worked for me

DROP DATABASE IF exists blog_db;
CREATE DATABASE blog_db;
-- Connect to the desired database
\c blog_db;

-- Create the sequence for post IDs
CREATE SEQUENCE IF NOT EXISTS posts_id_seq;

-- Table: public.posts

DROP TABLE IF EXISTS public.posts;

CREATE TABLE IF NOT EXISTS public.posts
(
    id integer NOT NULL DEFAULT nextval('posts_id_seq'::regclass),
    title text COLLATE pg_catalog."default",
    body text COLLATE pg_catalog."default",
    created_at timestamp without time zone,
    image_url text COLLATE pg_catalog."default",
    CONSTRAINT posts_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

-- Assign ownership of the table (if necessary)
ALTER TABLE IF EXISTS public.posts OWNER to postgres;

--  insert values to the posts table  :

INSERT INTO public.posts (id, title, body, created_at, image_url)
VALUES 
(DEFAULT, 'Post Title 1', 'Body of post 1', '2024-02-11 08:00:00', 'https://via.placeholder.com/300x200.jpg/ff0000/ffffff?text=Post+1'),
(DEFAULT, 'Post Title 2', 'Body of post 2', '2024-02-11 09:00:00', NULL),
(DEFAULT, 'Post Title 3', 'Body of post 3', '2024-02-11 10:00:00', 'https://via.placeholder.com/300x200.jpg/00ff00/ffffff?text=Post+3'),
(DEFAULT, 'Post Title 4', 'Body of post 4', '2024-02-11 11:00:00', NULL),
(DEFAULT, 'Post Title 5', 'Body of post 5', '2024-02-11 12:00:00', 'https://via.placeholder.com/300x200.jpg/0000ff/ffffff?text=Post+5'),
(DEFAULT, 'Post Title 6', 'Body of post 6', '2024-02-11 13:00:00', NULL),
(DEFAULT, 'Post Title 7', 'Body of post 7', '2024-02-11 14:00:00', 'https://via.placeholder.com/300x200.jpg/f0f0f0/000000?text=Post+7'),
(DEFAULT, 'Post Title 8', 'Body of post 8', '2024-02-11 15:00:00', NULL),
(DEFAULT, 'Post Title 9', 'Body of post 9', '2024-02-11 16:00:00', 'https://via.placeholder.com/300x200.jpg/ffff00/000000?text=Post+9'),
(DEFAULT, 'Post Title 10', 'Body of post 10', '2024-02-11 17:00:00', NULL),
(DEFAULT, 'Post Title 11', 'Body of post 11', '2024-02-11 18:00:00', 'https://via.placeholder.com/300x200.jpg/ff00ff/ffffff?text=Post+11'),
(DEFAULT, 'Post Title 12', 'Body of post 12', '2024-02-11 19:00:00', NULL),
(DEFAULT, 'Post Title 13', 'Body of post 13', '2024-02-11 20:00:00', 'https://via.placeholder.com/300x200.jpg/00ffff/000000?text=Post+13'),
(DEFAULT, 'Post Title 14', 'Body of post 14', '2024-02-11 21:00:00', NULL),
(DEFAULT, 'Post Title 15', 'Body of post 15', '2024-02-11 22:00:00', 'https://via.placeholder.com/300x200.jpg/000000/ffffff?text=Post+15');

-- Table: public.posts

-- DROP TABLE IF EXISTS public.posts;

-- CREATE TABLE IF NOT EXISTS public.posts
-- (
--     id integer NOT NULL DEFAULT nextval('posts_id_seq'::regclass),
--     title text COLLATE pg_catalog."default",
--     body text COLLATE pg_catalog."default",
--     created_at timestamp without time zone,
--     image_url text COLLATE pg_catalog."default",
--     CONSTRAINT posts_pkey PRIMARY KEY (id)
-- )
-- WITH (
--     OIDS = FALSE
-- )
-- TABLESPACE pg_default;

-- ALTER TABLE IF EXISTS public.posts
--     OWNER to ecinpjqn;

