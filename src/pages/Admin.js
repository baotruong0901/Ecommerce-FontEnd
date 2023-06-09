import React, { useState, useEffect } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { AiOutlineDashboard, AiOutlineUser, AiOutlineBgColors } from 'react-icons/ai'
import { GrProductHunt } from 'react-icons/gr'
import { MdAddCard } from 'react-icons/md'
import { TbBrandBooking } from 'react-icons/tb'
import { BiCategory, BiCategoryAlt } from 'react-icons/bi'
import { FaBlog, FaBlogger } from 'react-icons/fa'
import { BsFileText, BsChatSquareQuote } from 'react-icons/bs'
import { IoIosNotifications } from 'react-icons/io'
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import user from '../public/images/user-1.jpeg'
import '../scss/Admin.scss'
import { useSelector } from 'react-redux';
const { Header, Sider, Content } = Layout;
const Admin = () => {
    const navigate = useNavigate()
    const params = useLocation()
    const account = useSelector((state) => state?.user?.account)
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        document.title = 'E-commerce | Dashboard'; // Thay đổi title của trang web
    }, []);


    return (
        <div className='admin-container'>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div onClick={() => navigate("/")} className="logo" >
                        <span className='lg-logo'>E-commerce</span>
                        <span className='sm-logo'>E</span>
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={"dashboard"}
                        onClick={({ key }) => {
                            if (key == "signout") {

                            } else {
                                navigate(key)
                                document.title = `E-commerce | ${key}`; // Thay đổi title của trang web
                            }
                        }}
                        items={[
                            {
                                key: 'dashboard',
                                icon: <AiOutlineDashboard />,
                                label: 'Dashboard',
                            },
                            {
                                key: 'customers',
                                icon: <AiOutlineUser />,
                                label: 'Customers',
                            },
                            {
                                key: 'catalog',
                                icon: <BiCategoryAlt />,
                                label: 'Catalog',
                                children: [
                                    {
                                        key: "add",
                                        icon: <MdAddCard />,
                                        label: "Add"
                                    },
                                    {
                                        key: "product-list",
                                        icon: <GrProductHunt />,
                                        label: "Product List"
                                    },
                                    {
                                        key: "brand-list",
                                        icon: <TbBrandBooking />,
                                        label: "Brand List"
                                    },
                                    {
                                        key: "category-list",
                                        icon: <BiCategory />,
                                        label: "Category List"
                                    },
                                    {
                                        key: "color-list",
                                        icon: <AiOutlineBgColors />,
                                        label: "Color List"
                                    },
                                    {
                                        key: "size-list",
                                        icon: <AiOutlineBgColors />,
                                        label: "Size List"
                                    }
                                ]
                            },
                            {
                                key: 'orders',
                                icon: <BsFileText />,
                                label: 'Orders',
                            },
                            {
                                key: 'blogs',
                                icon: <FaBlogger />,
                                label: 'Blogs',
                                children: [
                                    {
                                        key: 'add-blog',
                                        icon: <MdAddCard />,
                                        label: 'Add Blog',
                                    },
                                    {
                                        key: 'blogs-list',
                                        icon: <FaBlog />,
                                        label: 'Blogs List',
                                    }
                                ]
                            },
                            {
                                key: 'enquiries',
                                icon: <BsChatSquareQuote />,
                                label: 'Enquiries',
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header className='header' style={{ padding: 0, background: "white" }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className='button'
                        />
                        <div className='user gap-10'>
                            <div className='left'>
                                <IoIosNotifications size={'30px'} color={'007bff'} />
                                <span className='badge bg-warning rounded-circle'>3</span>
                            </div>
                            <div className='right'>
                                <img
                                    src={user}
                                    alt='image-user' />
                                <div>
                                    <h6>{account?.firstname}</h6>
                                    <p>{account?.email}</p>
                                </div>
                            </div>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: "white",
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            {/* <div className="admin-content">
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div> */}
        </div>
    )
};

export default Admin;