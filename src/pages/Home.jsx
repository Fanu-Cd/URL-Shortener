import { useEffect } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const Home = () => {
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      setTimeout(() => {
      window.location.href = `/dashboard/${JSON.parse(localStorage.getItem("user")).user_id}`;
      }, 500);
    } else {
      setTimeout(() => {
        window.location.href = "./new-user";
        }, 500);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mt-5 text-center">Please Wait...</h4>
      <div className="mx-auto d-flex justify-content-center align-items-center mt-3" style={{width:"30%"}}>
      <Spin
    indicator={
      <LoadingOutlined
        style={{
          fontSize: 50,
        }}
        spin
      />} />
      </div>
      
    </div>
  );
};
export default Home;
