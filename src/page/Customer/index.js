import React from "react";
import {
  customerData,
  customerHeader as header,
  customerModalAdd,
} from "../../data/customer";
import Table from "../../components/Table";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useState,useEffect } from "react";


const Customer = () => {
  const [data, setData] = React.useState(customerData);

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
                  const response = await fetch('http://localhost/member/getAll/1/5', {
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
                      const transformedData = result?.data?.map((item) => ({
                        id:item.ID,
                        firstname: item.FirstName,
                        lastname: item.LastName,
                        DOB: item.DOB,
                        phone: item.Phone,
                        email: item.Email,
                        username: item.UserName,
                        password: item.Password,
                        role: item.Role
                      }));

                      console.log("ní:",transformedData)

                      setDataBook(transformedData)
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
          buttonAddName={"Thêm Khách Hàng"}
          tableName = {"Danh Sách Khách Hàng"}
          modalAdd={customerModalAdd}
          id={"user_cusId"}
          urlAdd={'http://localhost/member/add'}
          urlDele={'http://localhost/member/delete'}
          urlEdit={'http://localhost/member/update'}
       />
  );
};

export default Customer;

