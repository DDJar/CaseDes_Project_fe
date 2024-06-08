import React, { useState, useEffect } from "react";
import { updateUserPasswordById } from "../../service/UserService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const ChangePasswords = () => {
  const [resetPass, setResetPass] = useState({
    oldPasswords: "",
    passwords: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    oldPasswords: "",
    passwords: "",
    confirmPassword: "",
  });
  const handResetPass = async () => {
    const userId = JSON.parse(Cookies.get("userId"));
    if (
      resetPass.oldPasswords &
      resetPass.passwords &
      resetPass.confirmPassword &
      (resetPass.passwords === resetPass.confirmPassword)
    ) {
      const formReset = {
        oldPasswords: resetPass.oldPasswords,
        passwords: resetPass.passwords,
      };
      const response = await updateUserPasswordById(userId, formReset);
      if (response.success) {
        setResetPass({
          ...resetPass,
          oldPasswords: "",
          passwords: "",
          confirmPassword: "",
        });
        toast.success("The passwords was change successfully");
      } else {
        toast.error("The old passwords not correct");
      }
    } else {
      toast.warning("Password confirmation is not the same");
      setError("Password confirmation is not the same");
    }
  };
  const handleInputChange = (field, value) => {
    setResetPass({ ...resetPass, [field]: value });

    // Validation logic
    switch (field) {
      case "oldPasswords":
        setErrors({
          ...errors,
          oldPasswords:
            value.length >= 6
              ? ""
              : "Current passwords must be at least 6 characters",
        });
        break;
      case "passwords":
        setErrors({
          ...errors,
          passwords:
            value.length >= 6 ? "" : "Password must be at least 6 characters",
        });
        break;
      case "confirmPassword":
        setErrors({
          ...errors,
          confirmPassword:
            value.length >= 6 ? "" : "Confirm Password must be same password",
        });
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
        <div className="mt-7">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Change password
              </h1>
              <h2 className="text-danger"> {error && <p>{error}</p>}</h2>
            </div>
            <div className="grid gap-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                >
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    required
                    value={resetPass.oldPasswords}
                    onChange={(e) =>
                      handleInputChange("oldPasswords", e.target.value)
                    }
                  />
                  <span className="text-red-500 text-xs">
                    {errors.oldPasswords}
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold mb-2 dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    required
                    value={resetPass.passwords}
                    onChange={(e) =>
                      handleInputChange("passwords", e.target.value)
                    }
                  />
                  <span className="text-red-500 text-xs">
                    {errors.passwords}
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    required
                    aria-describedby="email-error"
                    value={resetPass.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                  />
                  <span className="text-red-500 text-xs">
                    {errors.confirmPassword}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                onClick={handResetPass}
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              >
                Reset Pass
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChangePasswords;
