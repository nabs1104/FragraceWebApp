import { fetchFragrances } from "./api.js";
import { addShadow } from "./cosmetic.js";

addShadow();

const fragranceList = document.querySelector('.fragrance-list');


async function initApp() {
    const fragrances = await fetchFragrances();
    renderFrangrances(fragrances);
}

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

initApp();