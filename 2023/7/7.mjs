const checkHand = (hand) => {
  console.info('==================');
  console.info('checking', hand);
  
  // [...hand.matchAll(/([A|K|Q|J|9|8|7|6|5|4|3|2|1])\1{4,}|([A|K|Q|J|9|8|7|6|5|4|3|2|1])\1{3,}/g)].forEach(x =>
  //   console.info(x)
  // );
  
  const sorted = hand.split('').sort();
  
  const results = sorted.reduce((hand, card, index) => {
    // console.info(hand);
    let cardSwapped = card.replace('A', 'E').replace('K','D').replace('Q','C').replace('J','B').replace('T','A');
    if (!hand) return { currentCard: cardSwapped, highCard: card, matches: 1 };

    const highCard = (parseInt(cardSwapped, 16) > parseInt(hand.highCard, 16) ? card : hand.highCard);

    if (index === 4) {
      const { currentCard } = hand;
      const matches = card === currentCard ? hand.matches + 1 : hand.matches;

      const finalHand = { onePair: !!hand.onePair, twoPair: !!hand.twoPair, threeOfAKind: !!hand.threeOfAKind, fourOfAKind: !!hand.fourOfAKind };

      switch (matches) {
        case 5:
          return {...finalHand, fiveOfAKind: true}
        case 4:
          return {...finalHand, fourOfAKind: true}
        case 3:
          if (finalHand.onePair) {
            return { ...finalHand, fullHouse: true }
          } else {
            return { ...finalHand, threeOfAKind: true, twoPair: false }
          }
        case 2:
          return {
            ...finalHand,
            highCard,
            fullHouse: finalHand.threeOfAKind && card === currentCard,
            twoPair: finalHand.onePair && card === currentCard,
            onePair: (!finalHand.onePair && card === currentCard),
          }
        case 1:
          return {
            ...finalHand,
            highCard,
          }
      }

      return hand;
    }

    if (card === hand.currentCard) {
      return { ...hand, matches: hand.matches + 1 }
    }

    hand.currentCard = card;

    // Card is different from previous card
    switch (hand.matches) {
      case 3:
        if (hand.onePair) {
          return {...hand, highCard, threeOfAKind: true, fullHouse: true }
        } else {
          return {...hand, highCard, threeOfAKind: true, matches: 1 }
        }
      case 2:
        if (hand.onePair) {
          return {...hand, highCard, onePair: false, twoPair: true, matches: 1}
        } else {
          return {...hand, highCard, onePair: true, matches: 1 }
        }
      case 1:
        return {...hand, highCard, matches: 1}
    }

    return hand;
  }, null);

  console.info(results);
}


const parseData = (data) => {
  return data.reduce((hands, line) => {
    return [
      ...hands,
      ...[...line.matchAll(/(.{5})\W(\d+)/g)].map(match => {
        const [_, cards, bid] = match;

        checkHand(cards);

        return { cards, bid };
      })
    ]
  }, [])
}


import { triggerAsyncId } from 'async_hooks';
import fs from 'fs';

console.time('test')
const input = fs.readFileSync('./test.txt', 'utf8');
const data = input.split(/\n/);

const parsed = parseData(data);
// const one = partOne(parsed);

console.info('=================')
// console.info(parsed);

console.timeEnd('test');