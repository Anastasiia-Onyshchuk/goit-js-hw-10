import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const apiKey = "live_8CdIBlsOjAOSp5L6enu3WGxbSHxWDEFKPSVEV9qHIuo4hdcZhKnB3xWr3zgvrOBJ";
axios.defaults.headers.common["x-api-key"] = "live_8CdIBlsOjAOSp5L6enu3WGxbSHxWDEFKPSVEV9qHIuo4hdcZhKnB3xWr3zgvrOBJ";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
      .then(response => response.data)
      .catch(error => {
          error.style.display = "block";
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
    //   console.error("Error fetching cat:", error);
    //   throw error;
    error.style.display = "block"
     Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}
