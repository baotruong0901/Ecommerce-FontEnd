import React, { useEffect, useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { fetchABlog, removeBlog } from '../store/actions/blogAction';
import { putFeelingBlog } from '../service/homeService';
import moment from 'moment';
import { RiUserLine } from 'react-icons/ri'
import { AiOutlineLike, AiOutlineDislike, AiTwotoneDislike, AiTwotoneLike } from 'react-icons/ai'
import '../scss/detailBlog.scss'
import { toast } from 'react-toastify';

const DetailBlog = () => {
    const isLogin = useSelector((state) => state?.user?.isLogin)
    const userId = useSelector((state) => state?.user?.account?._id)
    const detailBlog = useSelector((state) => state.blogs.blog)
    const allBlog = useSelector((state) => state.blogs.blogs)
    const { slug } = useParams();
    const [blogSlug, id] = slug.split('&');
    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)
    const [outstanding, setOutstanding] = useState([])
    const [sameTopic, setSameTopic] = useState([])
    const dispash = useDispatch()
    const navigate = useNavigate()
    const getABlog = () => {
        dispash(fetchABlog(id))
    }
    const formattedDate = moment(detailBlog?.createdAt).format('DD/MM/YYYY HH:mm');
    useEffect(() => {
        window.scrollTo(0, 128)
        getABlog()
        return () => {
            dispash(removeBlog())
        }
    }, [slug])
    const handleFeeling = async (action) => {
        if (!isLogin) {
            window.scrollTo(0, 128)
            const returnUrl = window.location.pathname + window.location.search;
            navigate('/login', { state: { returnUrl } });
        } else {
            let res = await putFeelingBlog(id, action)
            if (res && res?.success === true) {
                getABlog()
                toast.success(res?.msg)
            }
        }
    }
    useEffect(() => {
        if (detailBlog?.likes !== undefined) {
            let checkLike = detailBlog?.likes.some(item => item === userId)
            setLike(checkLike)
        }
        if (detailBlog?.dislikes !== undefined) {
            let checkDislike = detailBlog?.dislikes.some(item => item === userId)
            setDislike(checkDislike)
        }

    }, [detailBlog])

    const fetchOutstangdingBlog = () => {
        const outstandingBlog = allBlog.filter(blog => blog?.outstanding === true && blog?._id !== id);
        const sameTopicBlog = allBlog.filter(blog => blog?.topic === detailBlog?.topic && blog?._id !== id && blog?.outstanding === false);
        setOutstanding(outstandingBlog)
        setSameTopic(sameTopicBlog)
    }
    useEffect(() => {
        fetchOutstangdingBlog()
    }, [detailBlog])

    const handleDetailBlog = (blog) => {
        navigate(`/blogs/${blog?.slug}&${blog?._id}`)
    }

    return (
        <div className='detail-blog'>
            <div className="header">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <Breadcrumb className='new-header'>
                                <NavLink to="/" className="breadcrumb-item">Home</NavLink>
                                <Breadcrumb.Item active>{detailBlog?.topic}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div>
            <div className='main'>
                <div className='container-xxl'>
                    <div className='row content'>
                        <div className='col-9'>
                            {detailBlog !== null &&
                                <div className='post'>
                                    <h3 className='title py-3'>{detailBlog?.title}</h3>
                                    <div className='post-date py-2'>
                                        <span>{formattedDate} (GMT+7)</span>
                                        <div className='feeling'>
                                            <div className='like'
                                                onClick={() => handleFeeling("like")}
                                            >
                                                {like === false ?
                                                    <AiOutlineLike size={'20px'} />
                                                    :
                                                    <AiTwotoneLike size={'20px'} />
                                                }

                                                {detailBlog?.likes &&
                                                    <span>{detailBlog?.likes.length}</span>
                                                }
                                            </div>
                                            <div className='dislike'
                                                onClick={() => handleFeeling("dislike")}
                                            >
                                                {dislike === false ?
                                                    <AiOutlineDislike size={'20px'} />
                                                    :
                                                    <AiTwotoneDislike size={'20px'} />
                                                }
                                                {detailBlog?.dislikes &&
                                                    <span>{detailBlog?.dislikes.length}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='description py-2'
                                        dangerouslySetInnerHTML={{
                                            __html: detailBlog?.description,
                                        }}>
                                    </div>
                                    <div className='post-by py-3'>
                                        <RiUserLine /> <span>{detailBlog?.postBy?.firstname} {detailBlog?.postBy?.lastname}</span>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='col-3'>
                            <div className='outstanding'>
                                <h4 className='title'>tin nổi bật</h4>
                                <div className='outstanding-item'>
                                    {outstanding?.map((item, index) => {
                                        return (
                                            <div className='item'
                                                onClick={() => handleDetailBlog(item)}
                                            >
                                                <span className='order'>{index + 1}</span>
                                                <img className='image' src={item?.image[0].url} alt={item?.slug} />
                                                <span className='text-title'>{item?.title}</span>
                                            </div>

                                        )
                                    })}
                                </div>
                            </div>
                            <div className='same-topic'>
                                <h4 className='title'>cùng chuyên mục</h4>
                                <div className='same-topic-item'>
                                    {sameTopic?.map((item, index) => {
                                        return (
                                            <div className='item'
                                                key={`${index}-same-topic`}
                                                onClick={() => handleDetailBlog(item)}
                                            >
                                                <img className='image' src={item?.image[0].url} alt={item?.slug} />
                                                <span className='text-title'>{item?.title}</span>
                                            </div>

                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailBlog;