import React from 'react'
import { NOTE_NAMES_IN_ORDER, NOTES, NOTES_IN_ORDER } from './constants/notes'

const DEFAULT_TEMPO = 140
const DEFAULT_DUR = 8
const DEFAULT_METRONOME_FREQ = 4
const DEFAULT_OCTAVE = 'todo'
const DEFAULT_SCALE = NOTES.E2.name
const DEFAULT_SHIFT = 0
const DEFAULT_INT = 1

const notes = [
    { shift: 0, deg: "1", int: "5", dur: 1, durMod: 600 },
    [2, { shift: 0, deg: "s4", int: "5", dur: 2, durMod: 0 }],
    [2, { shift: 0, deg: "s4", int: "5", dur: 4, durMod: 0 }],
    [4, { shift: 0, deg: "s4", int: "5", dur: 8, durMod: 0 }],
    { shift: 0, deg: "1", int: "5", dur: 1, durMod: 600 },
    [2, { shift: 0, deg: "s4", int: "5", dur: 2, durMod: 0 }],
    [2, { shift: 0, deg: "s4", int: "5", dur: 4, durMod: 0 }],
    [4, { shift: 0, deg: "s4", int: "5", dur: 8, durMod: 0 }],
    { shift: 0, deg: "1", int: "5", dur: 1, durMod: 600 },
    [2, { shift: 0, deg: "s4", int: "5", dur: 2, durMod: 0 }],
    [2, { shift: 0, deg: "s4", int: "5", dur: 4, durMod: 0 }],
    [4, { shift: 0, deg: "s4", int: "5", dur: 8, durMod: 0 }],
    { shift: 0, deg: "1", int: "5", dur: 1, durMod: 600 },
    [2, { shift: 0, deg: "s4", int: "5", dur: 2, durMod: 0 }],
    [2, { shift: 0, deg: "s4", int: "5", dur: 4, durMod: 0 }],
    [4, { shift: 0, deg: "s4", int: "5", dur: 8, durMod: 0 }],
]

export function App() {
	// Tempo
	const [tempo, setTempo] = React.useState(DEFAULT_TEMPO)
	const tempoInputRef = React.useRef<HTMLInputElement>(null)

	// Scale
	const [scale, setScale] = React.useState(DEFAULT_SCALE)

	// Shift
	const [shift, setShift] = React.useState(DEFAULT_SHIFT)

	// Dur
	const [dur, setDur] = React.useState<DNoteDur>(DEFAULT_DUR)

	// Int
	const [int, setInt] = React.useState<DNoteInt>(DEFAULT_DUR)

	// DurMod
	const [durMod, setDurMod] = React.useState<null | number>(null)

	// Metronome
	const [isMetronomeOn, setIsMetronomeOn] = React.useState(false)
	const [metronomeFreq, setMetronomeFreq] = React.useState(DEFAULT_METRONOME_FREQ)

	const DNOTE_DURS: DNoteDur[] = [1, 2, 4, 8, 16, 32]

	React.useEffect(() => {
		const keyboardEventHandler = (e: KeyboardEvent) => {

		console.log(e.key)
		switch (e.key) {
			// Tempo: Focus On/Off
			case "/":
				if (document.activeElement === tempoInputRef.current) {
					tempoInputRef?.current?.blur();
				} else {
					tempoInputRef.current?.focus();
				}
				break;
			// Scale: Down
			case "a":
				setScale(s => {
					const asdf = NOTES_IN_ORDER.findIndex(a => a.name === s)
					console.log(NOTES_IN_ORDER[asdf - 1].name) 
					return NOTES_IN_ORDER[asdf - 1].name
				})
				break;
			// Scale: Up
			case "s":
				setScale(s => {
					const asdf = NOTES_IN_ORDER.findIndex(a => a.name === s)
					console.log(NOTES_IN_ORDER[asdf + 1].name) 
					return NOTES_IN_ORDER[asdf + 1].name
				})
				break;
// Dur: Down
case "e":
    setDur(s => {
        const currentIndex = DNOTE_DURS.findIndex(d => d === s)
        const nextIndex = (currentIndex - 1 + DNOTE_DURS.length) % DNOTE_DURS.length
        return DNOTE_DURS[nextIndex]
    })
    break;
// Dur: Up
case "r":
    setDur(s => {
        const currentIndex = DNOTE_DURS.findIndex(d => d === s)
        const nextIndex = (currentIndex + 1) % DNOTE_DURS.length
        return DNOTE_DURS[nextIndex]
    })
    break;
			}
		};

		window.addEventListener("keydown", keyboardEventHandler)
		return () => window.removeEventListener("keydown", keyboardEventHandler)
	}, [])

	return (
		<>
			<div style={{ display: 'flex', gap: 16}}>
				{/* Tempo */}
				<div style={{ marginBottom: 12 }}>
					<label htmlFor="tempo" style={{ marginRight: 8 }}>Tempo:</label>
					<input
						style={{ width: 40 }} 
						value={tempo} 
						step={10} 
						onChange={e => setTempo(Number(e.target.value))} 
						type="number" 
						ref={tempoInputRef} 
						id="tempo" 
					/>
				</div>

				{/* Scale */}
				<div style={{ marginBottom: 12 }}>
					<label htmlFor="scale" style={{ marginRight: 8 }}>Scale:</label>
					<input
						style={{ width: 40 }} 
						value={scale} 
						type="text" 
						id="scale" 
					/>
				</div>
			</div>
			
			<div style={{
				display: "grid",
				gridTemplateColumns: "1fr 40px",
				columnGap: 20
			}}>
				<div>
					content
				</div>
				<div>
					{/* Shift */}
					<div style={{ marginBottom: 12 }}>
						<label htmlFor="shift" style={{ marginRight: 8 }}>Shift:</label>
						<input
							style={{ width: 40 }} 
							value={shift} 
							type="text" 
							id="scale" 
						/>
					</div>

					{/* Dur */}
					<div style={{ marginBottom: 12 }}>
						<label htmlFor="shift" style={{ marginRight: 8 }}>Dur:</label>
						<input
							style={{ width: 40 }} 
							value={dur} 
							type="text" 
							id="scale" 
						/>
					</div>

					{/* Int */}
					<div style={{ marginBottom: 12 }}>
						<label htmlFor="shift" style={{ marginRight: 8 }}>Int:</label>
						<input
							style={{ width: 40 }} 
							value={int} 
							type="text" 
							id="scale" 
						/>
					</div>

					{/* DurMod */}
					<div style={{ marginBottom: 12 }}>
						<label htmlFor="shift" style={{ marginRight: 8 }}>DurMod:</label>
						<input
							style={{ width: 40 }} 
							value={durMod ?? ""} 
							type={durMod ? "number" : "text"}
							step={25} 
							id="scale" 
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default App


			{/* <div style={{ marginBottom: 12 }}>
				<label htmlFor="dur" style={{ marginRight: 12 }}>Duration</label>
				<input value={dur} type="text" id="dur" />
			</div> */}
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

					{/* Tempo */}
			{/* <div style={{ marginBottom: 12 }}>
				<label htmlFor="tempo" style={{ marginRight: 12 }}>Tempo</label>
				<p>HK Mode: {isHotKeyMode.toString()}</p>
			</div> */}
