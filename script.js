  const countryinput = document.getElementById("country-input");
 const searchbutton = document.getElementById("search-btn");
 const spinner = document.getElementById("loading-spinner ");
 const countryinfo = document.getElementById("country-info ");
 const borderingcountries = document.getElementById("bordering-countries");
 const error = document.getElementById("error-message");



// Required: Use async/await OR .then() for API calls
// Required: Use try/catch OR .catch() for error handling

async function searchCountry(countryName) {
    try {
        // Show loading spinner
        // Fetch country data
        // Update DOM
        // Fetch bordering countries
        // Update bordering countries section
    } catch (error) {
        // Show error message
    } finally {
        // Hide loading spinner
    }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});
