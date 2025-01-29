import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import api from "~/api";
import Alert from "~/components/Alert";

export default function DashboardLayout() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("hidden");
  const [tickInterval, setTickInterval] = useState<any>();

  const navigate = useNavigate();

  const logOut = () => {
    const logout = async () => {
      await api
        .get(`/logout`)
        .catch((err) => {
          console.log("user not logged in");
          return Promise.reject(err);
        })
        .finally(() => {
          setJwtToken("");
          toggleRefresh(false);
          navigate("/login");
        });
    };
    logout();
  };

  const toggleRefresh = useCallback(
    (status: boolean) => {
      if (status) {
        console.log("turning on ticking");
        let i = setInterval(async () => {
          const { data } = await api.get(`/refresh`).catch((err) => {
            console.log("user not logged in");
            return Promise.reject(err);
          });
          console.log(data);
          if (data.access_token) {
            setJwtToken(data.access_token);
            navigate("/");
          }
        }, 600000);
        setTickInterval(i);
        console.log("setting tick interval to", i);
      } else {
        console.log("turning off ticking");
        console.log("turning off tickInterval", tickInterval);
        setTickInterval(null);
        clearInterval(tickInterval);
      }
    },
    [tickInterval]
  );

  useEffect(() => {
    if (jwtToken === "") {
      const login = async () => {
        const { data } = await api.get(`/refresh`).catch((err) => {
          console.log("user not logged in");
          return Promise.reject(err);
        });
        console.log(data);
        if (data.access_token) {
          setJwtToken(data.access_token);
          toggleRefresh(true);
          navigate("/");
        }
      };
      login();
    }
  }, [jwtToken, toggleRefresh]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Go Watch a Movie!</h1>
        {jwtToken === "" ? (
          <Link to="/login">
            <span className="badge bg-green-500 text-white px-3 py-1 rounded">
              Login
            </span>
          </Link>
        ) : (
          <button
            onClick={logOut}
            className="badge bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
      <hr className="mb-4" />

      <div className="flex">
        <nav className="w-1/4">
          <div className="flex flex-col">
            <Link
              to="/"
              className="py-2 px-4 hover:bg-gray-300 hover:bg-opacity-35"
            >
              Home
            </Link>
            <Link
              to="/movies"
              className="py-2 px-4 hover:bg-gray-300 hover:bg-opacity-35"
            >
              Movies
            </Link>
            <Link
              to="/genres"
              className="py-2 px-4 hover:bg-gray-300 hover:bg-opacity-35"
            >
              Genres
            </Link>
            {jwtToken !== "" && (
              <>
                <Link
                  to="/admin/movie/0"
                  className="py-2 px-4 hover:bg-gray-300 hover:bg-opacity-35"
                >
                  Add Movie
                </Link>
                <Link
                  to="/manage-catalogue"
                  className="py-2 px-4 hover:bg-gray-300 hover:bg-opacity-35"
                >
                  Manage Catalogue
                </Link>
                <Link
                  to="/graphql"
                  className="py-2 px-4 hover:bg-gray-300 hover:bg-opacity-35"
                >
                  GraphQL
                </Link>
              </>
            )}
          </div>
        </nav>
        <div className="w-3/4 pl-4">
          <Alert message={alertMessage} className={alertClassName} />
          <Outlet
            context={{
              jwtToken,
              setJwtToken,
              setAlertClassName,
              setAlertMessage,
              toggleRefresh,
            }}
          />
        </div>
      </div>
    </div>
  );
}
