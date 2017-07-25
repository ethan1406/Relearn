import express from 'express';
//import mongoose from 'mongoose';
import User from '../models/user';
//import db from '../server';



const router = express.Router();


router.get('/userData', (req, res) =>{
	if(req.user){
		User.findOne({_id: req.user._id}, function(err, person){
		if(err){
			console.error(err);
		}
		//console.log(person);
		res.json(person);

	});
	}else{
		res.json({});
	}
});


router.put('/updateFriendship', (req, res) =>{
	const facebookId = req.body.friendId;

	var query = {_id : req.user._id,
				friends: {$elemMatch: {id: facebookId}}};
	
	var options = {new: true};

	var query2 = {'facebook.id' : facebookId,
					friends: {$elemMatch: {id: req.user.facebook.id}}};


	User.findOne(query2, 'friends.$', (err, person) => {
		if(err){
			console.err(err);
		}

		var update = {};
		var success = false;

		if(person.friends[0].updateFriendship === req.body.status){

			update = {
				'$set': {
				'friends.$.updateFriendship': req.body.status,
				'friends.$.currentFriendship': req.body.status

				}
			};
			person.friends[0].currentFriendship = req.body.status;
			success = true;
			
			var update2 = {
				'$set' : {
					'friends.$.currentFriendship' : req.body.status
				}
			};

			User.update(query2, update2, err => {
				if(err){
					console.err(err);
				}
			});

			// person.save((err, updatedPerson)=>{
			// 	if(err){
			// 		console.log(err);
			// 	}
			// 	console.log('yea');
			// 	console.log(JSON.stringify(updatedPerson));
			// });
			

		}else{
			update = {
				'$set': {
				'friends.$.updateFriendship': req.body.status
				}
			};

			success = false;
		}

		User.findOneAndUpdate(query, update, options, (err, user) => {

			if(err){
				console.log('# API UPDATE friendship: ', err);
			}
			if(success){
				res.json({success:'true'});
			}else{
				res.json({success:'false'});
			}
			
		});


	});

	
});

export default router;