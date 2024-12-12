import HeaderUser from "../../components/Header user";
import image1 from "../../Assert/image books/cart1.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Wrapper App";
import { clientCart } from "../../data/customer";
import { book } from "../../data/book";
import Cookies from "js-cookie"; // Install with `npm install js-cookie`

import getBooksFromCart from "../../utils/GetBook";
import { useEffect, useState } from "react";
import { cartOfUser } from "../../services/book.service";

import { toast } from "react-toastify";

const getCartById = (userId) => {
  // Find the cart by ID
  const userCart = clientCart.find((cart) => cart.id === userId);
  return userCart ? userCart : null; // Return the cart if found, or null if not found
};

const calculateTotalPrice = (books) => {
  return books.reduce((total, book) => {
    const price = parseFloat(book.book_price.replace("$", "").replace(" ", ""));
    return total + price * book.quantity;
  }, 0);
};


const CartItem = ({
  book,
  handleRemove,
  handleIncre,
  handleDecre,
  handleCheckBox,
  selectedBooks
}) => {

    console.log("hehee",book.Status)
  return (
    <>
      <div className="grid grid-cols-6 gap-4 bg-gray-100 my-3">
        <div className="p-4 flex col-span-2">
          <img src={book.image} className="mr-10 h-30 w-40" />
          <div className="flex flex-col justify-between">
            <p className="text-black flex items-center my-auto">{book.name}</p>
            {/* <p className="text-black text-xs">{book.price}</p> */}
          </div>
        </div>

        <div className=" p-4 flex items-center justify-center">
          <div className="flex items center mt-5">
            <div>
              <button
                onClick={() => handleDecre(book.BookID)}
                type="button"
                class="h-10 w-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                -
              </button>
            </div>
            <input
              class="w-[55px] h-[40px] border border-gray-200 p-2 rounded mr-2"
              type="text"
              value={`${book.Quantity}/${book.quantity}`}
            />
            <div>
              <button
                onClick={() => handleIncre(book.BookID)}
                type="button"
                class="w-8 h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className=" p-4 flex items-center justify-center">
          <p className="text-black text-center">{book.price}</p>
        </div>

        <div
          className="cursor-pointer p-4 flex items-center justify-center"
          onClick={() => handleRemove(book.BookID)}
        >
          <i class="text-red-600 text-xl fa-solid fa-trash"></i>
        </div>

        {book.Status === "available" 
        ?
            <div className="flex  items-center justify-center">
            <input
            id={`${book.BookID}`}
            type="checkbox"
            // checked={() => {selectedBooks.some((item) => item.BookID === book.BookID)}}
            class="w-4 h-4 text-blue-600 bg-white border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={(e) => handleCheckBox(book?.BookID,book?.Quantity,e.target.checked,book?.image,book?.name,Number(book?.Quantity) * Number(book?.price))}
            />
        </div>
      :
      <>
        <div class="flex text-center items-center mb-4">
            Hết hàng
        </div>
      </>
    }
       

      </div>
    </>
  );
};
 
