import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  // context
  const { loginUser } = useContext(AuthContext);
  //   useHistory
  const history = useHistory();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  //   handle change input
  const handleInputChange = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  // handle submit login
  const submitLogin = async (event) => {
    event.preventDefault();
    try {
      // validate data
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({
          type: "danger",
          message: loginData.message,
        });
        setTimeout(() => setAlert(null), 4000);
      }

      //   if (loginData.success) {
      //     history.push("/dashboard");
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={submitLogin}>
        <AlertMessage info={alert} />

        <Form.Group className="my-2">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </>
  );
};

export default LoginForm;
