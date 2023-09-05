const express=require('express')
const { login, register, adminLogin } = require('../controller/user')
const { verify } = require('jsonwebtoken')
const { handleUpload } = require('../controller/register')





const router_user=express.Router()

router_user.route("/login/user").post(adminLogin)
router_user.route("/register/user").post(handleUpload)
router_user.route("/verify/user").post(verify)

module.exports=router_user