import React from 'react';
import './style.scss';

export default function Card({ vehicle }) {
    const { id, price, media, description } = vehicle;
    const largeImage = media.find(mediaItem => mediaItem.url.includes('16x9'));
    const smallImage = media.find(mediaItem => mediaItem.url.includes('1x1'));
    const fallbackImage = largeImage || smallImage;

    return (
        <article className="card">
            {fallbackImage && (
                <div className="card__image-wrapper">
                    <picture className="card__image-wrapper__picture">
                        <source media="(max-width: 767px)" srcSet={smallImage.url} className="card__picture-source" />
                        <source media="(min-width: 768px)" srcSet={largeImage.url} className="card__picture-source" />
                        <img src={fallbackImage.url} alt={fallbackImage.name} className="card__image-wrapper__picture__img" />
                    </picture>
                </div>
            )}
            <div className="card__content">
                <h2 className="card__content-title">
                    <span className="card__content-title__id">{id}</span>
                </h2>
                <p className="card__content-price">From {price}</p>
                <p className="card__content-description">{description}</p>
            </div>
        </article>
    );
}