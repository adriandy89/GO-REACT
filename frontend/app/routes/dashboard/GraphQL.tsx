import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Link } from "react-router";
import Input from "~/components/form/Input";

interface Movie {
  id: string;
  title: string;
  runtime: number;
  release_date: string;
  mpaa_rating: string;
}

const GraphQL: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [fullList, setFullList] = useState<Movie[]>([]);

  const performSearch = (): void => {
    const payload = `
      {
        search(titleContains: "${searchTerm}") {
          id
          title
          runtime
          release_date
          mpaa_rating
        }
      }`;

    const headers = new Headers();
    headers.append("Content-Type", "application/graphql");

    const requestOptions: RequestInit = {
      method: "POST",
      body: payload,
      headers: headers,
    };

    fetch(`${import.meta.env.VITE_API_BASE_URL}/graph`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        const theList: any[] = Object.values(response.data.search);
        setMovies(theList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const value = event.target.value;
    console.log(value);

    setSearchTerm(value);

    if (value.length > 2) {
      performSearch();
    } else {
      setMovies(fullList);
    }
  };

  useEffect(() => {
    const payload = `
      {
        list {
          id
          title
          runtime
          release_date
          mpaa_rating
        }
      }`;

    const headers = new Headers();
    headers.append("Content-Type", "application/graphql");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: payload,
    };

    fetch(`${import.meta.env.VITE_API_BASE_URL}/graph`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        const theList: any[] = Object.values(response.data.list);
        setMovies(theList);
        setFullList(theList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">GraphQL</h2>
      <hr className="mb-4" />

      <form onSubmit={(e: FormEvent) => e.preventDefault()} className="mb-4">
        <Input
          title="Search"
          type="search"
          name="search"
          className="form-control border p-2 w-full"
          value={searchTerm}
          onChange={handleChange}
        />
      </form>

      {movies.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Movie</th>
              <th className="px-4 py-2">Release Date</th>
              <th className="px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="px-4 py-2">
                  <Link
                    to={`/movies/${m.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {m.title}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  {new Date(m.release_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{m.mpaa_rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No movies (yet)!</p>
      )}
    </div>
  );
};

export default GraphQL;
