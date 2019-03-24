const readline = require('readline');
const Deck = require('../Deck/Deck');

class Player {
    constructor(name, health, mana, deck) {
        if (arguments.length !== 4 || !(deck instanceof Deck)) {
            throw new Error('wrong arguments')
        }
        this.name = name;
        this.health = health;
        this.mana = mana;
        this.deck = deck;
        this.cards = [];
        this.turn = 0;
    }

    myTurn() {
        this.turn += 1;
        if (this.turn < 10) {
            this.mana = this.turn;
        } else {
            this.mana = 10
        }
        this.pass = false;
        if (this.turn === 1) {
            this.getInitialCards();
        } else {
            this.drawCard();
        }
    }

    canPlay() {
        let result = false;
        this.cards.forEach((card) => {
            if (this.mana >= card.manaCost) {
                result = true;
            }
        });
        return result;
    }

    async play() {
        this.summarize();
        if (!this.canPlay()) {
            console.log(`!!!!!!!!  ${this.name} has no eligible card.  !!!!!!!!\ncards: \n${this.getCardPromt()}`);
            this.pass = true;
            this.playedCard = null;
            return;
        }
        const {playedCard, playedCardIndex, pass} =  await this.prompt();

        if (pass) {
            this.pass = true;
            this.playedCard = null;
        } else if (playedCard.manaCost > this.mana) {
            console.log(`\n>>> not enough mana, please pick an eligible card`);
            this.pass = false;
            this.playedCard = null;
        } else if (playedCard) {
            this.reduceMana(playedCard.manaCost);
            this.cards.splice(playedCardIndex, 1);
            this.pass = false;
            this.playedCard = playedCard;
        }
    }

    reduceMana(mana) {
        this.mana -= mana;
    }

    getInitialCards() {
        const cards = this.deck.getInitialCards();
        cards.forEach((card) => {
            this.cards.push(card)
        })
    }

    drawCard() {
        const card = this.deck.getRandomCard();
        if (!card) {
            console.log(`\n\n\n${this.name} is Bleeding Out`);
            this.gotDamage(1);
            return;
        }
        if (this.cards.length >= 5) {
            console.log(`\n\n\n${this.name} Overloaded`);
            return
        }
        this.cards.push(card);

    }

    prompt() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise(resolve => rl.question(`Which card do you want to play ${this.name}? (type -1 to pass) \n${this.getCardPromt()}`, (answer) => {
            if (parseInt(answer) === -1 ) {
                console.log(`${this.name} passed`);
                rl.close();
                resolve({ playedCard: null, playedCardIndex: null, pass: true })
            } else if (parseInt(answer) < 0 || parseInt(answer) > this.cards.length - 1 || isNaN(parseInt(answer))) {
                console.log('Please input an eligible number!');
                rl.close();
                resolve(this.prompt());
            }
            rl.close();
            resolve({ playedCard: this.cards[parseInt(answer)], playedCardIndex: parseInt(answer), pass: false })
        }));
    }

    gotDamage(damage) {
        this.health -= damage;
        console.log(`>>>>>> ${this.name} Got ${damage} Damage <<<<<<<<`);

        if (this.health <= 0) {
            console.log(`\n\n\n\n\n${this.name} Has Lost the Game`);
            process.exit(0);
        }
    }

    getCardPromt() {
        let result = '';
        this.cards.forEach((card, index) => {
            result = result.concat(`${index} - Mana Cost: ${card.manaCost}, Damage: ${card.damage} \n`)
        });
        return result;
    }

    summarize() {
        console.log(`\n\n\n======== ${this.name}\'s Turn ======== \nMana: ${this.mana} \nHealth: ${this.health}`)
    }
}

module.exports = Player;