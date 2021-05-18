import React from 'react';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardTitle, CardImg, CardBody, Button, Modal } from 'reactstrap';
import UserContext from '../auth/UserContext';
import BookWormApi from '../api/api';
import './BookShelf.css';

const BookShelfCard = ({ thumbnail, title, description, authors, personalreview, category, id }) => {
	// States
	const [ modal, setModal ] = useState(false);
	const toggle = () => setModal(!modal);
	const { currentUser } = useContext(UserContext);
	const history = useHistory();
	const reload = () => window.location.reload();

	async function handleDelete(evt) {
		evt.preventDefault();

		let bookData = {
			id: `${id}`,
			title: `${title}`,
			authors: `${authors}`,
			description: `${description}`,
			personalreview: `${personalreview}`,
			category: `${category}`,
			thumbnail: `${thumbnail}`,
			username: currentUser.username
		};

		try {
			await BookWormApi.deleteBook(bookData);
			toggle();
			reload(); //probably should use some form of componentdidmount
		} catch (errors) {
			console.log('unable to delete book');
			console.log(bookData);
			return;
		}
	}

	async function redirectToEdit(e) {
		const book = { id, title, authors, description, personalreview, category, thumbnail };
		history.push({
			pathname: '/editbook',
			state: { ...book }
		});
	}

	return (
		<Card style={{ width: '233px' }} className="m-auto ">
			<CardImg top style={{ width: '100%', height: '233px' }} src={thumbnail} alt={title} />
			<CardBody>
				<CardTitle className="card-title">{title}</CardTitle>
				<Button onClick={toggle}>More info</Button>
			</CardBody>
			<Modal isOpen={modal} toggle={toggle}>
				<div className="modal-header d-flex justify-content-center">
					<h5 className="modal-title text-center" id="exampleModalLabel">
						{title}
					</h5>
					<button aria-label="Close" className="close" type="button" onClick={toggle}>
						<span aria-hidden={true}>X</span>
					</button>
				</div>
				<div className="modal-body">
					<div className="d-flex justify-content-between ml-3">
						<img src={thumbnail} alt={title} style={{ height: '233px' }} />
						<div>
							<p>Authors : {authors ? authors.replace(/,/g, ', ') : 'Authors Unknown'}</p>
							<p>Category : {category ? category : 'To Be Categorized'}</p>
						</div>
					</div>
					<div className="mt-3">
						<p>Publisher's Description: {description ? description : 'No Description'}</p>
					</div>
					<div className="mt-3">
						<p>Persional Review: {personalreview ? personalreview : 'None'}</p>
					</div>
				</div>
				<div className="modal-footer">
					<div className="divider" />
					<div>
						<button className="btn btn-secondary float-right" onClick={redirectToEdit}>
							Edit
						</button>
						<button className="btn btn-secondary float-right" onClick={handleDelete}>
							Delete
						</button>
					</div>
				</div>
			</Modal>
		</Card>
	);
};

export default BookShelfCard;
