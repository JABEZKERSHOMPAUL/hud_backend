
// // const multer = require('multer');
// // const credentials = require('../model/user');

// // const fileStorage = multer.diskStorage({
// //   destination: (req, res, cb) => {
// //     cb(null, './uploads');
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, file.originalname); /// 1234567897654--screenshot08.png // /uploads/image/
// //   },
// // });

// // const uploaded= multer({
// //   storage: fileStorage,
// // }).single('pdf');

// // const upload = async (req, res) => {
// //   console.log(req.files);
// //   uploaded(req, res, (err) => {
// //     if (err) {
// //       console.log(err);
// //     } else {
// //       let image;
// //       console.log(req.file);
// //       if (req.file) {
// //         image = req.file.path.replace(/\\/g, '/');
// //       }

// //       const newImage = new credentials({
// //         image,
// //       });

// //       newImage
// //         .save()
// //         .then(() => {
// //           res.json({ status:1,message: 'Uploaded & saved' });
// //         })
// //         .catch((err) => {
// //           console.log(err);
// //         });
// //     }
// //   });
// // };

// // module.exports = { upload };









// const multer = require('multer');
// const credentials = require('../model/user');

// // Configure multer storage for uploaded files
// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads/pdfs');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // Use the original filename
//   },
// });

// // Create a multer instance for handling file uploads
// const upload = multer({
//   storage: fileStorage,
// }).single('pdf'); // 'pdf' should match the field name in the form data

// const handleUpload = (req, res,next) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.error('Error during file upload:', err);
//       return res.status(500).json({ status: 0, message: 'Upload failed' });
//     }

//     // // const image = req.file ? req.file.path.replace(/\\/g, '/') : '';
//     // const filename = req.file ? req.file.originalname : '';
//     // const url = `http://localhost:8000/uploads/pdfs/${filename}`;// change after deploy
//     //   // const newImage = new credentials({
//     //   //   image,
//     //   // });

//     //   const newImage = new credentials({
//     //     pdf: url, // Save the generated URL in the database
//     //   });

   
//       .then(() => {next()
//         // res.json({ status: 1, message: 'Uploaded & saved' });
//       })
//       .catch((err) => {
//         console.error('Error saving image to database:', err);
//         res.status(500).json({ status: 0, message: 'Error saving to database' });
//       });
//   });
// };

// module.exports = { handleUpload };
