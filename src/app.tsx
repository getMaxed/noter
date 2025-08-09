import React from 'react'
import { NOTES, NOTES_IN_ORDER } from './constants/notes'

const DNOTE_DURS: DNoteDur[] = [1, 2, 4, 8, 16, 32]
const DNOTE_INTS: DNoteInt[] = ["1", "2min", "2maj", "3", "3min", "3maj", "4", "5", "6", "6min", "6maj", "7", "7min", "7maj", "8"] 
const SHIFT_VALS: number[] = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]

const DEFAULT_TEMPO = 140
const DEFAULT_SCALE = NOTES.E2.name
const DEFAULT_METRONOME_FREQ: DNoteDur = 4

const DEFAULT_SHIFT: number = 0
const DEFAULT_DUR: DNoteDur = 8
const DEFAULT_INT: DNoteInt = "1"
const DEFAULT_DEG: DNoteDeg = "1"
const DEFAULT_DUR_MOD: number = 100

const DEFAULT_NOTE: DNote = {
	shift: DEFAULT_SHIFT,
	deg: DEFAULT_DEG,
	int: DEFAULT_INT,
	dur: DEFAULT_DUR,
	durMod: DEFAULT_DUR_MOD
}

export function App() {
	/*
	|--------------------------------------------------------------------------
	| PLAYER
	|--------------------------------------------------------------------------
	*/
	
	const [currNote, setCurrNote] = React.useState(0)
	const [notes, setNotes] = React.useState<DNote[]>([DEFAULT_NOTE])

	const currNoteDeg = notes[currNote]?.deg

	/*
	|--------------------------------------------------------------------------
	| SETTINGS
	|--------------------------------------------------------------------------
	*/
	
	// Tempo
	const [tempo, setTempo] = React.useState(DEFAULT_TEMPO)
	const tempoInputRef = React.useRef<HTMLInputElement>(null)

	// Scale
	const [scale, setScale] = React.useState(DEFAULT_SCALE)

	// Metronome
	const [isMetronomeOn, setIsMetronomeOn] = React.useState(false)
	const [metronomeFreq, setMetronomeFreq] = React.useState(DEFAULT_METRONOME_FREQ)

	// Shift
	const [shift, setShift] = React.useState(DEFAULT_SHIFT)

	// Dur
	const [dur, setDur] = React.useState<DNoteDur>(DEFAULT_DUR)

	// Int
	const [int, setInt] = React.useState<DNoteInt>(DEFAULT_INT)
	const intSelectRef = React.useRef<HTMLSelectElement>(null)

	// DurMod
	const [durMod, setDurMod] = React.useState<null | number>(100)
	const durModInputRef = React.useRef<HTMLInputElement>(null)

	/*
	|--------------------------------------------------------------------------
	| KEYS CHANGE HANDLER
	|--------------------------------------------------------------------------
	*/

	React.useEffect(() => {
		const keyboardEventHandler = (e: KeyboardEvent) => {
		switch (e.key) {
			/*
			|--------------------------------------------------------------------------
			| TEMPO
			|--------------------------------------------------------------------------
			*/
			
			case "/":
				toggleInputFocus(tempoInputRef)
				break;

			/*
			|--------------------------------------------------------------------------
			| SCALE
			|--------------------------------------------------------------------------
			*/
			
			case "a":
				setScale(s => cycleArrayValue("down", NOTES_IN_ORDER.map(o => o.name), s))
				break;

			case "s":
				setScale(s => cycleArrayValue("up", NOTES_IN_ORDER.map(o => o.name), s))
				break;
	
			/*
			|--------------------------------------------------------------------------
			| METRONOME
			|--------------------------------------------------------------------------
			*/

			case "m":
				setIsMetronomeOn(s => !s)
				break;

			case ",":
				setMetronomeFreq(s => cycleArrayValue("down", DNOTE_DURS, s))
				break;

			case ".":
				setMetronomeFreq(s => cycleArrayValue("up", DNOTE_DURS, s))
				break;

			/*
			|--------------------------------------------------------------------------
			| SHIFT
			|--------------------------------------------------------------------------
			*/

			case "d":
				setShift(s => cycleArrayValue("down", SHIFT_VALS, s))
				break;
			
			case "f":
				setShift(s => cycleArrayValue("up", SHIFT_VALS, s))
				break;

			/*
			|--------------------------------------------------------------------------
			| DURATION
			|--------------------------------------------------------------------------
			*/

			case "e":
				setDur(s => cycleArrayValue("down", DNOTE_DURS, s))
				break;

			case "r":
				setDur(s => cycleArrayValue("up", DNOTE_DURS, s))
				break;

			/*
			|--------------------------------------------------------------------------
			| INTERVAL
			|--------------------------------------------------------------------------
			*/

			case "v":
				toggleInputFocus(intSelectRef)
				break

			/*	
			|--------------------------------------------------------------------------
			| DURATION MOD
			|--------------------------------------------------------------------------
			*/

			// Focus On/Off
			case "c":
				toggleInputFocus(durModInputRef)
				break;
			}
		};

		window.addEventListener("keydown", keyboardEventHandler)
		return () => window.removeEventListener("keydown", keyboardEventHandler)
	}, [])

	
	/*
	|--------------------------------------------------------------------------
	| RENDER
	|--------------------------------------------------------------------------
	*/			

	return (
		<div style={{ padding: "6px 12px" }}>
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

				{/* Metronome */}
				<div style={{ marginBottom: 12 }}>
					<label htmlFor="scale" style={{ marginRight: 8 }}>Metronome:</label>
					<input
						style={{ width: 40, marginRight: 12 }} 
						value={isMetronomeOn ? "On" : "Off"} 
						type="text" 
						id="scale" 
					/>
					{isMetronomeOn && (
						<input
							style={{ width: 40 }} 
							value={metronomeFreq} 
							onChange={() => {}}
							type="text" 
						/>
					)}
				</div>
			</div>
			
			<div style={{
				display: "grid",
				gridTemplateColumns: "1fr 60px",
				columnGap: 20
			}}>
				<div>
					<p style={{ textDecoration: "underline", marginBottom: 8 }}>Some Text</p>
					<div style={{ display: "flex", marginTop: 8, height: 20, border: "1px dotted red" }}>
						{notes.map((n, idx) => <Note isCurr={currNote === idx} key={idx} s={n} />)}
					</div>
				</div>
				<div>
					{/* Shift */}
					<div style={{ marginBottom: 12 }}>
						<label htmlFor="shift" style={{ marginRight: 8 }}>Shift:</label>
						<input
							style={{ width: 53 }} 
							value={shift} 
							type="text" 
							id="scale" 
						/>
					</div>

					{/* Dur */}
					<div style={{ marginBottom: 12 }}>
						<label htmlFor="shift" style={{ marginRight: 8 }}>Dur:</label>
						<input
							style={{ width: 53 }} 
							value={dur} 
							type="text" 
							id="scale" 
						/>
					</div>

					{/* Int */}
					<div style={{ marginBottom: 12 }}>
						<label htmlFor="int" style={{ marginRight: 8 }}>Int:</label>
						<select
							ref={intSelectRef}
							style={{ width: 60, height: 21 }}
							value={int}
							onChange={e => setInt(e.target.value as DNoteInt)}
							id="int"
						>
							{DNOTE_INTS.map(v => (
								<option key={v} value={v}>{v}</option>
							))}
						</select>
					</div>

					{/* DurMod */}
					<div style={{ marginBottom: 12 }}>
						<label htmlFor="shift" style={{ marginRight: 8 }}>DurMod:</label>
						<input
							ref={durModInputRef}
							onChange={e => setDurMod(Number(e.target.value))} 
							style={{ width: 53 }} 
							value={durMod ?? ""} 
							type={durMod ? "number" : "text"}
							step={25} 
							id="scale" 
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App

type NoteProps = { 
	isCurr: boolean
	s: DNote 
}

function Note({ s, isCurr }: NoteProps) {
	const { dur } = s
	const width = 100 / dur
	return (
		<div style={{ 
			border: "1px solid black", 
			backgroundColor: isCurr ? "white" : "teal", 
			height: 20, 
			width: `${width}%`, 
			fontSize: 12, 
			textAlign: "right" 
		}}>
			{dur}
		</div>
	)
}

function toggleInputFocus<T extends HTMLElement>(ref: React.RefObject<T | null>) {
	if (document.activeElement === ref.current) {
		ref.current?.blur();
	} else {
		ref.current?.focus();
	}
}

function cycleArrayValue<T>(direction: "down" | "up", array: T[], currentValue: T): T {
	if (!isStringOrNumberArray(array)) throw new Error(`@cycleArrayValue: Array must contain only strings or numbers`)

	const currentIndex = array.findIndex(item => item === currentValue)

	let nextIndex
	if (direction === "down") {
		nextIndex = (currentIndex - 1 + array.length) % array.length
	} else {
		nextIndex = (currentIndex + 1) % array.length
	}
	
	return array[nextIndex]
}

function isStringOrNumberArray(arr: unknown[]): boolean {
	if (arr.length === 0) return true
	
	const t = typeof arr[0]
	if (t !== "string" && t !== "number") throw new Error(`@isStringOrNumberArray: unsupported type: ${t}`)

	return arr.every(el => typeof el === t)
}