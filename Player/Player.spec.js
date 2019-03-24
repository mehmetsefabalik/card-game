const expect = require('chai').expect;
const Player = require('./Player');
const Card = require('../Card/Card');
const Deck = require('../Deck/Deck');

it('should create Player instance and set its fields', () => {
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
    expect(player1.name).to.equal('Player 1');
    expect(player1.health).to.equal(30);
    expect(player1.mana).to.equal(0);
    expect(player1.deck).to.equal(deck);

    const player2 = new Player('Player 2', 30, 0, deck);
    expect(player2.name).to.equal('Player 2');
    expect(player2.health).to.equal(30);
    expect(player2.mana).to.equal(0);
    expect(player2.deck).to.equal(deck);
});