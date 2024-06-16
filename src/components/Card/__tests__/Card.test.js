import React from 'react';
import { render } from '@testing-library/react';
import Card from '../index';

const vehicle = {
    id: '1',
    price: '£100',
    media: [
        { url: 'smallImage.jpg' , name: 'image'},
        { url: 'largeImage.jpg', name: 'image' },
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

    it('should render with a small image', () => {
        const {getByAltText} = render(<Card vehicle={vehicle} />);
        const image = getByAltText('image'); 
        expect(image).toHaveAttribute('src', 'smallImage.jpg');


    });

    it('should render with a large image', () => {
        const vehicle = {
            id: '1',
            price: '£100',
            media: [
                { url: 'image1.jpg' },
                { url: 'image2.jpg' },
            ],
            description: 'A lovely vehicle',
        };
        const wrapper = shallow(<Card vehicle={vehicle} />);
        expect(wrapper.find('source').last().prop('srcSet')).toBe('image2.jpg');
    });
});
