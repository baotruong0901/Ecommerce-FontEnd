import React, { useEffect } from 'react';
import { MdOutlineDone } from 'react-icons/md'
import "../scss/bookingSuccedd.scss"
import { useNavigate, useParams } from 'react-router-dom';
const BookingSuccedd = () => {
    const navigate = useNavigate()
    const param = useParams()
    const bookingId = param?.state?.split('&')[1]
    useEffect(() => {
        document.title = 'E-commerce | mua hàng online'; // Thay đổi title của trang web
    }, []);

    const handleContinute = () => {
        navigate('/our-store/all')
    }


    const handleDetailBooking = () => {
        navigate(`/detail-booking/${bookingId}`)
    }
    return (
        <div className='booking-success'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='main'>
                            <span className='icon-done mb-1'><MdOutlineDone className="custom" /></span>
                            <span className='title mb-3'>Đặt hàng thành công!</span>
                            <span className='text mb-4'>Chúng tôi sẽ liên hệ Quý khách để xác nhận đơn hàng trong thời gian sớm nhất!</span>
                            <div className='button'>
                                <button onClick={() => handleDetailBooking()} className='detail-booking btn'>Xem chi tiết đơn hàng</button>
                                <button onClick={() => handleContinute()} className='continue btn'>Tiếp tục mua hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccedd;