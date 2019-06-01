import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';

class Profile extends React.Component {
  state = {
    users: [],
    currentUser: [],
  }

  getUsers = () => {
    userRequests.getAllUsers()
      .then((users) => {
        const uid = authRequests.getCurrentUid();
        const currentUser = users.filter(user => user.firebaseId === uid);
        this.setState({ currentUser });
      });
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div className="profile">
        <h3>Profile Page</h3>
      </div>
    );
  }
}

export default Profile;
