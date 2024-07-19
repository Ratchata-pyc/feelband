import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-stretch bg-white min-h-screen px-4 lg:px-0">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-0 lg:flex lg:flex-col lg:justify-center">
        <Link href="/" legacyBehavior>
          <a className="w-full flex justify-center">
            <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-80 lg:h-80 xl:w-96 xl:h-96 max-w-full lg:mt-[-100px]">
              <Image
                src={logo}
                alt="Logo"
                fill
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       33vw"
                priority
              />
            </div>
          </a>
        </Link>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-0">
        <div className="w-full max-w-md mt-[-60px]  lg:mt-[-100px]">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
