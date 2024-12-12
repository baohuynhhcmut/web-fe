import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
};

export default function ModalAdd({ open, onClose,setData,dataTitle,id,modalName,urlAdd}) {

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const data = new FormData(e.target); 
    const formObject = Object.fromEntries(data.entries()); 

    console.log("1111",formObject)

    // const newFormObject = {
    // [id]: Math.random().toString(36).substr(2, 9), 
    //   ...formObject, 
    // };

    // setData(prev => [...prev,newFormObject])
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
          const response = await fetch(urlAdd, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  "Cookie": `PHPSESSID=${token}`
              },
              body:JSON.stringify(formObject),
              credentials: "include",
          });
    
          const result = await response.json();
          
          console.log(result)
    
          if (response.ok) {
              toast.success("Thêm sách thành công")
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
    onClose()
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-add-title"
      aria-describedby="modal-add-description"
    >
      <Box sx={style}>
         <div class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-6 overflow-y-auto h-[650px]">
            <div class="flex justify-between items-center border-b pb-4">
              <h2 class="text-xl font-semibold">{modalName}</h2>
              <button class="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9.293l4.646-4.647a1 1 0 011.414 1.414L11.414 10l4.646 4.646a1 1 0 01-1.414 1.414L10 11.414l-4.646 4.646a1 1 0 01-1.414-1.414L8.586 10 3.94 5.354a1 1 0 111.414-1.414L10 9.293z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <form class="space-y-4" onSubmit={handleSubmit} >
              {dataTitle.map((title, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700">{title[0]}</label>
                  <input
                    name={title[1]}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              ))}
              <div class="flex justify-end space-x-4">
                <button class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">Hủy</button>
                <button  type="submit" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Thêm</button>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

