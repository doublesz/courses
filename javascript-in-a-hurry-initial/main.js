
// Menu section

document.querySelector('#open-nav-menu').addEventListener('click', function() {
    document.querySelector('header nav .wrapper').classList.add("nav-open");
});

document.querySelector('#close-nav-menu').addEventListener('click', function() {
    document.querySelector('header nav .wrapper').classList.remove("nav-open");
});


//Greeting Section

function celsiusToFahr(temperature) {
    let fahr = (temperature * 9/5) + 32;
    return fahr;
}

const greetingText = "Good afternoon!";
const weatherCondition = "sunny";
const userLocation = "Rio de Janeiro";
let temperature = 33;
let celsiusText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature.toFixed(1)}°C outside.`;
let fahrText = `The weather is ${weatherCondition} in ${userLocation} and it's ${celsiusToFahr(temperature).toFixed(1)}°F outside.`;

//temperature conversion

document.querySelector("#greeting").innerHTML = greetingText;
document.querySelector("p#weather").innerHTML = celsiusText;

document.querySelector('.weather-group').addEventListener("click", function(e) {
    if(e.target.id === 'fahr') {
        document.querySelector("p#weather").innerHTML = fahrText;
    } else if(e.target.id === 'celsius'){
        document.querySelector("p#weather").innerHTML = celsiusText;
    }
});

//Local time section

setInterval(function(){
    let localTime = new Date();
    document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2,'0');
    document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2,'0');
    document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2,'0');
}, 1000)


//Gallery section
//src="./assets/gallery/image1.jpg" alt="Thumbnail Image 1"

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


// for(let i in galleryImages) {
//     console.log(galleryImages[i]);
// }


/* <img src="./assets/gallery/image1.jpg" alt="Thumbnail Image 1" data-array-index="0" data-selected="true"></img> */

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