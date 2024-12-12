

import React from 'react';
import { invoiceData ,invoiceHeader as header,invoiceModal } from '../../data/invoice';
import Table from "../../components/Table";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useEffect,useState } from 'react';

const Invoice = () => {
    const [data, setData] = React.useState(invoiceData);
    
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
                    const response = await fetch('http://localhost/order/getAll/1/5/0/0/0', {
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
            setRender={setData}
            buttonAddName={"Thêm Hóa Đơn"}
            tableName = {"Danh Sách Hóa Đơn"}
            modalAdd={invoiceModal}
            id={"invoice_id"}
            // urlEdit={'http://localhost/order/update'}
        />
    );
}

export default Invoice;
