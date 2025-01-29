import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import Swal from "sweetalert2";
import api from "~/api";
import CheckBox from "~/components/form/Checkbox";
import Input from "~/components/form/Input";
import Select from "~/components/form/Select";
import TextArea from "~/components/form/TextArea";
import type { OutletContext } from "~/interfaces";

const EditMovie = () => {
  const navigate = useNavigate();
  const { jwtToken } = useOutletContext<OutletContext>();

  const [error, setError] = useState<null | string>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const mpaaOptions = [
    { id: "G", value: "G" },
    { id: "PG", value: "PG" },
    { id: "PG13", value: "PG13" },
    { id: "R", value: "R" },
    { id: "NC17", value: "NC17" },
    { id: "18A", value: "18A" },
  ];

  const hasError = (key: string) => {
    return errors.indexOf(key) !== -1;
  };

  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    release_date: "",
    runtime: "",
    mpaa_rating: "",
    description: "",
    genres: [] as { id: number; checked: boolean; genre: string }[],
    genres_array: [] as number[],
  });

  let { id } = useParams<{ id: string }>();
  if (id === undefined) {
    id = "0";
  }

  useEffect(() => {
    if (jwtToken === "") {
      navigate("/login");
      return;
    }

    if (id === "0") {
      setMovie({
        id: 0,
        title: "",
        release_date: "",
        runtime: "",
        mpaa_rating: "",
        description: "",
        genres: [],
        genres_array: [],
      });

      const req = async () => {
        const { data } = await api.get(`/genres`).catch((err) => {
          return Promise.reject(err);
        });
        if (data) {
          const checks = data.map((g: { id: number; genre: string }) => ({
            id: g.id,
            checked: false,
            genre: g.genre,
          }));

          setMovie((m) => ({
            ...m,
            genres: checks,
            genres_array: [],
          }));
        }
      };
      req();
    } else {
      const req = async () => {
        const { data } = await api
          .get(`/admin/movies/${id}`, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          })
          .catch((err) => {
            return Promise.reject(err);
          });
        if (data) {
          data.movie.release_date = new Date(data.movie.release_date)
            .toISOString()
            .split("T")[0];

          const checks = data.genres.map(
            (g: { id: number; genre: string }) => ({
              id: g.id,
              checked: data.movie.genres_array.indexOf(g.id) !== -1,
              genre: g.genre,
            })
          );

          setMovie({
            ...data.movie,
            genres: checks,
          });
        }
      };
      req();
    }
  }, [id, jwtToken, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let errors: string[] = [];
    let required = [
      { field: movie.title, name: "title" },
      { field: movie.release_date, name: "release_date" },
      { field: movie.runtime, name: "runtime" },
      { field: movie.description, name: "description" },
      { field: movie.mpaa_rating, name: "mpaa_rating" },
    ];

    required.forEach(function (obj) {
      if (obj.field === "") {
        errors.push(obj.name);
      }
    });

    if (movie.genres_array.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "You must choose at least one genre!",
        icon: "error",
        confirmButtonText: "OK",
      });
      errors.push("genres");
    }

    setErrors(errors);

    if (errors.length > 0) {
      return false;
    }

    const requestBody: any = { ...movie };
    requestBody.release_date = new Date(movie.release_date);
    requestBody.runtime = parseInt(movie.runtime, 10);

    const req = async () => {
      const { data } = await (movie.id > 0 ? api.patch : api.put)(
        `/admin/movies/${movie.id}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      ).catch((err) => {
        return Promise.reject(err);
      });
      if (data.error) {
        console.log(data.error);
      } else {
        navigate("/manage-catalogue");
      }
    };
    req();
  };

  const handleChange =
    (name: string) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      let value = event.target.value;
      setMovie({
        ...movie,
        [name]: value,
      });
    };

  const handleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    position: number
  ) => {
    let tmpArr = movie.genres;
    tmpArr[position].checked = !tmpArr[position].checked;

    let tmpIDs = movie.genres_array;
    if (!event.target.checked) {
      tmpIDs.splice(tmpIDs.indexOf(parseInt(event.target.value, 10)), 1);
    } else {
      tmpIDs.push(parseInt(event.target.value, 10));
    }

    setMovie({
      ...movie,
      genres_array: tmpIDs,
    });
  };

  const confirmDelete = () => {
    Swal.fire({
      title: "Delete movie?",
      text: "You cannot undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const req = async () => {
          const { data } = await api
            .delete(`/admin/movies/${movie.id}`, {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            })
            .catch((err) => {
              return Promise.reject(err);
            });
          if (data.error) {
            console.log(data.error);
          } else {
            navigate("/manage-catalogue");
          }
        };
        req();
      }
    });
  };

  if (error !== null) {
    return <div>Error: {error}</div>;
  } else {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Add/Edit Movie</h2>
        <hr className="mb-4" />

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={movie.id} id="id"></input>

          <Input
            title={"Title"}
            className={"form-control"}
            type={"text"}
            name={"title"}
            value={movie.title}
            onChange={handleChange("title")}
            errorDiv={hasError("title") ? "text-red-500" : "hidden"}
            errorMsg={"Please enter a title"}
          />

          <Input
            title={"Release Date"}
            className={"form-control"}
            type={"date"}
            name={"release_date"}
            value={movie.release_date}
            onChange={handleChange("release_date")}
            errorDiv={hasError("release_date") ? "text-red-500" : "hidden"}
            errorMsg={"Please enter a release date"}
          />

          <Input
            title={"Runtime"}
            className={"form-control"}
            type={"text"}
            name={"runtime"}
            value={movie.runtime}
            onChange={handleChange("runtime")}
            errorDiv={hasError("runtime") ? "text-red-500" : "hidden"}
            errorMsg={"Please enter a runtime"}
          />

          <Select
            title={"MPAA Rating"}
            name={"mpaa_rating"}
            options={mpaaOptions}
            value={movie.mpaa_rating}
            onChange={handleChange("mpaa_rating")}
            placeHolder={"Choose..."}
            errorMsg={"Please choose"}
            errorDiv={hasError("mpaa_rating") ? "text-red-500" : "hidden"}
          />

          <TextArea
            title="Description"
            name={"description"}
            value={movie.description}
            rows={3}
            onChange={handleChange("description")}
            errorMsg={"Please enter a description"}
            errorDiv={hasError("description") ? "text-red-500" : "hidden"}
          />

          <hr className="my-4" />

          <h3 className="text-xl font-semibold mb-2">Genres</h3>

          {movie.genres && movie.genres.length > 1 && (
            <>
              {Array.from(movie.genres).map((g, index) => (
                <CheckBox
                  title={g.genre}
                  name={"genre"}
                  key={index}
                  //   id={"genre-" + index}
                  onChange={(event) => handleCheck(event, index)}
                  value={g.id.toString()}
                  checked={movie.genres[index].checked}
                />
              ))}
            </>
          )}

          <hr className="my-4" />

          <button className="btn btn-primary">Save</button>

          {movie.id > 0 && (
            <a
              href="#!"
              className="btn btn-danger ms-2"
              onClick={confirmDelete}
            >
              Delete Movie
            </a>
          )}
        </form>
      </div>
    );
  }
};

export default EditMovie;
