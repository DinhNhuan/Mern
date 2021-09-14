import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const RegisterForm = () => {
  // context
  const { registerUser } = useContext(AuthContext);

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  //   alert message
  const [alert, setAlert] = useState(null);

  const { username, password, passwordConfirm } = registerForm;

  //   handle input change
  const handleInputChange = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();

    // prepare password
    if (password !== passwordConfirm)
      setAlert({
        type: "danger",
        message: "Password not match",
      });
    setTimeout(() => setAlert(null), 4000);

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({
          type: "danger",
          message: registerData.message,
        });
        setTimeout(() => setAlert(null), 4000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={handleRegisterFormSubmit}>
        <AlertMessage info={alert} />

        <Form.Group className="my-2">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="info" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default RegisterForm;
