import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ searchFor }) {
	console.debug('SearchForm', 'searchFor=', typeof searchFor);

	const [ searchTerm, setSearchTerm ] = useState('');

	/** Tell parent to filter */
	function handleSubmit(evt) {
		// take care of accidentally trying to search for just spaces
		evt.preventDefault();
		searchFor(searchTerm.trim() || undefined);
		setSearchTerm(searchTerm.trim());
	}

	/** Update form fields */
	function handleChange(evt) {
		setSearchTerm(evt.target.value);
	}

	return (
		<div className="SearchForm mb-4">
			<form className="form-inline" onSubmit={handleSubmit}>
				<input
					className="form-control form-control-lg flex-grow-1"
					name="searchTerm"
					placeholder="Enter book category to filter your library"
					value={searchTerm}
					onChange={handleChange}
				/>
				<button type="submit" className="btn btn-lg btn-secondary">
					Filter
				</button>
			</form>
		</div>
	);
}

export default SearchForm;
