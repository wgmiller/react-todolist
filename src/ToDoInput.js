import React from 'react';

var styles = {
  form: {
    padding: '1.5em 0em', 
    display: 'flex', 
    margin: '0 auto', 
    width: '80vw', 
    maxWidth: '550px'
  },
  input: {
    padding: '1.5em 1em', 
    margin: '0em .5em'
  },
  button: {
    minWidth: '100px',
    width: '20vw', 
    margin: '0em .5em'
  }
}

class ToDoInput extends React.Component {
  
  constructor (props) {
       super(props);
       this.state = {item: ''};
  }

  onChange = (event) => {
    this.setState({item: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.addTodo(this.state.item);
    this.setState({item: ''}, () => this.refs.item.focus());
  }

  render () {
      return (
        <form style={styles.form} className="App form-horizontal" onSubmit={this.onSubmit}>
            <input name="contents" ref="item" value={this.state.item} onChange={this.onChange} className="form-control" placeholder="what needs to be done?" style={styles.input}/>
            <button className="btn btn-basic" style={styles.button}>Submit</button>
        </form>
      );
  }
};

export default ToDoInput;