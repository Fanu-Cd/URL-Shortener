import { Outlet } from "react-router-dom";
export default function Layout() {
    return (
      <>
      {/* <div>
        <div className="mt-2 mx-auto d-flex justify-content-between align-items-center" style={{width:"7rem",height:"5rem"}}>
          <h5 style={{color:"darkslategray"}}>WeatherX</h5>
        </div>
      </div> */}
        <Outlet />
      </>
    );
  }