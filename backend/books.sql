--\echo 'Delete and recreate jobly db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE bookapp;
CREATE DATABASE bookapp;
\connect bookapp


-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


-- SET default_tablespace = '';

-- SET default_with_oids = false;

-- CREATE TABLE public.applications (
--     username text NOT NULL,
--     job_id integer NOT NULL,
--     state text NOT NULL,
--     created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE public.companies (
--     handle text NOT NULL,
--     name text NOT NULL,
--     num_employees integer,
--     description text,
--     logo_url text
-- );

-- CREATE TABLE public.jobs (
--     id SERIAL PRIMARY KEY,
--     title text NOT NULL,
--     salary double precision,
--     equity double precision,
--     company_handle text NOT NULL,
--     CONSTRAINT jobs_equity_check CHECK ((equity <= (1.0)::double precision))
-- );


-- CREATE TABLE public.users (
--     username text NOT NULL,
--     password text NOT NULL,
--     first_name text,
--     last_name text,
--     email text,
--     photo_url text,
--     is_admin boolean DEFAULT false NOT NULL
-- );
