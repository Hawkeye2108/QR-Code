import React, { useState } from 'react'
import "./QrCode.css"

const QrCode = () => {
    const [qr, setQr] = useState(true);
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [vpa, setVpa] = useState("");
    const [QrCodeImg, setQrCodeImg] = useState("");

    const scanHandler = async (e)=>{
     e.preventDefault();
     const data = {
        url:url
     }
     if(url.length>0){
     const res = await fetch("https://qrcode-backend-dqni.onrender.com/scan",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
     });
     const img = await res.json();
     
     setQrCodeImg(img);
    }

    }

    const upiHandler = async (e) => {
        e.preventDefault();
        const data = {
            name,
            vpa
        }

        if(name.length>0 && vpa.length>0){
        // Getting UPI QR Code from backend as image/svg+xml
        const res = await fetch("https://qrcode-backend-dqni.onrender.com/upiqr", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        // Converting response to text
         const image = await res.text();
        // Converting svg to blob
         const blob = new Blob([image],{type:"image/svg+xml"});
        // Converting blob to url
         const url = URL.createObjectURL(blob);

         setQrCodeImg(url);
        }

    }
    return (
        <div className='qrcode-container'>
            <div className='qrcode-form'>
                <div className='navbar'>
                    <div className={(qr)?"nav-item active":"nav-item"} onClick={()=>{ 
                        if(qr === false){
                        setQrCodeImg("");
                        setUrl("");
                        }
                        return setQr(true)}}>
                        Qr Code
                    </div>
                    <div className={(qr)?'nav-item':"nav-item active"} onClick={()=>{ 
                        if(qr === true){
                        setQrCodeImg("");
                        setName("");
                        setVpa("");
                        }
                        return setQr(false)}}>
                        UPI  Qr Code
                    </div>
                </div>
                <h2>
                 {qr?"QR Code Generator":" UPI QR Code Generator"}
                </h2>
                <form className="qrcode">
                    {qr?
                    <>
                    <input type="text" placeholder='Enter URL' value={url} onChange={(e) => setUrl(e.target.value)} />
                    <button onClick={scanHandler}>Generate QR Code</button>
                    </>:
                    <>
                    <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder='Enter VPA' value={vpa} onChange={(e) => setVpa(e.target.value)} />
                    <button onClick={upiHandler}>Generate UPI QR Code</button>
                    </>               
                    }
                </form>
                <div className='qrcode-image'>
                {
                      (QrCodeImg) ?
                        <>
                            <img src={QrCodeImg} alt="QrCode" />
                        </> :
                        ""
                }
                </div>
            </div>
        </div>
    )
}

export default QrCode

