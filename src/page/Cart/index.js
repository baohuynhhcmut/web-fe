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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 bg-gray-100 my-3 p-2">
  {/* Sản phẩm */}
  <div className="p-4 flex flex-col sm:flex-row items-center col-span-1 lg:col-span-2">
    <img
      src={book.image}
      alt={book.name}
      className="mb-4 sm:mb-0 sm:mr-10 h-30 w-40 object-cover"
    />
    <div className="flex flex-col justify-between">
      <p className="text-black text-center sm:text-left">{book.name}</p>
      {/* <p className="text-black text-xs">{book.price}</p> */}
    </div>
  </div>

  {/* Điều chỉnh số lượng */}
  <div className="p-4 flex items-center justify-center">
    <div className="flex items-center mt-5">
      <button
        onClick={() => handleDecre(book.BookID)}
        type="button"
        className="h-10 w-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        -
      </button>
      <input
        className="w-[55px] h-[40px] border border-gray-200 p-2 rounded mr-2 text-center"
        type="text"
        value={`${book.Quantity}/${book.quantity}`}
      />
      <button
        onClick={() => handleIncre(book.BookID)}
        type="button"
        className="w-8 h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        +
      </button>
    </div>
  </div>

  {/* Giá tiền */}
  <div className="p-4 flex items-center justify-center">
    <p className="text-black text-center">{book.price}</p>
  </div>

  {/* Xóa sản phẩm */}
  <div
    className="cursor-pointer p-4 flex items-center justify-center"
    onClick={() => handleRemove(book.BookID)}
  >
    <i className="text-red-600 text-xl fa-solid fa-trash"></i>
  </div>

  {/* Trạng thái */}
  {book.Status === "available" ? (
    <div className="flex items-center justify-center">
      <input
        id={`${book.BookID}`}
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-white border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={(e) =>
          handleCheckBox(
            book?.BookID,
            book?.Quantity,
            e.target.checked,
            book?.image,
            book?.name,
            Number(book?.Quantity) * Number(book?.price)
          )
        }
      />
    </div>
  ) : (
    <div className="flex text-center items-center mb-4 text-gray-500">
      Hết hàng
    </div>
  )}
</div>
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

  <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 lg:grid-cols-5">
    <div className="col-span-1 md:col-span-2 lg:col-span-3 p-4">
      <div className="grid grid-cols-6 gap-2 bg-gray-100">
        <div className="p-2">
          <p className="text-black text-center">Sản phẩm</p>
        </div>
        <div className="p-2">
          <p className="text-black text-center">Tên</p>
        </div>
        <div className="p-2">
          <p className="text-black text-center">Số lượng</p>
        </div>
        <div className="p-2">
          <p className="text-black text-center">Đơn giá</p>
        </div>
        <div className="p-2">
          <p className="text-red-500 text-center">Xóa</p>
        </div>
        <div className="p-2 flex justify-center">Chọn</div>
      </div>

      {userBook &&
        userBook.map((item, index) => (
          <CartItem
            book={item}
            key={index}
            handleRemove={handleRemove}
            handleIncre={handleIncre}
            handleDecre={handleDecre}
            handleCheckBox={handleCheckboxChange}
            selectedBooks={selectedBooks}
          />
        ))}
    </div>

    <div className="col-span-1 md:col-span-1 lg:col-span-2 px-4 py-6">
      <div className="bg-gray-100 p-4">
        <div className="flex justify-between border-b border-gray-300 pb-2">
          <span className="text-blue-300 text-lg">KHUYẾN MÃI</span>
          <span className="text-blue-300 text-sm">Xem thêm</span>
        </div>

        {/* Mã giảm giá */}
        <div className="border-b border-gray-300 my-2">
          <div className="flex justify-between p-2">
            <span className="font-bold text-black">MÃ GIẢM 20%</span>
            <span className="text-blue-300 text-sm">Chi tiết</span>
          </div>
          <p className="text-xs text-black px-2">
            Cho đơn hàng từ 720K - Không áp dụng cho Phiếu Quà Tặng - Hiệu lực
            ngày 20.12.2022 - 27.12.2022
          </p>
          <div className="flex justify-between items-center p-2">
            <div className="w-2/3">
              <div className="h-3 bg-blue-300 rounded-full"></div>
              <p className="text-xs text-gray-700 mt-1">
                Mua thêm 300.000 Đ để nhận mã
              </p>
            </div>
            <button
              type="button"
              className="w-32 bg-blue-800 text-white text-sm rounded-lg p-2"
            >
              Mua Thêm
            </button>
          </div>
        </div>

        {/* Mã miễn phí giao hàng */}
        <div className="border-b border-gray-300 my-2">
          <div className="flex justify-between p-2">
            <span className="font-bold text-black">MÃ MIỄN PHÍ GIAO HÀNG</span>
            <span className="text-blue-300 text-sm">Chi tiết</span>
          </div>
          <p className="text-xs text-black px-2">
            Cho đơn hàng từ 500K - Không áp dụng cho Phiếu Quà Tặng - Hiệu lực
            ngày 21.12.2022
          </p>
          <div className="flex justify-between items-center p-2">
            <div className="w-2/3">
              <div className="h-3 bg-blue-300 rounded-full"></div>
              <p className="text-xs text-gray-700 mt-1">
                Đã thỏa mãn điều kiện áp dụng
              </p>
            </div>
            <button
              type="button"
              className="w-32 bg-blue-800 text-white text-sm rounded-lg p-2"
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>

      {/* Thanh toán */}
      <div className="bg-gray-100 mt-4 p-4">
        <div className="flex justify-between border-b border-gray-300 pb-2">
          <span className="text-gray-700 text-lg">Chuyển thành đơn hàng</span>
        </div>
        <button
          onClick={handleGetSelectedBooks}
          type="button"
          className="w-full bg-blue-800 text-white text-lg rounded-lg p-3 mt-4"
        >
          THANH TOÁN
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default Cart;
