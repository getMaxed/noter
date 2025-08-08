import React from 'react'
import { NOTES, NOTES_IN_ORDER } from './constants/notes'

const DNOTE_DURS: DNoteDur[] = [1, 2, 4, 8, 16, 32]
const DNOTE_INTS: DNoteInt[] = ["1", "2min", "2maj", "3", "3min", "3maj", "4", "5", "6", "6min", "6maj", "7", "7min", "7maj", "8"] 
const SHIFT_VALS: number[] = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]

const DEFAULT_TEMPO = 140
const DEFAULT_SCALE = NOTES.E2.name
const DEFAULT_METRONOME_FREQ: DNoteDur = 4
const DEFAULT_SHIFT = 0
const DEFAULT_DUR: DNoteDur = 8
const DEFAULT_INT: DNoteInt = "1"

export function App() {
	// Tempo: "/"
	const [tempo, setTempo] = React.useState(DEFAULT_TEMPO)
	const tempoInputRef = React.useRef<HTMLInputElement>(null)

	// Scale: "a" / "s"
	const [scale, setScale] = React.useState(DEFAULT_SCALE)

	// Metronome: "m", "," / "."
	const [isMetronomeOn, setIsMetronomeOn] = React.useState(false)
	const [metronomeFreq, setMetronomeFreq] = React.useState(DEFAULT_METRONOME_FREQ)

	// Shift: "d" / "f"
	const [shift, setShift] = React.useState(DEFAULT_SHIFT)

	// Dur: "e" / "r"
	const [dur, setDur] = React.useState<DNoteDur>(DEFAULT_DUR)

	// Int: "v"
	const [int, setInt] = React.useState<DNoteInt>(DEFAULT_INT)
	const intSelectRef = React.useRef<HTMLSelectElement>(null)

	// DurMod: "c"
	const [durMod, setDurMod] = React.useState<null | number>(100)
	const durModInputRef = React.useRef<HTMLInputElement>(null)


	React.useEffect(() => {
		const keyboardEventHandler = (e: KeyboardEvent) => {
		switch (e.key) {
			/*
			|--------------------------------------------------------------------------
			| TEMPO
			|--------------------------------------------------------------------------
			*/
			
			// Focus On/Off
			case "/":
				if (document.activeElement === tempoInputRef.current) {
					tempoInputRef?.current?.blur();
				} else {
					tempoInputRef.current?.focus();
				}
				break;

			/*
			|--------------------------------------------------------------------------
			| SCALE
			|--------------------------------------------------------------------------
			*/
			
			// Down
			case "a":
				setScale(s => {
					const asdf = NOTES_IN_ORDER.findIndex(a => a.name === s)
					console.log(NOTES_IN_ORDER[asdf - 1].name) 
					return NOTES_IN_ORDER[asdf - 1].name
				})
				break;

			// Up
			case "s":
				setScale(s => {
					const asdf = NOTES_IN_ORDER.findIndex(a => a.name === s)
					console.log(NOTES_IN_ORDER[asdf + 1].name) 
					return NOTES_IN_ORDER[asdf + 1].name
				})
				break;
	
			/*
			|--------------------------------------------------------------------------
			| METRONOME
			|--------------------------------------------------------------------------
			*/

			// Toggle
			case "m":
				setIsMetronomeOn(s => !s)
				break;

			// Dur: Down
			case ",":
				setMetronomeFreq(s => {
					const currentIndex = DNOTE_DURS.findIndex(d => d === s)
					const nextIndex = (currentIndex - 1 + DNOTE_DURS.length) % DNOTE_DURS.length
					return DNOTE_DURS[nextIndex]
				})
				break;

			// Dur: Up
			case ".":
				setMetronomeFreq(s => {
					const currentIndex = DNOTE_DURS.findIndex(d => d === s)
					const nextIndex = (currentIndex + 1) % DNOTE_DURS.length
					return DNOTE_DURS[nextIndex]
				})
				break;

			/*
			|--------------------------------------------------------------------------
			| SHIFT
			|--------------------------------------------------------------------------
			*/

			// Down
			case "d":
				setShift(s => {
					const currentIndex = SHIFT_VALS.findIndex(d => d === s)
					const nextIndex = (currentIndex - 1 + SHIFT_VALS.length) % SHIFT_VALS.length
					return SHIFT_VALS[nextIndex]
				})
				break;

			// Up
			case "f":
				setShift(s => {
					const currentIndex = SHIFT_VALS.findIndex(d => d === s)
					const nextIndex = (currentIndex + 1 + SHIFT_VALS.length) % SHIFT_VALS.length
					return SHIFT_VALS[nextIndex]
				})
				break;

			/*
			|--------------------------------------------------------------------------
			| DURATION
			|--------------------------------------------------------------------------
			*/

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

			/*
			|--------------------------------------------------------------------------
			| INTERVAL
			|--------------------------------------------------------------------------
			*/

			case "v":
				if (document.activeElement === intSelectRef.current) {
					intSelectRef.current?.blur()
				} else {
					intSelectRef.current?.focus()
				}
				break

			/*	
			|--------------------------------------------------------------------------
			| DURATION MOD
			|--------------------------------------------------------------------------
			*/

			// Focus On/Off
			case "c":
				if (document.activeElement === durModInputRef.current) {
					durModInputRef?.current?.blur();
				} else {
					durModInputRef.current?.focus();
				}
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
						<label htmlFor="int" style={{ marginRight: 8 }}>Int:</label>
						<select
							ref={intSelectRef}
							style={{ width: 60 }}
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