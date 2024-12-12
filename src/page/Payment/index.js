import React, { useState } from "react";
import HeaderUser from "../../components/Header user";
import image1 from "../../Assert/Image pay/1.png";
import image2 from "../../Assert/Image pay/2.png";
import image3 from "../../Assert/Image pay/3.png";
import image4 from "../../Assert/Image pay/4.png";
import image5 from "../../Assert/Image pay/5.png";
import image6 from "../../Assert/Image pay/6.png";
import image7 from "../../Assert/Image pay/7.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Wrapper App";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Payment = () => {
  const { cart, setCart } = useAuth();
  const [paymentValue, setPaymentValue] = useState("");
  const navigate = useNavigate();

  const handlePay = async () => {
    const token = Cookies.get("PHPSESSID");
    if (!token) {
      toast.error("Session expired. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const payload = {
      address: paymentValue,
      booklist: cart,
    };

    try {
      const response = await fetch("http://localhost/order/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `PHPSESSID=${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setCart([]);
        toast.success("Order placed successfully!");
        navigate("/order-status");
      } else {
        const errorData = await response.json();
        toast.error("Error placing order: " + errorData.message);
      }
    } catch (error) {
      toast.error("An error occurred while placing the order.");
    }
  };

  const totalSum = cart.reduce((accumulator, item) => accumulator + item.totalPrice, 0);

  return (
    <div className="flex flex-col">
      <HeaderUser />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-10">
        <div className="hidden md:block col-span-1 p-4"></div>

        <div className="col-span-1 md:col-span-3 p-4">
          {/* Shipping Address */}
          <div className="bg-gray-100">
            <h2 className="text-black text-lg md:text-xl border-b border-gray-300 font-bold p-2">
              ĐỊA CHỈ GIAO HÀNG
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5 items-center">
              <h2 className="text-black p-2 col-span-1">Địa chỉ nhận hàng</h2>
              <div className="col-span-2">
                <input
                  type="text"
                  value={paymentValue}
                  onChange={(e) => setPaymentValue(e.target.value)}
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập địa chỉ nhận hàng"
                />
              </div>
            </div>
          </div>

          {/* Promo Code Section */}
          <div className="bg-gray-100 mt-10">
            <h2 className="text-black text-lg md:text-xl border-b border-gray-300 font-bold p-2">
              MÃ KHUYẾN MÃI/MÃ QUÀ TẶNG
            </h2>
            <div className="p-2 flex items-center">
              <i className="text-2xl sm:text-5xl text-gray-500 fa-regular fa-square-check mr-4 sm:mr-10"></i>
              <div>
                <h2 className="text-black text-sm sm:text-lg font-bold">Giao hàng tiêu chuẩn: 22.000 Đ</h2>
                <span className="text-gray-500 text-xs sm:text-base">Dự kiến giao hàng: Thứ sáu 23/12</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-gray-100 mt-10">
            <h2 className="text-black text-lg md:text-xl border-b border-gray-300 font-bold p-2">
              PHƯƠNG THỨC THANH TOÁN
            </h2>
            {[image1, image2, image3, image4, image5, image6, image7].map((image, index) => (
              <div key={index} className="p-2 flex items-center">
                <input
                  type="checkbox"
                  className="mr-4 w-6 h-6 sm:w-8 sm:h-8 text-blue-600 bg-gray-100 border-gray-900 rounded"
                />
                {image && <img src={image} alt="payment" className="w-10 sm:w-14" />}
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-100 my-10">
            <h2 className="text-black text-lg md:text-xl border-b border-gray-300 font-bold p-2">
              KIỂM TRA LẠI ĐƠN HÀNG
            </h2>
            {cart.map((item, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-5">
                <div className="col-span-2 p-4 flex justify-center">
                  <img src={item.image} alt={item.name} className="w-24 h-24" />
                </div>
                <div className="p-4 flex items-center justify-center">
                  <p className="text-black text-sm sm:text-base">{item.name}</p>
                </div>
                <div className="p-4 flex items-center justify-center">
                  <p className="text-black text-sm sm:text-base">{item.Quantity}</p>
                </div>
                <div className="p-4 flex items-center justify-center">
                  <p className="text-black text-sm sm:text-base">{item.totalPrice} Đồng</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Button */}
          <div className="bg-gray-100 mt-10 p-3 flex flex-col sm:flex-row justify-between items-center">
            <Link to="/cart" className="text-sm sm:text-base">
              <i className="fa-solid fa-arrow-left"></i> Quay về đơn hàng
            </Link>
            <div className="mt-4 sm:mt-0">
              <div className="text-center text-red-600 text-lg sm:text-2xl font-bold">
                Tổng thành tiền là: {totalSum} Đồng
              </div>
              <button
                onClick={handlePay}
                className="w-full sm:w-72 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block col-span-1 p-4"></div>
      </div>
    </div>
  );
};

export default Payment;
