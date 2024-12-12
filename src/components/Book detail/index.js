
import { Link } from "react-router-dom";
import image from "../../Assert/image books/detail1.png"
import { useState } from "react";
import { useAuth } from "../../Wrapper App";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

const DetailBook = ({book}) => {

    const[isBuy,setIsBuy] = useState(false)
    const {setCart} = useAuth()    

    const handleBuy = async (id) => {
        const token = Cookies.get('PHPSESSID'); // Lấy token từ cookie
    
        if (!token) {
            toast.error("Session expired. Please log in again.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }
    
        try {
            // Gửi yêu cầu đến API
            const response = await fetch('http://localhost/Cart/addTo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     "Cookie": `PHPSESSID=${token}`
                },
                credentials: "include",
                body: JSON.stringify({
                    book_id: id,
                    quantity: isBuy ? 0 : 1, // Nếu `isBuy` là true, xóa sản phẩm; nếu false, thêm vào giỏ
                }),
            });
    
            const result = await response.json();
            
            console.log(result)

            if (response.ok) {
                // Cập nhật giỏ hàng trong state nếu API thành công
                setCart(result.cart); // Server trả về giỏ hàng mới sau khi cập nhật
    
                // Thông báo cho người dùng
                if (isBuy) {
                    toast.success("Product removed from cart successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                } else {
                    toast.success("Product added to cart successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                }
    
                // Cập nhật trạng thái `isBuy`
                setIsBuy(prevState => !prevState);
            } else {
                toast.error(result.message || "Failed to update cart.", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error("Error adding/removing product:", error);
            toast.error("An error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };


    return (
        <div class="grid grid-cols-5 gap-4 bg-white">
                <div class="col-span-2 p-4 flex justify-end">
                    <img class="w-[250px] " src={book?.image} alt="image description" />
                </div>
                    
                <div class="col-span-3 p-4">
                    <h2
                        class="text-2xl font-semibold text-gray-900 sm:text-2xl dark:text-white "
                        style={{color:"#000"}}
                    >
                        {book?.name}
                    </h2>
                    <div className="flex">
                        <p class="text-black dark:text-gray-400 mt-5 mr-2">
                            Nhà Xuất Bản:
                        </p>
                        <p class="text-blue-500 dark:text-gray-400 mt-5">
                            {book?.publisher}
                        </p>
                    </div>
                    <div className="flex">
                        <p class="text-black dark:text-gray-400 mt-5 mr-2">
                            Tác Giả:
                        </p>
                        <p class="text-blue-500 dark:text-gray-400 mt-5">
                            {book?.author}
                        </p>
                    </div>
                    <div className="flex">
                        <p class="text-black dark:text-gray-400 mt-5 mr-2">
                            Số lượng còn lại:
                        </p>
                        <p class="text-blue-500 dark:text-gray-400 mt-5">
                            {book?.quantity}
                        </p>
                    </div>
                    <div class="flex items-center my-5">
                        <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                        </svg>

                        <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                        </svg>

                        <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                        </svg>

                        <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                        </svg>

                        <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                        </svg>
                        {/* <span className="text-black">{`(${book.book_review} Reviewers)`}</span> */}
                    </div>

                    <a href="#" style={{color:"#393280"}} class="text-3xl font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{book?.price}</a>

                    {/* <div className="flex items center mt-5">
                        <div>
                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">-</button>
                        </div>
                        <input class="w-[50px] h-[40px] border border-gray-200 p-2 rounded mr-2" type="text" placeholder="1" />
                        <div>
                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">+</button>
                        </div>
                    </div> */}
                    
                    <div class="grid grid-cols-4 gap-4 pr-20 mt-10">
                       <div className="col-span-2 flex items-center">
                            <div class="mr-10">
                                <Link to={`/payment/${book?.id}`} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Mua Ngay</Link>
                            </div>
                            <div class="mr-10 mt-1">
                                {!isBuy ?
                                <button onClick={() =>handleBuy(book?.id)} type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Thêm Giỏ Hàng </button>
                                :
                                <button onClick={() => handleBuy(book?.id)} type="button" class="flex items-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-green-300 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    <i class="fa-solid fa-check"></i>
                                </button>
                                }
                            </div>
                       </div>
                       <div className="col-span-2">
                            
                       </div>
                    </div>
                </div>
            </div>

    );
}

export default DetailBook;
