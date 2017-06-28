import express from 'express';
//import mongoose from 'mongoose';
import User from '../models/user';
//import db from '../server';



const router = express.router();


router.get('/userData', (req, res) =>{
	User.findOne({_id: req._id}, function(err, person){
		if(err){
			console.error(err);
		}
		res.json(person);

	});

});