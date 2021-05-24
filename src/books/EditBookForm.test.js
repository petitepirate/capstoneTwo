import React from 'react';
import { render } from '@testing-library/react';
import EditBookForm from './EditBookForm';
import { UserProvider } from '../testUtils';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

it('renders without crashing', function() {
	const history = createMemoryHistory();
	const state = {
		title: 'The Mortal Instruments',
		authors: 'Cassandra Claire',
		description: 'A book about clary',
		personalreview: 'One of my favorite series',
		category: 'Favorites',
		thumbnail:
			'http://books.google.com/books/content?id=MUo8DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
	};
	history.push('/editbook/1', state);
	render(
		<Router history={history}>
			<UserProvider>
				<EditBookForm />
			</UserProvider>
		</Router>
	);
});
