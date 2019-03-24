const expect = require('chai').expect;
const Player = require('../Player/Player');
const PlayGround = require('./PlayGround');

it('should return two Player objects from PlayGround.ready()', () => {
    const { player1, player2 } = PlayGround.ready();
    expect(player1).to.be.instanceOf(Player);
    expect(player2).to.be.instanceOf(Player);
});