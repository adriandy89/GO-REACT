import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  // index("routes/home.tsx")
  layout("routes/layout.tsx", [
    index("routes/dashboard/Dashboard.tsx"),
    route("login", "routes/auth/Login.tsx"),
    route("movies", "routes/dashboard/Movies.tsx"),
    route("movies/:id", "routes/dashboard/Movie.tsx"),
    route("genres", "routes/dashboard/Genres.tsx"),
    route("genres/:id", "routes/dashboard/OneGenre.tsx"),
    route("admin/movie/:id", "routes/dashboard/EditMovie.tsx"),
    route("manage-catalogue", "routes/dashboard/ManageCatalogue.tsx"),
    route("graphql", "routes/dashboard/GraphQL.tsx"),
  ]),
] satisfies RouteConfig;

// {
//     path: "/movies",
//     element: <Movies />,
//   },
//   {
//     path: "/movies/:id",
//     element: <Movie />,
//   },
//   {
//     path: "/genres",
//     element: <Genres />,
//   },
// {
//   path: "/genres/:id",
//   element: <OneGenre />
// },
//   {
//     path: "/admin/movie/0",
//     element: <EditMovie />,
//   },
//   {
//     path: "/manage-catalogue",
//     element: <ManageCatalogue />,
//   },
//   {
//     path: "/graphql",
//     element: <GraphQL />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
