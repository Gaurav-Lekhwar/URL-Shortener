import { useState } from "react";
import axios from 'axios';
import QRCode from "react-qr-code"


const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;


function app(){
  const [url , setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const[copied, setCopied] = useState("false");
  const [qrImage, setQrImage] = useState("")

  const handleShorten = async () =>{
    if(!url) return;

    try{
      const res = await axios.post(`${API_BASE_URL}/shorten`,{
        originalUrl:url
      });

      const newshortUrl = res.data.shortUrl;
      setShortUrl(newshortUrl);
      setCopied(false);





    } catch(err){
      console.log(err);
      alert("something went wrong")
    }
  }




  return <div>MERN URL SHORTENER</div>
}

export default App;