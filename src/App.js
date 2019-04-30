import React, { Component } from 'react';
import './App.css';
import List from './List';
import Footer from './Footer';
import Header from './Header';
import ToDoInput from './ToDoInput';

var box = {
  background: 'white',
  width: '80vw',
  maxWidth: '600px',
  margin: '4em auto',
  borderRadius: '10px',
  border: '1px solid #eee',
}

{/*Endpoint for backend*/}
var test_url = 'http://0.0.0.0:5000/list'
var url = 'http://grahams.pythonanywhere.com/list'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: [
        {"task":"Discuss report with John","complete":false},
        {"task":"Get a haircut","complete":true},
        {"task":"Pay electricity bill","complete":true},
        {"task":"Check gym hours","complete":false}
      ],
    };
  }

  componentDidMount() {
      fetch(url)
      .then(d => d.json())
      .then(d => {
        var temp = d.map(function(c){
          c.complete = (c.complete === 1)? true : false;
          return c
        })
        this.setState({
          term: '',
          items: temp
        })
      })
    }

  addTodo = (term) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: term.item,
        due_date: term.date._d
      })
    })
    .then(d => d.json())
    .then(d => {
      var temp = d.map(function(c){
        return c
      })
      this.setState(prevState => ({
        term: '',
        items: temp
      }))
    })
    {/*this.setState({items: this.state.items.concat([t])});*/}
  }

  removeTodo = (term) => {
    var i = term.id
    console.log('id:', i)
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: i
      })
    })
    .then(d => d.json())
    .then(d => {
      var temp = d.map(function(c){
        return c
      })
      this.setState(prevState => ({
        term: '',
        items: temp
      }))
    })
    {/*this.setState({items: this.state.items.concat([t])});*/}
  }

  toggleTodo = (term) => {
    var i = term.id
    console.log('id:', i)
    fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: i
      })
    })
    .then(d => d.json())
    .then(d => {
      var temp = d.map(function(c){
        return c
      })
      this.setState(prevState => ({
        term: '',
        items: temp
      }))
    })
  }

  toggleAll = (term) => {
    var url2 = url + '/markall'
    fetch(url2, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: 'mark all'
      })
    })
    .then(d => d.json())
    .then(d => {
      var temp = d.map(function(c){
        return c
      })
      this.setState(prevState => ({
        term: '',
        items: temp
      }))
    })
  }

  itemsLeft(){
    var num = this.state.items.filter(function(c){
        return !c.complete
      }).length
    return num
  }

  render() {
    var itemsLeft = this.itemsLeft()
    return (
      <div className="App" style={box}>
        <Header/>
        <ToDoInput addTodo={this.addTodo}/>
        <List toggleTodo={this.toggleTodo} removeTodo={this.removeTodo} items={this.state.items} />
        <Footer toggleAll={this.toggleAll} itemsLeft={itemsLeft} />
      </div>
    );
  }
}

export default App;
