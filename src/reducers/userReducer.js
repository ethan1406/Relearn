import { combineReducers } from 'redux';



export const facebook = (state = {}) => {

	return state;
};


export const pendingNotifications = (state = []) => {

	return state;
};


export const matchNotifications = (state = []) => {

	return state;
};

export const _id = (state = '') => {

	return state;
};

export const __v = (state = '') => {

	return state;
};


// export const email = (state = '') => {
// 	return state;
// };

// export const name = (state = '') => {
// 	return state;
// };


// export const id = (state = '') =>{
// 	return state;
// };

// export const token = (state = '') => {
// 	return state;
// };


export const friends = (state = [], action) => {
	switch(action.type){
		case 'UPDATE_FRIENDSHIP':{
			const currentFriendsToUpdate = [...state];


			const indexToUpdate = currentFriendsToUpdate.findIndex(friend => {
				return friend.id == action.payload.friendId;
			});


			var friendshipToUpdate = {};

			if(action.payload.success === 'true'){
				friendshipToUpdate = {
					...currentFriendsToUpdate[indexToUpdate],
					updateFriendship: action.payload.status,
					currentFriendship: action.payload.status
				};
			}else{
				friendshipToUpdate = {
					...currentFriendsToUpdate[indexToUpdate],
					updateFriendship: action.payload.status,
					
				};
			}
			
	
			return [...currentFriendsToUpdate.slice(0, indexToUpdate), friendshipToUpdate, ...currentFriendsToUpdate.slice(indexToUpdate + 1)];
		}	
		default:
			return state;

	}
};


export default combineReducers({
	pendingNotifications,
	matchNotifications,
	_id,
	__v,
	facebook,
	friends 
});