 const jwt=require('jsonwebtoken')
 async function verifyUser (req, res, next) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res
          .status(401)
          .json({ status: "FAIL", data: "token is required" });
      }
      console.log(token)
      const decode = jwt.verify(token, "hello world");//{ user: 23343AZ3 }
       req.user=decode.user
       next()
    } catch (error) {
      res.status(403).json({ status: "FAIL", data: error.message });
    }
  }

  module.exports=verifyUser