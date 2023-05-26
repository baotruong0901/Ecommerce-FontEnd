import React from 'react';
import '../../scss/cardBlog.scss'
const CardBlog = (props) => {
    const { slug, title, image, detailBlog } = props
    return (
        <>
            <div
                className="card-blog"
            >
                <div className='card-main'
                    onClick={detailBlog}
                >
                    <img src={image} className="card-img" alt={slug} />
                    <div className="card-body">
                        <div className="card-title">
                            {title}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardBlog;