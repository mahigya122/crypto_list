import type { Route } from "./+types/coins.$id";
import { getCoinById } from "../services/crypto.api";
import { useCryptoSocket } from "../components/useCryptoSocket";

function mapToBinanceSymbol(id: string) {
    const map: Record<string, string> = {
        bitcoin: "btc",
        ethereum: "eth",
        ripple: "xrp",
        solana: "sol",
        cardano: "ada",
        dogecoin: "doge",
    };

    return map[id] || id;
}

//server=Gets one coin's full data
export async function loader({ params }: Route.LoaderArgs) {
    const coin = await getCoinById(params.id!);                // params.id = "bitcoin"
    return { coin };
}

// client=Shows detail + live price
export default function CoinDetail({
    loaderData,
}: Route.ComponentProps) {
    const coin = loaderData.coin;
    const { price: livePrice, lastUpdated } = useCryptoSocket(mapToBinanceSymbol(coin.id));


    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">{coin.name}</h1>

            <p className="text-green-600 font-bold text-lg">
                Live Price: ${livePrice?.toFixed(2) ?? coin.market_data.current_price.usd}
            </p>

            <p className="text-xs text-gray-400">updated: {lastUpdated ?? "loading..."}</p>

            <p>Market Cap: ${coin.market_data.market_cap.usd}</p>
        </div>
    );
}