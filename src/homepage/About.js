import React, { useContext } from 'react';
import './Homepage.css';
import UserContext from '../auth/UserContext';

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
	const { currentUser } = useContext(UserContext);
	console.debug('Homepage', 'currentUser=', currentUser);
	const search = <a href="/booksearch">Search Page</a>;
	const shelf = <a href="/bookshelf">Bookshelf Page</a>;

	return (
		<div className="Homepage">
			<div className="container text-center">
				<h1 className="mb-4 font-weight-bold">BookStak</h1>
				<p className="lead">Books: A Uniquely Portable Magic</p>
				<p className="intro">
					Bookstak is a simple site to build and organize your own library. Visit the {search} to look for
					books through Google Books, where you can preview the book, view info and purchase the book, or just
					add it to your library - categorizing it, giving it a personal review. Then view your personal
					library on the {shelf}.
				</p>
			</div>
		</div>
	);
}

export default Homepage;
