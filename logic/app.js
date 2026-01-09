import { fetchFragrances } from "./api.js";

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
            <h3>${fragrance.name}</h3>
            <p>${fragrance.brand}</p>
            <p>$${fragrance.price}</p> 
        `;
        fragranceList.appendChild(fragranceItem);
    });
}

initApp();