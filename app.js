const btn = document.querySelector('.search-btn');
let input = document.querySelector('.input');
const results = document.querySelector('.results');
btn.addEventListener("click", () => {
    let name = input.value;
    const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            results.innerHTML = `
            <div class="flag-box">
                <img class="flag"
                    src="${data[0].flags.png}">
                </div>
                <h3 class="name">${data[0].name.common}</h3>
            <div class="details">
                <p class="detail"><span>Capital : </span>${data[0].capital[0]}</p>
                <p class="detail"><span>Continent : </span>${data[0].continents[0]}</p>
                <p class="detail"><span>Population : </span>${data[0].population}</p>
                <p class="detail"><span>Currency : </span>${Object.values(data[0].currencies)[0].name}</p>
                <p class="detail"><span>Common Languages : </span>${Object.values(data[0].languages)}</p>
            </div>`
            console.log(data);
        })
        .catch(() => {
            if (!navigator.onLine) {
                results.innerHTML = `<h3 class="error">You are offline</h3>`
            } else {
                results.innerHTML = `<h3 class="error">Enter a valid country name</h3>`;
            }
        })
});
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btn.click();
    }
})