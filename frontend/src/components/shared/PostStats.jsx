import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { callHatePost, callLikePost } from "@/apiCall";
import { toast } from "react-hot-toast";

const PostStats = ({ post }) => {
  const { user, dispatch } = useContext(AuthContext);

  const likesList = post.likes ? post.likes.map((user) => user._id) : [];
  const hatesList = post.hates ? post.hates.map((user) => user._id) : [];

  const [likes, setLikes] = useState(likesList);
  const [hates, setHates] = useState(hatesList);
  const [isLiked, setIsLiked] = useState(user?._id ? likes.includes(user._id) : false);
  const [isHated, setIsHated] = useState(user?._id ? hates.includes(user._id) : false);

  useEffect(() => {
    if (post) {
      const updatedLikes = post.likes ? post.likes.map((user) => user._id) : [];
      const updatedHates = post.hates ? post.hates.map((user) => user._id) : [];
      setLikes(updatedLikes);
      setHates(updatedHates);
      setIsLiked(user?._id ? updatedLikes.includes(user._id) : false);
      setIsHated(user?._id ? updatedHates.includes(user._id) : false);
    }
  }, [post, user?._id]);

  const handleLikePost = async (e) => {
    e.stopPropagation();

    try {
      const updatedLikes = isLiked
        ? likes.filter((id) => id !== user._id)
        : [...likes, user._id];

      setLikes(updatedLikes);
      setIsLiked(!isLiked);

      const result = await callLikePost(post._id, dispatch);

      if (result.likes) {
        setLikes(result.likes);
      }

    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleHatePost = async (e) => {
    e.stopPropagation();

    try {
      const updatedHates = isHated
        ? hates.filter((id) => id !== user._id)
        : [...hates, user._id];

      setHates(updatedHates);
      setIsHated(!isHated);

      const result = await callHatePost(post._id, dispatch);

      if (result.hates) {
        setHates(result.hates);
      }
      
    } catch (error) {
      console.error("Error hating post:", error);
      toast.error("Error hating post");
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={isLiked ? "/assets/icon/liked.svg" : "/assets/icon/like.svg"}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        <img
          src={isHated ? "/assets/icon/hated.svg" : "/assets/icon/hate.svg"}
          alt="hate"
          width={20}
          height={20}
          onClick={handleHatePost}
          className="cursor-pointer custom-hate"
        />
        <p className="small-medium lg:base-medium">{hates.length}</p>
      </div>
    </div>
  );
};

export default PostStats;