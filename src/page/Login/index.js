import React from 'react';
import { user } from '../../data/user';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    });
    const [isLoading,setIsLoading] = React.useState(false)

    // Hàm xử lý thay đổi giá trị của các trường nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        
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

                setIsLoading(false);
                
                navigate("/admin/book/view");
                
            } else {

                setIsLoading(false); // Tắt trạng thái tải

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
            setIsLoading(false); // Tắt trạng thái tải

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
        <section class="bg-gray-50 dark:bg-gray-900">
            {isLoading == false ?    
                <>
                    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img class="w-16 h-16 mr-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmMiyNm0-af3xQ5CPPwsVinkTyy0oc_MsvxQ&s" alt="logo" />
                        
                    </a>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                Đăng nhập
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                                <div>
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên tài khoản</label>
                                    <input type="username" name="username" id="username" onChange={handleChange} value={formData.username} class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tài khoản" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                    <input type="password" name="password" id="password" onChange={handleChange} value={formData.password} placeholder="Nhập mật khẩu" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className='flex justify-end'>
                                    <button type="submit" class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
                                        Đăng nhập
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </>
                :
                <>
                    <Loading />
                </>
            }
        </section>
    );
}

export default Login;
