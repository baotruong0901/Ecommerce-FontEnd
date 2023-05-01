import React, { useState } from 'react';
import Input from './Input';
import { changePasswordApi } from '../service/homeService';
import { toast } from 'react-toastify'
import '../scss/changePassword.scss'
import { useNavigate } from 'react-router-dom';
const ChangePassword = () => {
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleChangePassword = async (e) => {
        e.preventDefault()
        let res = await changePasswordApi({ password })
        if (res && res.success === true) {
            navigate("/user/account")
            toast.success(res.msg)
        } else {
            toast.error(res.msg)
        }
    }
    return (
        <div className='change-password'>
            <div className='heading'>
                <h5>Change Password</h5>
                <p>For your account's security, do not share your password with anyone else</p>
            </div>
            <form className='col-6'>
                <Input
                    label='New password'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    pattern="^[A-Za-z0-9]{6,20}$"
                    errorMessage="Password should be 6-20 characters!"
                />
                <button className='mt-2' type='submit' onClick={(e) => handleChangePassword(e)} >Confirm</button>
            </form>
        </div >
    );
};

export default ChangePassword;