const countryinput = document.getElementById("country-input");
const searchbutton = document.getElementById("search-btn");
const spinner = document.getElementById("loading-spinner");
const countryinfo = document.getElementById("country-info");
const borderingcountries = document.getElementById("bordering-countries");
const errorM = document.getElementById("error-message");

spinner.classList.add("hidden");

async function searchCountry(countryName) {
    if (!countryName) return;

    try {
        errorM.textContent = "";
        countryinfo.innerHTML = "";
        borderingcountries.innerHTML = "";
        spinner.classList.remove("hidden");

        const response = await fetch(
            `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        );

        if (!response.ok) {
            throw new Error("Country does not exist");
        }

        const data = await response.json();
        const country = data[0];

        // Update main country info
        countryinfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;

        // Fetch bordering countries
        if (country.borders && country.borders.length > 0) {
            for (let code of country.borders) {
                const borderResponse = await fetch(
                    `https://restcountries.com/v3.1/alpha/${code}`
                );

                const borderData = await borderResponse.json();
                const borderCountry = borderData[0];

                const bordercard = document.createElement("div");
                bordercard.classList.add("border-country");

                bordercard.innerHTML = `
                    <h4>${borderCountry.name.common}</h4>
                    <img src="${borderCountry.flags.svg}" alt="${borderCountry.name.common} flag">
                `;

                borderingcountries.appendChild(bordercard);
            }
        } else {
            borderingcountries.innerHTML = "<p>No bordering countries</p>";
        }

    } catch (error) {
        errorM.textContent = "Unable to fetch country data. Try again later.";
    } finally {
        spinner.classList.add("hidden");
    }
}

// Event listeners
searchbutton.addEventListener("click", () => {
    searchCountry(countryinput.value.trim());
});

countryinput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchCountry(countryinput.value.trim());
    }
});