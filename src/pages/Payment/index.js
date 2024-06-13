import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { create_payment } from "../../service/PaymentService";
import Cookies from "js-cookie";
import {
  GetListProductOnCard,
  CreateCartOrder,
} from "../../service/CartService";
const Payment = () => {
  const [cartData, setCartData] = useState([]);
  const [amount, setAmount] = useState("10000");
  const [bankCode, setBankCode] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [userDetail, setuserDetail] = useState({
    userName: "",
    address: "",
    phoneNumber: "",
    note: "",
    quantity: "0",
    totalPrice: amount,
    useId: "",
  });
  const [errors, setErrors] = useState({
    userName: "",
    address: "",
    phoneNumber: "",
  });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userIdCookie = Cookies.get("userId");
    if (userIdCookie) {
      const userId = JSON.parse(userIdCookie);
      const response = await GetListProductOnCard();
      const filteredResponse = response.filter(
        (item) => item.userId === userId && item.status === "unpaid"
      );
      setCartData(filteredResponse);
      let totalPrice = 0;
      for (let i = 0; i < response.length; i++) {
        totalPrice += response[i].totalPrice;
      }
      setAmount(parseFloat(totalPrice.toFixed(2)) * 25457);
      setuserDetail({
        ...userDetail,
        quantity: response.length,
        useId: userId,
        totalPrice: parseFloat(totalPrice.toFixed(2)),
      });
    } else {
      window.location.href = "/";
    }
  };

  const validation = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\d{10}$/.test(value);
  };
  const handleInputChange = (field, value) => {
    setuserDetail({ ...userDetail, [field]: value });

    // Validation logic
    switch (field) {
      case "userName":
        setErrors({
          ...errors,
          userName: value ? "" : "UserName is required",
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
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    setBankCode(selectedOption);
  }, [selectedOption]);
  const handleSubmit = async (event) => {
    try {
      const hasErrors = Object.values(errors).some((error) => error !== "");
      const requiredDetails = { ...userDetail, note: "optional" };
      const isMissingDetail = Object.values(requiredDetails).some(
        (value) => value === ""
      );
      if (!hasErrors && !isMissingDetail) {
        setBankCode(selectedOption);
        if (bankCode) {
          const cartOder = await CreateCartOrder(
            userDetail.useId,
            cartData,
            amount
          );
          const userUpdate = {
            userName: userDetail.userName,
            address: userDetail.address,
            phoneNumber: userDetail.phoneNumber,
            note: userDetail.note,
            quantity: userDetail.quantity,
            totalPrice: amount,
            useId: userDetail.useId,
            orderId: cartOder._id,
          };
          toast.success("successful");
          const response = await create_payment(userUpdate, bankCode);
          window.location.href = response.data.paymentUrl;
        } else {
          toast.error("Not choose method payment failed");
        }
      } else {
        toast.warning("You miss some detail");
      }
    } catch (error) {
      console.error("Error creating payment URL:", error);
    }
  };
  return (
    <div className="container max-w-full">
      <div className="flex justify-center items-center container">
        <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
          <div className="flex flex-col justify-center items-center w-full space-y-9">
            <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8 w-full">
              <div className="lg:flex items-center justify-center w-full">
                <div className="lg:w-1/3 mb-3">
                  <h1 className="text-4xl font-semibold leading-9 text-gray-800 text-left">
                    Secure Payment
                  </h1>
                  <p className="text-base leading-6 mt-4 text-gray-600 text-left">
                    Please review your order and select your preferred payment
                    method. Your security is our top priority, and we offer
                    multiple payment options to ensure a smooth and secure
                    transaction.
                  </p>
                  <div className="flex  justify-center items-center w-full">
                    <div className="w-full sm:w-96 md:w-2/12 lg:w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-28 sm:gap-x-6 sm:gap-y-12 gap-y-12 sm:mt-14 mt-10">
                      <div className="flex w-full">
                        <img
                          className="h-10 w-10"
                          alt=""
                          src="https://cdn-stamplib.casetify.com/cms/image/637749ded3e7446b52839468dd0548bc.png"
                        ></img>
                        <p className="font-semibold text-xl leading-5 text-gray-800">
                          Ultra Bounce corners
                        </p>
                      </div>
                      <div className="flex w-full">
                        <img
                          className="h-10 w-10"
                          alt=""
                          src="https://cdn-stamplib.casetify.com/cms/image/b5a6189078e15873b15550ff42225463.png"
                        ></img>
                        <path
                          d="M31.25 7.29163C33.8953 8.22305 36.2979 9.736 38.2809 11.719C40.264 13.7021 41.7769 16.1047 42.7083 18.75H33.3333C32.6946 18.0019 31.998 17.3054 31.25 16.6666V7.29163Z"
                          stroke="#4B5563"
                          strokeWidth="3.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <p className="font-semibold text-xl leading-5 text-gray-800">
                          32.8 ft. drop protection
                        </p>
                      </div>
                      <div className="flex w-full">
                        <img
                          className="h-10 w-10"
                          alt=""
                          src="https://cdn-stamplib.casetify.com/cms/image/ecc085ca6b89a6d935c69e326cbfe15b.png"
                        ></img>
                        <p className="font-semibold text-xl leading-5 text-gray-800">
                          10x MIL-STD-810G
                        </p>
                      </div>
                      <div className="flex w-full">
                        <img
                          className="h-10 w-10"
                          alt=""
                          src="https://cdn-stamplib.casetify.com/cms/image/c2c8fd9b9151dc8f1db6ef465a898354.png"
                        ></img>
                        <p className="font-semibold text-xl leading-5 text-gray-800 ">
                          Wireless charging
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-6/12  flex justify-end">
                  <div className="flex flex-col xl:flex-row xl:space-x-6 w-full lg:w-5/6">
                    <div className="p-8 bg-slate-200 flex flex-col w-full ">
                      <div className="flex flex-row justify-center items-center">
                        <hr className="border w-full" />
                        <p className="flex flex-shrink-0 px-4 leading-4  font-bold  text-4xl">
                          Payment
                        </p>
                        <hr className="border w-full" />
                      </div>
                      <div className=" flex mt-8">
                        <label className="text-base font-bold mt-1  leading-1 text-gray-800 mr-3 w-48">
                          Money:{" "}
                        </label>
                        <input
                          className="border italic rounded-lg border-gray-300 py-1  w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                          type="text"
                          readOnly
                          value={amount + "  VND"}
                        />
                      </div>
                      <div className="mt-2 flex-col">
                        <div className="mt-2">
                          <div className="flex">
                            <label className="text-base leading-1 font-bold text-gray-800 mt-1 mr-3 w-48">
                              UserName:{" "}
                            </label>
                            <input
                              className="border italic rounded-lg  p-1 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                              type="text"
                              name="userName"
                              value={userDetail.userName}
                              placeholder="Enter name"
                              onChange={(e) =>
                                handleInputChange("userName", e.target.value)
                              }
                            />
                          </div>

                          <span className=" left-0 top-full text-red-500 text-xs">
                            {errors.userName}
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="flex">
                            <label className="text-base leading-1 font-bold text-gray-800 mt-1 mr-3 w-48">
                              Phone Number:{" "}
                            </label>
                            <input
                              className="border italic rounded-lg border-gray-300 p-1 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                              type="text"
                              name="phoneNumber"
                              value={userDetail?.phoneNumber}
                              placeholder="Phone number"
                              onChange={(e) =>
                                handleInputChange("phoneNumber", e.target.value)
                              }
                            />
                          </div>

                          <span className=" left-0 top-full text-red-500 text-xs">
                            {errors.phoneNumber}
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="flex">
                            <label className="text-base leading-1 font-bold text-gray-800 mt-1 mr-3 w-48">
                              Address:{" "}
                            </label>
                            <input
                              className="border italic rounded-lg border-gray-300 p-1 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                              type="text"
                              name="address"
                              value={userDetail.address}
                              placeholder="Enter address"
                              onChange={(e) =>
                                handleInputChange("address", e.target.value)
                              }
                            />
                          </div>

                          <span className=" left-0 top-full text-red-500 text-xs">
                            {errors.address}
                          </span>
                        </div>
                        <div className="mt-2">
                          <label className="text-base leading-1 font-bold text-gray-800 mt-1 mr-3">
                            Note:{" "}
                          </label>
                          <textarea
                            className="border italic rounded-lg border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                            type="text"
                            value={userDetail.note}
                            placeholder="Enter note"
                            onChange={(e) =>
                              setuserDetail({
                                ...userDetail,
                                note: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="relative mt-3">
                          <label className="mt-5 text-base text-left font-bold leading-4 text-gray-800">
                            Method payment
                          </label>
                          <select
                            value={selectedOption}
                            onChange={handleOptionChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-600 focus:outline-none focus:border-indigo-500"
                          >
                            <option value="">Choose method payment</option>
                            <option value="VNPAYQR">
                              VNPAYQR payment gateway
                            </option>
                            <option value="VNBANK">
                              Payment via ATM-Domestic bank account
                            </option>
                            <option value="INTCARD">
                              Payment via international card
                            </option>
                          </select>
                        </div>
                      </div>
                      {cartData && (
                        <div className="mt-2 flex-col flex justify-center items-center">
                          <button
                            onClick={handleSubmit}
                            className="mt-8 w-52 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 items-center py-4 rounded"
                          >
                            Payment
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
