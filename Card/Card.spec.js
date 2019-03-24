const expect = require('chai').expect;
const Card = require('./Card');

it('should create Card instance and set its fields', () => {
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

    cardArray.forEach((cardObject) => {
        const card = new Card(cardObject.manaCost, cardObject.damage);
        expect(card.manaCost).to.equal(cardObject.manaCost);
        expect(card.damage).to.equal(cardObject.damage);
    })
});