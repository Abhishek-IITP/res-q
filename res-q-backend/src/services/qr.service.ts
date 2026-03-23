import QRCode from "qrcode";

export const generateQRCode = async(userId: string)=>{
     const url = `http://localhost:3000/emergency/${userId}`;
     const qr = await QRCode.toDataURL(url);
     return qr;
}