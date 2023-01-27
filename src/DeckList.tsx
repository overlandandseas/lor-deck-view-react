import { Deck } from "lor-deckcodes-ts";
import { CardData, getFormattedDeck } from "./utils/DeckUitls";

interface DeckListProps {
	deck: Deck | undefined;
}

export default function DeckList({ deck }: DeckListProps): JSX.Element {

	if (deck !== undefined) {
		const formattedDeck = getFormattedDeck(deck);
		return (
			<div>
				{formattedDeck.champions.length !== 0 &&
					(
						<div>
							<h3>Champions</h3>
							<ul className="list">
							{formattedDeck.champions.map(champion => <li key={champion.card.cardCode}><Card card={champion.card} count={champion.count} /></li>)}
							</ul>
						</div>
					)
				}
				{formattedDeck.followers.length !== 0 &&
					(
						<div>
							<h3>Followers</h3>
							<ul className="list">
								{formattedDeck.followers.map(follower => <li key={follower.card.cardCode}><Card card={follower.card} count={follower.count} /></li>)}
							</ul>
						</div>
					)
				}
				{formattedDeck.spells.length !== 0 &&
					(
						<div>
							<h3>Spells</h3>
							<ul className="list">
								{formattedDeck.spells.map(spell => <li key={spell.card.cardCode}><Card card={spell.card} count={spell.count} /></li>)}
							</ul>
						</div>
					)
				}
				{formattedDeck.landmarks.length !== 0 &&
					(
						<div>
							<h3>Landmarks</h3>
							<ul className="list">
								{formattedDeck.landmarks.map(landmark => <li key={landmark.card.cardCode}><Card card={landmark.card} count={landmark.count} /></li>)}
							</ul>
						</div>
					)
				}
			</div>
		)

	} else {
		return (<></>)
	}
}

interface CardProps {
	card: CardData,
	count: number
}

function Card({ card, count }: CardProps): JSX.Element {
	return (<span className="code">({card.cost}) {card.name} x{count}</span>)
}