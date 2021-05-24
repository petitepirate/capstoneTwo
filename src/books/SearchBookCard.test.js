import React from 'react';
import { render } from '@testing-library/react';
import SearchBookCard from './SearchBookCard';
import { UserProvider } from '../testUtils';

it('matches snapshot', function() {
	const { asFragment } = render(
		<UserProvider>
			<SearchBookCard />
		</UserProvider>
	);
	expect(asFragment()).toMatchSnapshot();
});
