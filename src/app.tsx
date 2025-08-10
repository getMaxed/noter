import React from 'react'
import { NOTES, NOTES_IN_ORDER } from './constants/notes'

const DNOTE_DURS: DNoteDur[] = [1, 2, 4, 8, 16, 32]
const DNOTE_INTS: DNoteInt[] = ["1", "2min", "2maj", "3", "3min", "3maj", "4", "5", "6", "6min", "6maj", "7", "7min", "7maj", "8"] 
const SHIFT_VALS: number[] = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]

/*
|--------------------------------------------------------------------------
| DEFAULTS
|--------------------------------------------------------------------------
*/

const DEFAULT_TEMPO = 140
const DEFAULT_SCALE = NOTES.E2.name
const DEFAULT_METRONOME_FREQ: DNoteDur = 4

const DEFAULT_DEG: DNoteDeg = "1"
const DEFAULT_SHIFT: number = 0
const DEFAULT_DUR: DNoteDur = 8
const DEFAULT_INT: DNoteInt = "1"
const DEFAULT_DUR_MOD: number = 100

const DEFAULT_NOTE: DNote = {
	shift: DEFAULT_SHIFT,
	deg: DEFAULT_DEG,
	int: DEFAULT_INT,
	dur: DEFAULT_DUR,
	durMod: DEFAULT_DUR_MOD
}

/*
|--------------------------------------------------------------------------
| SHORTCUTS
|--------------------------------------------------------------------------
*/

// GENERAL SETTINGS
const KEY_TEMPO_INPUT_FOCUS_TOGGLE = "/"
const KEY_SCALE_DOWN = ";"
const KEY_SCALE_UP = "'"
const KEY_METRNOME_TOGGLE = "m"
const KEY_METRNOME_FREQ_DOWN = ","
const KEY_METRNOME_FREQ_UP = "."

// NOTE SETTINGS: DEG
const KEY_DEG_1 = "1"
const KEY_DEG_F2 = "q"
const KEY_DEG_2 = "2"
const KEY_DEG_3 = "3"
const KEY_DEG_S3 = "e"
const KEY_DEG_4 = "4"
const KEY_DEG_S4 = "r"
const KEY_DEG_5 = "5"
const KEY_DEG_6 = "6"
const KEY_DEG_S6 = "y"
const KEY_DEG_7 = "7"
const KEY_DEG_S7 = "u"

// NOTE SETTINGS
const KEY_SHIFT_DOWN = "o"
const KEY_SHIFT_UP = "p"
const KEY_DURATION_DOWN = "]"
const KEY_DURATION_UP = "["
const KEY_SELECT_INT_FOCUS_TOGGLE = "\\"
const KEY_SELECT_DURMOD_FOCUS_TOGGLE = "l"

