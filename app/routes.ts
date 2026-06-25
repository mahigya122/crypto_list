import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/_index.tsx"),
    route("coins/:id", "routes/coins.$id.tsx"),
    route("search", "routes/search.tsx"),
] satisfies RouteConfig;