import React from 'react';
import image from "../../Assert/images/background 1.png";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Wrapper App';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios

const LoginUser = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await axios.post(
                'http://localhost/member/login',
                {
                    username: formData.username,
                    password: formData.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Gửi cookies và thông tin xác thực
                }
            );

            const data = response.data; // Trích xuất dữ liệu từ phản hồi
            console.log('Response:', data);

            if (data.status === "true") {
                toast.success(data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                // Retrieve non-HTTP-only cookies (if needed)
                const cookies = document.cookie;
                const sessionID = cookies
                    .split('; ')
                    .find((row) => row.startsWith('PHPSESSID='))
                    ?.split('=')[1];
                console.log('PHPSESSID:', sessionID);

                navigate("/");
            } else {
                console.log(data.message);
                toast.error(data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error('Error:', error);

            toast.error('Something went wrong. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-screen-xl">
                <div className="lg:grid lg:grid-cols-2 lg:gap-4 flex justify-center items-center h-screen">
                    <div className="h-full hidden lg:block">
                        <img className="w-full h-full dark:hidden" src={image} alt="Background" />
                    </div>
                    <div className="mt-10 sm:mt-10 lg:mt-16">
                        <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
                            <a href="#" className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                                <img className="w-16 h-16 mr-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmMiyNm0-af3xQ5CPPwsVinkTyy0oc_MsvxQ&s" alt="logo" />
                            </a>
                            <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="space-y-4 sm:p-8">
                                    <p className="text-gray-500 dark:text-gray-400 mt-5">Welcome back!</p>
                                    <h1 className="text-2xl font-semibold text-gray-900 sm:text-2xl dark:text-white" style={{ color: "#000" }}>
                                        Login to your account
                                    </h1>
                                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                onChange={handleChange}
                                                value={formData.username}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                placeholder="Enter username"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                onChange={handleChange}
                                                value={formData.password}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                placeholder="Enter password"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col justify-end">
                                            <button type="submit" className="text-white bg-orange-500 hover:bg-blue-700 rounded-lg px-5 py-2.5">Login</button>
                                            <Link to="/register" className="text-center py-2.5 px-5 text-sm text-gray-900 bg-white rounded border hover:bg-gray-100">Register</Link>
                                            <Link to="/" className="text-center py-2.5 px-5 text-sm text-white bg-blue-900 rounded">Back</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginUser;
