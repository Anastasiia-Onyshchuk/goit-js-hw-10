import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breedSelect = document.querySelector("select.breed-select");
const catInfoDiv = document.querySelector("div.cat-info");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

loader.style.display = "block"; 
error.style.display = "none"

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
      loader.style.display = "none"; 
      breedSelect.style.display = "block";
      error.style.display = "none"
  })
    .catch(error => {
    //   console.error('Error fetching breeds:', error);
      error.style.display = "block"
        console.log(error)
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });

breedSelect.addEventListener("change", event => {
  const selectedBreedId = event.target.value;
  loader.style.display = "block"; 
  catInfoDiv.style.display = "none";

  fetchCatByBreed(selectedBreedId)
      .then(cat => {
          const catInfo = `<img class="cat-pic" src="${cat[0].url}" alt="${selectedBreedId}" width = 400px >
          <div class ="cat-desc"><h2 class="cat-name">${cat[0].breeds[0].name}</h2>
          <p class="cat-desc">${cat[0].breeds[0].description}</p>
          <p class="cat-temperament"><span class="accent">Temperament: </span>${cat[0].breeds[0].temperament}</p></div>`;
          
          const catInfoContainer = `${catInfo}`;
          catInfoDiv.innerHTML = catInfoContainer;
      })
      .catch(error => {
        // console.error('Error fetching cat:', error);
                error.style.display = "block"
                  console.log(error)
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      loader.style.display = "none"; 
        catInfoDiv.style.display = "flex"; 
        error.style.display = "none"
    });
});



