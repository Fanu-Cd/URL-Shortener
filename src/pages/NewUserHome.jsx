import { Button} from "antd";
import { Link } from "react-router-dom";
const NewUser = () => {
  return (
    <div className="container-fluid">
      <h4 className="mt-5 text-center">URL Shortener</h4>
      <div
        className="content border mt-3 rounded d-flex justify-content-center align-items-center flex-column mx-auto bg-info"
        style={{ minHeight: "20rem", height: "auto" }}
      >
        <h4 className="text-white">WELCOME!</h4>
        <Link to='/signup'>
        <Button className="text-white" style={{background:"darkslategray"}}>Sign Up</Button></Link>
        <hr className="mt-5" style={{ width: "60%" }} />
        <small className="mt-1 text-white">Already have an account ?</small>
        <Link to='/login'>
        <Button className="mt-2" type="primary">
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
          marginTop: "10rem",
        }}
      >
        <small>&copy;Copyright 2023</small>
      </footer>
    </div>
  );
};
export default NewUser;
