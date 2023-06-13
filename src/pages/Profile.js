import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet, Link, useParams } from 'react-router-dom';
import { CgLogOut } from "react-icons/cg"
import { TbClipboardText } from "react-icons/tb"
import { AiOutlineUser } from "react-icons/ai"
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/userActions';
import '../scss/profile.scss'
const Profile = () => {

    const dispash = useDispatch()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const { type } = useParams()

    useEffect(() => {
        document.title = "Profile"; // Thay đổi title của trang web
    }, []);

    const handleLogout = async () => {
        await dispash(logout())
        navigate("/login")
    }
    const handleShow = () => {
        setShow(true)
    }
    return (
        <div className='profile py-3 py-md-4'>
            {/* <div className='header mb-5'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <Breadcrumb className='container new-header d-flex justify-content-center mt-2 mb-3'>
                                <NavLink to="/" className="breadcrumb-item">Home</NavLink>
                                <Breadcrumb.Item active>{
                                    location.pathname === "/user/change-password" && "Change Password" ||
                                    location.pathname === "/user/account" && "Profile" ||
                                    location.pathname === "/user/purchase/type=ALL" && "Purchase"
                                    || location.pathname === "/user/purchase/type=CONFIRM" && "Purchase"
                                    || location.pathname === "/user/purchase/type=RECEIVE" && "Purchase"
                                    || location.pathname === "/user/purchase/type=CANCELLED" && "Purchase"
                                    || location.pathname === "/user/purchase/type=COMPLETED" && "Purchase"
                                }</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='profile-main'>
                <div className='container-xxl'>
                    <div className='profile-item row d-flex'>
                        <div className='left col-12 col-lg-2'>
                            <div className='menu-links'>
                                <Link onClick={handleShow} className='nav-link' to="account"><AiOutlineUser size={"24px"} color={'4267b2'} /><span className="px-2"> My Account</span> </Link>
                                {show === true &&
                                    <div className='sub-menu'>
                                        <NavLink end className='nav-link' to="account"><span className="px-2"> Profile</span> </NavLink>
                                        <NavLink end className='nav-link' to="change-password"><span className="px-2"> Change Password</span> </NavLink>
                                    </div>
                                }
                                <NavLink onClick={() => setShow(false)} end className='nav-link' to={`purchase/${type === undefined ? "type=ALL" : type}`}><TbClipboardText size={"24px"} /><span className="px-2"> My Purchase</span> </NavLink>
                                <Link onClick={() => handleLogout()} className='nav-link'><CgLogOut size={"24px"} />
                                    <span className='px-2'>Log Out</span>
                                </Link>
                            </div>
                        </div>
                        <div className='right col-12 col-lg-10'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Profile;