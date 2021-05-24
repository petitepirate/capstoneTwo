import React from 'react';
import { render } from '@testing-library/react';
import BookShelfCard from './BookShelfCard';
import { UserProvider } from '../testUtils';

it('matches snapshot', function() {
	const { asFragment } = render(
		<UserProvider>
			<BookShelfCard />
		</UserProvider>
	);
	expect(asFragment()).toMatchSnapshot();
});
