// crypto.api.ts = Server only
const BASE_URL = "https://api.coingecko.com/api/v3";

// Put your free key in .env as COINGECKO_API_KEY
const HEADERS = {
    "x-cg-demo-api-key": process.env.COINGECKO_API_KEY ?? "",
};

console.log("API KEY:", process.env.COINGECKO_API_KEY);

export async function getTopCoins() {
    const res = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`,
        { headers: HEADERS }
    );
    if (!res.ok) throw new Error("Fail to fetch top coins");
    return res.json();
}

export async function getAllCoins() {
    const res = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`,
        { headers: HEADERS }
    );
    if (!res.ok) throw new Error(`Failed to fetch coins (${res.status})`);
    return res.json();
}

export async function getCoinById(id: string) {
    const res = await fetch(`${BASE_URL}/coins/${id}`, { headers: HEADERS });
    if (!res.ok) throw new Error("fail to fetch coin");
    return res.json();
}

export async function searchCoin(query: string) {
    const res = await fetch(`${BASE_URL}/search?query=${query}`, { headers: HEADERS });
    if (!res.ok) throw new Error("search failed");
    return res.json();
}