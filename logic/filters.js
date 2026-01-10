export function filterBySearchTerm(fragrances, searchTerm) {
    return fragrances.flter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
}

export function filterByBrand(fragrances, brand) {
    return fragrances.filter(f => 
        f.brand.toLowerCase().includes(brand.toLowerCase())
    )
}