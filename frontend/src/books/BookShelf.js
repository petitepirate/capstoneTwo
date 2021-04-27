import React, { useState, useEffect /*useContext*/ } from 'react';
import SearchForm from '../common/SearchForm';
import BookWormApi from '../api/api';
import UserBookCard from './UserBookCard';
import LoadingSpinner from '../common/LoadingSpinner';
import 'react-toastify/dist/ReactToastify.min.css';
import './BookCard.css';
/** Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

function BookShelf() {
	console.debug('BookShelf');
	// const { currentUser } = useContext(UserContext);
	// console.log(currentUser.username);
	const [ books, setBooks ] = useState(null);
	// const username = currentUser.username;

	useEffect(function getBooksOnMount() {
		console.debug('BookShelf useEffect getBooksOnMount');
		search();
	}, []);

	async function search(username) {
		let books = await BookWormApi.getBooks(username);
		setBooks(books);
	}

	/** Triggered by search form submit; reloads companies. */
	async function getCategorizedBooks(category) {
		let books = await BookWormApi.getFilteredBooks(category);
		setBooks(books);
	}

	if (!books) return <LoadingSpinner />;

	return (
		<div className="CompanyList col-md-8 offset-md-2">
			<SearchForm searchFor={getCategorizedBooks} />

			{books.length ? (
				<div className="container my-5" /*key={b.id}*/>
					<div className="row">
						{books.map((b) => (
							<div className="col-lg-4 mb-3" key={b.id}>
								<UserBookCard
									id={b.id}
									title={b.title}
									authors={b.authors}
									description={b.description}
									personalreview={b.personalreview}
									category={b.category}
									thumbnail={b.thumbnail}
								/>
							</div>
						))}
					</div>
				</div>
			) : (
				<p className="lead">Sorry, no results were found!</p>
			)}
		</div>
	);
}

export default BookShelf;
