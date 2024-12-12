import { toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie'; // Install with `npm install js-cookie`

export const getAllBook = async (url) => {

    try {
        console.log("Log url: ",url)
        const sessionCookie = Cookies.get("PHPSESSID"); // Get PHPSESSID cookie

        console.log(sessionCookie)
        if (!sessionCookie) {
            // navigate("/login")
            return;
        }

        const response = await fetch(
            url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `PHPSESSID=${sessionCookie}` // Include session cookie in the request

                },
                credentials: "include", // Ensure cookies are included
            }
        );
        // console.log(response)
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data;
        } else {
            console.error("Failed to fetch books");
        }
    } catch (error) {
        
        console.error("Error fetching books:", error);

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
}

export const getBookByID = async (id) => {
    // const navigate = useNavigate()
    try {
        const sessionCookie = Cookies.get("PHPSESSID"); // Get PHPSESSID cookie

        console.log(sessionCookie)
        if (!sessionCookie) {
            // navigate("/login")
            return;
        }
        const response = await fetch(`http://localhost/book/get?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `PHPSESSID=${sessionCookie}` // Include session cookie in the request
            },
            credentials: "include", // Ensure cookies are included
        });

        const data = await response.json();

        if (data.status) {
            console.log("Kết quả trả về",data)
            return data.data[0];
        }
    } catch (error) {
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
}


export const cartOfUser = async () => {
    try {
        const sessionCookie = Cookies.get("PHPSESSID"); // Get PHPSESSID cookie

        console.log(sessionCookie)
        if (!sessionCookie) {
            // navigate("/login")
            return;
        }
        const response = await fetch(`http://localhost/Cart/GetallBook?page=1&perpage=5`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `PHPSESSID=${sessionCookie}` 
            },
            credentials: "include", // Ensure cookies are included
        });

        const data = await response.json();

        console.log("status",data)

        if (data.status) {
            console.log("Kết quả trả về",data)
            return data
        }
    } catch (error) {
        toast.warning('Hình như bạn chưa có đơn hàng', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });  
    }
}


export const getBookComment = async (id) => {
    try {
        const sessionCookie = Cookies.get("PHPSESSID"); // Get PHPSESSID cookie

        console.log(sessionCookie)
        if (!sessionCookie) {
            // navigate("/login")
            return;
        }
        const response = await fetch(`http://localhost/comment/getAll?book_id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `PHPSESSID=${sessionCookie}` // Include session cookie in the request
            },
            credentials: "include", // Ensure cookies are included
        });

        const data = await response.json();

        if (data.status) {
            console.log("Kết quả trả về",data)
            return data
        }

    } catch (error) {
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
}

