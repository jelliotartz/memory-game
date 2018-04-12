import React, {Component} from 'react';
import classnames from 'classnames';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.props.revealed) {
      this.props.handleCardTurn(this.props.value, this.props.index);
    }
  }

  render() {
    const classes = classnames(
      'card',
      {'revealed': this.props.revealed},
      {'hidden': this.props.hidden}
    );

    const cardValue = this.props.revealed ? this.props.value : '';

    return (
      <div className={classes} onClick={this.handleClick}>
        {cardValue}
      </div>
    );
  }
}
