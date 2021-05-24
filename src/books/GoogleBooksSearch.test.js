import React from 'react';
import { render } from '@testing-library/react';
import Search from './GoogleBooksSearch';

it('matches snapshot', function() {
	const { asFragment } = render(<Search />);
	expect(asFragment()).toMatchSnapshot();
});
