import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkURL } from "../services/shortenURL";
const Redirect=()=> {
  const {id}=useParams()

  const [result,setResult]=useState({error:false})

  useEffect(()=>{
     checkURL(id)
     .then(res=>res.json())
     .then((res)=>{
        window.location.href=res.result[0].long
     }).catch((err)=>{
      setResult({error:true})
     })
  },[])

  return (
  <div style={{width:"60%",minHeight:"10rem"}} className="mx-auto mt-5">
    {!result.error?<h2 className="text-center">Redirecting...</h2>:
    <h2 className="text-center text-danger">Some Error Occurred, Please Reload The Page!</h2>}
  </div>)
}

export default Redirect
