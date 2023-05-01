import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { Form, Button } from 'react-bootstrap';
import { putReviewProduct, getAProductApi } from '../../service/homeService';
import moment from "moment";
import banner1 from '../../public/images/brand-apple.png'
import '../../scss/comment.scss'
const Comment = (props) => {
    const product = useSelector((state) => state.Product)
    const userId = useSelector((state) => state?.user?.account?._id)
    const { ref } = props
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [getComment, setGetComment] = useState([])

    const upsertReviewProduct = async () => {
        let data = {
            star: rating,
            comment: comment,
            productId: product?._id
        }
        let res = await putReviewProduct(data)
        if (res && res.success === true) {
            fetchAllRating()
        }
    }

    const fetchAllRating = async () => {
        let limit = 5
        let page = 1
        let id = product?._id
        let res = await getAProductApi(limit, page, id)
        if (res && res.success === true) {
            setGetComment(res?.data?.ratings.reverse())
            setComment('')
            setRating(5)
        }
    }

    useEffect(() => {
        fetchAllRating()
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault();
        upsertReviewProduct()
    }

    return (
        <div className='comment'>
            <div className='title'>
                <span>Review Product</span>
            </div>
            <div className='total-comment'>
                <span>Comments({getComment?.length})</span>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className=' star mb-1' controlId="formRating">
                    <ReactStars
                        key={rating}
                        starCount={5}
                        size={16}
                        activeColor="#ffd700"
                        value={rating}
                        onChange={(newStar) => setRating(newStar)}
                    />
                </Form.Group>

                <Form.Group className='mb-2' controlId="formComment">
                    <Form.Control
                        as="textarea"
                        rows={1}
                        value={comment}
                        placeholder='Comment here...'
                        onChange={(e) => setComment(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

                {getComment &&
                    getComment.length > 0 &&
                    getComment.map((item, index) => {
                        return (
                            <div key={`${index}-comment`} className='comment-item'>
                                <div className='top'>
                                    <div className='user-comment'>
                                        <img className='image' src={banner1} alt='comment' />
                                        <div className='review'>
                                            <span className='comment-username'>{item?.postedBy?.firstname}</span>
                                            <ReactStars
                                                key={item?.star}
                                                starCount={5}
                                                size={14}
                                                value={item?.star}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                    </div>
                                    <span className='time'>{item?.postedBy?._id === userId ? moment(Date.now()).format("DD/MM/YY hh:mm:ss") : "yesterday"}</span>
                                </div>
                                <div>
                                    <p className='text-comment'>
                                        {item?.comment}</p>
                                </div>

                            </div>
                        )
                    })}
                {getComment?.length === 0 && <div className='no-comment'>No Comment</div>}
            </Form>
        </div>
    );
};

export default Comment;