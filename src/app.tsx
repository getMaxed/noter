import React from 'react'

const DEFAULT_TEMPO = 140
const DEFAULT_DUR = 8
const DEFAULT_METRONOME_FREQ = 4

export function App() {
	// Tempo
	const [tempo, setTempo] = React.useState(DEFAULT_TEMPO)
	const tempoInputRef = React.useRef<HTMLInputElement>(null)

	// Metronome
	const [isMetronomeOn, setIsMetronomeOn] = React.useState(false)
	const [metronomeFreq, setMetronomeFreq] = React.useState(DEFAULT_METRONOME_FREQ)

	

	
	const [dur, setDur] = React.useState(DEFAULT_DUR)


	React.useEffect(() => {
		const keyboardEventHandler = (e: KeyboardEvent) => {

		switch (e.key) {
			case "/":
				if (document.activeElement === tempoInputRef.current) {
					tempoInputRef?.current?.blur();
				} else {
					tempoInputRef.current?.focus();
				}
				break;
			}
		};

		window.addEventListener("keydown", keyboardEventHandler)
		return () => window.removeEventListener("keydown", keyboardEventHandler)
	}, [])

	return (
		<>
			{/* Tempo */}
			{/* <div style={{ marginBottom: 12 }}>
				<label htmlFor="tempo" style={{ marginRight: 12 }}>Tempo</label>
				<p>HK Mode: {isHotKeyMode.toString()}</p>
			</div> */}

			{/* Tempo */}
			<div style={{ marginBottom: 12 }}>
				<label htmlFor="tempo" style={{ marginRight: 12 }}>Tempo</label>
				<input value={tempo} step={10} onChange={e => setTempo(Number(e.target.value))} type="number" ref={tempoInputRef} id="tempo" />
			</div>

			{/* <div style={{ marginBottom: 12 }}>
				<label htmlFor="dur" style={{ marginRight: 12 }}>Duration</label>
				<input value={dur} type="text" id="dur" />
			</div> */}

			<div style={{ marginBottom: 12 }}>
				<input type="text" />
			</div>

			<div style={{ marginBottom: 12 }}>
				<input type="text" />
			</div>
		</>
	)
}

export default App


			// case "a":
			// 	setIsMetronomeOn(m => !m);
			// 	break;
			// case "w":
			// 	setDur(prev => {
			// 		const i = DURATION_STEPS.indexOf(prev);
			// 		return DURATION_STEPS[(i + 1) % DURATION_STEPS.length];
			// 	});
			// 	break;
			// case "s":
			// 	setDur(prev => {
			// 		const i = DURATION_STEPS.indexOf(prev);
			// 		return DURATION_STEPS[(i - 1 + DURATION_STEPS.length) % DURATION_STEPS.length];
			// 	});
			// 	break;


			// const [isHotKeyMode, setIsHotKeyMode] = React.useState(false)

				// if (e.altKey && e.shiftKey) {
	// if (e.ctrlKey) {
		// e.preventDefault();
		// e.stopPropagation();