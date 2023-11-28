import { UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Spin, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { shortenURL, getURLs, deleteURL } from "../services/shortenURL";
import { useNavigate, useParams } from "react-router-dom";
const UserHome = () => {
  useEffect(() => {
    getAllURLs();
    getUserInfo();
  }, []);

  const { uid } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({ url: "" });
  const [result, setResult] = useState({
    processing: false,
    error: "",
    generated: false,
  });
  const [newURL, setNewURL] = useState({ long: "", short: "", url: "" });
  const [urls, setUrls] = useState([]);
  const [userData, setUserData] = useState({ fname: "", lname: "", email: "" });

  const getUserInfo = () => {
    fetch(
      `http://localhost:3001/getUserData/${
        JSON.parse(localStorage.getItem("user")).user_id
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        setUserData(res.result[0]);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getAllURLs = () => {
    getURLs(uid)
      .then((res) => {
        setUrls(res.result);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    if (e.target.value === "") {
      setResult({ ...result, generated: false, error: "" });
    }
  };

  const handleSubmit = () => {
    setResult({ ...result, error: "" });
    if (validateURL()) {
      setResult({ ...result, processing: true, generated: false, error: "" });
      shortenURL(input.url, JSON.parse(localStorage.getItem("user")).user_id)
        .then((res) => {
          console.log(res);
          if (res.error) {
            setResult({ error: "Some Error Occurred!" });
          } else {
            setNewURL({ long: res.long, short: res.short, url: res.url });
            setResult({
              ...result,
              generated: true,
              processing: false,
              error: "",
            });
            getAllURLs();
          }
        })
        .catch((err) => {
          console.log(err);
          setResult({ error: "Some Error Occurred!" });
        });
    }
  };

  const handleDelete = (id) => {
    deleteURL(id)
      .then((res) => {
        getAllURLs();
        setResult({ ...result, generated: false });
      })
      .catch((err) => {
        console.log("Delete Error : ", err);
      });
  };

  const validateURL = () => {
    if (
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
        input.url
      )
    ) {
      return true;
    }
    setResult({ ...result, error: "Invalid URL" });
    return false;
  };

  return (
    <div style={{ height: "auto" }}>
      <nav
        style={{ minHeight: "3rem" }}
        class="border rounded p-0 content d-flex justify-content-between align-items-center mx-auto mt-3"
      >
        <button className="btn" href="/#">
          Home
        </button>
        <div className="d-flex" style={{ minWidth: "10%" }}>
          <Tooltip
            placement="bottom"
            title={
              <div className="d-flex flex-column justify-content-center align-items-center">
                <p>{userData.fname + " " + userData.lname}</p>
                <p style={{ width: "60%" }} className="text-wrap text-center">
                  {userData.email}
                </p>
                <Popconfirm
                  title="Are you sure you want to log out ?"
                  onConfirm={() => {
                    localStorage.removeItem("user");
                    navigate("/");
                  }}
                >
                  <Button>Log Out</Button>
                </Popconfirm>
              </div>
            }
          >
            <button
              className="btn float-right border d-flex me-2"
              style={{ borderRadius: "2rem" }}
            >
              <UserOutlined />
              &nbsp;&nbsp;
              <small>
                Hi,{" "}
                <small className="fw-bold">
                  {userData.fname + "  " + userData.lname}
                </small>
              </small>
            </button>
          </Tooltip>
        </div>
      </nav>
      <div
        className="mx-auto content d-flex justify-content-center align-items-center flex-column p-2 mt-5"
        style={{ minHeight: "5rem" }}
      >
        <Input
          style={{
            height: "3rem",
            outline: "0.1rem solid mediumblue",
            fontSize: "1rem",
          }}
          placeholder="Enter URL"
          name="url"
          value={input.url}
          onChange={handleChange}
          allowClear
        />
        <small className="d-block w-100 ps-1 mt-1 text-danger">
          {result.error}
        </small>
        {!result.processing ? (
          <Button
            onClick={handleSubmit}
            className="mt-3"
            type="primary"
            style={{ height: "3rem", width: "40%" }}
          >
            Shorten
          </Button>
        ) : (
          <Spin className="mt-2"></Spin>
        )}
      </div>
      {result.generated && (
        <div
          className="mx-auto content d-flex justify-content-center align-items-center flex-column p-2 mt-1"
          style={{ minHeight: "5rem" }}
        >
          <h4>Generated URL</h4>
          <ul className="list-unstyled">
            <li>Long URL : &nbsp;&nbsp;&nbsp;{newURL.long}</li>
            <li>Short URL : &nbsp;&nbsp;&nbsp;{newURL.short}</li>
            <li>
              Link : &nbsp;&nbsp;&nbsp;<a href={newURL.short}>Click Here</a>
            </li>
          </ul>
        </div>
      )}
      {/*
      Links 
      */}
      <hr className="content mx-auto mt-3 d-block" />
      <div
        className="mx-auto content d-flex justify-content-center align-items-center flex-column p-2"
        style={{ minHeight: "5rem" }}
      >
        <h6>My Links</h6>
        <table className="w-100 border mt-2">
          <tr>
            <th>Long URL</th>
            <th>Short URL</th>
            <th>Link</th>
            <th>Action</th>
          </tr>
          {urls.map((url) => {
            return (
              <tr>
                <td>{url.long}</td>
                <td>{url.short}</td>
                <td>
                  <a target="blank" href={url.url}>
                    Click here
                  </a>
                </td>
                <td style={{ cursor: "pointer" }}>
                  <Popconfirm
                    title="Are you sure to delete this url ?"
                    onConfirm={() => handleDelete(url._id)}
                  >
                    <DeleteOutlined className="text-danger" />
                  </Popconfirm>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <footer
        className="d-flex justify-content-center align-items-center flex-column mx-auto"
        style={{
          width: "40%",
          minHeight: "5rem",
          height: "auto",
          marginTop: "25rem",
        }}
      >
        <small>&copy;Copyright 2023</small>
      </footer>
    </div>
  );
};
export default UserHome;
