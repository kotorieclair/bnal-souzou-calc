import bungo from './bungo';
import weapons, { options as weaponOptions } from './weapons';
import status from './status';
import rare1 from './card_rare1';
import rare2 from './card_rare2';
import rare3 from './card_rare3';

const cards = Object.assign({}, rare1, rare2, rare3);

export { bungo, cards, weapons, weaponOptions, status };
