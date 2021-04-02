\echo 'Delete and recreate bookapp db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE bookapp;
CREATE DATABASE bookapp;
\connect bookapp

\i books-schema.sql


