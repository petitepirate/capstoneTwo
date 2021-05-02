import React, { useState } from 'react';
import { InputGroup, Input, InputGroupAddon, Button, FormGroup, Label, Spinner } from 'reactstrap';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import SearchBookCard from './SearchBookCard.js';
import './BookShelf.css';

function GoogleBookSearch() {
	// States
	const [ maxResults, setMaxResults ] = useState(3);
	const [ query, setQuery ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ cards, setCards ] = useState([]);
	const [ error, setError ] = useState(false);
	// Handle Search
	const handleSubmit = () => {
		setLoading(true);
		if (maxResults > 40 || maxResults < 1) {
			setError(true);
		} else {
			getBooks();
		}
	};

	async function getBooks() {
		const res = await axios.get(
			`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&startIndex=1`
		);
		if (res.data.items.length > 0) {
			setCards(res.data.items);
			setLoading(false);
		}
	}

	const onKeyPress = (e) => {
		if (e.which === 13) {
			handleSubmit();
		}
	};

	// Main Show Case
	const mainHeader = () => {
		return (
			<div className="main-image d-flex justify-content-center align-items-center flex-column">
				{/* Overlay */}
				<div className="filter" />
				<h2 className="display-2 text-center text-white mb-3" style={{ zIndex: 2 }}>
					Search Books
				</h2>
				<div style={{ width: '60%', zIndex: 2 }}>
					<InputGroup size="lg" className="mb-3">
						<Input
							placeholder="Book Search"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyPress={onKeyPress}
						/>
						<InputGroupAddon addonType="append">
							<Button type="submit" color="secondary" onSubmit={handleSubmit} onClick={handleSubmit}>
								<i className="fas fa-search" />
							</Button>
						</InputGroupAddon>
					</InputGroup>
					<div className="d-flex text-white justify-content-center">
						<FormGroup>
							<Label for="maxResults">Max Results</Label>
							<Input
								type="number"
								id="maxResults"
								placeholder="Max Results"
								value={maxResults}
								onChange={(e) => setMaxResults(e.target.value)}
							/>
						</FormGroup>
					</div>
				</div>
			</div>
		);
	};

	const handleCards = () => {
		if (loading) {
			return (
				<div className="d-flex justify-content-center mt-3">
					<Spinner style={{ width: '3rem', height: '3rem' }} />
				</div>
			);
		} else {
			const items = cards.map((item, i) => {
				let thumbnail = '';
				if (item.volumeInfo.imageLinks) {
					thumbnail = item.volumeInfo.imageLinks.thumbnail;
				}

				return (
					<div className="col-lg-4 mb-3" key={item.id}>
						<SearchBookCard
							thumbnail={thumbnail}
							title={item.volumeInfo.title}
							pageCount={item.volumeInfo.pageCount}
							language={item.volumeInfo.language}
							authors={item.volumeInfo.authors}
							publisher={item.volumeInfo.publisher}
							description={item.volumeInfo.description}
							previewLink={item.volumeInfo.previewLink}
							infoLink={item.volumeInfo.infoLink}
						/>
					</div>
				);
			});
			return (
				<div className="container my-5">
					<div className="row">{items}</div>
					<div className="row justify-content-center text-center">
						<p>
							Cant find what you're looking for? Add book not found in search <a href="/addbook">here</a>
						</p>
					</div>
				</div>
			);
		}
	};
	return (
		<div className="w-100 h-100">
			{mainHeader()}
			{error ? <Alert type="danger" messages={[ 'Results must be between 1 and 40' ]} /> : null}
			{handleCards()}
		</div>
	);
}

export default GoogleBookSearch;
