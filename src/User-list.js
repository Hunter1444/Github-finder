import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserList extends Component{

  openDropdown(e){
    e.preventDefault();
    let dropdown = e.target.nextElementSibling;
    dropdown.classList.toggle('opened')
  }
  render(){
    let that = this;

    if(this.props.UserList.length !== 0){
      var userItems = this.props.UserList.map(function(item, index){

        var userRepo = item.userRepo.map(function(item, index){
          return(
            <li key={index}><a href={item.html_url}>{item.name}</a></li>
          )
        })

        return(
          <li className="user-list__item" key={index}>
            <span className="user-list__name">{item.userProfile.login}</span>
            <img className="user-list__img" src={item.userProfile.avatar_url} alt={item.login}/>
            <span className="user-repo__title" onClick={that.openDropdown}>Repositories</span>
            <ul className="user-repo">
              {userRepo}
            </ul>
          </li>
        )
      })
    }
    return(
      <ul className="user-list">
        {userItems}
      </ul>
    )
  }
}

export default connect(
  state => ({
    UserList: state
  })
)(UserList)
