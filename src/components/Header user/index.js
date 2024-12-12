
import userimage from "../../Assert/images/User.png"  

import { Link } from "react-router-dom";

import { useAuth } from "../../Wrapper App";

import { client } from "../../data/customer";

import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie'; // Install with `npm install js-cookie`

import { useEffect, useState } from "react";

import UserInformationDialog from "../Modal User Detail";


import { Button, Input, Select, Space } from 'antd';

const { Search } = Input;

const options = [
  {
    value: 'author',
    label: 'Tác giả',
  },
  {
    value: 'genre',
    label: 'Thể loại',
  },
];

const HeaderUser = () => {
    const navigate = useNavigate()
    const {user,login,logout,setUser} = useAuth()
    const [isLogin,setIsLogin] = useState(false)


    const [selectedOption, setSelectedOption] = useState('author');
    const [inputValue, setInputValue] = useState('');
    
    const handleEnter = () => {
        const queryParam = selectedOption === 'author' ? 'author' : 'genre';
        navigate(`/listing?${queryParam}=${inputValue}`);
      };


    // const nameUser = client.find(
    //     (u) => u.id == userId
    // )
    
    const handleLogout = () => {
        Cookies.remove("PHPSESSID");
        logout();  // Clear the user data and set logged in state to false
        navigate('/login');  // Redirect to login page after logout
    };
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {

                const sessionCookie = Cookies.get("PHPSESSID"); // Get PHPSESSID cookie

                if (!sessionCookie) {
                    // navigate("/login")
                    return;
                }


                const response = await fetch("http://localhost/member/getInfor", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Cookie": `PHPSESSID=${sessionCookie}` // Include session cookie in the request
                    },
                    credentials: "include"
                });

                if (response.ok) {
                    const data = await response.json();
                    // console.log("Lay data user: ",data)
                    setIsLogin(true)
                    login(data.data); 
                } else {
                    console.error("Failed to fetch user info");
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, []);

    // useEffect

    console.log("Tao là user: ",user)

    return (
        <div>
            <div class="px-10">
                <div className="space-y-1 flex justify-between p-3 border-b header">
                    <div class="flex items-center space-x-2 text-color">
                        <i class="fa-solid fa-phone"></i>
                        <span class="text-lg text-color font-semibold	">+91 8374902234</span>
                    </div>
                    <div>
                        <ul class="flex space-x-4 text-color">
                            <li><i class="fa-brands fa-facebook text-xl"></i></li>
                            <li><i class="fa-brands fa-instagram text-xl"></i></li>
                            <li><i class="fa-brands fa-linkedin text-xl"></i></li>
                            <li><i class="fa-brands fa-twitter text-xl"></i></li>
                            <li><i class="fa-brands fa-blogger-b"></i></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex items-center	justify-around mt-2">

                <img class="rounded-full h-20 w-20" src={userimage} alt="image description" />

                {/* <div class="relative">
                    <input 
                        type="text" 
                        class="w-96 py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                        placeholder="Search..."
                    />
                    <i class="fa-solid fa-search absolute right-4 icon-search transform  text-gray-500"></i>
                </div> */}

                 <Space direction="vertical" size="middle" className="space-y-4 w-[400px]">
                    <div className="flex space-x-2">
                        <Select
                        defaultValue="Tác giả"
                        options={options}
                        className="h-10"
                        onChange={setSelectedOption}
                        />
                        <Input
                        placeholder="Quản Thành Thơ"
                        className="text-black w-full py-2 px-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onPressEnter={handleEnter}
                        />
                    </div>
                </Space>

                {isLogin ? 
                    <div className="flex ">
                        <UserInformationDialog  user={user} setUser={setUser}  />
                        {/* <Link to="/">
                            <button type="button" class="font-bold text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <i class="fa-regular fa-user mx-2 font-bold"></i>
                                {user?.firstname}
                            </button>
                        </Link> */}
                        <div className="border-l-1 border-solid border-[#173F5F]"> </div>
                        <button onClick={handleLogout} type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            <i class="fa-solid fa-right-from-bracket mx-2"></i>
                            <span className="text-white font-bold text-sm">Đăng xuất</span>
                        </button>

                        {/* <button className="ml-3 border-l-2 border-solid border-[#173F5F]" onClick={handleLogout}>
                            <i class="fa-solid fa-right-from-bracket mx-2"></i>
                            <span className="text-color font-bold text-sm">Đăng xuất</span>
                        </button> */}
                    </div>
                :
                    <>
                        <div className="flex ">
                            <Link to="/login">
                                <i class="fa-regular fa-user mx-2"></i>
                                <span className="text-color font-bold text-sm">ĐĂNG NHẬP</span>
                            </Link>
                            <Link className="ml-3 border-l-2 border-solid border-[#173F5F]" to="/register">
                                <i class="fa-solid fa-lock mx-2"></i>
                                <span className="text-color font-bold text-sm">ĐĂNG KÍ</span>
                            </Link>
                        </div>
                    </>
                }
            </div>


            <div className="">
                <ul className="text-white flex justify-center text-sm bg-blue-900 py-2">
                    <li className="py-2 px-5 font-bold first:border-l-0 last:border-r-0 border-l-2 border-r-2 border-solid border-[#fff]">
                        <Link to={"/"}>Trang chủ</Link>
                    </li>
                    <li className="py-2 px-5 border-1-2 border-r-2 border-solid border-[#fff]">
                        <Link to={"/listing"}>Sản phẩm</Link>
                    </li>
                    <li className="py-2 px-5 border-1-2 border-r-2 border-solid border-[#fff]">
                        <Link to={`/cart`}>Giỏ hàng</Link >
                    </li>
                    <li className="py-2  px-5 border-1-2">
                        <Link to={`/order-status`}>Đơn hàng</Link >
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default HeaderUser;
