//Global variables
const weatherAPIKey = 'd096e4050a577804638e8c9dc5f6141f';
const weatherUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={API key}&units=metric';
const locationUrl = 'http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit=5&appid={API key}'

const galleryImages = [
    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1"
    },
    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2"
    },
    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 3"
    }
];

const products = [
    {
        title: "AstroFiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
    },
    {
        title: "Space Odissey",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img1.png"
    },
    {
        title: "Doomed City",
        author: "Jason Cobert",
        price: 0,
        image: "./assets/products/img2.png"
    },
    {
        title: "Black Dog",
        author: "John Doe",
        price: 85.35,
        image: "./assets/products/img3.png"
    },
    {
        title: "My Little Robot",
        author: "Pedro Paulo",
        price: 0,
        image: "./assets/products/img5.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img4.png"
    }
]


// Menu section

const menuHandler = () => {
    document.querySelector('#open-nav-menu').addEventListener('click', function() {
        document.querySelector('header nav .wrapper').classList.add("nav-open");
    });
    
    document.querySelector('#close-nav-menu').addEventListener('click', function() {
        document.querySelector('header nav .wrapper').classList.remove("nav-open");
    });
}

// Temperature Conversion

function celsiusToFahr(temperature) {
    let fahr = (temperature * 9/5) + 32;
    return fahr;
}

//Greeting Section

const greetingHandler = () => {
    let greetingText;
    let currentHour = new Date().getHours();

    if(currentHour < 12){
        greetingText = 'Good Morning!';
    } else if(currentHour < 19) {
        greetingText = 'Good afternoon!';
    } else if (currentHour < 24) {
        greetingText = 'Good evening!';
    } else {
        greetingText = 'Welcome!';
    }

    document.querySelector("#greeting").innerHTML = greetingText;
}

//Weather Text

const weatherHandler = () => {
    navigator.geolocation.getCurrentPosition(async position => {
        let { latitude, longitude, accuracy } = position.coords;
        const locationAPIUrl = locationUrl
            .replace("{lat}", latitude)
            .replace("{lon}", longitude)
            .replace("{API key}", weatherAPIKey);
    
        const locationRes = await fetch(locationAPIUrl);
        const locationData = await locationRes.json();
        const location = locationData[0].name;
    
        const weatherAPIUrl = weatherUrl
            .replace("{lat}", latitude)
            .replace("{lon}", longitude)
            .replace("{API key}", weatherAPIKey);
    
        const weatherRes = await fetch(weatherAPIUrl);
        const weatherData = await weatherRes.json();
        const temperature = weatherData.current.temp;
        const condition = weatherData.current.weather[0].description;

        try {
            let celsiusText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1)}°C outside.`;
            let fahrText = `The weather is ${condition} in ${location} and it's ${celsiusToFahr(temperature).toFixed(1)}°F outside.`;
        
            //temperature Switch
        
            document.querySelector("p#weather").innerHTML = celsiusText;
        
            document.querySelector('.weather-group').addEventListener("click", function(e) {
                if(e.target.id === 'fahr') {
                    document.querySelector("p#weather").innerHTML = fahrText;
                } else if(e.target.id === 'celsius'){
                    document.querySelector("p#weather").innerHTML = celsiusText;
                }
            });
        } catch (err) {
            console.log ("Error: ", err.message);
            document.querySelector("p#weather").innerHTML = "Unable to get the weather info. Try again later.";
        }
    
    });
}

//Local time section

const clockHandler = () => {
    setInterval(function(){
        let localTime = new Date();
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2,'0');
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2,'0');
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2,'0');
    }, 1000)
}


//Gallery section

const galleryHandler = () => {
    const mainImg = document.querySelector("#gallery > img");
    const thumbnails = document.querySelector("#gallery .thumbnails");
    mainImg.src = galleryImages[0].src;
    mainImg.alt = galleryImages[0].alt;
    
    galleryImages.forEach(function(img, idx){
        let thumb = document.createElement("img");
        thumb.src = img.src;
        thumb.alt = img.alt;
        thumb.dataset.arrayIndex = idx;
        thumb.dataset.selected = idx === 0 ? true : false;
    
        thumb.addEventListener('click', function(e){
            let selectedIdx = e.target.dataset.arrayIndex;
            let selectedImg = galleryImages[selectedIdx];
            mainImg.src = selectedImg.src;
            mainImg.alt = selectedImg.alt;
            thumbnails.querySelectorAll("img").forEach((img) => {
                img.dataset.selected = false;
            });
            e.target.dataset.selected = true;
        });
    
        thumbnails.appendChild(thumb);
    });
}

//Products Section

const populateProducts = (prodsArray) => {
    const productArea = document.querySelector('.products-area');
    productArea.innerHTML = '';
    for (product of prodsArray) {
        //item
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        //img
        const productImg = document.createElement('img');
        productImg.src = product.image;
        productImg.alt = `Image for ${product.title}`;
        
        //details
        const prodDetails = document.createElement('div');
        prodDetails.classList.add('product-details');
        
        const prodTitle = document.createElement('h3');
        prodTitle.classList.add('product-title');
        prodTitle.innerText = product.title;

        const prodAuthor = document.createElement('p');
        prodAuthor.classList.add('product-author');
        prodAuthor.innerText = product.author;

        const priceTitle = document.createElement('p');
        priceTitle.classList.add('price-title');
        priceTitle.innerText = 'Price';

        const prodPrice = document.createElement('p');
        prodPrice.classList.add('product-price');
        prodPrice.innerText = product.price >0 ? `$${product.price.toFixed(2)}` : 'Free';

        //appending prod details into prodDetails div
        prodDetails.appendChild(prodTitle);
        prodDetails.appendChild(prodAuthor);
        prodDetails.appendChild(priceTitle);
        prodDetails.appendChild(prodPrice);

        //appending children to the productItem
        productItem.appendChild(productImg);
        productItem.appendChild(prodDetails);

        //appending productItem to product Area
        productArea.appendChild(productItem);
    }

}

const productHandler = () => {
    populateProducts(products);

    const paidProds = products.filter(product => product.price > 0);
    const freeProds = products.filter(product => !product.price || product.price <= 0);

    const prodsFilter = document.querySelector('.products-filter');
    prodsFilter.addEventListener('click', (e) => {
        switch (e.target.id) {
            case 'paid':
                populateProducts(paidProds);
                break;
            case 'free':
                populateProducts(freeProds);
                break;
            default:
                populateProducts(products);
        }
    });
    
    document.querySelector('.products-filter label[for=all] span.product-amount').textContent = products.length;
    document.querySelector('.products-filter label[for=paid] span.product-amount').textContent = paidProds.length;
    document.querySelector('.products-filter label[for=free] span.product-amount').textContent = freeProds.length;
}

const footerHandler = () => {
    let currentYear = new Date().getFullYear();
    document.querySelector('footer').textContent = `© ${currentYear} - All rights reserved`;
}


//Page Load

menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
galleryHandler();
productHandler();
footerHandler();