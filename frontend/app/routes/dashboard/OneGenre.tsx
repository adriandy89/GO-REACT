import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import api from "~/api";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  mpaa_rating: string;
}

const OneGenre = () => {
  const location = useLocation();
  const { genreName } = location.state as { genreName: string };

  const [movies, setMovies] = useState<Movie[]>([]);

  let { id } = useParams<{ id: string }>();

  useEffect(() => {
    const req = async () => {
      const { data } = await api.get(`/movies/genres/${id}`).catch((err) => {
        return Promise.reject(err);
      });
      if (data.error) {
        console.log(data.message);
      } else {
        setMovies(data);
      }
    };
    req();
  }, [id]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Genre: {genreName}</h2>
      <hr className="mb-4" />

      {movies.length > 0 ? (
        <table className="table-auto w-full text-left">
          <thead>
            <tr>
              <th className="px-4 py-2">Movie</th>
              <th className="px-4 py-2">Release Date</th>
              <th className="px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.id}>
                <td className="border px-4 py-2">
                  <Link
                    to={`/movies/${m.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {m.title}
                  </Link>
                </td>
                <td className="border px-4 py-2">{m.release_date}</td>
                <td className="border px-4 py-2">{m.mpaa_rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No movies in this genre (yet)!</p>
      )}
    </>
  );
};

export default OneGenre;
