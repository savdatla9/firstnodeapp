const User = require('../models/users');

module.exports = {
    create: async(req, res)=>{
        try {
            const userData = new User(req.body);
            const {email} = userData;
            
            const userExist = await User.findOne({email})
            if (userExist){
                return res.status(400).json({message: "User already exists."})
            }
            
            const savedUser = await userData.save();
            
            res.status(200).json({message: 'New User Created.', result: savedUser})
        } catch (error) {
            res.status(500).json({error: "Internal Server Error. "})
        }
    },
    
    fetch: async (req, res)=>{
        try {
            const users = await User.find();
            
            if(users.length === 0 ){
                return res.status(404).json({message : "Users not Found."})
            }
            
            res.status(200).json({message: `User List ${users.length}`, length: users.length, result: users});
        } catch (error) {
            res.status(500).json({error : "Internal Server Error."})
        }
    },
    
    edit: async (req, res)=>{
        try {
            const id = req.params.id;
            
            const userExist = await User.findOne({_id: id})
            
            if (!userExist){
                return res.status(404).json({message : "User not found."})
            }
            
            const updateUser = await User.findByIdAndUpdate(id, req.body, {new : true});
            res.status(201).json({message: 'User Details Updated.', result: updateUser});
        } catch (error) {
            res.status(500).json({error : "Internal Server Error."})
        }
    },
    
    remove: async (req, res)=>{
        try {
            const id = req.params.id;
            
            const userExist = await User.findOne({_id:id})
            if(!userExist){
                return res.status(404).json({message: "User Not Found."})
            }
            
            await User.findByIdAndDelete(id);
            
            res.status(201).json({message: "User deleted Successfully."})
        } catch (error) {
            res.status(500).json({error: "Internal Server Error."})
        }
    }
};