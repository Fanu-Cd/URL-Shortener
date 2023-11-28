import { Button, Input, Alert } from "antd";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const LogIn = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [input, setInput] = useState({
    email: "",
    pass: "",
  });
  const [status, setStatus] = useState({
    emailError: "",
    passError: "",
    error: "",
    success: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrorMessages();
    if (validateInput()) {
      checkUser();
    }
  };

  const validateInput = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.email)) {
      setStatus({ ...status, emailError: "Invalid Email Format" });
      return false;
    }

    if (input.pass.length < 8) {
      setStatus({
        ...status,
        passError: "Password should be at least 8 characters long",
      });
      return false;
    }

    return true;
  };

  const checkUser = () => {
    clearErrorMessages();
    fetch("http://localhost:3001/checkEmail", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: input.email }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result.length > 0) {
          fetch("http://localhost:3001/checkPassword", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: input.email,
              password: input.password,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.result.length > 0) {
                setStatus({ ...status, success: "Log In Successful" });
                localStorage.setItem(
                  "user",
                  JSON.stringify({ user_id: res.result[0]._id })
                );
                setTimeout(() => {
                  navigate(`/dashboard/${res.result[0]._id}`);
                }, 3000);
              } else {
                setStatus({ ...status, passError: "Incorrect Password!" });
              }
            })
            .catch((err) => {
              setStatus({ ...status, error: "Some Error Occurred!" });
            });
        } else {
          setStatus({ ...status, emailError: "Email Not Registered!" });
        }
      })
      .catch((err) => {
        setStatus({ ...status, error: "Some Error Occurred!" });
      });
  };

  const clearErrorMessages = () => {
    setStatus({
      emailError: "",
      passError: "",
      error: "",
      success: "",
    });
  };

  return (
    <div>
      <div
        style={{ width: "3rem", height: "3rem", borderRadius: "2rem" }}
        className="border mx-auto mt-4 d-flex justify-content-center align-items-center"
      >
        <Link to="/">
          <HomeOutlined className="fs-3" />
        </Link>
      </div>
      <div
        className="content border p-3 rounded mx-auto mt-2 d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "20rem" }}
      >
        <h4>Log In</h4>
        <form className="p-3 w-100" onSubmit={handleSubmit}>
          <label className="mt-3">Email</label>
          <Input
            type="email"
            required
            name="email"
            value={input.email}
            onChange={handleChange}
          />
          <small className="d-block text-danger">{status.emailError}</small>

          <label className="mt-3">Password</label>
          <Input.Password
            required
            name="pass"
            type="password"
            value={input.pass}
            onChange={handleChange}
            visibilityToggle={{
              visible: passwordVisible,
            }}
          />
          <small className="d-block text-danger">{status.passError}</small>

          <Button
            className="mt-3 mx-auto d-block"
            type="primary"
            htmlType="submit"
            style={{ width: "30%" }}
          >
            Log In
          </Button>
          <small className="d-block text-center text-danger">
            {status.error}
          </small>
        </form>
        {status.success && (
          <Alert message="Log In Successful" type="success" showIcon />
        )}
        <hr style={{ width: "60%" }} />
        <small>Don't have an account?</small>
        <Link to="/signup">
          <Button className="mt-2" type="default">
            Create New Account
          </Button>
        </Link>
      </div>
      <footer
        className="d-flex justify-content-center align-items-center flex-column mx-auto"
        style={{
          width: "40%",
          minHeight: "5rem",
          height: "auto",
          marginTop: "15rem",
        }}
      >
        <small>&copy;Copyright 2023</small>
      </footer>
    </div>
  );
};

export default LogIn;
