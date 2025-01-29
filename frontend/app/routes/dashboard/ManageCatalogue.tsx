import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router";
import api from "~/api";
import type { OutletContext } from "~/interfaces";

const ManageCatalogue = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const { jwtToken } = useOutletContext<OutletContext>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("jwtToken", jwtToken);

    if (jwtToken === "") {
      navigate("/login");
      return;
    }
    const fetchMovies = async () => {
      const { data } = await api
        .get(`/admin/movies`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .catch((err) => {
          return Promise.reject(err);
        });
      if (data) setMovies(data);
    };
    fetchMovies();
  }, [jwtToken, navigate]);

  return (
    <div>
      <h2>Manage Catalogue</h2>
      <hr />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Movie</th>
            <th>Release Date</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => (
            <tr key={m.id}>
              <td>
                <Link to={`/admin/movie/${m.id}`}>{m.title}</Link>
              </td>
              <td>{m.release_date}</td>
              <td>{m.mpaa_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCatalogue;
