import React, { useState, useContext } from 'react';
import UserContext from '../auth/UserContext';
import { useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import BookWormApi from '../api/api';

function Profile() {
	const history = useHistory();
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const [ formData, setFormData ] = useState({
		firstname: currentUser.firstname,
		lastname: currentUser.lastname,
		email: currentUser.email,
		username: currentUser.username,
		password: ''
	});
	const [ formErrors, setFormErrors ] = useState([]);
	const [ saveConfirmed, setSaveConfirmed ] = useState(false);

	console.debug(
		'ProfileForm',
		'currentUser=',
		currentUser,
		'formData=',
		formData,
		'formErrors=',
		formErrors,
		'saveConfirmed=',
		saveConfirmed
	);

	/** on form submit:
	 * - attempt save to backend & report any errors
	 * - if successful
	 *   - clear previous error messages and password
	 *   - show save-confirmed message
	 *   - set current user info throughout the site
	 */

	async function handleSubmit(evt) {
		evt.preventDefault();

		let profileData = {
			firstname: formData.firstname,
			lastname: formData.lastname,
			email: formData.email,
			password: formData.password
		};

		let username = formData.username;
		let updatedUser;

		try {
			updatedUser = await BookWormApi.saveProfile(username, profileData);
		} catch (errors) {
			setFormErrors(errors);
			return;
		}

		setFormData((f) => ({ ...f, password: '' }));
		setFormErrors([]);
		setSaveConfirmed(true);

		// trigger reloading of user information throughout the site
		setCurrentUser(updatedUser);
		history.push('/books');
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
		history.push('/bookshelf');
	}

	return (
		<div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
			<h3>Profile</h3>
			<div className="card">
				<div className="card-body">
					<form>
						<div className="form-group">
							<label>Username</label>
							<p className="form-control-plaintext">{formData.username}</p>
						</div>
						<div className="form-group">
							<label>First Name</label>
							<input
								name="firstname"
								className="form-control"
								value={formData.firstname}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Last Name</label>
							<input
								name="lastname"
								className="form-control"
								value={formData.lastname}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input
								name="email"
								className="form-control"
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Confirm password to make changes:</label>
							<input
								type="password"
								name="password"
								className="form-control"
								value={formData.password}
								onChange={handleChange}
							/>
						</div>

						{formErrors.length ? <Alert type="danger" messages={formErrors} /> : null}

						{saveConfirmed ? <Alert type="success" messages={[ 'Updated successfully.' ]} /> : null}

						<button className="btn btn-secondary btn-block mt-4" onClick={handleSubmit}>
							Save Changes
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

export default Profile;
