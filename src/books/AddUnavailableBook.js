import React, { useState, useContext } from 'react';
import BookWormApi from '../api/api';
import UserContext from '../auth/UserContext';
import { useHistory } from 'react-router-dom';
import Alert from '../common/Alert';

/** Form to add a book that can not be found from a google books search.
 *
 * Displays AddUnavailableBook form and handles changes to local form state.
 * Submitting the form calls the API to save.
 *
 * Routed as /addbook
 */

function AddUnavailableBook() {
	//sets a default photo for unavailable books
	const defaultThumbnail =
		'https://images.unsplash.com/photo-1575709527142-a93ed587bb83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80';
	const { currentUser } = useContext(UserContext);
	const [ formData, setFormData ] = useState({
		title: '',
		authors: '',
		description: '',
		personalreview: '',
		categroy: '',
		thumnnail: ''
	});
	const [ formErrors, setFormErrors ] = useState([]);
	const history = useHistory();

	console.debug('formData=', formData, 'formErrors=', formErrors);

	async function handleSubmit(evt) {
		evt.preventDefault();

		let bookData = {
			title: formData.title,
			authors: formData.authors,
			description: formData.description,
			personalreview: formData.personalreview,
			category: formData.category,
			thumbnail: formData.thumbnail ? formData.thumnnail : defaultThumbnail,
			username: currentUser.username
		};

		try {
			await BookWormApi.saveBook(bookData);
			history.push('/booksearch');
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
			thumnnail: ''
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
		history.push('/books');
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
							<p>To get a photo URL, right click on a picture and select "copy image address"</p>
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

export default AddUnavailableBook;
