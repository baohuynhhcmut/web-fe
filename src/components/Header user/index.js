
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
            {/* Header */}
            <div className="px-4 md:px-10">
                <div className="space-y-1 flex flex-col md:flex-row justify-between p-3 border-b header">
                    <div className="flex items-center space-x-2 text-color">
                        <i className="fa-solid fa-phone"></i>
                        <span className="text-base md:text-lg text-color font-semibold">
                            +91 8374902234
                        </span>
                    </div>
                    <div className="mt-2 md:mt-0">
                        <ul className="flex justify-center md:justify-end space-x-4 text-color">
                            <li><i className="fa-brands fa-facebook text-xl"></i></li>
                            <li><i className="fa-brands fa-instagram text-xl"></i></li>
                            <li><i className="fa-brands fa-linkedin text-xl"></i></li>
                            <li><i className="fa-brands fa-twitter text-xl"></i></li>
                            <li><i className="fa-brands fa-blogger-b"></i></li>
                        </ul>
                    </div>
                </div>
            </div>
    
            {/* Search Section */}
            <div className="flex flex-col md:flex-row items-center justify-around mt-4 space-y-4 md:space-y-0">
                <img
                    className="rounded-full h-16 w-16 md:h-20 md:w-20"
                    src={userimage}
                    alt="image description"
                />
    
                <Space direction="vertical" size="middle" className="space-y-4 w-full md:w-[400px]">
                    <div className="flex space-x-2">
                        <Select
                            defaultValue="Tác giả"
                            options={options}
                            className="h-10 w-1/3"
                            onChange={setSelectedOption}
                        />
                        <Input
                            placeholder="Quản Thành Thơ"
                            className="text-black w-2/3 py-2 px-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onPressEnter={handleEnter}
                        />
                    </div>
                </Space>
    
                {/* User Info or Login Section */}
                {isLogin ? (
                    <div className="flex items-center space-x-4">
                        <UserInformationDialog user={user} setUser={setUser} />
                        <button
                            onClick={handleLogout}
                            type="button"
                            className="mb-3 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                            <i className="fa-solid fa-right-from-bracket mx-2"></i>
                            <span className="text-white font-bold text-sm">Đăng xuất</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="flex items-center">
                            <i className="fa-regular fa-user mx-2"></i>
                            <span className="text-color font-bold text-sm">ĐĂNG NHẬP</span>
                        </Link>
                        <Link
                            to="/register"
                            className="ml-3 flex items-center border-l-2 border-solid border-[#173F5F] pl-3"
                        >
                            <i className="fa-solid fa-lock mx-2"></i>
                            <span className="text-color font-bold text-sm">ĐĂNG KÍ</span>
                        </Link>
                    </div>
                )}
            </div>
    
            {/* Navigation Menu */}
            <div className="mt-4">
                <ul className="text-white flex flex-col md:flex-row justify-center text-sm bg-blue-900 py-2">
                    <li className="py-2 px-5 font-bold border-b md:border-none md:border-l-2 md:border-r-2 border-solid border-[#fff]">
                        <Link to="/">Trang chủ</Link>
                    </li>
                    <li className="py-2 px-5 border-b md:border-none md:border-r-2 border-solid border-[#fff]">
                        <Link to="/listing">Sản phẩm</Link>
                    </li>
                    <li className="py-2 px-5 border-b md:border-none md:border-r-2 border-solid border-[#fff]">
                        <Link to="/cart">Giỏ hàng</Link>
                    </li>
                    <li className="py-2 px-5 border-b md:border-none">
                        <Link to="/order-status">Đơn hàng</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default HeaderUser;
