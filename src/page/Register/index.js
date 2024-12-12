import React from 'react';
import image from "../../Assert/images/background 1.png"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {

    const navigate = useNavigate();

    // Updated state to include the new fields
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        firstname: '',
        lastname: '',
        DOB: ''
    });

    // Hàm xử lý thay đổi giá trị của các trường nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const response = await fetch('http://localhost/member/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {

                const data = await response.json();
                toast.success(data.message || 'Đăng ký thành công!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                navigate('/login'); // Navigate to login page on success
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Đăng ký thất bại!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra. Vui lòng thử lại!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-screen-xl">
                <div className="lg:grid lg:grid-cols-2 lg:gap-4 flex">
                    {/* Image */}
                    <div className="h-screen hidden lg:block">
                        <img className="w-full dark:hidden" src={image} alt="Background" />
                    </div>

                    {/* Form register */}
                    <div className="mt-10 sm:mt-10 lg:mt-24">
                        <div className="flex flex-col items-center justify-center md:h-screen lg:py-0">
                            <a href="#" className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white mt-10">
                                <img className="w-16 h-16 mr-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmMiyNm0-af3xQ5CPPwsVinkTyy0oc_MsvxQ&s" alt="logo" />
                            </a>
                            <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="space-y-4">
                                    <p className="text-gray-500 dark:text-gray-400 mt-5">Welcome back!</p>
                                    <h1 className="text-2xl font-semibold text-gray-900 sm:text-2xl dark:text-white" style={{color:"#000"}}>Register Account</h1>
                                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên tài khoản</label>
                                            <input 
                                                type="text" 
                                                name="username" 
                                                id="username" 
                                                onChange={handleChange} 
                                                value={formData.username} 
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Nhập tài khoản" 
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
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Nhập tài khoản" 
                                                required 
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                id="email" 
                                                onChange={handleChange} 
                                                value={formData.email} 
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Nhập email" 
                                                required 
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                                            <input 
                                                type="tel" 
                                                name="phone" 
                                                id="phone" 
                                                onChange={handleChange} 
                                                value={formData.phone} 
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Nhập số điện thoại" 
                                                required 
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên</label>
                                            <input 
                                                type="text" 
                                                name="firstname" 
                                                id="firstname" 
                                                onChange={handleChange} 
                                                value={formData.firstname} 
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Nhập tên" 
                                                required 
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ</label>
                                            <input 
                                                type="text" 
                                                name="lastname" 
                                                id="lastname" 
                                                onChange={handleChange} 
                                                value={formData.lastname} 
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                placeholder="Nhập họ" 
                                                required 
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="DOB" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày sinh</label>
                                            <input 
                                                type="date" 
                                                name="DOB" 
                                                id="DOB" 
                                                onChange={handleChange} 
                                                value={formData.DOB} 
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                required 
                                            />
                                        </div>
                                        <div className="flex flex-col justify-end">
                                            <button 
                                                type="submit" 
                                                className="text-white bg-orange-500 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                            >
                                                Đăng kí
                                            </button>
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

export default Register;
