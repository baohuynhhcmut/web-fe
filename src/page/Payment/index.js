
import React from "react";
import HeaderUser from "../../components/Header user";
import image1 from "../../Assert/Image pay/1.png"
import image2 from "../../Assert/Image pay/2.png"
import image3 from "../../Assert/Image pay/3.png"
import image4 from "../../Assert/Image pay/4.png"
import image5 from "../../Assert/Image pay/5.png"
import image6 from "../../Assert/Image pay/6.png"
import image7 from "../../Assert/Image pay/7.png"
import cartImage from "../../Assert/image books/cart1.png"
import { useState } from "react";

import { Link, useNavigate, useParams } from 'react-router-dom';
import {book} from "../../data/book"
import { useAuth } from "../../Wrapper App";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

const filterBooksByID = (id,books) => {
    return books.filter(book => book.book_id === id);
};

const PaymentInput = ({ title, onValueChange }) => {
    const [value, setValue] = useState(""); // Track the input value
  
    const handleChange = (event) => {
      const inputValue = event.target.value;
      setValue(inputValue); // Update local state
      if (onValueChange) {
        onValueChange(inputValue); // Pass the value to the parent component
      }
    };
  
    return (
      <div className="grid grid-cols-3 gap-4 py-5 items-center">
        {/* Title */}
        <h2 className="text-black p-2 col-span-1">{title}</h2>
  
        {/* Input Field */}
        <form className="w-full col-span-2">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative pr-10">
            <input
              type="text"
              id="default-search"
              value={value} // Bind input value to state
              onChange={handleChange} // Handle changes
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={`Nhập ${title}`}
            />
          </div>
        </form>
      </div>
    );
  };
const Payer = ({image,title}) => {
    return(
        <>
            <div className="p-2 flex items-center">
                <div class="">
                    <input  type="checkbox" value="" class="mr-10 w-8 h-8 text-blue-600 bg-gray-100 border-gray-900 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                </div>

                <div className="flex items-center">
                    {image && <img src={image} />}
                    <h2 className="text-black text-xl ml-10 ">
                        {title}
                    </h2> 
                </div>
            </div>
        </>
    )
}

