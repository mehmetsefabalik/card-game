const Player = require('../Player/Player');
const Deck = require('../Deck/Deck');
const Card = require('../Card/Card');

class PlayGround {
    static ready() {
        const cardArray = [
            {manaCost: 0, damage: 0},
            {manaCost: 0, damage: 0},
            {manaCost: 1, damage: 1},
            {manaCost: 1, damage: 1},
            {manaCost: 2, damage: 2},
            {manaCost: 2, damage: 2},
            {manaCost: 2, damage: 2},
            {manaCost: 3, damage: 3},
            {manaCost: 3, damage: 3},
            {manaCost: 3, damage: 3},
            {manaCost: 3, damage: 3},
            {manaCost: 4, damage: 4},
            {manaCost: 4, damage: 4},
            {manaCost: 4, damage: 4},
            {manaCost: 5, damage: 5},
            {manaCost: 5, damage: 5},
            {manaCost: 6, damage: 6},
            {manaCost: 6, damage: 6},
            {manaCost: 7, damage: 7},
            {manaCost: 8, damage: 8},
        ];

        const cards = [];
        cardArray.forEach((cardObject) => {
            cards.push(new Card(cardObject.manaCost, cardObject.damage));
        });

        const deck = new Deck(cards, 3);

        const player1 = new Player('Player 1', 30, 0, deck);
        const player2 = new Player('Player 2', 30, 0, deck);

        return { player1, player2 }
    }

    static async play() {
        const { player1, player2 } = PlayGround.ready();
        let activePlayer = player1;
        let inActivePlayer = player2;
        let temp;
        while (true) {
            activePlayer.myTurn();
            while(activePlayer.mana > 0 && !activePlayer.pass) {
                await activePlayer.play();
                if (activePlayer.playedCard) {
                    inActivePlayer.gotDamage(activePlayer.playedCard.damage)
                }
            }

            temp = inActivePlayer;
            inActivePlayer = activePlayer;
            activePlayer = temp;
        }
    };
}

module.exports = PlayGround;