const Cart = () => {
  const [userBook, setUserBook] = useState([]);

  const [selectedBooks, setSelectedBooks] = useState([]);

  const [isAllSelected, setIsAllSelected] = useState(false); // All selected state

    const {setCart} = useAuth()

    const navigate = useNavigate()

    // const handleCheckboxChange = (BookID, quantity, isChecked) => {
    //     if (isChecked) {
    //       setSelectedBooks((prev) => [...prev, { BookID, Quantity: quantity }]);
    //     } else {
    //       setSelectedBooks((prev) => prev.filter((item) => item.bookID !== BookID));
    //     }
    //   };


    const handleSelectAll = (isChecked) => {
        setIsAllSelected(isChecked); // Update the state for the "Select All" checkbox
      
        if (isChecked) {
          // Select all items and calculate total prices
          const allBooks = userBook.map((book) => ({
            BookID: book.BookID,
            Quantity: book.Quantity,
            image: book.image,
            name: book.name,
            totalPrice: Number(book.Quantity) * Number(book.price),
          }));
          setSelectedBooks(allBooks); // Update the selectedBooks state with all books
        } else {
          // Deselect all items
          setSelectedBooks([]);
        }
      };


      const handleCheckboxChange = (BookID, Quantity, isChecked, image, name, totalPrice) => {
        if (isChecked) {
          setSelectedBooks((prev) => [
            ...prev,
            {
              BookID,
              Quantity,
              image,
              name,
              totalPrice,
            },
          ]);
        } else {
          setSelectedBooks((prev) => prev.filter((item) => item.bookID !== BookID));
        }
      };


  const handleGetSelectedBooks = () => {
    console.log("Selected Book IDs:", selectedBooks);
    

    setCart(selectedBooks)

    
    navigate("/payment")
    
  };

  useEffect(() => {
    const getData = async () => {
      const respone = await cartOfUser();
      setUserBook(respone?.data);
    };
    getData();
  }, []);

    console.log("Di vu",userBook)  

  const handleIncre = (id) => {
    const sessionCookie = Cookies.get("PHPSESSID"); // Get PHPSESSID cookie

    console.log(sessionCookie);
    if (!sessionCookie) {
      // navigate("/login")
      return;
    }

    const getCurrentQuantity = (id) => {
      const book = userBook?.find((book) => book.BookID === id);
      return book ? Number(book.Quantity) : 0; // Chuyển Quantity thành số, hoặc trả về 0 nếu không tìm thấy
    };

    const maxQuantity = (id) => {
      const book = userBook?.find((book) => book.BookID === id);
      return book ? Number(book.quantity) : 0;
    };
    const currQuantity = getCurrentQuantity(id);

    const max = maxQuantity(id);

    // console.log(currQuantity,max)
    if (currQuantity >= max) {
      toast.error("Vượt quá số lượng max", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    fetch("http://localhost/Cart/updateQuantity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Đảm bảo gửi dữ liệu ở dạng JSON
        Cookie: `PHPSESSID=${sessionCookie}`,
      },
      body: JSON.stringify({
        book_id: id,
        quantity: currQuantity + 1,
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        setUserBook((prevBooks) =>
          prevBooks?.map((book) =>
            book.BookID === id
              ? { ...book, Quantity: Number(book.Quantity) + 1 }
              : book
          )
        );

        setSelectedBooks((prevSelected) =>
            prevSelected.map((item) =>
              item.BookID === id
                ? {
                    ...item,
                    Quantity: item.Quantity + 1,
                    totalPrice: (item.Quantity + 1) * Number(userBook.find(b => b.BookID === id)?.price || 0),
                  }
                : item
            )
          );


        // Hiển thị thông báo thành công
        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.error("Error:", error); // Xử lý lỗi nếu có

        // Hiển thị thông báo lỗi
        toast.warning("Chưa có đơn hàng", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleDecre = (id) => {
    const sessionCookie = Cookies.get("PHPSESSID"); // Get PHPSESSID cookie

    console.log(sessionCookie);
    if (!sessionCookie) {
      // navigate("/login")
      return;
    }

    const getCurrentQuantity = (id) => {
      const book = userBook?.find((book) => book.BookID === id);
      return book ? Number(book.Quantity) : 0; // Chuyển Quantity thành số, hoặc trả về 0 nếu không tìm thấy
    };

    const currQuantity = getCurrentQuantity(id);

    // console.log(currQuantity,max)
    if (currQuantity == 1) {
      toast.error("Số lượng tối thiểu", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    fetch("http://localhost/Cart/updateQuantity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Đảm bảo gửi dữ liệu ở dạng JSON
        Cookie: `PHPSESSID=${sessionCookie}`,
      },
      body: JSON.stringify({
        book_id: id,
        quantity: currQuantity - 1,
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        setUserBook((prevBooks) =>
          prevBooks?.map((book) =>
            book.BookID === id
              ? { ...book, Quantity: Number(book.Quantity) - 1 }
              : book
          )
        );

         setSelectedBooks((prevSelected) =>
        prevSelected.map((item) =>
          item.BookID === id
            ? {
                ...item,
                Quantity: item.Quantity - 1,
                totalPrice: (item.Quantity - 1) * Number(userBook.find(b => b.BookID === id)?.price || 0),
              }
            : item
        )
      );

        // Hiển thị thông báo thành công
        toast.success("Giảm số lượng thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.error("Error:", error); // Xử lý lỗi nếu có

        // Hiển thị thông báo lỗi
        toast.error(error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  // console.log("22",userBook)

  const handleRemove = (id) => {
    const sessionCookie = Cookies.get("PHPSESSID"); // Get PHPSESSID cookie

    console.log(sessionCookie);
    if (!sessionCookie) {
      // navigate("/login")
      return;
    }

    fetch("http://localhost/Cart/deletebook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Đảm bảo gửi dữ liệu ở dạng JSON
        Cookie: `PHPSESSID=${sessionCookie}`,
      },
      body: JSON.stringify({ book_id: id }), // Dữ liệu gửi đi
      credentials: "include", // Bao gồm thông tin xác thực
    })
      .then((response) => response.json()) // Chuyển đổi phản hồi sang JSON
      .then((data) => {
        console.log("Success:", data);

        setUserBook((prevBooks) => prevBooks?.filter((book) => book.id !== id));

        // Hiển thị thông báo thành công
        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.error("Error:", error); // Xử lý lỗi nếu có

        // Hiển thị thông báo lỗi
        toast.error(error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="flex flex-col ">
      <HeaderUser />

      <div className="grid grid-cols-5 gap-4 mt-5 ">
        <div className="col-span-3 p-4">
          <div className="grid grid-cols-6 gap-4 bg-gray-100">
            <div className=" p-4">
              <p className="text-black text-center">Sản phẩm</p>
            </div>
            <div className=" p-4">
              <p className="text-black text-center">Tên</p>
            </div>
            <div className=" p-4">
              <p className="text-black text-center">Số lượng</p>
            </div>

            <div className=" p-4">
              <p className="text-black text-center">Đơn giá</p>
            </div>

            <div className=" p-4">
              <p className="text-red-500 text-center">Xóa</p>
            </div>

            <div className=" p-4 flex justify-center">
              {/* <input
                id="click-all"
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                class="w-4 h-4 text-blue-600 bg-white border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              /> */}
              Chọn
            </div>
          </div>

          {userBook &&
            userBook?.map((item, index) => {
              console.log(item);
              return (
                <CartItem
                  book={item}
                  key={index}
                  handleRemove={handleRemove}
                  handleIncre={handleIncre}
                  handleDecre={handleDecre}
                  handleCheckBox={handleCheckboxChange}
                  selectedBooks={selectedBooks}
                />
              );
            })}
        </div>

        <div className="col-span-2  px-16 py-10">
          <div className="bg-gray-100">
            <div className="flex justify-between p-2 border-b border-gray-300">
              <span className="text-blue-300 text-xl">KHUYẾN MÃI</span>
              <span className="text-blue-300 ">Xem thêm </span>
            </div>

            <div className="border-b border-gray-300">
              <div className="flex justify-between p-3">
                <span className="text-black font-bold">MÃ GIẢM 20%</span>
                <span className="text-blue-300 ">Chi tiết</span>
              </div>
              <div className="flex justify-between p-3">
                <span className="text-xs text-black w-1/2">
                  Cho đơn hàng từ 720K - Không áp dụng cho Phiếu Quà Tặng - Hiệu
                  lực ngày 20.12.2022 - 27.12.2022
                </span>
              </div>
              <div className="flex justify-between p-3">
                <div className="w-full pr-10">
                  <div className="px-2 bg-blue-300 w-full h-3"></div>
                  <span className="text-xs text-gray-700">
                    Mua thêm 300.000 Đ để nhận mã
                  </span>
                </div>
                <div>
                  <button
                    type="button"
                    class="w-40  text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Mua Thêm
                  </button>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-300">
              <div className="flex justify-between p-3">
                <span className="text-black font-bold">
                  MÃ MIỄN PHÍ GIAO HÀNG
                </span>
                <span className="text-blue-300 ">Chi tiết</span>
              </div>
              <div className="flex justify-between p-3">
                <span className="text-xs text-black w-1/2">
                  Cho đơn hàng từ 500K - Không áp dụng cho Phiếu Quà Tặng - Hiệu
                  lực ngày 21.12.2022
                </span>
              </div>
              <div className="flex justify-between p-3">
                <div className="w-full pr-10">
                  <div className="px-2 bg-blue-300 w-full h-3"></div>
                  <span className="text-xs text-gray-700">
                    Đã thỏa mãn điều kiện áp dụng
                  </span>
                </div>
                <div>
                  <button
                    type="button"
                    class="w-40  text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 mt-10 p-4">
            <div className="flex justify-between p-2 border-b border-gray-300">
              <span className="text-gray-700 text-xl">Chuyển thành đơn hàng</span>
              {/* <span className="text-gray-700 ">{`${totalPrice} $`} </span> */}
            </div>
            <div className="flex justify-between p-2 ">
              {/* <span className="text-black text-xl">Tổng số tiền (gồm VAT)</span> */}
              {/* <span className="text-black text-xl">{`${totalPrice} $`}  </span> */}
            </div>
            <button
                onClick={handleGetSelectedBooks}
              type="button"
              class="w-full text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              THANH TOÁN
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-10">
        {/* First div (spans 1 column) */}
        <div className="col-span-1 p-4"></div>

        {/* Second div (spans 3 columns) */}
        <div className="col-span-3 bg-gray-100 p-4">
          <h2 className="text-black text-xl border-b border-gray-300 font-bold p-2">
            MÃ KHUYẾN MÃI/MÃ QUÀ TẶNG
          </h2>
          <div className="flex items-center">
            <h2 className="text-black  p-2">MÃ KHUYẾN MÃI/MÃ QUÀ TẶNG</h2>
            <form class="w-full">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nhập mã khuyến mãi/quà tặng"
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Áp dụng
                </button>
              </div>
            </form>
            <h2 className="text-blue-500 underline  p-2">Chọn mã khuyến mãi</h2>
          </div>
          <p className="text-center text-gray-500">
            Có thể áp dụng đồng thời nhiều mã
          </p>
        </div>

        <div className="col-span-1  p-4"></div>
      </div>
    </div>
  );
};

export default Cart;
