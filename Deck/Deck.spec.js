const expect = require('chai').expect;
const Deck = require('./Deck');
const Card = require('../Card/Card');

it('should create Deck instance and set its fields', () => {
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

    expect(deck.cards).to.equal(cards);
    expect(deck.initialCardCountToBeGiven).to.equal(3);
});