const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pdb = require("../../db_init/dbConn").pdb;

// import token generator
// const generateToken = require("../../middlewares/token").generateToken;


router.post("/login", async (req, res, next) => {
  try {
    const query = "select * from users where moodleid=${moodleid}";
    pdb
      .any(query, { moodleid: req.body.moodleid })
      .then((result) => {
        if (result.length === 0) {
          throw {
            statusCode: 404,
            customMessage: "No user found",
          };
        } else if (!bcrypt.compareSync(req.body.password, result[0].password)) {
          throw {
            statusCode: 404,
            customMessage: "Invalid email id and password",
          };
        } else {
          let data = result[0];  
          // const token = generateToken({
          //   ...data,
          // });
          res.status(200).json({
            status: 200,
            role: data.role,
            message: "Logged in succcessfully",
            // token: `Bearer ${token}`,
          });
        }
        console.log(result);
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

/*url params 

router.get("/:id", (req,res,next)=>{
  let id = req.params.id
})

*/
