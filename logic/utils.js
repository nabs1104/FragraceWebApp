export function sortByPriceAsc(fragrances) {
    return [...fragrances].sort((a, b) => a.price - b.price);
}

export function sortByPriceDesc(fragrances) {
    return [...fragrances].sort((a, b) => b.price - a.price);
}

export function sortByNameAsc(fragrances) {
    return [...fragrances].sort((a, b) => a.name.localeCompare(b.name));
}