
class Deck {
    constructor(cards, initialCardCountToBeGiven) {
        this.cards = cards;
        this.initialCardCountToBeGiven = initialCardCountToBeGiven;
    }

    getRandomCard() {
        if (!this.cards) {
            return null
        }
        const card = this.cards[Math.floor(Math.random() * (this.cards.length -1))];
        this.removeCard(card);
        return card;
    }

    removeCard(card) {
        for( let i = 0; i < this.cards.length; i++){
            if ( this.cards[i] === card) {
                this.cards.splice(i, 1);
                break;
            }
        }
    }

    getInitialCards() {
        const initialCards = [];
        for(let i = 1; i <= this.initialCardCountToBeGiven; i++) {
            initialCards.push(this.getRandomCard());
        }
        return initialCards;
    }
}

module.exports = Deck;