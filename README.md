# Bookstak
Visit [Bookstak here](www.bookstak.com)

## But what is it?
Bookstak is a book/library categorization app that works with Google Books. 
Once you've created a profile, you can start building your library.  Start on the search page where you can browse
books on Google Books, preview its contents, or even buy it on Google Books.  If you already own it, or if you want to read it, 
just add it to your Bookshelf where you can categorize it into custom categories and review/leave notes for your future self.

## Features
This web app has basic CRUD features.
Your Bookshelf allows you to filter your library by categories that you create when adding the book. I'd like to revisit this 
feature in the future to be able to add multiple categorizations that work together, as well as to change the search to a dropdown 
or to be more dynamic.

## User Flow
User's start on a home page where they can choose to sign up if they're a first time user or log-in if they're returning.  

If signing up for the first time, the new user will be directed to the about page for a quick blurb on how to use the site.

If logging in as a returning user, the user is redirected to their bookshelf, where they can either look at their own books or 
navigate to the search to add a book.

When using the search page to search google books, users can enter a title, or an author, or any keyword as their search term 
and then also enter the number of results they'd like to see - with a maximum of 40 results.

Book cards are then generated for the results, which can be clicked on, to then see basic information and 3 links to either 
preview the book, see more info and buy the book, or add it to their bookshelf.

When a user adds a book to their bookshelf, the basic information is passed to a form, where user's can update the information 
and add their own category and review.  Being able to make your own custom category was important to me, because I know that so 
many people think differently than the standard cookie-cutter categories that everyone sees in bookstores.  You can also do things 
like "Fantasy - read" or "Science Fiction - unread" to give your library more structure.

Once adding a book you are redirected to your bookshelf.  On your bookshelf is a filter search, which allows you to enter 
a category and see only the books that you've categorized that way.

## Data / API
This website uses the [Google Books API](https://developers.google.com/books) for real-time book information information.

## Tech
This application uses React, Express, and Javascript.

Database management is done with PostgreSQL, with the backend of the app available [on Git here](https://github.com/petitepirate/capstoneTwo_backend), and deployed with heroku.

Front end styling is largely handled by Bootstrap and custom CSS for project-specific styles.

The frontend of this app is deployed with surge.

## Testing
All tests are run with Jest.  Once cloning the repository you may run "jest" in the backend or "npm test" in the frontend 
folders of the terminal to run the available tests.

# This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
