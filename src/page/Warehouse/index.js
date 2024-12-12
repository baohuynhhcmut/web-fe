import React from 'react';
import { wareHouseData,wareHouseHeader as header,wareHouseModal } from '../../data/warehouse';
import Table from '../../components/Table';
import { toast } from "react-toastify";
import { useEffect,useState } from 'react';
import Cookies from 'js-cookie';


const WareHouse = () => {
    const [data, setData] = React.useState(wareHouseData);

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
                        const response = await fetch('http://localhost/stock/getAll/1/5', {
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
            buttonAddName={"Thêm Tồn Khoa"}
            tableName = {"Danh Sách Tồn Kho"}
            modalAdd={wareHouseModal}
            id={"book_id"}
    />
    );
}

export default WareHouse;
