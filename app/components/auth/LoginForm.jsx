"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import Input from "../common/Input";
import axios from "axios";

const initialInput = {
  email: "",
  password: "",
};

const initialInputError = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateInput = () => {
    const errors = {};
    if (!input.email) errors.email = "กรุณากรอกอีเมล";
    if (!input.password) errors.password = "กรุณากรอกรหัสผ่าน";
    return errors;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setInputError(initialInputError);

    // Validate input
    const errors = validateInput();
    if (Object.keys(errors).length > 0) {
      setInputError(errors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", input);

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        setInputError({ password: error.response.data.error });
      } else {
        console.error("An unexpected error occurred", error);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md bg-white rounded px-8 py-8 mb-4 lg:shadow-md sm:mt-0">
      <form onSubmit={handleSubmitForm}>
        <div className="mb-4">
          <h4 className="text-center text-2xl font-bold mb-4">Login</h4>
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
        <div className="flex items-center justify-between">
          <Button bg="stone" color="white" width="full" type="submit">
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                <span>Logging in...</span>
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
