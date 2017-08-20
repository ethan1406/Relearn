import express from 'express';
//import mongoose from 'mongoose';
import User from '../models/user';
import nodemailer from 'nodemailer';
//import db from '../server';



const router = express.Router();

//email sending setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'discountnowjed@gmail.com',
    pass: 'jed2317scarff'
  }
});


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
	

	var email;


	User.findOne(query2, 'friends.$ pendingNotifications matchNotifications facebook.email', (err, person) => {
		if(err){
			console.err(err);
		}
		email = person.facebook.email;

		var update = {};
		var success = false;
	

		if(person.friends[0].updateFriendship === req.body.status){


			person.friends[0].currentFriendship = req.body.status;
			success = true;


			//decrease pending notificaitons
			var found1 = 0;
			const pos1 = person.pendingNotifications.indexOf(req.user.facebook.id);
			if(pos1 > -1){
				found1 = 1;
				person.pendingNotifications.splice(pos1, 1);
			}

			const pos2 = req.user.pendingNotifications.indexOf(req.body.friendId);
			if(pos2 > -1){
				req.user.pendingNotifications.splice(pos2, 1);
			}
			

			//increase match notifications
			if(person.matchNotifications.indexOf(req.user.facebook.id) === -1){
				person.matchNotifications.push(req.user.facebook.id);
			}
			
			if(req.user.matchNotifications.indexOf(req.body.friendId) === -1){
				req.user.matchNotifications.push(req.body.friendId);
			}


			var update2;


			if(found1){
				update2 = {
					'$set' : {
						'friends.$.currentFriendship' : req.body.status,
						'pendingNotifications' : person.pendingNotifications,
						'matchNotifications': person.matchNotifications
					}
				};
			}else{
				update2 = {
					'$set' : {
						'friends.$.currentFriendship' : req.body.status,
						'matchNotifications': person.matchNotifications
					}
				};
			}
			update = {
				'$set': {
					'friends.$.updateFriendship': req.body.status,
					'friends.$.currentFriendship': req.body.status,
					'pendingNotifications': req.user.pendingNotifications,
					'matchNotifications' : req.user.matchNotifications
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
			

			if(person.pendingNotifications.indexOf(req.user.facebook.id) === -1){
				person.pendingNotifications.push(req.user.facebook.id);
				person.save();
			}



			success = false;
		}

		//send an email to the friend

		var mailOptions = {
			from: 'ethan1406@gmail.com',
			to: email,
			subject: 'One of your friend',
			text: 'Find out who he/she is by visiting refriend\n'
			//https://refriendonline.herokuapp.com/login
		};		
		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});

		User.findOneAndUpdate(query, update, options, (err, user) => {

			if(err){
				console.log('# API UPDATE friendship: ', err);
			}
			if(success){
				res.json({success:'true', updatedPNotifications: req.user.pendingNotifications});
			}else{
				res.json({success:'false'});
			}
			
		});


	});

	
});

export default router;