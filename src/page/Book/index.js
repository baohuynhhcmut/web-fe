
import React, { useEffect, useState } from "react";
import "./index.css"
import { bookHeader as header,bookData,bookModalAdd } from "../../data/book";
import Table from "../../components/Table";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";


const Book = () => {

    const [data, setData] = React.useState(bookData);

    const [dataBook,setDataBook] = useState([])

    useEffect(()=>{
        const fetchAPI = async () => {
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
                const response = await fetch('http://localhost/book/getAll/1/5/price/1', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Cookie": `PHPSESSID=${token}`
                    },
                    credentials: "include",
                });
        
                const result = await response.json();
                
                console.log(result)

                if (response.ok) {
                    setDataBook(result?.data)
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
        }
        fetchAPI()
    },[])

    return (
        <Table
            Header={header}
            DataRender={dataBook}
            setRender={setDataBook}
            buttonAddName={"Thêm Sách"}
            tableName = {"Danh Sách Sách"}
            modalAdd={bookModalAdd}
            id={"book_id"}
            urlAdd={'http://localhost/book/add'}
            urlDele={'http://localhost/book/delete'}
            urlEdit={'http://localhost/book/update'}
        />
    );
}

export default Book;
