// Client only= Polls price every 10s
import { useEffect, useState } from "react";

const SKIP = ["usdt", "usdc", "busd", "dai", "tusd"];

export function useCryptoSocket(symbol: string) {
    const [price, setPrice] = useState<number | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    useEffect(() => {
        if (!symbol || SKIP.includes(symbol.toLowerCase())) return;

        const fetchPrice = async () => {
            try {
                const res = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`,
                    {
                        headers: {
                            "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY ?? "",
                        }
                    }
                );

                console.log("fetch status:", res.status, "symbol:", symbol);// to check

                const data = await res.json();
                console.log("data:", data); // to check

                const p = data?.[symbol]?.usd;
                console.log("price for", symbol, ":", p); //to check
                if (p) {
                    setPrice(p);
                    setLastUpdated(new Date().toLocaleTimeString());
                }
            } catch (err) {
                console.error("Price fetch error:", err);
            }
        };

        fetchPrice(); // fetch immediately
        const interval = setInterval(fetchPrice, 3000); // then every 3 seconds

        return () => clearInterval(interval);
    }, [symbol]);

    return { price, lastUpdated };
}