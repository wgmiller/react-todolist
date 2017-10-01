import React from 'react';

var header = {
  padding: '1em 0',
  borderBottom: '1px dashed #ccc',
  width: '80vw',
  maxWidth: '600px',
  margin: '0 auto',
  minHeight: '50px',
  lineHeight: '50px',
  textAlign: 'center',
}

const Header = ({ items }) => (
	<h1 style = {header}>Todos</h1>
  	);

export default Header;