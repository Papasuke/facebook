const authMiddleware = (req, res, next) => {
    if (req.session.userId) {
        req.user = {
            id: req.session.userId,
            role: req.session.role
        };
        next(); // User is authenticated
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;