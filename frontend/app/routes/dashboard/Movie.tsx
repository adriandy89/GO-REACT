import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "~/api";

interface Genre {
  id: number;
  genre: string;
}

interface Movie {
  id: number;
  title: string;
  release_date: string;
  runtime: string;
  mpaa_rating: string;
  description: string;
  genres: Genre[];
  image: string;
}

const Movie = () => {
  const [movie, setMovie] = useState<Movie>({
    id: 0,
    title: "",
    release_date: "",
    runtime: "",
    mpaa_rating: "",
    description: "",
    genres: [],
    image: "",
  });
  let { id } = useParams<{ id: string }>();

  useEffect(() => {
    const req = async () => {
      const { data } = await api.get(`/movies/${id}`).catch((err) => {
        return Promise.reject(err);
      });
      if (data) {
        setMovie(data);
      }
    };
    req();
  }, [id]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Movie: {movie.title}</h2>
      <small className="text-gray-500">
        <em>
          {movie.release_date}, {movie.runtime} minutes, Rated{" "}
          {movie.mpaa_rating}
        </em>
      </small>
      <br />
      {movie.genres.map((g) => (
        <span key={g.id} className="badge bg-secondary me-2">
          {g.genre}
        </span>
      ))}
      <hr className="my-4" />

      {movie.image !== "" && (
        <div className="mb-3">
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.image}`}
            alt="poster"
            className="rounded"
          />
        </div>
      )}

      <p>{movie.description}</p>
    </div>
  );
};

export default Movie;
