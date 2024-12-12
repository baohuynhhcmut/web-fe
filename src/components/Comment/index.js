import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from 'antd';
const { TextArea } = Input;
// import { toast } from "react-toastify";

const UserCommet = ({comment}) => {
    return(
        <>
        <div className="col-span-1 p-4">
      <p className="text-xl">{comment?.Fullname}</p>
      <p className="text-gray-500">{comment.Time}</p>
    </div>

    {/* Second div (spans 3 columns) */}
    <div className="col-span-3">
        <div class="flex items-center my-5">
            <svg class="h-8 w-8 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
            </svg>

        </div>
        <span className="text-xs text-black">
        {comment?.Content}
        </span>
    </div>
        </>
    )
}


const Comment = () => {

    const { id } = useParams();
    const [comments, setComments] = useState([]);
    console.log(id)

    const [isWrite,setIsWrite] = useState(false)

    const [commentValue, setCommentValue] = useState("");

    const handleSendComment = async () => {
        const token = Cookies.get('PHPSESSID'); // Get the token from cookies

        if (!commentValue.trim()) {
            toast.error("Không được để trống nội dung", {
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

        try {
            const response = await fetch("http://localhost/comment/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `PHPSESSID=${token}`, // Pass the token in the headers
                },
                credentials: 'include',
                body: JSON.stringify({ 
                    book_id:id,   
                    content: commentValue 
                }), // Pass the comment value
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Gửi bình luận thành công", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setCommentValue("");
                setIsWrite(false)
            } else {
                toast.error("Đã có lỗi xảy ra", {
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
            toast.error(error, {
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


    useEffect(() => {
        const token = Cookies.get('PHPSESSID'); // Get the token from cookies
    
        const fetchComments = async () => {
          try {
            const response = await fetch(`http://localhost/comment/getAll?book_id=${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Cookie': `PHPSESSID=${token}`, // Pass the token in the headers
              },
              credentials: 'include', // Include credentials for cookies
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch comments');
            }
    
            const data = await response.json(); // Parse JSON response
            setComments(data?.data); // Update comments state
          } catch (error) {
            console.error('Error fetching comments:', error);
          } 
        }
        fetchComments();
      }, [id]);
      
    
    return (
        <div className="grid grid-cols-6 mt-5 ">
  {/* First empty div (occupies 2 columns) */}
  <div className="col-span-1"></div>

  {/* Content div (occupies 2 columns) */}
  <div className="col-span-4 pl-10">
  {/* Title */}
  <div className="p-3 bg-blue-500 w-full">
    <h2 className="text-2xl text-white">Đánh Giá</h2>
  </div>
    
 {!isWrite ?
<>
  <div className="p-3  w-full flex items-center">
    <h2 className="text-2xl text-black mr-5">4.0/5</h2>
    <div class="flex items-center mr-10">
            <svg class="h-8 w-8 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
            </svg>

        </div>
        <button onClick={()=> setIsWrite(true)} type="button" class="mt-1 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
            <i class="fa-solid fa-pen mr-2"></i>
            Viết Đánh Giá
        </button>
  </div>

  
    
    <div className="grid grid-cols-4 gap-4 my-10">
        {comments?.map((item,index)=>{
            return(
                <UserCommet comment={item} />
            )
        })}
    </div>

    </>
    :
  <>
    <div className="grid grid-cols-4 gap-4 my-10">
            <textarea
                rows={10}
                className="w-full col-span-4 border rounded-md p-2"
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder="Nhập nội dung bình luận..."
            />
            <button
                className="rounded-md p-3 bg-green-500 text-white hover:bg-green-700"
                onClick={handleSendComment}
            >
                Gửi
            </button>
        </div>
  </>
  }
  

  {/* You can add more rows below if needed */}
</div>



  {/* Third empty div (occupies 2 columns) */}
  <div className="col-span-1"></div>
</div>
    );
}

export default Comment;
