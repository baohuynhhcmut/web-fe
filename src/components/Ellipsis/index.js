import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ModalEdit from '../Modal Edit';
import DeleteModal from '../Modal delete';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";


const options = [
  'Sửa',
  'Xóa',
];

const ITEM_HEIGHT = 48;

export default function LongMenu({dataList,setData,item,id,dataTitle}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

//   Edit
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true)
    handleClose()
  };

  const handleUpdateBook = (itemToUpdate) => {
    console.log(itemToUpdate)
    const updatedList = dataList.map((element) =>
    {
      console.log("element: ",element)
      
      return element["id"] === itemToUpdate["id"] ? itemToUpdate : element
    }
    );
    setData(updatedList); // Cập nhật danh sách sách
  };
  const handleCloseEdit = () => setOpenEdit(false);
// End edit
   
// Remove
const [openDeleted, setOpenDeleted] = React.useState(false);

const deletedBook = async () => {
    const updatedList = dataList.filter((element) => element["id"] !== item["id"]);

    setData(updatedList)

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
        const response = await fetch(`http://localhost/book/delete/${item["id"]}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Cookie": `PHPSESSID=${token}`
            },
            credentials: "include",
        });
  
        const result = await response.json();
        
        console.log(result)
  
        if (response.ok) {
            toast.success("Xóa thành công thành công")
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

    setOpenDeleted(false);
}

const handleOpenDelete = () => {
    setOpenDeleted(true)
    handleClose()
};

const handleCloseDelete = () => setOpenDeleted(false);
// End remove

  return (
    <div>      
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        <MenuItem onClick={handleOpenEdit}>
          <ListItemIcon>
            <EditNoteIcon fontSize="small"  sx={{ color: 'blue' }} />
          </ListItemIcon>
          <ListItemText>Sửa</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleOpenDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small"  sx={{ color: 'red' }} />
          </ListItemIcon>
          <ListItemText>Xóa</ListItemText>
        </MenuItem>
      </Menu>
      
      <ModalEdit open={openEdit}  onClose={handleCloseEdit} dataItem={item} changeBook={handleUpdateBook} dataTitle={dataTitle} />
      <DeleteModal open={openDeleted} onClose={handleCloseDelete} onDelete={deletedBook} /> 
    </div>
  );
}

