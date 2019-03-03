import React from 'react';
import ReactDOM from 'react-dom'
import dragula from 'react-dragula'


var styles = {
  list: {
    background: 'white',

    maxWidth: '600px',
    margin: '0 auto',
    minHeight: '250px',
    textAlign: 'left',
    touchAction: 'none',
    lineHeight: '30px'
  },
  complete: {
  	textDecoration: 'line-through',
  	color: '#ccc'
  }
}

class List extends React.Component {

  constructor (props) {
       super(props);
       this.state = {item: ''};
       this.onInput = this.onInput.bind(this);
       this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount(){
    var container = ReactDOM.findDOMNode(this);
    dragula([container]);
  }

  onInput(event){
    this.props.toggleTodo(event.target)
  }

  onRemove(event){
    this.props.removeTodo(event.target);
  }

  render () {
      return (
        <div style={styles.list}>

          {
            this.props.items && this.props.items.map((item, index) => 
              <div style = {item.complete ? styles.complete : null } key={index} className="list-group-item">
              <input name={item.task} type="checkbox" checked={item.complete} id={item.id} key={index} onClick={this.onInput}/> 
              {item.task}
              <button type="button" className="hover btn" id={item.id} onClick={this.onRemove}>
              Remove 
              </button>
              {/* <span className="glyphicon">&#8597;</span>*/}
              </div>)
          }

        </div>
      );
  }
}

export default List;