const authMiddleware = (roles = []) => {
  return (req, res, next) => {
      if (req.session.userId) {
          req.user = {
              id: req.session.userId,
              role: req.session.role // Save the role to session
          };

          // Check if user role is in the allowed roles
          if (roles.length && !roles.includes(req.user.role)) {
              return res.status(403).json({ success: false, message: 'Forbidden' });
          }

          next(); // Proceed to the next middleware or route handler
      } else {
          res.status(401).json({ success: false, message: 'Unauthorized' });
      }
  };
};

export default authMiddleware;