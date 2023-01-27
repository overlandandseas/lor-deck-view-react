import { Deck } from "lor-deckcodes-ts";
import { CardCount, CardData, getFormattedDeck } from "./utils/DeckUitls";

interface DeckListProps {
  deck: Deck | undefined;
}

export default function DeckList({ deck }: DeckListProps): JSX.Element {
  if (deck !== undefined) {
    const formattedDeck = getFormattedDeck(deck);
    return (
      <>
        {formattedDeck.champions.length !== 0 && (
          <CardTypeList type="Champions" cards={formattedDeck.champions} />
        )}
        {formattedDeck.followers.length !== 0 && (
          <CardTypeList type="Followers" cards={formattedDeck.followers} />
        )}
        {formattedDeck.landmarks.length !== 0 && (
          <CardTypeList type="Landmarks" cards={formattedDeck.landmarks} />
        )}
        {formattedDeck.spells.length !== 0 && (
          <CardTypeList type="Spells" cards={formattedDeck.spells} />
        )}
        {formattedDeck.equipment.length !== 0 && (
          <CardTypeList type="Equipment" cards={formattedDeck.equipment} />
        )}
      </>
    );
  } else {
    return <></>;
  }
}

interface CardTypeListProps {
  type: string;
  cards: CardCount[];
}

function CardTypeList({ type, cards }: CardTypeListProps) {
  return (
    <>
      <h3>{type}</h3>
      <ul className="list">
        {cards.map(({ card, count }) => (
          <li key={card.cardCode}>
            <Card card={card} count={count} />
          </li>
        ))}
      </ul>
    </>
  );
}

interface CardProps {
  card: CardData;
  count: number;
}

function Card({ card, count }: CardProps): JSX.Element {
  return (
    <>
      <div className="code">
        <span className="o-90">({card.cost}) </span>
        {card.type === "Unit" && (
          <span className="o-90">
            {card.attack}|{card.health}
          </span>
        )}{" "}
        {card.keywords.length !== 0 && (
          <span className="o-30">
            [{card.keywords.map((keyword) => keyword).join(", ")}]
          </span>
        )}{" "}
        <span>{card.name}</span> <span className="o-60"> x{count}</span>
      </div>
      <p className="mt1 mb2 f6 o-70">{card.descriptionRaw}</p>
    </>
  );
}
