# Capstone 2 - Project Proposal – Book App/Webpage
 
1. What tech stack will you use for your final project? We recommend that you use React and Node for this project, however if you are extremely interested in becoming a Python developer you are welcome to use Python/Flask for this project.  
        React / Node
            	
2. Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application?  
        Full-stack
            	
3. Will this be a website? A mobile app? Something else?  
        Website 
            	
4. What goal will your project be designed to achieve?  
        To create a webpage for a person to create a personal library/reading list that is more robust that the ones I’ve currently seen available.  
        
5. What kind of users will visit your app? In other words, what is the demographic of your users?  

        Bookworms  
                
6. What data do you plan on using? How are you planning on collecting your data? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain. You are welcome to create your own API and populate it with data. If you are using a Python/Flask stack are required to create your own API.  

        I’ll pull data from either Google API, Penguin Books API, or Open Library API to get Book Cover thumbnail images, Author, and synopsis at a minimum.  Will likely link to Google API so they can purchase the book once they’ve read about it.  Also, a database will be created to store user’s favorites, to read, read, and any comments they have about the book.  

7. In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information:  

    *a.* What does your database schema look like?  

        Users table and a Books Table  

    *b.* What kinds of issues might you run into with your API? This is especially important if you are creating your own API, web scraping produces notoriously messy data.
        Since I’m not creating my own API, it should be straightforward, though Google Books is listed as experimental.  

    *c.* Is there any sensitive information you need to secure?  

        Just username, password, and email.  All options to purchase books will be through Google Books – which handles credit card information already.  

    *d.* What functionality will your app include?  

        Login, create a user profile, search for books.  Once you search for a book, you can add them to your own bookshelf in several categories (Reading, To Read, Favorites, Read), and write notes about each book (which you can edit and delete).  

    *e.* What will the user flow look like?  

        Similar to what I explained above.  The user will have no access to the site until they sign up and create a profile.  After that they would have their own homepage that has a search portion and a library portion.  The user would use the search to look for books and add it to their library, categorized in predetermined categories.  Once the book is added, it can be deleted if in error, or they can also add notes about the book (which can be edited or deleted).  

    *f.* What features make your site more than a CRUD app? What are your stretch goals?    

        The search feature for books makes the app more than CRUD.  Stretch goals are to possibly create a Creative Writing Prompt generator API and have my website access it. I’ve not seen a Creative Writing API of writing prompts.