export function App() {
	/*
	|--------------------------------------------------------------------------
	| PLAYER
	|--------------------------------------------------------------------------
	*/
	
	const [notes, setNotes] = React.useState<DNote[]>([DEFAULT_NOTE])
	const [activeNoteIdx, setActiveNoteIdx] = React.useState(0)
	const [selectionStartIdx, setSelectionStartIdx] = React.useState<null | number>(null)

	const activeNotesRange = React.useMemo(() => {
		if (selectionStartIdx === null) return []
		return [Math.min(activeNoteIdx, selectionStartIdx), Math.max(activeNoteIdx, selectionStartIdx)]

	}, [activeNoteIdx, selectionStartIdx])

	function isNoteActive(idx: number) {
		const isSelected = activeNotesRange.length
		if (!isSelected) return idx === activeNoteIdx
		
		const [min, max] = activeNotesRange
		return idx >= min && idx <= max
	}

	const currNote = React.useMemo(() => notes[activeNoteIdx], [notes, activeNoteIdx])

	function updateNote<K extends keyof DNote>(key: K, value: DNote[K]) {
  		setNotes(prev =>
    		prev.map((n, i) => (i === activeNoteIdx ? { ...n, [key]: value } : n))
  		);
	}
	
	/*
	|--------------------------------------------------------------------------
	| SETTINGS: GENERAL
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

	/*
	|--------------------------------------------------------------------------
	| SETTINGS: NOTE
	|--------------------------------------------------------------------------
	*/
	
	const intSelectRef = React.useRef<HTMLSelectElement>(null)
	const durModInputRef = React.useRef<HTMLInputElement>(null)

	/*
	|--------------------------------------------------------------------------
	| KEYS CHANGE HANDLER
	|--------------------------------------------------------------------------
	*/

	React.useEffect(() => {
		const keyboardEventHandler = (e: KeyboardEvent) => {
			const isLatestNote = activeNoteIdx === notes.length - 1
			// console.log('Key pressed: ', e.key)
			switch (e.key) {
				/*
				|--------------------------------------------------------------------------
				| ASDF
				|--------------------------------------------------------------------------
				*/
				
				case "ArrowRight":
					// TODO: separate out this functionality
					if (e.shiftKey) {
						if (selectionStartIdx === null) {
							setSelectionStartIdx(activeNoteIdx)
						}
					} else {
						setSelectionStartIdx(null)
					}

					setActiveNoteIdx(s => s + 1)
					if (isLatestNote) {
						setNotes(prev => {
							const updatedNotes = [ ...prev ]
							const latestNoteSettings = { ...prev[activeNoteIdx] }
							updatedNotes.push(latestNoteSettings)
							return updatedNotes
						});
					}
					break;

				/*
				|--------------------------------------------------------------------------
				| ASDF
				|--------------------------------------------------------------------------
				*/

				case "ArrowLeft":
					if (e.shiftKey) {
						if (!selectionStartIdx) {
							setSelectionStartIdx(activeNoteIdx)
						}
					} else {
						setSelectionStartIdx(null)
					}

					setActiveNoteIdx(s => s ? s - 1 : s)
					break;

				/*
				|--------------------------------------------------------------------------
				| ASDF
				|--------------------------------------------------------------------------
				*/

				case "Delete": {
					if (notes.length <= 1) return
					const newNotes = notes.filter((_, idx) => !isNoteActive(idx))
					setNotes(newNotes)

					// trg: TODO: refactor
					if (selectionStartIdx !== null) {
						setActiveNoteIdx(Math.min(newNotes.length - 1, activeNotesRange[0]))
					} else {
						setActiveNoteIdx(Math.min(newNotes.length - 1, activeNoteIdx - (isLatestNote ? 1 : 0)))
					}
					
					setSelectionStartIdx(null)
					break;
				}

				/*
				|--------------------------------------------------------------------------
				| TEMPO
				|--------------------------------------------------------------------------
				*/
				
				case KEY_TEMPO_INPUT_FOCUS_TOGGLE:
					toggleInputFocus(tempoInputRef)
					break;

				/*
				|--------------------------------------------------------------------------
				| SCALE
				|--------------------------------------------------------------------------
				*/
				
				case KEY_SCALE_DOWN:
					setScale(s => cycleArrayValue("down", NOTES_IN_ORDER.map(o => o.name), s))
					break;

				case KEY_SCALE_UP:
					setScale(s => cycleArrayValue("up", NOTES_IN_ORDER.map(o => o.name), s))
					break;
		
				/*
				|--------------------------------------------------------------------------
				| METRONOME
				|--------------------------------------------------------------------------
				*/

				case KEY_METRNOME_TOGGLE:
					setIsMetronomeOn(s => !s)
					break;

				case KEY_METRNOME_FREQ_DOWN:
					setMetronomeFreq(s => cycleArrayValue("down", DNOTE_DURS, s))
					break;

				case KEY_METRNOME_FREQ_UP:
					setMetronomeFreq(s => cycleArrayValue("up", DNOTE_DURS, s))
					break;

				/*
				|--------------------------------------------------------------------------
				| DEG
				|--------------------------------------------------------------------------
				*/

				case KEY_DEG_1:
					updateNote("deg", "1");
					break;
				case KEY_DEG_F2:
					updateNote("deg", "f2");
					break;
				case KEY_DEG_2:
					updateNote("deg", "2");
					break;
				case KEY_DEG_3:
					updateNote("deg", "3");
					break;
				case KEY_DEG_S3:
					updateNote("deg", "s3");
					break;
				case KEY_DEG_4:
					updateNote("deg", "4");
					break;
				case KEY_DEG_S4:
					updateNote("deg", "s4");
					break;
				case KEY_DEG_5:
					updateNote("deg", "5");
					break;
				case KEY_DEG_6:
					updateNote("deg", "6");
					break;
				case KEY_DEG_S6:
					updateNote("deg", "s6");
					break;
				case KEY_DEG_7:
					updateNote("deg", "7");
					break;
				case KEY_DEG_S7:
					updateNote("deg", "s7");
					break;

				/*
				|--------------------------------------------------------------------------
				| SHIFT
				|--------------------------------------------------------------------------
				*/

				case KEY_SHIFT_DOWN:
					setNotes(prev =>
						prev.map((settings, i) => (i === activeNoteIdx ? { ...settings, "shift": cycleArrayValue("down", SHIFT_VALS, settings.shift) } : settings))
					);
					break;
				
				case KEY_SHIFT_UP:
					setNotes(prev =>
						prev.map((settings, i) => (i === activeNoteIdx ? { ...settings, "shift": cycleArrayValue("up", SHIFT_VALS, settings.shift) } : settings))
					);
					break;

				/*
				|--------------------------------------------------------------------------
				| DURATION
				|--------------------------------------------------------------------------
				*/

				case KEY_DURATION_DOWN:
					setNotes(prev =>
						prev.map((settings, i) => (i === activeNoteIdx ? { ...settings, "dur": cycleArrayValue("down", DNOTE_DURS, settings.dur) } : settings))
					);
					break;

				case KEY_DURATION_UP:
					setNotes(prev =>
						prev.map((settings, i) => (i === activeNoteIdx ? { ...settings, "dur": cycleArrayValue("up", DNOTE_DURS, settings.dur) } : settings))
					);
					break;

				/*
				|--------------------------------------------------------------------------
				| INTERVAL
				|--------------------------------------------------------------------------
				*/

				case KEY_SELECT_INT_FOCUS_TOGGLE:
					toggleInputFocus(intSelectRef)
					break

				/*	
				|--------------------------------------------------------------------------
				| DURATION MOD
				|--------------------------------------------------------------------------
				*/

				// Focus On/Off
				case KEY_SELECT_DURMOD_FOCUS_TOGGLE:
					toggleInputFocus(durModInputRef)
					break;
				}
		};

		window.addEventListener("keydown", keyboardEventHandler)
		return () => window.removeEventListener("keydown", keyboardEventHandler)
	}, [notes, activeNoteIdx, activeNotesRange])
	
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
					<label htmlFor="metronome" style={{ marginRight: 8 }}>Metronome:</label>
					<input
						style={{ width: 40, marginRight: 12 }} 
						value={isMetronomeOn ? "On" : "Off"} 
						type="text" 
						id="metronome" 
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
					{/* trg */}
						{notes.map((n, idx) => <Note isActive={isNoteActive(idx)} key={idx} s={n} />)}
					</div>
				</div>
				<div>
					{/* Deg */}
					<div style={{ marginBottom: 12 }}>
						<label htmlFor="deg" style={{ marginRight: 8 }}>Deg:</label>
						<input
							style={{ width: 53 }} 
							value={currNote.deg} 
							type="text" 
							id="deg" 
						/>
					</div>

					{/* Shift */}
					<div style={{ marginBottom: 12 }}>
						<label htmlFor="shift" style={{ marginRight: 8 }}>Shift:</label>
						<input
							style={{ width: 53 }} 
							value={currNote.shift} 
							type="text" 
							id="scale" 
						/>
					</div>

					{/* Dur */}
					<div style={{ marginBottom: 12 }}>
						<label htmlFor="shift" style={{ marginRight: 8 }}>Dur:</label>
						<input
							style={{ width: 53 }} 
							value={currNote.dur} 
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
							value={currNote.int}
							onChange={e => updateNote("int", e.target.value as DNoteInt)}
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
							onChange={e => updateNote("durMod", Number(e.target.value))} 
							style={{ width: 53 }} 
							value={currNote.durMod ?? ""} 
							type={currNote.durMod ? "number" : "text"}
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
	isActive: boolean
	s: DNote 
}

