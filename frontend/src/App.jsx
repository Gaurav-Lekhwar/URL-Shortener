import { useState } from "react";
import axios from 'axios';
import QRCode from "react-qr-code"
import QrCodeGenerator from 'qrcode'


const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;


function App(){
  const [url , setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const[copied, setCopied] = useState(false);
  const [qrImage, setQrImage] = useState("")

  const handleShorten = async () =>{
    if(!url) return;

    try{
      const res = await axios.post(`${API_BASE_URL}/shorten`,{
        originalUrl:url
      });
      console.log(res.data);

      const newshortUrl = res.data.shortUrl;
      setShortUrl(newshortUrl);
      setCopied(false);

      const qr = await QrCodeGenerator.toDataURL(newshortUrl);

      setQrImage(qr);




    } catch(err){
      console.log(err);
      alert("something went wrong")
    }
  }

  const handleCopy = ()=>{
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(()=> setCopied (false), 2000)
  }




  return (<div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black">
    <h1 className=" text-white text-4xl font-bold mb-4 text-center"> URL SHORTENER</h1>

    <div className="flex flex-col gap-3 w-full max-w-3xl">
      <input
  type="text"
  className="w-full p-3 rounded-lg border border-gray-600 bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-500"
  placeholder="Enter Long Url"
  value={url}
  onChange={(e) => setUrl(e.target.value)}
/>

<button
  onClick={handleShorten}
  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
>
  Shorten
</button>
    </div>

      {shortUrl && (
        <div className=" flex flex-col items-center max-w-3xl w-full">
          <p className="text-white font-medium mb-2">
            Your short link:
          </p>

          <a
            className="text-blue-400 underline break-all"
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
          >
            {shortUrl}
          </a>

          <button
            onClick={handleCopy}
            className={`mt-3 w-full py-3 rounded-lg text-white font-semibold transition ${
              copied
                ? "bg-green-600"
                : "bg-gray-700 hover:bg-gray-800"
            }`}
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>

          <div className="bg-white p-4 rounded-lg shadow mt-6">
            <p className="mb-2 text-center font-semibold text-gray-800">Scan QR Code:</p>
            <QRCode value={shortUrl} size= {180} />

          </div>

          {qrImage && (
            <a className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg mt-3 w-full text-center" download="qr-code.png" href={qrImage}>Download QR Code</a>
          )}

        </div>
      )} 
  </div>
  )
}

export default App;