// // console.log('Enter Back end');
// const express = require('express');

// // const { connectToDb, getDb } = require('./dbm');

// const app = express();

// app.use(express.json());

// let db;

// // connectToDb((err) => {
// //     if(!err){
// //         app.listen(3001, () => {
// //             console.log('Server on in port - 3001');
// //         });

// //         db = getDb();
// //     }
// // });

// app.get('/api/users', (req, res) => {
//     const page = req.query.page || 1;
//     const usersPerPage = 10;

//     let users = [];

//     db.collection('test')
//     .find()
//     .sort({id: 1})
//     .skip(page * usersPerPage)
//     .limit(usersPerPage)
//     .forEach(user => users.push(user))
//     .then(() => {
//         res.status(200).json(users);
//     })
//     .catch(() => {
//         res.status(500).json({msg: 'Err getting response'})
//     });
// })