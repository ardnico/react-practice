import React from 'react';
import InputField from './InputField';
import List from './List';
import http from './http';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, ScrollView, FlatList, } from 'react-native';

class Todo extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      lists: [],
    }
  }

  componentDidMount() {
    this.getTodoList();
  }

  getTodoList = () => {
    return http
      .get('/todo')
      .then((response) => {
        this.setState({ lists: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleSubmit = () => {
    if (this.state.text === "") {
      return window.alert("入力してください")
    }
    return http
      .post('/todo', {
        text: this.state.text
      })
      .then(() => {
        this.setState({ text: "" });
        this.getTodoList();
      }
      )
      .catch(error => {
        console.log(error)
      })
  }

  handleDelete = (list) => {
    return http
      .delete(`/todo/${list.id}`)
      .then(() =>
        this.getTodoList()
      )
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: STATUSBAR_HEIGHT,
        // alignItems: 'center',
        // justifyContent: 'center',
      },
      filter: {
        height: 30,
      },
      todolist: {
        flex: 1,
      },
      input: {
        height: 30,
      },
    });
    const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight;
    return (
      <div className="todo">
        <div className="todo-title">
          <h1>Todo</h1>
        </div>
        <InputField
          text={this.state.text}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <List
          lists={this.state.lists}
          handleDelete={this.handleDelete}
        />
      </div>
    )
  }
}

export default Todo;


