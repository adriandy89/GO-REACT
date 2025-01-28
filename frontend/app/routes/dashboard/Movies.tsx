import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "~/api";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  mpaa_rating: string;
  description: string;
}

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // let moviesList: Movie[] = [
    //   {
    //     id: 1,
    //     title: "Highlander",
    //     release_date: "1986-03-07",
    //     runtime: 116,
    //     mpaa_rating: "R",
    //     description: "Some long description",
    //   },
    //   {
    //     id: 2,
    //     title: "Raiders of the Lost Ark",
    //     release_date: "1981-06-12",
    //     runtime: 115,
    //     mpaa_rating: "PG-13",
    //     description: "Some long description",
    //   },
    // ];
    // fetch("http://localhost:8080/api/movies").then((response) => {
    //   response.json().then((data) => {
    //     setMovies(data);
    //   });
    // });

    const reqMovies = async () => {
      const response = await api.get(`/movies`).catch((err) => {
        return Promise.reject(err);
      });
      if (response && response.data) {
        setMovies(response.data);
      }
    };
    reqMovies();

    // setMovies(moviesList);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Movies</h2>
      <hr className="mb-4" />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-gray-800">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Movie</th>
              <th className="py-2 px-4 text-left">Release Date</th>
              <th className="py-2 px-4 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr
                key={m.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-2 px-4">
                  <Link
                    to={`/movies/${m.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {m.title}
                  </Link>
                </td>
                <td className="py-2 px-4">{m.release_date}</td>
                <td className="py-2 px-4">{m.mpaa_rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoviesPage;
