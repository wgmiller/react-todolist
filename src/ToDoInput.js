import React from 'react';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';

import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';
import { css, withStyles } from 'react-with-styles';

import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

ThemedStyleSheet.registerTheme(DefaultTheme);

var styles = {
  form: {
    padding: '1.5em 0em', 
    display: 'flex', 
    margin: '0 auto', 
    width: '80vw', 
    maxWidth: '550px',
  },
  input: {
    padding: '0em 1em', 
    margin: '0em .5em',
    width: '100%',
  },
  button: {
    minWidth: '100px',
  }
}

class ToDoInput extends React.Component {
  
  constructor (props) {
       super(props);
       this.state = {
        item: '',
        date: props.initialDate,
        focused: props.autoFocus
       };
  }

  onChange = (event) => {
    this.setState({item: event.target.value});
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.addTodo(this.state.item);
    this.setState({item: ''}, () => this.refs.item.focus());
  }

  handleDateChange = (date) => {
    console.log(date)
    this.setState({ date });
    console.log(this.state)

  }

  render () {
      return (
        <form style={styles.form} className="App form-horizontal" onSubmit={this.onSubmit}>
            <SingleDatePicker
                // showClearDate={true}
                inputIconPosition="after"
                block={false}
                numberOfMonths={1}
                date={this.state.date}
                onDateChange={date => this.handleDateChange(date)}
                focused={this.state.focused}
                onFocusChange={({ focused }) =>
                  this.setState({ focused })
                }
                openDirection="down"
                hideKeyboardShortcutsPanel={true}
                placeholder={"Date"}
              />
            <input {...css(styles.reactDates)} style={styles.input} name="contents" ref="item" value={this.state.item} onChange={this.onChange} placeholder="what needs to be done?"/>
            <button className="btn btn-basic" style={styles.button}>Submit</button>
        </form>
      );
  }
};

export default ToDoInput;