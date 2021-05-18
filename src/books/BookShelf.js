import React, { useState, useEffect } from 'react';
import SearchForm from '../common/SearchForm';
import BookWormApi from '../api/api';
import BookShelfCard from './BookShelfCard';
import LoadingSpinner from '../common/LoadingSpinner';
import './BookShelf.css';

function BookShelf() {
	console.debug('BookShelf');
	const [ books, setBooks ] = useState(null);

	useEffect(function getBooksOnMount() {
		console.debug('BookShelf useEffect getBooksOnMount');
		search();
	}, []);

	async function search(username) {
		let books = await BookWormApi.getBooks(username);
		setBooks(books);
	}

	/** Triggered by search form submit; reloads books of only that category */
	async function getCategorizedBooks(category) {
		let books = await BookWormApi.getFilteredBooks(category);
		setBooks(books);
	}

	if (!books) return <LoadingSpinner />;

	return (
		<div className="BookShelf col-md-8 offset-md-2">
			<SearchForm searchFor={getCategorizedBooks} />

			{books.length ? (
				<div className="container my-5">
					<div className="row">
						{books.map((b) => (
							<div className="col-lg-4 mb-3" key={b.id}>
								<BookShelfCard
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
