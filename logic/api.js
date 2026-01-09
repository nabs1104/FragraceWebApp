export async function fetchFragrances() {
    const response = await fetch('data/fragrances.json');
    const fragrances = await response.json();
    return fragrances;
}
