import type { Route } from "./+types/search";
import { searchCoin } from "../services/crypto.api";

// server=Searches CoinGecko
export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "";

    const results = query ? await searchCoin(query) : null;

    return { results, query };
}

export default function Search({
    loaderData,
}: Route.ComponentProps) {
    return (
        <div className="p-6">
            <h1 className="font-bold text-xl mb-4">
                Search Coins
            </h1>

            <form method="get">
                <input
                    name="q"
                    defaultValue={loaderData.query}
                    className="border p-2"
                    placeholder="Search bitcoin..."
                />
                <button type="submit">Search</button>
            </form>

            <div className="mt-4">
                {loaderData.results?.coins?.map((c: any) => (
                    <div key={c.id}>{c.name}</div>
                ))}
            </div>
        </div>
    );
}