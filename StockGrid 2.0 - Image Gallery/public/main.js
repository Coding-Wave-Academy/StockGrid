const photoWrapper = document.querySelector(".image-gallery");
const loadMoreBtn = document.querySelector(".load-more");
const searcheBtn = document.querySelector(".search-box");
const downloadBtn = document.querySelector(".download-btn");

const perPage = 15;
let currentPage = 1;


const js = "yFjwj4oBhEZQSjpm3G6Iqe5A9IKODUsqXzA8N6NTdhqEUiGl76fA9yeQjws7oBjmp4qe5BQ";
/* Don't smile like ur a hacker, this is just a public  API key
So use or don't use, u still havn't done anything special😊🤣🤣🤣 

*/




const generateImageCard = (photos) => {
   photoWrapper.innerHTML += photos.map(photo =>
        `
        <li class="image-card"><img src="${photo.src.large2x}" alt="img">
                <div class="card-info">
                    <div class="user">
                       <img src="./assests/icons8-camera-50.png" alt="camera--v1"/>
                        <span>${photo.photographer}</span>
                    </div>
                    <button onclick="downloadPhoto('${photo.src.large2x}')" title="Download image"><img src="./assests/download.png" alt="download"/></button>
                </div>
            </li>`
    ).join("");
}

const downloadPhoto = (photoURL) => {
    fetch(photoURL).then(res => res.blob()).then(file => {

        console.log(file);
        
            const a = document.createElement("a")
            a.href = URL.createObjectURL(file)
            a.download = new Date().getTime();
            a.click()

        }).catch(() => alert("Failed to Download file"))
}



let getPhotos  = fetch(`https://api.pexels.com/v1/curated?per_page=${perPage}&page=${currentPage}`, {
    headers: {
                Authorization: js.slice(0,56)
            }
})
  .then(res => res.json())
  .then(data => {
    generateImageCard(data.photos);
  })
  .catch(err => console.error('Error loading images', err));


loadMoreBtn.addEventListener("click", () => {
    loadMoreBtn.innerText = "Loading...";
    loadMoreBtn.classList.add("disabled")
    currentPage++;
   
    getPhotos = fetch(`https://api.pexels.com/v1/curated?per_page=${perPage}&page=${currentPage}`,{
        headers: {
                Authorization: js.slice(0,56)
            }
    })
        .then(res => res.json())
        .then(data => {
            loadMoreBtn.innerText = "Load more";
            loadMoreBtn.classList.remove("disabled")
            generateImageCard(data.photos);
        })
        .catch(err => console.error('Error loading more images', err));
});



searcheBtn.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        currentPage = 1;
        const searchTerm = e.target.value;
        photoWrapper.innerHTML = ""; // Clear previous images
        loadMoreBtn.classList.add("disabled");
        loadMoreBtn.innerText = "Loading...";

        getPhotos = fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(searchTerm)}&per_page=200&page=${currentPage}`, {
            headers: {
                Authorization: js.slice(0,56)
            }
        })
            .then(res => res.json())
            .then(data => {
                loadMoreBtn.style.display = "none";
                
                generateImageCard(data.photos);
            })
            .catch(err => console.error('Error loading finding images', err));
    }
});












