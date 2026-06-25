import { Link, Form } from "react-router";
import { useState } from "react";

export default function Header() {
    const [query, setQuery] = useState("");

    return (
        <div className="p-4 border-b flex items-center justify-between">
            <Link to="/" className="font-bold text-lg">
                CryptoDash
            </Link>

            <Form action="/search" method="get" className="flex gap-2">
                <input
                    name="q"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search coins..."
                    className="border rounded px-3 py-1 text-sm"
                />
                <button
                    type="submit"
                    className="bg-black text-white px-3 py-1 rounded text-sm"
                >
                    Search
                </button>
            </Form>
        </div>
    );
}