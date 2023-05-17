//Global variables

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

    const weatherCondition = "sunny";
    const userLocation = "Rio de Janeiro";
    let temperature = 33;
    let celsiusText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature.toFixed(1)}°C outside.`;
    let fahrText = `The weather is ${weatherCondition} in ${userLocation} and it's ${celsiusToFahr(temperature).toFixed(1)}°F outside.`;

    //temperature Switch

    document.querySelector("#greeting").innerHTML = greetingText;
    document.querySelector("p#weather").innerHTML = celsiusText;

    document.querySelector('.weather-group').addEventListener("click", function(e) {
        if(e.target.id === 'fahr') {
            document.querySelector("p#weather").innerHTML = fahrText;
        } else if(e.target.id === 'celsius'){
            document.querySelector("p#weather").innerHTML = celsiusText;
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
//src="./assets/gallery/image1.jpg" alt="Thumbnail Image 1"

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
/* <div class="product-item">
    <img src="./assets/products/img6.png" alt="AstroFiction">
    <div class="product-details">
        <h3 class="product-title">AstroFiction</h3>
        <p class="product-author">John Doe</p>
        <p class="price-title">Price</p>
        <p class="product-price">$ 49.90</p>
    </div>
</div> */

// const productHandler = () => {
//     const productArea = document.querySelector('.products-area');

//     for(product of products) {
//         productArea.innerHTML += `
//             <div class="product-item">
//                 <img src="${product.image}" alt="${product.title}">
//                 <div class="product-details">
//                     <h3 class="product-title">${product.title}</h3>
//                     <p class="product-author">${product.author}</p>
//                     <p class="price-title">Price</p>
//                     <p class="product-price">$ ${product.price}</p>
//                 </div>
//             </div> 
//         `
//     }
// }

const productHandler = (prodsArray) => {
    const productArea = document.querySelector('.products-area');

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


const paidProds = products.filter(product => {
    return product.price > 0
});

const freeProds = products.filter(product => {
    return product.price === 0;
});

console.log(freeProds);

//Page Load

menuHandler();
greetingHandler();
clockHandler();
galleryHandler();
productHandler(products);