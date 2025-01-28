import { useCallback, useState, type FormEvent } from "react";
import { useNavigate, useOutletContext } from "react-router";
import Input from "../../components/form/Input";
import api from "~/api";

interface OutletContext {
  setJwtToken: (token: string) => void;
  setAlertClassName: (className: string) => void;
  setAlertMessage: (message: string) => void;
}

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setJwtToken, setAlertClassName, setAlertMessage } =
    useOutletContext<OutletContext>();

  const navigate = useNavigate();

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log("email/pass", email, password);

  //   // if (email === "admin@example.com") {
  //   //   setJwtToken("abc");
  //   //   setAlertClassName("d-none");
  //   //   setAlertMessage("");
  //   //   navigate("/");
  //   // } else {
  //   //   setAlertClassName("alert-danger");
  //   //   setAlertMessage("Invalid credentials");
  //   // }

  // };

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      let payload = {
        email: email,
        password: password,
      };
      setLoading(true);
      const { data } = await api
        .post(`/authenticate`, payload)
        .catch((err) => {
          setAlertClassName("text-red-500");
          setAlertMessage("Invalid credentials");
          return Promise.reject(err);
        })
        .finally(() => {
          setLoading(false);
        });
      console.log(data);
      if (data.error) {
        setAlertClassName("text-red-500");
        setAlertMessage("Invalid credentials");
      } else {
        setJwtToken(data.access_token);
        setAlertClassName("d-none");
        setAlertMessage("");
        navigate("/");
      }
    },
    [email, password]
  );

  return (
    <div className="p-4 m-auto rounded-lg shadow-lg border border-gray-200 max-w-md">
      <h2 className="text-center text-xl font-semibold">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
        <Input
          title="Email Address"
          type="email"
          className="form-control"
          name="email"
          autoComplete="email-new"
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          title="Password"
          type="password"
          className="form-control"
          name="password"
          autoComplete="password-new"
          onChange={(event) => setPassword(event.target.value)}
        />

        <button
          type="submit"
          className="border rounded-md p-4 disabled:opacity-50 bg-blue-500 text-white"
          disabled={loading}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
