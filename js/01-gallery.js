import { galleryItems } from './gallery-items.js';
// Change code below this line
// import * as basicLightbox from 'basiclightbox';

const galleryContainer = document.querySelector('ul.gallery');

const galleryMarkup = galleryItems.map(({ preview, original, description }) => {
    const image = `
        <li class="gallery__item">
            <a class="gallery__link" href="large-image.jpg">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>
    `;
    return image;
});

galleryContainer.insertAdjacentHTML('afterbegin', galleryMarkup.join(''));

const handleClickListener = galleryContainer.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.tagName !== 'IMG') {
        return;
    }

    const instance = basicLightbox.create(
        `<img src='${e.target.dataset.source}' alt='${e.target.alt}' />`,
    );

    instance.show();

    const onEscCloseListener = galleryContainer.addEventListener(
        'keydown',
        e => {
            if (e.code === 'Escape') {
                instance.close();
            }
            onEscCloseListener.removeEventListener('keydown', instance);
        },
    );
});

galleryContainer.removeEventListener('click', handleClickListener);
