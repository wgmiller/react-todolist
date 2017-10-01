import React from 'react';

var footer = {
  padding: '1em 0',
  borderTop: '1px dashed #ccc',
  width: '80vw',
  maxWidth: '600px',
  margin: '2em auto 0',
  minHeight: '30px',
  lineHeight: '30px',
  textAlign: 'center',
  display: 'flex',
};

class Footer extends React.Component {
  constructor (props) {
       super(props);
       this.state = {item: ''};
       this.onInput = this.onInput.bind(this);
  }


  itemsLeft(){
    this.props.itemsLeft()
  };

  onInput(event){
    this.props.toggleAll(event.target)
  };

  render () {
    return (
      <div style={footer}>
        <span style={{textAlign: 'left', flexGrow: 1, paddingLeft: '2vw', addingRight: '12.5vw'}}>{this.props.itemsLeft} items left </span>
        <a style={{textAlign: 'right', flexGrow: 1, paddingRight: '2vw'}} onClick={this.onInput} name="Check gym hours">
          Mark All As Complete
        </a>
      </div>
      );
  }
}


export default Footer;