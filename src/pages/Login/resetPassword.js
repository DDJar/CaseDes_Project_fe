import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { resetPasswords } from "../../service/loginService";
const ResetPass = () => {
  const [resetPass, setResetPass] = useState({
    passwords: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    passwords: "",
    confirmPassword: "",
  });
  let { userId } = useParams();
  const userID = userId.split("$")[0];
  useEffect(() => {
    window.localStorage.removeItem("inputType");
  }, []);
  const handResetPass = async () => {
    if (resetPass.passwords === resetPass.confirmPassword) {
      const formReset = {
        passwords: resetPass.passwords,
        userId: userID,
      };
      const response = await resetPasswords(formReset);
      if (response.data.success) {
        window.location.href = response.data.redirectUrl;
      }
    } else {
      setError("Password confirmation is not the same");
    }
  };
  const handleInputChange = (field, value) => {
    setResetPass({ ...resetPass, [field]: value });

    // Validation logic
    switch (field) {
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
        <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Resset password
              </h1>
              <h2 className="text-danger"> {error && <p>{error}</p>}</h2>
            </div>

            <div className="mt-5">
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                      aria-describedby="email-error"
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
        </div>
      </main>
    </div>
  );
};

export default ResetPass;
