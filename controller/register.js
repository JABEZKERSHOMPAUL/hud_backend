const multer = require('multer');
const credentials = require('../model/user');
const bcrypt=require("bcryptjs")

// Configure multer storage for uploaded files
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/pdfs');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename
    },
});

// Create a multer instance for handling file uploads
const upload = multer({
    storage: fileStorage,
}).single('pdf'); // 'pdf' should match the field name in the form data

const handleUpload = (req, res, ) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('Error during file upload:', err);
            return res.status(500).json({ status: 0, message: 'Upload failed' });
        }

        const filename = req.file ? req.file.originalname : '';
        const pdfPath = `http://localhost:8000/uploads/pdfs/${filename}`; // Change after deploy


        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) {
                res.json({ message: err })
            }

            let checkuser = await credentials.findOne({ email: req.body.email })

            if (checkuser) {
                res.json({ message: 'Email-Id already exist' })
            }




            const newUser = new credentials({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: hashedPassword,
                email: req.body.email,
                age: req.body.age,
                gender: req.body.gender,
                mobile: req.body.mobile,
                pdf: pdfPath, // Save the generated URL in the pdf field
            });

            const sucessfully=newUser.save()
            if(sucessfully){
                res.json({ status: 1, message: 'Registered Sucessfully' });
            }else{
                console.log("error in user saving data")
            }
                // .save()
                // .then(() => {
                    
                //      res.json({ status: 1, message: 'Registered Sucessfully' });
                // })
                // .catch((err) => {
                //     console.error('Error saving user and PDF URL to database:', err);
                //     res.status(500).json({ status: 0, message: 'Error saving user and PDF URL to database' });
                // });
        });
    })
}

module.exports = { handleUpload };
