"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import axios from "axios";

const initialInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialInputError = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    setInputError(initialInputError);

    try {
      const response = await axios.post("/api/auth/register", input);
      setSuccessMessage(response.data.message);
      setInput(initialInput);

      setTimeout(() => {
        router.push("/login");
      }, 2000); // 2 วินาที
    } catch (error) {
      if (error.response && error.response.data) {
        const apiErrors = error.response.data.errors || {};
        setInputError(apiErrors);
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("เกิดข้อผิดพลาดที่ไม่คาดคิด");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md bg-white rounded px-8 py-8 mb-4 lg:shadow-md sm:mt-0">
      <form onSubmit={handleSubmitForm}>
        <div className="mb-4">
          <h4 className="text-center text-2xl font-bold mb-4">Register</h4>
        </div>
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <div className="mb-4">
          <Input
            placeholder="Firstname"
            value={input.firstName}
            name="firstName"
            onChange={handleChangeInput}
            error={inputError.firstName}
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder="Lastname"
            value={input.lastName}
            name="lastName"
            onChange={handleChangeInput}
            error={inputError.lastName}
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder="Email"
            value={input.email}
            name="email"
            onChange={handleChangeInput}
            error={inputError.email}
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder="Password"
            value={input.password}
            name="password"
            onChange={handleChangeInput}
            error={inputError.password}
            type="password"
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder="Confirm Password"
            value={input.confirmPassword}
            name="confirmPassword"
            onChange={handleChangeInput}
            error={inputError.confirmPassword}
            type="password"
          />
        </div>
        <div className="flex items-center justify-between">
          <Button bg="stone" color="white" width="full" type="submit">
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                <span>Registering...</span>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
