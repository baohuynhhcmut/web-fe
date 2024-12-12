
import HeaderUser from "../../components/Header user";
import widget from "../../Assert/images/Vector.png"
import { useLocation } from 'react-router-dom';

import {book} from "../../data/book"

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllBook } from "../../services/book.service";
import { toast } from "react-toastify";
import Cookies from "js-cookie"; // Install with `npm install js-cookie`

const BookCard1 = ({img,title,author,price,id}) => {
    return(
        <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="h-56 w-full">
            <Link to={`/book-detail/${id}`}>
                <img class="h-[250px] dark:hidden w-[200px]" src={img} alt="" />
            </Link>
            </div>
            <div class="pt-6">
            <div class="mb-4 flex items-center justify-between gap-4">
                <span class="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"> Up to 35% off </span>

                <div class="flex items-center justify-end gap-1">
                <button type="button" data-tooltip-target="tooltip-quick-look" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only"> Quick look </span>
                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>
                <div id="tooltip-quick-look" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                    Quick look
                    <div class="tooltip-arrow" data-popper-arrow=""></div>
                </div>

                <button type="button" data-tooltip-target="tooltip-add-to-favorites" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only"> Add to Favorites </span>
                    <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                    </svg>
                </button>
                <div id="tooltip-add-to-favorites" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top">
                    Add to favorites
                    <div class="tooltip-arrow" data-popper-arrow=""></div>
                </div>
                </div>
            </div>

            
            <a href="#" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{title}</a>

            <div class="mt-2 flex items-center gap-2">
                <div class="flex items-center">
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
                </div>

            </div>

            <ul class="mt-2 flex items-center gap-4">
                <li class="flex items-center gap-2">
                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{author}</p>
                </li>
            </ul>
            
            <h2
            class="mt-5 text-2xl font-semibold text-orange-500 sm:text-2xl dark:text-white"
          > 
            $ {price}
          </h2>

            </div>
        </div>
    )
}

const filterBooksByCategory = (category,books) => {
    if(category == "all"){
        return books;
    }
    return books.filter(book => book.book_category === category);
};


