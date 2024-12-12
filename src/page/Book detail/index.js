
import HeaderUser from "../../components/Header user";
import DetailBook from "../../components/Book detail";
import MoreDetail from "../../components/More detail/index.";
import Comment from "../../components/Comment";
import { useParams } from 'react-router-dom';
import {book} from "../../data/book"
import { getBookByID } from "../../services/book.service";
import { useEffect, useState } from "react";

const filterBooksByID = (id,books) => {
    return books.filter(book => book.book_id === id);
};

const BookDetail = () => {

    const { id } = useParams();
    const bookDetail = filterBooksByID(id,book)[0]
    const [detail,setDetail] = useState(null)
    // console.log(bookDetail)

    useEffect(()=>{
        const getBookDetailData = async () => {
            try {
                const data = await getBookByID(id)
                setDetail(data)
            } catch (error) {
                console.log(error)
            }
        }
        getBookDetailData()
    },[])

    console.log("Detail",detail)

    return (
        <div className="flex flex-col ">
            <HeaderUser  />

            <DetailBook book={detail}/>

            <MoreDetail book={detail} />

            <Comment />
        </div>
    );
}

export default BookDetail;
