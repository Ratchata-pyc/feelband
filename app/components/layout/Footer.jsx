import Image from "next/image";
import qrCodeSrc from "../../../public/assets/qrcode.jpeg"; // ปรับเส้นทางให้ถูกต้อง

export default function Footer() {
  return (
    <footer className="bg-stone-500 text-white py-6 px-8 flex items-center justify-between ">
      <div className="flex items-center w-full">
        <div className="mr-4">
          <Image
            src={qrCodeSrc}
            alt="QR Code"
            width={96} // กำหนดความกว้างของรูปภาพ
            height={96} // กำหนดความสูงของรูปภาพ
            className="h-24 w-24"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold">ติดต่อเรา</h3>
          <p>Facebook: Feel Band</p>
          <p>Line: feelband 555</p>
          <p>Tel: 1212312121</p>
        </div>
      </div>
    </footer>
  );
}