const Listing = () => {

    // const location = useLocation();
    
    // const queryParams = new URLSearchParams(location.search);

    // const value = queryParams.get('category');

    const [bookData,setBookData] = useState([]) 

    const [selectedOption, setSelectedOption] = useState("");
    // const books = filterBooksByCategory(value,book)

    const [selectedOption1, setSelectedOption1] = useState("");

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const author = queryParams.get("author");

    const genre = queryParams.get("genre");

    useEffect(() =>{
        const getData = async () => {
            try {
                    let apiUrl = "http://localhost/book/getAll?page=1&perpage=5"; // Default API
                    if (author) {
                    apiUrl = `http://localhost/book/getAuthor?page=1&perpage=5&author=${author}`;
                    } else if (genre) {
                    apiUrl = `http://localhost/book/getGenre?genre=${genre}&page=1&perpage=5`;
                    }

                    const response = await getAllBook(apiUrl);
                    setBookData(response?.data);
            } catch (error) {
                toast.warning('Ní ơi, Không có sách bạn mong muốn !', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        getData()
    },[author, genre])

    console.log("Đây là bookdata: ",bookData)

    const handleSelectChange = async (e) => {

        const sessionCookie = Cookies.get("PHPSESSID"); // Get PHPSESSID cookie

        console.log(sessionCookie);
        if (!sessionCookie) {
        // navigate("/login")
        return;
        }

        const sortOption = e.target.value;
        setSelectedOption(sortOption);
    
        try {
          const response = await fetch(
            `http://localhost/book/getAll?page=1&perpage=10&sortField=name&sortOpt=${sortOption}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json", // Đảm bảo gửi dữ liệu ở dạng JSON
                Cookie: `PHPSESSID=${sessionCookie}`,
              },
              credentials: "include",
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            console.log("Fetched Data:", data); 
            setBookData(data?.data);

          } else {
            console.error("Failed to fetch data.");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    

      const handleSelectChange1 = async (e) => {

        const sessionCookie = Cookies.get("PHPSESSID"); // Get PHPSESSID cookie

        console.log(sessionCookie);
        if (!sessionCookie) {
        // navigate("/login")
        return;
        }

        const sortOption = e.target.value;
        setSelectedOption1(sortOption);
    
        try {
          const response = await fetch(
            `http://localhost/book/getAll?page=1&perpage=10&sortField="price"&sortOpt=${sortOption}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json", // Đảm bảo gửi dữ liệu ở dạng JSON
                Cookie: `PHPSESSID=${sessionCookie}`,
              },
              credentials: "include",
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            console.log("Fetched Data:", data); 
            setBookData(data?.data);

          } else {
            console.error("Failed to fetch data.");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };




    return(
        <div className="flex flex-col">
        
            <HeaderUser />

            <div className="bg-pink-100 p-4">
                <h2 className="text-xl text-center" style={{color:"#393280"}}>HOME  /  PRODUCTS</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-between p-5 mt-5">
    {/* Price Filter */}
    <div
        style={{ color: "#393280" }}
        className="flex justify-between items-center px-3 border-b border-solid border-gray-300"
    >
        <span style={{ color: "#393280" }}>Price</span>
        <i className="fa-solid fa-minus"></i>
    </div>

    {/* Alphabetical Sorting */}
    <div
        style={{ color: "#393280" }}
        className="flex justify-between items-center px-3"
    >
        <form className="w-full">
            <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Sắp theo bảng chữ cái
            </label>
            <select
                id="name"
                name="name"
                value={selectedOption}
                onChange={handleSelectChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option value="" disabled>
                    Choose an option
                </option>
                <option value="1">A - Z</option>
                <option value="2">Z - A</option>
            </select>
        </form>
    </div>

    {/* Book Counter */}
    <div
        style={{ color: "#393280" }}
        className="flex justify-between items-center px-3"
    >
        {/* Uncomment if data is available */}
        {/* <span>{`Showing ${books.length} of ${book.length}`}</span> */}
    </div>

    {/* Price Sorting and View Options */}
    <div
        style={{ color: "#393280" }}
        className="flex flex-col sm:flex-row justify-between items-center px-3"
    >
        <div className="w-full sm:w-auto">
            <form>
                <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Sắp theo bảng giá
                </label>
                <select
                    id="price"
                    name="price"
                    value={selectedOption1}
                    onChange={handleSelectChange1}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="" disabled>
                        Choose an option
                    </option>
                    <option value="1">Giá thấp</option>
                    <option value="2">Giá cao</option>
                </select>
            </form>
        </div>
        <div className="flex items-center mt-4 sm:mt-0 sm:ml-4">
            <img src={widget} alt="Widget" className="h-5 w-5" />
            <i className="fa-solid fa-bars text-2xl ml-3"></i>
        </div>
    </div>
</div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-5">
            {/* Sidebar */}
            <div className="col-span-1 p-4 hidden md:block">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <i className="fa-solid fa-dollar-sign mr-2"></i>
                        <input
                            className="w-[80px] border border-gray-200 p-2"
                            type="text"
                            placeholder="Min"
                        />
                    </div>
                    <span>To</span>
                    <div className="flex items-center">
                        <i className="fa-solid fa-dollar-sign mr-2"></i>
                        <input
                            className="w-[80px] border border-gray-200 p-2"
                            type="text"
                            placeholder="Max"
                        />
                    </div>
                </div>

                <div className="w-full mt-5">
                    <button
                        type="button"
                        className="w-full text-white bg-purple-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Filter
                    </button>
                </div>

                <ul>
                    <li className="flex justify-between items-center my-5 border-b border-solid border-gray-300 py-2">
                        <span style={{ color: "#393280" }}>Product type</span>
                        <i className="fa-solid fa-plus"></i>
                    </li>
                    <li className="flex justify-between items-center my-5 border-b border-solid border-gray-300 py-2">
                        <span style={{ color: "#393280" }}>Availability</span>
                        <i className="fa-solid fa-plus"></i>
                    </li>
                    <li className="flex justify-between items-center my-5 border-b border-solid border-gray-300 py-2">
                        <span style={{ color: "#393280" }}>Brand</span>
                        <i className="fa-solid fa-plus"></i>
                    </li>
                    <li className="flex justify-between items-center my-5 border-b border-solid border-gray-300 py-2">
                        <span style={{ color: "#393280" }}>Color</span>
                        <i className="fa-solid fa-plus"></i>
                    </li>
                    <li className="flex justify-between items-center my-5 py-2">
                        <span style={{ color: "#393280" }}>Material</span>
                        <i className="fa-solid fa-plus"></i>
                    </li>
                </ul>
            </div>

            {/* Book Cards */}
            <div className="col-span-1 md:col-span-3 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookData?.map((book) => (
                        <div key={book.id} className="p-4">
                            <BookCard1
                                img={book.image}
                                title={book.name}
                                author={book.author}
                                price={book.price}
                                id={book.id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>  
    )
}

export default Listing