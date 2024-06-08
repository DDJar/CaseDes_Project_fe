import React, { useState, useEffect } from "react";
import {
  getUserById,
  updateUserById,
  updateAvatar,
} from "../../service/UserService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const UpdateUser = () => {
  const [userDetail, setuserDetail] = useState({});
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: "",
    dob: "",
    imgAvt: "",
  });

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const userIdCookie = Cookies.get("userId");
    if (userIdCookie) {
      const userId = JSON.parse(userIdCookie);
      const userData = await getUserById(userId);
      const formattedDob = userData.dob ? userData.dob.slice(0, 10) : "";
      setuserDetail({ ...userData, dob: formattedDob });
    } else {
      window.location.href = "/";
    }
  };
  const handleGenderChange = (event) => {
    const selectedGender = event.target.value; // Lấy giá trị của radio button được chọn
    setuserDetail((prevState) => ({
      ...prevState,
      gender: selectedGender, // Cập nhật giá trị gender trong userDetail
    }));
  };
  const validation = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\d{10}$/.test(value);
  };
  const handleInputChange = (field, value) => {
    setuserDetail({ ...userDetail, [field]: value });

    // Validation logic
    switch (field) {
      case "firstName":
        setErrors({
          ...errors,
          firstName: value ? "" : "First name is required",
        });
        break;
      case "lastName":
        setErrors({
          ...errors,
          lastName: value ? "" : "Last name is required",
        });
        break;
      case "email":
        setErrors({
          ...errors,
          email: validation(value) ? "" : "Invalid email address",
        });
        break;
      case "phoneNumber":
        setErrors({
          ...errors,
          phoneNumber:
            value.trim() !== ""
              ? validation(value)
                ? ""
                : "Invalid phone number"
              : "",
        });
        break;
      case "address":
        setErrors({
          ...errors,
          address: value ? "" : "Address is required",
        });
        break;
      default:
        break;
    }
  };
  const handleSubmit = async () => {
    try {
      const hasErrors = Object.values(errors).some((error) => error !== "");
      const isMissingDetail = Object.values(userDetail).some(
        (value) => value === ""
      );
      if (!hasErrors && !isMissingDetail) {
        console.log(userDetail);
        const userIdCookie = Cookies.get("userId");
        const userId = JSON.parse(userIdCookie);
        const userUpdate = {
          firstName: userDetail.firstName,
          lastName: userDetail.lastName,
          dob: userDetail.dob.split("/").reverse().join("-"),
          address: userDetail.address,
          email: userDetail.email,
          phoneNumber: userDetail.phoneNumber,
          gender: userDetail.gender,
          imgAvt: userDetail.imgAvt,
        };
        const res = await updateUserById(userId, userUpdate);

        if (res.success) {
          const infoUser = {
            firstName: res.user.firstName,
            lastName: res.user.lastName,
            imgAvt: res.user.imgAvt,
          };
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 7);
          expirationDate.setHours(expirationDate.getHours() + 7);
          Cookies.set("info", JSON.stringify(infoUser), {
            expires: expirationDate,
          });
          console.log(infoUser);
          toast.success("successful");
        } else {
          toast.error("Update user profile faild");
        }
      } else {
        toast.warning("You miss some detail");
      }
    } catch (error) {}
  };
  // const handleImageChange = (event) => {
  //     const file = event.target.files[0];
  //     const imageUrl = URL.createObjectURL(file);
  //     setuserDetail({ ...userDetail, imgAvt: imageUrl });
  // };
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    try {
      const updatedAvatar = await updateAvatar(file);
      setuserDetail({ ...userDetail, image: updatedAvatar });
      toast.success("Avatar updated successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update avatar");
    }
  };
  return (
    <div className="container mb-3">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <div className="mt-2 flex items-center gap-x-3">
                <img
                  src={`${process.env.HOST_NODEJS}/imageUpload/${userDetail.imgAvt}`}
                  className="h-20 w-20 text-gray-300 rounded-full"
                  alt=""
                />
                <label
                  htmlFor="fileInput"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                >
                  Change
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3 relative">
              <label
                htmlFor="first-name"
                className="flex items-start  text-sm font-medium leading-6 text-gray-900"
              >
                First name<span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <input
                  required={true}
                  type="text"
                  name="first-name"
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                  value={userDetail.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                />
                <span className="absolute left-0 top-full text-red-500 text-xs">
                  {errors.firstName}
                </span>
              </div>
            </div>

            <div className="sm:col-span-3 relative">
              <label
                htmlFor="last-name"
                className="flex items-start  text-sm font-medium leading-6 text-gray-900"
              >
                Last name<span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  required={true}
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="py-3 px-4  w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                  value={userDetail.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                />
              </div>
              <span className="absolute left-0 top-full text-red-500 text-xs">
                {errors.lastName}
              </span>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="dob"
                className="flex items-start  text-sm font-medium leading-6 text-gray-900"
              >
                Date of birth<span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  required={true}
                  id="dob"
                  name="dob"
                  type="date"
                  autoComplete="dob"
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                  value={userDetail.dob}
                  onChange={(e) =>
                    setuserDetail({ ...userDetail, dob: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <div className="mt-2">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="accountType"
                      value="M"
                      checked={userDetail.gender === "M"}
                      onChange={handleGenderChange}
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="accountType"
                      value="F"
                      checked={userDetail.gender === "F"}
                      onChange={handleGenderChange}
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="sm:col-span-3 relative">
              <label
                htmlFor="email"
                className="flex items-start   text-sm font-medium leading-6 text-gray-900"
              >
                Phone number<span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  required={true}
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  autoComplete="email"
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                  value={userDetail.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                />
              </div>
              <span className="absolute left-0 top-full text-red-500 text-xs">
                {errors.phoneNumber}
              </span>
            </div>
            <div className="sm:col-span-3 relative">
              <label
                htmlFor="email"
                className="flex items-start  text-sm font-medium leading-6 text-gray-900"
              >
                Email address<span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  required={true}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                  value={userDetail.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <span className="absolute left-0 top-full text-red-500 text-xs">
                {errors.email}
              </span>
            </div>

            <div className="col-span-full relative">
              <label
                htmlFor="street-address"
                className="flex items-start  text-sm font-medium leading-6 text-gray-900"
              >
                Street address<span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  required={true}
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                  value={userDetail.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>
              <span className="absolute left-0 top-full text-red-500 text-xs">
                {errors.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button> */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default UpdateUser;
