const countryinput = document.getElementById("country-input");
 const searchbutton = document.getElementById("search-btn");
 const spinner = document.getElementById("loading-spinner ");
 const countryinfo = document.getElementById("country-info ");
 const borderingcountries = document.getElementById("bordering-countries");
 const errorM = document.getElementById("error-message");



// Required: Use async/await OR .then() for API calls
// Required: Use try/catch OR .catch() for error handling

async function searchCountry(countryName) {
    if (!countryName) return ;
        errorM .textContent="";
        countryinfo.innerHTML="";
        borderingcountries.innerHTML="";
        spinner.classList.remove("hidden");

    try {
        // Show loading spinner
        // Fetch country data
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);   
            if (!response.ok){
                throw new Error ("country non existant")

            }

        const data = await response.json();
        const country =data[0];

        // Update DOM

        countryinfo,innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;
        // Fetch bordering countries

        if (country.borders){
            for (let code of country.borders){
                const borderResponse= await fetch(`https://restcountries.com/v3.1/alpha/ ${code}`)
                
        ;
            const borderdata =await borderResponse.json();
            const bordercountry =borderdata[0];

            borderingcountries.innerHTML += `<div class ="border-country">
                <p> ${bordercountry.name.common}</p>
                <img src=" ${borderingcountry.flags.svg} "alt="flag">
                </div>
                `;
        }
        // Update bordering countries section
         } else {
            borderingcountries.innerHTML="<p> No bordering countires</p>";
         }
    
    } catch (error) {
        errorM.textContent ="Unable to fetch country data ,try again later ";


    } finally {
        // Hide loading spinner
        spinner.classList.add("hidden");
    }
}

// Event listeners
searchbutton.addEventListener("click",() => {
    searchCountry(countryinput.value.input());

});



countryinput.addEventListener('keypress', (e) => {
    if (e.key===`Enter`){
        searchCountry(countryinput.value.trim());
    }
    
});
