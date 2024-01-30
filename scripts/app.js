import { saveToLocalStorage, getLocalStorage, removeLocalStorage } from "./localstorage.js";

let digimonName = document.getElementById("digimonName");
let digimonStatus = document.getElementById("digimonStatus");
let digimonImg = document.getElementById("digimonImg");
let favoriteBtn = document.getElementById("favoriteBtn");
let digimonInput = document.getElementById("digimonInput");
let getFavoriteBtn = document.getElementById("getFavoriteBtn");
let getFavoritesDiv = document.getElementById("getFavoritesDiv");

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

getFavoriteBtn.addEventListener("click", () =>{
    // This retrieves our data from local storage and stores it into favorites variable
    let favorites = getLocalStorage();

    // Clears getFavoritesDiv so the array display will not constantly repeat.
    getFavoritesDiv.textContent = "";
    // Map through each element in our array
    favorites.map(digiName => {
        // Creating a P-tag Dynamically
        let p = document.createElement('p');

        // Setting its text content to digiName
        p.textContent = digiName;
        // className replaces all classes with our new classes
        p.className = "text-lg font-medium text-gray-900 dark:text-white";

        // Creating a button dynamically
        let button = document.createElement("button");

        button.type = "button";
        button.textContent = "X";

        // classList allows us to be a little more consise it doesnt repplace all classes.
        button.classList.add(
            "text-gray-400",
            "bg-transparent",
            "hover:bg-gray-200",
            "hover:text-gray-900",
            "rounded-lg",
            "text-sm",
            "w-8",
            "h-8",
            "justify-end",
            "dark:hover:bg-gray-600",
            "dark:hover:text-white"
            );
            
            // Creating an addEventListener for our button which removes digiName from our favorites
            button.addEventListener("click", ()=>{
                removeLocalStorage(digiName);
                p.remove();
            })
        // appending our button to our p-tag
        p.append(button);
        // appending our p-tag to our getFavoritesDiv
        getFavoritesDiv.append(p);

    });

});