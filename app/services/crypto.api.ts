const BASE_URL = "https://api.coingecko.com/api/v3";

// Get top crypto coins (SSR for dashboard)
export async function getTopCoins() {
    const res = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`
    );

    if (!res.ok) {
        throw new Error("Fail to fetch top coins")
    }

    return res.json();
}

// Get single coin by id (SSR dynamic page)
export async function getCoinById(id: string) {
    const res = await fetch(`${BASE_URL}/coins/${id}`);

    if (!res.ok) {
        throw new Error("fail to fetch coin");
    }

    return res.json();
}

// Search coins (SSR search page)
export async function searchCoin(query: string) {
    const res = await fetch(`${BASE_URL}/search?query=${query}`);

    if (!res.ok) {
        throw new Error("searched failed")
    }

    return res.json();
}