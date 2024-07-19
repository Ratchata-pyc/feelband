import { useState } from "react";
import Image from "next/image";

export default function Input({
  placeholder,
  type = "text",
  error,
  value,
  onChange,
  name,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full mb-4">
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          className={`w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2
            ${
              error
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:border-stone-500 focus:ring-stone-300"
            }`}
          value={value}
          onChange={onChange}
          name={name}
        />
        <div
          className={`absolute left-3 -top-3 px-1 text-gray-500 transition-all duration-200 bg-white capitalize ${
            value ? "opacity-100" : "opacity-0"
          }`}
        >
          {name}
        </div>
        <div className="bg-red-200">
          {error && <small className="absolute text-red-500 ">{error}</small>}
        </div>
        {type === "password" && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
          >
            <Image
              src={
                showPassword ? "/assets/eye-open.svg" : "/assets/eye-close.svg"
              }
              alt={showPassword ? "Hide password" : "Show password"}
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
      <div className="relative h-4 mt-1"></div>
    </div>
  );
}
