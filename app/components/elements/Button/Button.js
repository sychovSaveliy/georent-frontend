
import React, { Component } from 'react';

class Button extends Component {
  onClickHandler=() => {
    console.log('click');
  }

  render() {
    const { className, style, text } = this.props;
    return (
      <button onClick={this.onClickHandler}>{text}</button>
    );
  }
}
export default Button;
