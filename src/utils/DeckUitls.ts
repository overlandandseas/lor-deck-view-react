import { Deck } from "lor-deckcodes-ts";
import set1 from "../assets/set1-en_us.json";
import set2 from "../assets/set2-en_us.json";
import set3 from "../assets/set3-en_us.json";
import set4 from "../assets/set4-en_us.json";
import set5 from "../assets/set5-en_us.json";
import set6 from "../assets/set6-en_us.json";
import set6cde from "../assets/set6cde-en_us.json";

export interface Asset {
  readonly gameAbsolutePath: string;
  readonly fullAbsolutePath: string;
}

export interface CardData {
  readonly associatedCards: any[];
  readonly associatedCardRefs: string[];
  readonly assets: Asset[];
  readonly regions: string[];
  readonly regionRefs: string[];
  readonly attack: number;
  readonly cost: number;
  readonly health: number;
  readonly description: string;
  readonly descriptionRaw: string;
  readonly levelupDescription: string;
  readonly levelupDescriptionRaw: string;
  readonly flavorText: string;
  readonly artistName: string;
  readonly name: string;
  readonly cardCode: string;
  readonly keywords: string[];
  readonly keywordRefs: string[];
  readonly spellSpeed: string;
  readonly spellSpeedRef: string;
  readonly rarity: string;
  readonly rarityRef: string;
  readonly subtypes: string[];
  readonly supertype: string;
  readonly type: string;
  readonly collectible: boolean;
  readonly set: string;
}

export interface CardCount {
  readonly count: number;
  readonly card: CardData;
}

export interface FormattedDeck {
  readonly champions: CardCount[];
  readonly followers: CardCount[];
  readonly landmarks: CardCount[];
  readonly spells: CardCount[];
}

interface DeckDataMap {
  [index: string]: CardData;
}

const deckDataMap: DeckDataMap = {};

for (let card of set1 as CardData[]) {
  deckDataMap[card.cardCode] = card;
}
for (let card of set2 as CardData[]) {
  deckDataMap[card.cardCode] = card;
}
for (let card of set3 as CardData[]) {
  deckDataMap[card.cardCode] = card;
}
for (let card of set4 as CardData[]) {
  deckDataMap[card.cardCode] = card;
}
for (let card of set5 as CardData[]) {
  deckDataMap[card.cardCode] = card;
}
for (let card of set6 as CardData[]) {
  deckDataMap[card.cardCode] = card;
}
for (let card of set6cde as CardData[]) {
  deckDataMap[card.cardCode] = card;
}

export function getCardData(cardCode: string): CardData {
  if (!deckDataMap[cardCode]) {
    throw new Error(`Card: ${cardCode} not found.`);
  }
  return deckDataMap[cardCode];
}

export function getFormattedDeck(deck: Deck): FormattedDeck {
  const champions = [];
  const followers = [];
  const landmarks = [];
  const spells = [];

  for (let { cardCode, count } of deck) {
    const card = getCardData(cardCode);

    switch (card.type) {
      case "Spell":
        spells.push({ card, count });
        break;
      case "Unit":
        if (card.rarity === "Champion") {
          champions.push({ card, count });
        } else {
          followers.push({ card, count });
        }
        break;
      case "Landmark":
        landmarks.push({ card, count });
        break;
      default:
        throw new Error("Unkown card type");
    }
  }
  const cost = (a: CardCount, b: CardCount): number => a.card.cost - b.card.cost;

  champions.sort(cost);
  followers.sort(cost);
  landmarks.sort(cost);
  spells.sort(cost);

  return {
    champions,
    followers,
    landmarks,
    spells,
  };
}
