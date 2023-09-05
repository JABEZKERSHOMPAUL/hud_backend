const credentials = require("../model/user")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const register = (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedpassword) => {
        if (err) {
            res.json({ message: err })
        }

        let checkuser = await credentials.findOne({ email: req.body.email })

        if (checkuser) {
            res.json({ message: 'EmailId already exist' })
        }
        else {
            let pdfPath = '';
            if (req.file) {
                pdfPath = req.file.path.replace(/\\/g, '/');

                const filename = req.file ? req.file.originalname : '';
                const url = `http://localhost:8000/uploads/pdfs/${filename}`;// change after deploy



            }
            data = new credentials({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: hashedpassword,
                email: req.body.email,
                age: req.body.age,
                gender: req.body.gender,
                mobile: req.body.mobile,
                pdf: pdfPath
            })


            await data.save().then(() => {
                res.json({
                    status: 1,
                    message: "Registered sucessfully"
                })

            }).catch((error) => {
                res.json({ status: 0, message: `an error ${error}` })
            })
        }
    })
}


const login = async (req, res) => {
    await credentials.findOne({ email: req.body.email }).then((login) => {
        if (login) {
            bcrypt.compare(req.body.password, login.password, (err, result) => {
                if (err) {
                    res.json({ message: err })
                }
                if (result) {
                    let token = jwt.sign({ name: login.username, id: login._id }, "key123")
                    res.json({ status: 1, message: "Login Sucessfully", token })
                }
                else {
                    res.json({ status: 0, message: "user not found" })
                }
            })
        } else {
            res.json({ status: 0, message: "user not found" })
        }
    })
}


const adminLogin = async (req, res) => {

    try {
        const users = await credentials.find({}, '_id firstname lastname email pdf'); // Select the fields you want
        res.json(users);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { register, login, adminLogin }