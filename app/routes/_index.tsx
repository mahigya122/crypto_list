import type { Route } from "./+types/_index";
import { getTopCoins } from "../services/crypto.api";
import { useCryptoSocket } from "../components/useCryptoSocket";
import { Link } from "react-router";

//Server
export async function loader() {
  try {
    const coins = await getTopCoins();
    return { coins };
  } catch (err) {
    console.error("Failed to fetch coins:", err);
    return { coins: [] };            // return empty instead of crashing
  }
}

function CoinRow({ coin }: { coin: any }) {
  console.log("coin.id:", coin.id, "coin.symbol:", coin.symbol);  // to check
  const { price: livePrice, lastUpdated } = useCryptoSocket(coin.id);

  return (
    <Link to={`/coins/${coin.id}`} className="p-4 border rounded-lg flex justify-between hover:bg-gray-50">
      <div className="flex items-center gap-2">
        <div className="font-semibold">{coin.name}</div>
        <div className="text-xs text-gray-400">updated: {lastUpdated ?? "loading..."}</div>
      </div>
      <div className="text-green-600 font-bold">
        ${livePrice?.toFixed(2) ?? coin.current_price}
      </div>
    </Link>
  );
}

//Client = Renders list, starts polling every 10s using useCryptoSocket
export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Crypto SSR Dashboard</h1>
      <div className="grid gap-3">
        {loaderData.coins.map((coin: any) => (
          <CoinRow key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
}