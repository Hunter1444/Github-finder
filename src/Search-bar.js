import React, { Component } from 'react';
import { connect } from 'react-redux';
class SearchBar extends Component{

  submitHandler(e){
    e.preventDefault();

    let user = this.refs.searchBar;
    let that = this;

    let userProfile = fetch(`https://api.github.com/users/${user.value}`)
    .then(function(response) {
      return response.json();
     })

    let userRepo = fetch(`https://api.github.com/users/${user.value}/repos`)
    .then(function(response) {
      return response.json();
     })

    var combinedData = {userProfile:{},userRepo:{}};
    Promise.all([userProfile,userRepo])
    .then(function(values){
       combinedData["userProfile"] = values[0];
       combinedData["userRepo"] = values[1];
       return combinedData;
    })
    .then(function(val){
      console.dir(val.userProfile.message)
      if(val.userProfile.message !== "Not Found"){
        that.props.findUser(val);
      } else{
        throw new Error("Not found user");
      }
    })
    .catch(function(err){
      alert(err)
    })

    user.value = '';

  }
  render(){
    return(
      <div>
      <form onSubmit={this.submitHandler.bind(this)}>
        <input ref="searchBar" className="search-bar" type="text" placeholder="Type username here"/>
        <input className="search-submit" type="submit" value="find"/>
      </form>
      </div>
    )
  }
}


export default connect(
  state => ({
    UserList: state
  }),
  dispatch => ({
    findUser: (user) =>{
      dispatch({ type: 'FINDED_USER', payload: user});
    }
  }))(SearchBar)
