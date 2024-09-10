// Helper functions
export const formatUserResponse = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    imgUrl: user.imgUrl,
});

export const formatPostResponse = (post) => ({
    _id: post._id,
    author: post.author,
    caption: post.caption,
    imgURL: post.imgURL,
    isPrivate: post.isPrivate,
    createdAt: post.createdAt,
    likes: post.likes,
    hates: post.hates
});