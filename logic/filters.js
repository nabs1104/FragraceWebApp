export function filterBySearch(fragrances, searchTerm) {
    return fragrances.filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
}

export function filterByBrand(fragrances, brand) {
    if (brand === "") return fragrances;
    return fragrances.filter(f => 
        f.brand.toLowerCase() === brand.toLowerCase()
    );
}