// function Riff(notes: DNote[]) {
// 	const rows = React.useMemo(() => {
// 		const a = []
// 	}, [notes])
// }

function Note({ s, isActive }: NoteProps) {
	const { deg, dur } = s
	const width = 100 / dur
	return (
		<div style={{ 
			border: "1px solid black", 
			backgroundColor: isActive ? "white" : "DarkTurquoise", 
			height: 20, 
			width: `${width}%`, 
			fontSize: 12, 
			textAlign: "center", 
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		}}>
			{deg}-{dur}
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

function cycleArrayValue<T extends string | number>(
	direction: "down" | "up",
	array: readonly T[],
	currentValue: T
): T {
	if (!array.every(i => typeof i === "string" || typeof i === "number")) {
		throw new Error(`@cycleArrayValue: Array must contain only strings or numbers`);
	}

	let currentIndex = array.findIndex(item => item === (currentValue as T));

	if (currentIndex === -1) {
		const s = String(currentValue);
		currentIndex = array.findIndex(item => String(item) === s);
	}

	if (currentIndex === -1) {
		throw new Error(`@cycleArrayValue: currentValue (${currentValue}) not found in array`);
	}

	const delta = direction === "down" ? -1 : 1;
	const nextIndex = (currentIndex + delta + array.length) % array.length;

	return array[nextIndex];
}