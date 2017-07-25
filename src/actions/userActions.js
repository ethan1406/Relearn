import axios from 'axios';


export const updateFriendship = (friendId, status) => dispatch => {
	axios.put('/api/updateFriendship', {friendId, status}).then(response => {

		dispatch({type: 'UPDATE_FRIENDSHIP', payload: {...response.data, friendId, status}});
	}).catch(err =>{
		console.log(err);
	});
	

};