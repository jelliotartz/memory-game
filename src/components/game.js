import React, {Component} from 'react';
import Card from './card.js';
import cards from './../cardData.js';

// use Fisher-Yates/Knuth shuffle to shuffle cards
function shuffleCards(cards) {
  var currentIndex = cards.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
  return cards;
}

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.renderCards = this.renderCards.bind(this);
    this.handleCardTurn = this.handleCardTurn.bind(this);

    this.state = {
      cards: shuffleCards(cards),
      firstCard: null,
      locked: false
    };
  }

  handleCardTurn(value, index) {
    if (this.state.locked) {
      return;
    }

    this.state.cards[index].revealed = true;
    
    this.setState({ locked: true });

    if (this.state.firstCard) {
      this.checkForMatch(value, index)
    } else {
      this.setState({
        firstCard: {value, index},
        locked: false
      });
    }
  }

  checkForMatch(value, index) {
    if (value === this.state.firstCard.value) {
      this.removeCards(index);
    } else {
      this.flipCardsOver(index);
    }
  }

  removeCards(index) {
    this.state.cards[index].hidden = true;
    this.state.cards[this.state.firstCard.index].hidden = true;
    
    this.setState({
      firstCard: null,
      locked: false
    });
  }

  flipCardsOver(index) {
    setTimeout(() => {
      this.state.cards[this.state.firstCard.index].revealed = false;
      this.state.cards[index].revealed = false;
      
      this.setState({
        firstCard: null,
        locked: false
      });
    }, 1000);
  }

  renderCards(cards) {
    return cards.map((card, index) => {
      return (
        <Card
          key={index}
          value={card.value}
          index={index}
          revealed={card.revealed}
          hidden={card.hidden}
          handleCardTurn={this.handleCardTurn} 
        />
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderCards(this.state.cards)}
      </div>
    );
  }
}
