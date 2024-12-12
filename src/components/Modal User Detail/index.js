import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function UserInformationDialog({ user,setUser }) {
    const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [modalType, setModalType] = useState('info');
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
});

  useEffect(() => {
    // Gán dữ liệu `user` từ props vào state khi component được render
    if (user) {
      setUserInfo(user);
    }
  }, [user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
        const sessionCookie = Cookies.get('PHPSESSID'); // Lấy cookie từ trình duyệt

        if (!sessionCookie) {
            console.error('Session cookie not found. Please log in again.');
            return;
        }

        const response = await fetch('http://localhost/member/updateInfor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `PHPSESSID=${sessionCookie}` // Gửi cookie trong header
            },
            credentials: 'include', // Đảm bảo gửi cookie cùng yêu cầu
            body: JSON.stringify(userInfo), // Gửi thông tin cập nhật
        });

        const result = await response.json();
        if (response.ok) {

            console.log('Updated user info:', result);

            // setUser(result)

            toast.success(result.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setOpen(false);

        } else {
            console.error('Failed to update user info:', result.message);
            toast.error(result.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        console.error('Error updating user info:', error);
        toast.error('Something went wrong. Please try again.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
};


    const handleRemove =  async () => {
        try {
          const sessionCookie = Cookies.get("PHPSESSID");
    
          if (!sessionCookie) {
            toast.error("Session expired. Please log in again.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            return;
          }
    
          const response = await fetch('http://localhost/member/delete', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Cookie': `PHPSESSID=${sessionCookie}`,
            },
            credentials: 'include',
          });
    
          const result = await response.json();
          
          console.log(result)
          if (response.ok) {

            toast.success("Account deleted successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });

            Cookies.remove('PHPSESSID');
            navigate('/login');
          } else {
            Cookies.remove('PHPSESSID');
            navigate('/login');
            toast.error(`Failed to delete account: ${result.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        } catch (error) {
            Cookies.remove('PHPSESSID');
            navigate('/login');
          toast.error("An error occurred while deleting the account.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      };


      const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Pass cũ với mới không nhau,giỡn quài ní", { autoClose: 3000 });
            return;
        }
       

        try {
            const sessionCookie = Cookies.get('PHPSESSID');
            if (!sessionCookie) {
                toast.error("Session expired. Please log in again.", { autoClose: 3000 });
                return;
            }


            console.log("Con cặc session",sessionCookie)

            const changePass = {
              oldPassword:passwordData.oldPassword,
              newPassword:passwordData.newPassword
            }

            console.log("Con cặc",changePass)

            const response = await fetch('http://localhost/member/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `PHPSESSID=${sessionCookie}`, // Thêm cookie vào header
                },
                credentials: "include",
                body: JSON.stringify(changePass),
            }); 

            const result = await response.json();
            console.log(result)
            if (response.ok) {
                toast.success(result.message || "Password changed successfully!", { autoClose: 3000 });
                setOpen(false);
            } else {
                toast.error(result.message || "Failed to change password.", { autoClose: 3000 });
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.", { autoClose: 3000 });
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
    };


  return (
    <>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleClickOpen}
      >
        <i className="fa-regular fa-user mx-2 font-bold"></i>
        {userInfo?.firstname}
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="user-dialog-title"
        aria-describedby="user-dialog-description"
      >
         <DialogTitle>
            {modalType === 'info' ? "Edit User Information" : "Change Password"}
        </DialogTitle>
        <DialogContent>
        {modalType === 'info' ? <>
          <DialogContentText>
            <form>
              <TextField
                label="First Name"
                name="firstname"
                value={userInfo.firstname || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Name"
                name="lastname"
                value={userInfo.lastname || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Date of Birth"
                name="DOB"
                value={userInfo.DOB || ''}
                onChange={handleChange}
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Phone"
                name="phone"
                value={userInfo.phone || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={userInfo.email || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </form>
          </DialogContentText>
          </>
        :
        <>
            <TextField
                label="Old Password"
                name="oldPassword"
                type="password"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                fullWidth
                margin="normal"
            />
        </>
        }
        </DialogContent>

        
        <DialogActions>
            {modalType === 'info' ?
            <>
                <button
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
            onClick={handleRemove}
          >
            Delete your account
          </button>
          <button
            type="button"
            className="text-white bg-green-400 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
            onClick={() => setModalType("pass")}
          >
            Change pass
          </button>
          <button
            type="button"
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
            </>    
        :
        <>
            <button
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                onClick={handleChangePassword}
            >
            Thay đổi Mật Khẩu
          </button>
          <button
                type="button"
                className="text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                onClick={() => setModalType('info')}
            >
            Thay đổi thông tin
          </button>
        </>
        }
      
        </DialogActions>
      </Dialog>
    </>
  );
}
