import React, { useEffect, useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { fetchABlog, removeBlog } from '../store/actions/blogAction';
import { putFeelingBlog } from '../service/homeService';
import moment from 'moment';
import { RiUserLine } from 'react-icons/ri'
import { AiOutlineLike, AiOutlineDislike, AiTwotoneDislike, AiTwotoneLike } from 'react-icons/ai'
import '../scss/detailBlog.scss'
import { toast } from 'react-toastify';

const DetailBlog = () => {
    const userId = useSelector((state) => state.user.account._id)
    const detailBlog = useSelector((state) => state.blogs.blog)
    const { slug } = useParams();
    const [blogSlug, id] = slug.split('&');
    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)
    const dispash = useDispatch()
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
        let res = await putFeelingBlog(id, action)
        if (res && res?.success === true) {
            getABlog()
            toast.success(res?.msg)
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
    console.log(like, dislike);
    return (
        <div className='detail-blog'>
            <div className="header">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <Breadcrumb className='new-header'>
                                <NavLink to="/" className="breadcrumb-item">Home</NavLink>
                                <NavLink to="/blogs" className="breadcrumb-item">Blogs</NavLink>
                                <Breadcrumb.Item active>{detailBlog?.title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div>
            <div className='main'>
                <div className='container-xxl'>
                    <div className='row '>
                        <div className='col-9'>
                            {detailBlog !== null &&
                                <div className='content'>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailBlog;