const verificarAuth = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization;
      console.log(token);
    } catch (error) {}
  }
  next();
};
export default verificarAuth;
