import { Deck, getDeckFromCode } from "lor-deckcodes-ts";
import { ChangeEvent, useState } from "react";
import DeckList from "./DeckList";

export default function DeckViewer(): JSX.Element {

	const [deckCode, setDeckCode] = useState<string>('');


	const [invalidDeckCode, setInvalidDeckCode] = useState<boolean>(false);

	const [decodedDeck, setDecodedDeck] = useState<Deck>();


	function handleDeckCodeChange(evt: ChangeEvent<HTMLInputElement>): void {
		const codeInput = evt.target.value;
		setDeckCode(codeInput);
		setInvalidDeckCode(false);
		try {
			setDecodedDeck(getDeckFromCode(codeInput));
		} catch (e) {
			setInvalidDeckCode(true);
		}
	}

	return (
		<div className="tl">
			<label htmlFor="deck-code-input">Deck Code</label><br />
			<input className="pa3 w-100" id="deck-code-input" value={deckCode} placeholder="Paste Deck Code..." onChange={handleDeckCodeChange} />

			<div className="mt4" />
			<ValidDeckList deckCode={deckCode} deck={decodedDeck} invalid={invalidDeckCode} />
		</div>
	);
}

interface ValidDeckListProps {
	deckCode: string,
	deck: Deck | undefined,
	invalid: boolean
}


function ValidDeckList({ deckCode, deck, invalid }: ValidDeckListProps): JSX.Element {

	if (deckCode === '') {
		return (<></>);
	}

	if (invalid) {
		return (
			<span className="red">Please enter a valid deck code..</span>
		);
	} else {
		return (
			<div>
				<code>Code: {deckCode}</code>
				<DeckList deck={deck} />

			</div>
		);
	}
}
