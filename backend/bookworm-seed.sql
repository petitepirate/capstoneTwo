-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE);

INSERT INTO books (title, authors, description, personalReview, category, thumbnail)
VALUES ('The Mortal Instruments', 'Cassandra Claire', 'A book about clary', 'One of my favorite series',
        'Favorites', 'http://books.google.com/books/content?id=MUo8DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
        ('Chain of Gold', 'Cassandra Claire', 'A book about cordelia', 'One of my favorite series',
        'Favorites', 'http://books.google.com/books/content?id=0zV-DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api')
      