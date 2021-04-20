import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import React, * as R from 'react-native';
import { StyleSheet, Text, View, Platform, ScrollView, FlatList, } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight;

export default class App extends React.Component {
  
  constructor(props){
    this.state = {
      todo: [
        {index:1, title: "Write the script", done: false},
        {index:2, title: "walking with a dog", done: false}
      ],
      currentIndex: 2
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filter}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
        <ScrollView style={styles.todolist}>
          {/* 4: Flatlist */}
          <FlatList data={this.state.todo}
          renderItem = (item) => {(
          <Text>
            {item.title
            </Text>
            )}
          keyExtractor={(item, index) => "todo_" + item.index}
          />
        </ScrollView>
        <View style={styles.input}>
          <Text>input space</Text>
        </View>
      </View>
    );
  }
}


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
