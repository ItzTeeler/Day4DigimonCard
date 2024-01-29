import { saveToLocalStorage, getLocalStorage, removeLocalStorage } from "./localstorage.js";

let digimonName = document.getElementById("digimonName");
let digimonStatus = document.getElementById("digimonStatus");
let digimonImg = document.getElementById("digimonImg");
let favoriteBtn = document.getElementById("favoriteBtn");
let digimonInput = document.getElementById("digimonInput");

let digimon = "";


const DigimonApi = async (digimon) => {
    const promise = await fetch("https://digimon-api.vercel.app/api/digimon/name/"+digimon);
    const data = await promise.json();
    return data;
}

digimonInput.addEventListener("keydown", async (event) =>{
    // On enter I want this function to run

    if(event.key === "Enter"){
        digimon = await DigimonApi(event.target.value);
        digimonImg.src = digimon[0].img;
        digimonName.textContent = digimon[0].name;
        digimonStatus.textContent = digimon[0].level;
    }
});

favoriteBtn.addEventListener("click", () =>{
    saveToLocalStorage(digimon[0].name);
})