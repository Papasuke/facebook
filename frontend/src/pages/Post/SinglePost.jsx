import React from "react";

const Post = ({ content, author }) => {
    return (
        <div className="post">
            <p>{content}</p>
            <small>by {author}</small>
        </div>
    );
};

export default Post;