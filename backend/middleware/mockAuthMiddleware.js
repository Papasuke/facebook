const mockAuthMiddleware = (req, res, next) => {
    req.user = { id: '60d5f4801f1e8b001c8f5d1b' };
    next();
  };
  
module.exports = mockAuthMiddleware;