import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "~/api";

interface Genre {
  id: number;
  genre: string;
}

const Genres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const req = async () => {
      const { data } = await api.get(`/genres`).catch((err) => {
        return Promise.reject(err);
      });
      if (data.error) {
        setError(data.message);
      } else {
        setGenres(data);
      }
    };
    req();
  }, []);

  if (error !== null) {
    return <div>Error: {error}</div>;
  } else {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Genres</h2>
        <hr className="mb-4" />

        <div className="list-group">
          {genres.map((g) => (
            <Link
              key={g.id}
              className="list-group-item list-group-item-action"
              to={`/genres/${g.id}`}
              state={{ genreName: g.genre }}
            >
              {g.genre}
            </Link>
          ))}
        </div>
      </div>
    );
  }
};

export default Genres;
