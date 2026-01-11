//import necessary modules and functions

import { fetchFragrances } from "./api.js";
import { addShadow } from "./cosmetic.js";
import {filterBySearch, filterByBrand} from "./filters.js";
import { sortByPriceAsc, sortByPriceDesc, sortByNameAsc } from "./utils.js"; 


addShadow();

//get DOM elements

const searchInput = document.querySelector('.search');
const brandSelect = document.querySelector('.filter');
const sortSelect = document.querySelector('.sort');
const fragranceList = document.querySelector('.fragrance-list');
const main = document.querySelector('.main-content');


//initialize state variables

let allFragrances = [];
let displayedFragrances = [];

//initialize application

async function initApp() {
    allFragrances = await fetchFragrances();
    displayedFragrances = [...allFragrances];

    populateBrands(allFragrances);
    renderFrangrances(displayedFragrances);
}

//render fragrances to the DOM

function renderFrangrances(fragrances) {
    fragranceList.innerHTML = '';

    //handle no results case
    if (fragrances.length === 0) {
        const noResults = document.createElement('div');
        noResults.classList.add('no-results-container');

        console.log(main.lastElementChild);

        if (main.lastElementChild.classList.contains('no-results-container')) {
            console.log("No results message already displayed");
            return; //no need to add another no results message
        }

        noResults.innerHTML = `
            <div class="no-results">
                No fragrances found matching your criteria.
                <button class="reset-filters">Reset Filters</button>
            </div>
        `;

        main.appendChild(noResults);

        resetContent();
        return;
    }

    fragrances.forEach(fragrance => {
        const fragranceItem = document.createElement('div');
        fragranceItem.classList.add('fragrance-item');
        fragranceItem.innerHTML = `
            <img src="${fragrance.image}" alt="${fragrance.name}">

            <div class="fragrance-details">
                <div class="fragrance-name-brand-container">
                    <h3 class="fragrance-name">${fragrance.name}</h3>
                    <p class="fragrance-brand">${fragrance.brand}</p>
                </div>

                <p class="fragrance-price">$${fragrance.price}</p>
            </div> 
        `;
        fragranceList.appendChild(fragranceItem);
    });
}

//populate brand filter options

function populateBrands(fragrances) {
    // map to a set to remove duplicates, then back to array and sort
    const brands = [...new Set(fragrances.map(f => f.brand))].sort();
    const brandSelect = document.querySelector('.filter');

    brands.forEach(b => {
        const option = document.createElement('option');
        option.value = b;
        option.textContent = b;
        brandSelect.appendChild(option);
    });
}

//event listeners for filters and sorting

searchInput.addEventListener('keydown', (e) => {
    //apply filters on Enter key press

    if (e.key === 'Enter') {
        applyFilters();
    }
});

brandSelect.addEventListener('change', () => {
    applyFilters();
});

sortSelect.addEventListener('change', () => {
    applySorting();
});


function resetContent() {
    const resetButton = document.querySelector('.reset-filters');

    resetButton.addEventListener('click', () => {
        //reset filters and re-render all fragrances
        main.removeChild(main.lastChild);
        searchInput.value = null;
        brandSelect.value = "";
        sortSelect.value = "";
        applyFilters();
    });
}

function applyFilters() {
    let result = [...allFragrances];

    result = filterByBrand(result, brandSelect.value);
    result = filterBySearch(result, searchInput.value);

    displayedFragrances = result;
    applySorting();
}

function applySorting() {
    let result = [...displayedFragrances];

    switch (sortSelect.value) {
        case 'priceLowToHigh':
            result = sortByPriceAsc(result);
        case 'priceHighToLow':
            result = sortByPriceDesc(result);
        case 'nameAZ':
            result = sortByNameAsc(result);
    }

    renderFrangrances(result);
}

//initialize the app on page load

initApp();