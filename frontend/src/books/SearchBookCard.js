import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardTitle, CardImg, CardBody, Button, Modal } from 'reactstrap';

const SearchBookCard = ({
	thumbnail,
	title,
	pageCount,
	language,
	description,
	authors,
	publisher,
	previewLink,
	infoLink
}) => {
	// States
	const [ modal, setModal ] = useState(false);
	const toggle = () => setModal(!modal);

	const history = useHistory();

	const redirect = (e) => {
		const book = { title, authors, description, thumbnail };

		history.push({
			pathname: '/addsearchbook',
			state: { ...book }
		});
	};

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
							<p>Page Count: {pageCount ? pageCount : 'Page Count Unknown'}</p>
							<p>Language : {language ? language : 'Language Unknown'} </p>
							<p>Authors : {authors ? authors.join(', ') : 'Authors Unknown'}</p>
							<p>Publisher : {publisher ? publisher : 'Publisher Unknown'}</p>
						</div>
					</div>
					<div className="mt-3">{description ? description : 'Description Unknown'}</div>
				</div>
				<div className="modal-footer">
					<div className="left-silde">
						<a
							href={previewLink}
							className="btn-link"
							color="default"
							type="button"
							target="_blank"
							rel="noopener noreferrer"
						>
							Preview Link
						</a>
					</div>
					<div className="divider" />
					<div className="right-silde">
						<a
							href={infoLink}
							className="btn-link"
							color="default"
							type="button"
							target="_blank"
							rel="noopener noreferrer"
						>
							Info Link
						</a>
					</div>
					<div className="divider" />
					<div>
						<button className="btn btn-secondary float-right" onClick={redirect}>
							Add to Shelf
						</button>
					</div>
				</div>
			</Modal>
		</Card>
	);
};

export default SearchBookCard;
