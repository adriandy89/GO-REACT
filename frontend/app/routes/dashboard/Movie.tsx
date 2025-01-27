import { useEffect, useState } from "react";
import { useParams } from "react-router";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  mpaa_rating: string;
  description: string;
}

const Movie = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  let { id } = useParams<{ id: string }>();

  useEffect(() => {
    let myMovie: Movie = {
      id: 1,
      title: "Highlander",
      release_date: "1986-03-07",
      runtime: 116,
      mpaa_rating: "R",
      description: "Some long description",
    };
    setMovie(myMovie);
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Movie: {movie.title}</h2>
      <small>
        <em>
          {movie.release_date}, {movie.runtime} minutes, Rated{" "}
          {movie.mpaa_rating}
        </em>
      </small>
      <hr />
      <p>{movie.description}</p>
    </div>
  );
};

export default Movie;
