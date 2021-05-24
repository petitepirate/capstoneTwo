import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class BookWormApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${BookWormApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [ message ];
		}
	}

	// Individual API routes

	/** Get the current user. */
	static async getCurrentUser(username) {
		let res = await this.request(`users/${username}`);
		return res.user;
	}

	/** Get user's books  */
	static async getBooks(username) {
		let res = await this.request('books', { username });
		return res.books;
	}

	/** Get details on a book by its title. */

	static async getBook(title) {
		let res = await this.request(`books/${title}`);
		return res.book;
	}

	/** Filter books by category */
	static async getFilteredBooks(category) {
		let res = await this.request(`books/${category}`);
		return res.books;
	}

	/** Get token for login from username, password. */
	static async login(data) {
		let res = await this.request(`auth/token`, data, 'post');
		return res.token;
	}

	/** Signup for site. */

	static async signup(data) {
		let res = await this.request(`auth/register`, data, 'post');
		return res.token;
	}

	/** Save user profile page. */
	static async saveProfile(username, data) {
		let res = await this.request(`users/${username}`, data, 'patch');
		return res.user;
	}

	/** Saves book to database. */
	static async saveBook(data) {
		let res = await this.request(`books`, data, 'post');
		return res.book;
	}

	/** Saves edits to a user's book by its ID number. */
	static async saveBookEdit(data, id) {
		let res = await this.request(`books/${id}`, data, 'patch');
		return res.book;
	}

	/** Deletes a book by its ID number */
	static async deleteBook(data) {
		let res = await this.request(`books/${data.id}`, data, 'delete');
		return res.book;
	}
}

export default BookWormApi;
