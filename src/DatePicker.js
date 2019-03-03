import React from 'react';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

var datepicker = {
  padding: '1em 0',
  borderBottom: '1px dashed #ccc',
  width: '80vw',
  maxWidth: '600px',
  margin: '0 auto',
  minHeight: '50px',
  lineHeight: '50px',
  textAlign: 'center',
}

const DatePicker = ({ items }) => (
	<SingleDatePicker
      // showClearDate={true}
      inputIconPosition="after"
      small={true}
      block={false}
      numberOfMonths={1}
      date={this.state.date}
      onDateChange={date => this.handleDateChange(date)}
      focused={this.state.focused}
      onFocusChange={({ focused }) =>
        this.setState({ focused })
      }
      openDirection="up"
      hideKeyboardShortcutsPanel={true}
    />
  	);

export default DatePicker;