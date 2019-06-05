import React from 'react';
import { userInfo } from './userInfo';
import { DropdownUserItem, UserSelectedItem } from './components';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userInfoList: userInfo,
      autoSuggest: [],
      userSelected: [],
      inputCursorPosition: 4,
      inputText: ""
    }
  }

  componentDidMount(){
    // For keyboard back button click event listener
    document.addEventListener("keydown", (e) => {
      if(e.keyCode === 8 && e.target.value === "" && this.state.userSelected.length > 0){
        this.deleteHandle(this.state.userSelected.slice(-1)[0].name);
      }
    });
  }
  
  // For user input handler method & apply filter on user list
  inputHandler = (e) => {
      this.setState({ inputText: e.target.value });
      if(e.target.value.length > 1){
        let filterData = this.state.userInfoList.filter((item) => {
          return item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) === 0;
        });
        this.setState({ autoSuggest: filterData });
      } else {
        this.setState({ autoSuggest: [] });
      }
  }

  // For drop down user select item & update user list
  userSelectHandle = (name) => {
    let updatedUserInfoList = this.state.userInfoList.filter((item) => item.name !== name);
    let selected = this.state.userInfoList.find((item) => item.name === name);
    this.state.userSelected.push(selected);
    this.setState({ autoSuggest: [], userInfoList: updatedUserInfoList, inputCursorPosition: this.state.inputCursorPosition + 175, inputText: "" });
    document.getElementById("userInputField").focus();
  }

  // For delete action on user item Or keyboard back button click  
  deleteHandle = (name) => {
    this.state.userInfoList.push(this.state.userSelected.find((item) => item.name === name));
    let updateUserSelected = this.state.userSelected.filter((item) => item.name !== name);
    this.setState({ userSelected : updateUserSelected, inputCursorPosition: this.state.inputCursorPosition - 175});
    document.getElementById("userInputField").focus();
  }

  render(){
    return(
      <div className="mainContainer">
        <h1>Select Any User</h1>
        <div className="inputContainer">
          <UserSelectedItem data={this.state.userSelected} deleteClick={this.deleteHandle} />
          <input id="userInputField" type="text" placeholder="Serach Any User Name" value={this.state.inputText} onChange={this.inputHandler} style={{ paddingLeft: `${this.state.inputCursorPosition}px`}}/>
          <DropdownUserItem data={this.state.autoSuggest} userSelect={this.userSelectHandle} />
        </div>
      </div>
    );
  }
}