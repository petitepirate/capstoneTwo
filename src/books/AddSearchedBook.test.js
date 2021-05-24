import React from 'react';
import { render } from '@testing-library/react';
import Book from './GoogleBooksSearch';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../testUtils';

it('renders without crashing', function() {
	render(
		<MemoryRouter>
			<UserProvider>
				<Book />
			</UserProvider>
		</MemoryRouter>
	);
});
