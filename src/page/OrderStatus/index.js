
import React, { useState,useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import HeaderUser from '../../components/Header user';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";


const columns = [
  {
    title: 'Thứ tự',
    dataIndex: '1',
    key: '1',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Thời gian tạo',
    dataIndex: '2',
    key: '2',
  },
  {
    title: 'Tình trạng',
    key: '3',
    dataIndex: '3',
    render: (tags) => {
        console.log("1",tags)
      // Assign colors based on specific tag values
      let color = 'green'; // Default color
      switch (tags) {
        case 'Pending':
          color = 'gold';
          break;
        case 'Accepted':
          color = 'green';
          break;
        case 'Rejected':
          color = 'red';
          break;
        case 'Canceled':
          color = 'volcano';
          break;
        default:
          color = 'gray'; // Fallback color for unexpected statuses
      }
  
      return (
        <Tag color={color} style={{color:"black",fontSize:"14px"}}>
          {tags}
        </Tag>
      );
    },
  },
  {
    title: 'Địa điểm giao hàng',
    dataIndex: '4',
    key: '4',
  },
  {
    title: 'Tổng tiền',
    dataIndex: '5',
    key: '5',
  },
];


// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];

const OrderStatus = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost/order/getBy", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            });
    
            if (response.ok) {
              const result = await response.json();
              // Transform the data to match the columns
              console.log(result?.data)

              const transformedData = result?.data?.map((item, index) => ({
                key: index + 1,
                "1": item.orderID, // Thứ tự
                "2": item.time_created, // Thời gian tạo
                "3": item.status, // Tình trạng as tags
                "4": item.deliveryAddress, // Địa điểm giao hàng
                "5": parseInt(item.totalPrice).toLocaleString("vi-VN") + " Đ", // Tổng tiền (formatted)
              }));

              setData(transformedData);

              toast.success("Dữ liệu đã được tải thành công!", {
                position: "top-right",
                autoClose: 3000,
              });
            } else {
              toast.error("Không thể tải dữ liệu từ API.", {
                position: "top-right",
                autoClose: 3000,
              });
            }
          } catch (error) {
            console.error("Error:", error);
            toast.error("Có lỗi xảy ra khi tải dữ liệu.", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        };
    
        fetchData();
      }, []);


    return (

        <div className="flex flex-col ">
            <HeaderUser />
            <div className=''>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
}

export default OrderStatus;
