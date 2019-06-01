import React from 'react';
import userRequests from '../../../helpers/data/userRequests';
import authRequests from '../../../helpers/data/authRequests';

class Profile extends React.Component {
  state = {
    users: [],
    currentUser: [],
  }

  // getSingleUser = () => {
  //   const uid = authRequests.getCurrentUid();
  //   const { users } = this.state;
  //   const currentUser = users.filter(user => user.firebaseId === uid);
  //   this.setState({ currentUser });
  // }

  // getUser = () => {
  //   userRequests.getAllUsers()
  //     .then((users) => {
  //       this.setState({ users });
  //     })
  //     .then(() => {
  //       this.getSingleUser();
  //     });
  // };

  getUser = () => {
    const uid = authRequests.getCurrentUid();
    userRequests.getSingleUser(uid)
      .then((currentUser) => {
        this.setState({ currentUser: currentUser.data });
      });
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="profileDiv d-flex align-center">
        <div id="profile">
          <h3>{currentUser.name}</h3>
          <div>{currentUser.email}</div>
          <div>{currentUser.street}</div>
          <div>{currentUser.city}</div>
          <div>{currentUser.state}</div>
          <div>{currentUser.zipcode}</div>
          <div>{currentUser.phonenumber}</div>
        </div>
      </div>
    );
  }
}

export default Profile;
