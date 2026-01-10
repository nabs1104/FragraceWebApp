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

searchInput.addEventListener('input', () => {
    applyFilters();
});

brandSelect.addEventListener('change', () => {
    applyFilters();
});

sortSelect.addEventListener('change', () => {
    applySorting();
});

//functions to apply filters and sorting

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