import type { Route } from "./+types/_index";
import { getTopCoins } from "../services/crypto.api";

export async function loader() {
  const coins = await getTopCoins();
  return { coins };
}

export default function Home({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Crypto SSR Dashboard
      </h1>

      <div className="grid gap-3">
        {loaderData.coins.map((coin: any) => (
          <div
            key={coin.id}
            className="p-4 border rounded-lg flex justify-between"
          >
            <div className="font-semibold">
              {coin.name}
            </div>

            <div className="text-green-600 font-bold">
              ${coin.current_price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}