export const checkAuth = (req, res, next) => {
    if (req.headers.authorization === "testpassword") {
      next();
    } else {
      const error =  new Error("password sbagliata"); 
      error.statusCode = 401;
      next(error);
    }
  };