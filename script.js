'use strict'
const imageContainer = document.querySelector('.image_container');
const loader = document.querySelector('.loader');


const count = 30;
const accessKey = 'J42i6gIyP86jj0lHJBFIJShBvZsFXt8nToHQ4ho6Ot4'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`;

let photosArray = [];
let loaded = 0;
let total;
let isLoaded = false;
// helper function of setAttribute
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
} 


// functions

function displayPhotos() {
    
    photosArray.forEach(photo => {
        loaded = 0;
        total = photosArray.length;
        // creating <a> element for unsplash link html
        const item = document.createElement('a');
        // creating a <img> 
        const image = document.createElement('img');
        // setting attributes for item element
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // setting attributes for image element
        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description,
        })

        item.appendChild(image);
        imageContainer.appendChild(item);

         
        // load event on image element
        image.addEventListener('load', () => {
            loaded++;
            if(loaded === total){
                isLoaded = true;
                loader.hidden = true;
            }
        });        

    });
}


// Getting data from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        
    }
}

// scroll event
window.addEventListener('scroll', () => {
    if((window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) && isLoaded) {
        isLoaded = false;
        getPhotos();
    }
})

// on load
getPhotos();