import React, { useEffect, useState, useRef } from 'react';
import user from '../public/images/user-1.jpeg'
import { useSelector } from 'react-redux';
import { getUser, updateUser } from '../service/homeService';
import { toast } from 'react-toastify'
import '../scss/myProfile.scss'
const Myprofile = () => {

    const userId = useSelector((state) => state?.user?.account?._id)

    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        mobile: "",
        email: ""
    })
    const fetchUser = async () => {
        let res = await getUser(userId)
        if (res && res.success === true) {
            setValues(
                {
                    firstname: res?.data?.firstname,
                    lastname: res?.data?.lastname,
                    mobile: res?.data?.mobile,
                    email: res?.data?.email,
                }
            )
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])

    const changeInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleUpdateUser = async () => {
        // firstnameRef.current.focus();
        let res = await updateUser(values)
        if (res && res.success === true) {
            toast.success(res?.msg)
        }
    }

    return (
        <div className='myprofile'>
            <div className='heading'>
                <h5>My Profile</h5>
                <p>Manage and protect your accont</p>
            </div>
            <div className='main  gap-15'>
                <div className='left'>
                    <form>
                        <div className="mb-3 input">
                            <label className="form-label">Fisrt Name</label>
                            <input
                                value={values?.firstname}
                                name='firstname' type="text"
                                label="Fisrt Name"
                                className="form-control"
                                onChange={(e) => changeInput(e)}
                            />
                        </div>
                        <div className="mb-3 input">
                            <label className="form-label">Last Name</label>
                            <input
                                value={values?.lastname}
                                name='lastname'
                                type="text"
                                className="form-control"
                                onChange={(e) => changeInput(e)}
                            />
                        </div>
                        <div className="mb-3 input">
                            <label for="exampleInputPassword1" className="form-label">Email</label>
                            <input value={values?.email} type="text" className="form-control" disabled />
                        </div>
                        <div className="mb-3 input">
                            <label for="exampleInputPassword1" className="form-label">Mobile</label>
                            <input
                                value={values?.mobile}
                                name='mobile'
                                type="text"
                                className="form-control"
                                onChange={(e) => changeInput(e)}
                            />
                        </div>
                    </form>
                </div>
                <div className='right'>
                    <img src={user} alt='profile' />
                    <label id='select'>Select image</label>
                    <input htmlFor="select" type='file' hidden></input>
                </div>
            </div>
            <div className='mb-3'>
                <button onClick={() => handleUpdateUser()} className='update' type="button">Save</button>
            </div>
        </div>
    );
};

export default Myprofile;