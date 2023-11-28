import { Button, Input, Alert } from "antd";
import { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const [input, setInput] = useState({
    fname: "",
    lname: "",
    email: "",
    pass: "",
    cpass: "",
  });
  const [status, setStatus] = useState({
    fnameError: "",
    LnameError: "",
    emailError: "",
    passError: "",
    cpassError: "",
    error: "",
    success: "",
  });

  useEffect(() => {
    console.log("status", status);
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrorMessages();
    if (validateInput()) {
      saveUser();
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

    if (input.pass !== input.cpass) {
      setStatus({ ...status, cpassError: "Passwords don't match" });
      return false;
    }
    return true;
  };

  const saveUser = () => {
    fetch("http://localhost:3001/checkUser", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: input.email }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result.length > 0) {
          setStatus({ ...status, error: "User Already Exists !" });
        } else {
          sendUserData();
        }
      })
      .catch((err) => {
        setStatus({ ...status, error: "Some Error Occurred!" });
      });
  };

  const sendUserData = () => {
    fetch("http://localhost:3001/saveUser", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: input.email,
        fname: input.fname,
        lname: input.lname,
        pass: input.pass,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setStatus({ ...status, error: "Some Error Occurred!" });
        } else {
          setStatus({ ...status, success: "Success" });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      })
      .catch((err) => {
        setStatus({ ...status, error: "Some Error Occurred!" });
      });
  };

  const clearErrorMessages = () => {
    setStatus({
      fnameError: "",
      LnameError: "",
      emailError: "",
      passError: "",
      cpassError: "",
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
        <h4>Sign Up</h4>
        <form className="p-3 w-100" onSubmit={handleSubmit}>
          <label>First Name</label>
          <Input
            required
            name="fname"
            value={input.fname}
            onChange={handleChange}
          />
          <small className="d-block text-danger">{status.fnameError}</small>

          <label className="mt-3">Last Name</label>
          <Input
            required
            name="lname"
            value={input.lname}
            onChange={handleChange}
          />
          <small className="d-block text-danger">{status.lnameError}</small>

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
              visible: passwordVisible.password,
              onVisibleChange: setPasswordVisible,
            }}
          />
          <small className="d-block text-danger">{status.passError}</small>

          <label className="mt-3">Confirm Password</label>
          <Input.Password
            required
            type="password"
            name="cpass"
            value={input.cpass}
            onChange={handleChange}
            visibilityToggle={{
              visible: passwordVisible.confirmPassword,
              onVisibleChange: setPasswordVisible,
            }}
          />
          <small className="d-block text-danger">{status.cpassError}</small>

          <Button
            className="mt-3 mx-auto d-block"
            type="primary"
            htmlType="submit"
            style={{ width: "30%" }}
          >
            Submit
          </Button>
          <small className="d-block text-center text-danger">
            {status.error}
          </small>
        </form>
        {status.success && (
          <Alert message="Sign Up Successful" type="success" showIcon />
        )}
        <hr style={{ width: "60%" }} />
        <small>Already have an account ?</small>
        <Link to="/login">
          <Button className="mt-2" type="default">
            Sign In
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

export default SignUp;
