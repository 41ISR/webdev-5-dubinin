import { createBrowserRouter } from "react-router-dom"
import Layout from "../pages/Layout/Layout"
import SearchPage from "../pages/SearchPage/SearchPage"
import MovieDetails from "../pages/MovieDetails/MovieDetails"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <SearchPage />
            },
            {
                path: "movie/:id",
                element: <MovieDetails />
            }
        ]
    }
])