const Payment = () => {

    // const { id } = useParams();
    // const bookDetail = filterBooksByID(id,book)[0]

    const {cart,setCart} = useAuth()
    
    const [paymentValue, setPaymentValue] = useState("");

    const navigate = useNavigate()

    const handlePay = async () => {

        const token = Cookies.get('PHPSESSID'); // Lấy token từ cookie
    
        if (!token) {
            toast.error("Session expired. Please log in again.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }
    


        const payload = {
            address:paymentValue,
            booklist:cart,
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
        setCart([])
        toast.success("Order placed successfully!"); // Toast success message
        console.log("Response:", data);
        navigate("/order-status")
      } else {
        const errorData = await response.json();
        setCart([])
        toast.error("Error placing order: " + errorData.message); // Toast error message
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setCart([])
      toast.error("An error occurred while placing the order."); // Toast error message
    }
  };
    

  const totalSum = cart.reduce((accumulator, item) => accumulator + item.totalPrice, 0);

  const handleInputChange = (value) => {
    setPaymentValue(value);
    console.log("Input value:", value);
  };

    console.log(cart)
    return (
        <div className="flex flex-col ">
            <HeaderUser />

            <div className="grid grid-cols-5 gap-4 mt-10">
                <div className="col-span-1 p-4"></div>

                <div className="col-span-3 p-4">
                    {/* First h2 takes full row */}
                    <div className="bg-gray-100">
                        <h2 className="text-black text-xl border-b border-gray-300 font-bold p-2 col-span-5">
                            ĐỊA CHỈ GIAO HÀNG
                        </h2>

                        {/* Second row with 2 columns */}
                        <PaymentInput title={"Địa chỉ nhận hàng"} onValueChange={handleInputChange} />
                    </div>

                    <div className="bg-gray-100 mt-10">
                        <h2 className="text-black text-xl border-b border-gray-300 font-bold p-2 col-span-5">
                            MÃ KHUYẾN MÃI/MÃ QUÀ TẶNG
                        </h2>
                        <div className="grid grid-cols-1 gap-4 py-5 items-center">
                        
                            <div className="p-2 flex items-center">
                                <i class="text-5xl text-gray-500 fa-regular fa-square-check mr-10"></i>
                                <div>
                                    <h2 className="text-black text-xl font-bold">
                                        Giao hàng tiêu chuẩn: 22.000 Đ
                                    </h2> 
                                    <span className="text-gray-500">Dự kiến giao hàng: Thứ sáu 23/12</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-100 mt-10">
                        <h2 className="text-black text-xl border-b border-gray-300 font-bold p-2 col-span-5">
                             PHƯƠNG THỨC THANH TOÁN
                        </h2>
                        <div className="grid grid-cols-1 gap-4 py-5 items-center">
                            <Payer image={image1} title={"Ví ZaloPay"} />
                            <Payer image={image2} title={"Ví Moca trên ứng dụng Grab"} />
                            <Payer image={image3} title={"Ví ShopeePay"} />
                            <Payer image={image4} title={"Ví VNPay"} />
                            <Payer image={image5} title={"Ví Momo"} />
                            <Payer image={image6} title={"ATM / Internet Banking"} />
                            <Payer image={image7} title={"Thanh toán bằng tiền mặt khi nhận hàng"} />
                        </div>
                    </div>


                    <div className="bg-gray-100 mt-10">
                        <h2 className="text-black text-xl border-b border-gray-300 font-bold p-2 col-span-5">
                            THÔNG TIN KHÁC
                        </h2>
                        <div className="grid grid-cols-1 gap-4 py-5 items-center">
                            <Payer title={"Ghi chú"} />
                            <Payer  title={"Xuất hóa đơn GTGT"} />
                            <Payer  title={"Bằng việc tiến hành đặt mua, khách hàng đồng ý với các Điều Kiện GIao Dịch Chung được ban hành bởi BKboooks"} />
                        </div>
                    </div>


                    <div className="bg-gray-100 my-10">
                        <h2 className="text-black text-xl border-b border-gray-300 font-bold p-2 col-span-5">
                            KIỂM TRA LẠI ĐƠN HÀNG
                        </h2>

                        <div className="grid grid-cols-5 gap-4 mt-5 ">
                            <div className=" p-4 col-span-2">
                                <p className="text-black">Ảnh</p>
                            </div>

                            <div className=" p-4">
                                <p className="text-black">Tên sản phẩm</p>
                            </div>

                            <div className=" p-4">
                                <p className="text-black text-center">Số lượng</p>
                            </div>
                        
                            <div className=" p-4">
                                <p className="text-black text-center">Thành tiền</p>
                            </div>
                        </div>
                        
                        {cart.map((item,index)=>{
                             return(
                                <div className="grid grid-cols-5 gap-4 mt-5 ">
                                    <div className=" p-4 w-[120px] h-[80px] col-span-2 flex justify-center items-center my-10">
                                        <img src={item.image} />
                                    </div>

                                    <div className="p-4 flex items-center justify-center">
                                        <p className="text-black">{item.name}</p>
                                    </div>

                                    <div className="p-4 flex items-center justify-center">
                                        <p className="text-black">{item.Quantity}</p>
                                    </div>


                                    <div className="p-4 flex items-center justify-center">
                                        <p className="text-black">{item.totalPrice} Đồng</p>
                                    </div>

                                </div> 
                             )
                        })} 
                        
                    </div>

                    {/* <div className="mt-10 flex justify-end pt-10 pr-2 border-b border-black">
                        <div>
                            <div className="flex justify-between">
                                <span className="text-black">Thành tiền</span>
                                <span className="text-black" >120.000 Đ</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-black">Phí vận chuyển (Giao hàng tiêu chuẩn) </span>
                                <span className="text-black">120.000 Đ</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-bold text-black" > Tổng số tiền (gồm VAT) </span>
                                <span className="text-black">120.000 Đ</span>
                            </div>
                        </div>
                    </div> */}

                    <div className="bg-gray-100  mt-10 p-3 flex justify-between items-center">
                    

                        <Link to={"/cart"}>
                            <i class="fa-solid fa-arrow-left"></i>
                            <span className="text-black ml-1">Quay về đơn hàng</span>
                        </Link>
                        <div>
                            <div className="text-center text-red-600 text-2xl font-bold">Tổng thành tiền là: {totalSum} Đồng</div>
                            <button onClick={handlePay} type="button" class="w-72 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Thanh toán</button>
                        </div>
                    </div>

                </div>
                
                
                <div className="col-span-1  p-4"> </div>
            </div>
        </div>
    );
}

export default Payment;
