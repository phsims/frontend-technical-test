import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../index';

const vehicle = {
  id: '1',
  price: '£100',
  media: [
    { url: '/images/1x1/smallImage.jpg', name: 'image' },
    { url: '/images/16x9/largeImage.jpg', name: 'image' },
  ],
  description: 'A lovely vehicle',
};

describe('Card', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Card vehicle={vehicle} />);
    expect(baseElement).toBeTruthy();
  });

  it('should match the snapshot', () => {
    const { baseElement } = render(<Card vehicle={vehicle} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render with image', async () => {
    const { getByAltText } = render(<Card vehicle={vehicle} />);
    const image = await getByAltText('image');
    expect(image).toHaveAttribute('src', vehicle.media[1].url);
  });
  it('should render with price', async () => {
    const { getByText } = render(<Card vehicle={vehicle} />);
    const price = await getByText(/£100/);
    expect(price).toBeInTheDocument();
  });
  it('should render with description', async () => {
    const { getByText } = render(<Card vehicle={vehicle} />);
    const description = await getByText(/A lovely vehicle/);
    expect(description).toBeInTheDocument();
  });
});
