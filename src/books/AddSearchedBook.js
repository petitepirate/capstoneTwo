import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import BookWormApi from '../api/api';
import UserContext from '../auth/UserContext';
import Alert from '../common/Alert';

/** Form to add a book that was returned from a google books search.
 *
 * Displays AddSearchedBook form and handles changes to local form state.
 * Submitting the form calls the API to save
 *
 * Routed as /addsearchbook
 */

function AddSearchedBook() {
	const history = useHistory();
	const location = useLocation();
	const { currentUser } = useContext(UserContext);
	//location.state is used to recieve the book information passed from the search.
	const { title, authors, description, thumbnail } = location.state;
	const [ formData, setFormData ] = useState({
		title: `${title}`,
		authors: `${authors}`,
		description: `${description}`,
		personalreview: '',
		category: '',
		thumbnail: `${thumbnail}`
	});
	const [ formErrors, setFormErrors ] = useState([]);

	async function handleSubmit(evt) {
		evt.preventDefault();

		let bookData = {
			title: formData.title,
			authors: formData.authors,
			description: formData.description,
			personalreview: formData.personalreview,
			category: formData.category,
			thumbnail: formData.thumbnail,
			username: currentUser.username
		};

		//tries saving the book to the api/database and then redirects to user's bookshelf when succssful, or returns errors
		try {
			await BookWormApi.saveBook(bookData);
			history.push('/bookshelf');
		} catch (errors) {
			setFormErrors(errors);
			return;
		}

		setFormData((f) => ({
			title: '',
			authors: '',
			description: '',
			personalreview: '',
			categroy: '',
			thumbnail: ''
		}));
		setFormErrors([]);
	}

	/** Handle form data changing */
	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData((f) => ({
			...f,
			[name]: value
		}));
		setFormErrors([]);
	}

	function cancel() {
		history.push('/booksearch');
	}

	return (
		<div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
			<h3>Book</h3>
			<div className="card">
				<div className="card-body">
					<form>
						<div className="form-group">
							<label>Title</label>
							<input
								name="title"
								className="form-control"
								value={formData.title}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Authors</label>
							<input
								name="authors"
								className="form-control"
								value={formData.authors}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Description</label>
							<input
								name="description"
								className="form-control"
								value={formData.description}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Personal Review</label>
							<input
								name="personalreview"
								className="form-control"
								value={formData.personalreview}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Category</label>
							<input
								name="category"
								className="form-control"
								placeholder="Categorize this book"
								value={formData.category}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Cover</label>
							<input
								name="thumbnail"
								className="form-control"
								value={formData.thumbnail}
								onChange={handleChange}
							/>
						</div>

						{formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}

						<button className="btn btn-secondary btn-block mt-4" onClick={handleSubmit}>
							Add Book
						</button>
						<button className="btn btn-secondary btn-block mt-4" onClick={cancel}>
							Cancel
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AddSearchedBook;
