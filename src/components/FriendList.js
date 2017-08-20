import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {updateFriendship} from '../actions/userActions';
import {Table, Image, DropdownButton, MenuItem} from 'react-bootstrap';


//import axios from 'axios';

class FriendList extends Component {

	render() {
		const friendsToDisplay = this.props.friends.sort((a,b) => {
			return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;

		});
		const friendDisplay =  friendsToDisplay.map(friend => 
					<tr key={friend.id} className = "link">
						<td>
							<Image src = {friend.dpUrl} rounded responsive/>
						</td>
						<td>
							{friend.name}
						</td>
						<td>
							{friend.currentFriendship}
						</td>
						<td>
							{friend.updateFriendship}
						</td>
						<td>
							<DropdownButton className="friendshipBtn"  ref = "friendshipBtn" title = "Friends?" id={`dropdown-basic-${friend.id}`}>
								<MenuItem eventKey="1" onClick = {() => this.props.updateCurrentFriendship(friend.id, 'cute')}>CUTE</MenuItem>
								<MenuItem eventKey="2" onClick = {() => this.props.updateCurrentFriendship(friend.id, 'datable')}>DATABLE</MenuItem>
								<MenuItem eventKey="2" onClick = {() => this.props.updateCurrentFriendship(friend.id, 'bff')}>BFF</MenuItem>
								<MenuItem eventKey="4" onClick = {() => this.props.updateCurrentFriendship(friend.id, 'default')}>default</MenuItem>
							</DropdownButton>
						</td>
					</tr>);


		return (
			<Table responsive className= "table-striped borderless">
				<thead>
					<tr>
						<th>
						
						</th>
						<th>
						
						</th>
						<th>
							friendship
						</th>
						<th>
							what you feel about the person
						</th>

					</tr>
				</thead>
				<tbody>
					{friendDisplay}
				</tbody>

			</Table>
			

				


		);
	}
}
FriendList.propTypes = {
	friends: PropTypes.array,
	updateCurrentFriendship: PropTypes.func 
 };


const mapStateToProps = (state) => {
	return {
		friends: state.friends
	};
};

const mapDispatchToProps = (dispatch) => (

	{
		updateCurrentFriendship(facebookId, status){
			dispatch(
				updateFriendship(facebookId, status)	
			);
		}

	}

);

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);




	// static propTypes = {
	// 	initialData: PropTypes.object.isRequired
	// };
	// state = this.props.initialData; 
	// state = {friends: []};

	// componentDidMount() {
	// 	axios.get('/api/userData').then(resp =>{
	// 		const friends = resp.data.friends;
	// 		this.setState({friends});
	// 		}	
	// 	);
	// }