import React from 'react'
import { playMelody, startMetronome, stopMetronome } from '../audio-player';
import { NOTES, NOTES_IN_ORDER } from '../constants/notes';
import { KEY_PLAY, KEY_TEMPO_INPUT_FOCUS_TOGGLE, KEY_SCALE_DOWN, KEY_SCALE_UP, KEY_METRNOME_TOGGLE, KEY_METRNOME_FREQ_DOWN, KEY_METRNOME_FREQ_UP, KEY_DEG_1, KEY_DEG_F2, KEY_DEG_2, KEY_DEG_3, KEY_DEG_S3, KEY_DEG_4, KEY_DEG_S4, KEY_DEG_5, KEY_DEG_6, KEY_DEG_S6, KEY_DEG_7, KEY_DEG_S7, KEY_SHIFT_DOWN, KEY_SHIFT_UP, KEY_DURATION_DOWN, KEY_DURATION_UP, KEY_SELECT_INT_FOCUS_TOGGLE, KEY_SELECT_DURMOD_FOCUS_TOGGLE } from './constants/shortcuts.player';
import { DEFAULT_TEMPO, DEFAULT_SCALE, DEFAULT_METRONOME_FREQ, DEFAULT_NOTE } from './constants/defaults.player';
import { DNOTE_DURS, SHIFT_VALS, DNOTE_INTS } from '../constants/dnote';


export function NotePlayer() {
    const [notes, setNotes] = React.useState<DNote[]>([DEFAULT_NOTE])
    const [activeNoteIdx, setActiveNoteIdx] = React.useState(0)
    const [selectionStartIdx, setSelectionStartIdx] = React.useState<null | number>(null)

    const currNote = React.useMemo(() => notes[activeNoteIdx], [notes, activeNoteIdx])

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

    function updateNote<K extends keyof DNote>(key: K, value: DNote[K]) {
        setNotes(prev =>
            prev.map((n, i) => (i === activeNoteIdx ? { ...n, [key]: value } : n))
        );
    }

    function unFocus() {
        if (document.activeElement && document.activeElement !== document.body) {
            (document.activeElement as HTMLElement).blur();
        }
    }
    
    /*
    |--------------------------------------------------------------------------
    | SETTINGS: GENERAL
    |--------------------------------------------------------------------------
    */
    
    // Tempo
    const [tempo, setTempo] = React.useState(DEFAULT_TEMPO)
    const tempoInputRef = React.useRef<HTMLInputElement>(null)
    
    // Root
    const [root, setRoot] = React.useState(DEFAULT_SCALE)

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
            const isBodyNotFocused = document.activeElement !== document.body
            console.log({isBodyNotFocused})
            // console.log('Key pressed: ', e.key)
            switch (e.key) {
                case "Escape":
                    setSelectionStartIdx(null);
                    unFocus()
                    break;

                /*
                |--------------------------------------------------------------------------
                | ASDF
                |--------------------------------------------------------------------------
                */
                
                case "ArrowRight":
                    unFocus()

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
                    unFocus()

                    if (e.shiftKey) {
                        if (selectionStartIdx === null) {
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

                // TODO: refactor this whole thing
                case "Delete": {
                    if (notes.length <= 1) return
                    const newNotes = notes.filter((_, idx) => !isNoteActive(idx))
                    setNotes(newNotes.length === 0 ? [notes[0]] : newNotes)

                    if (newNotes.length === 0) {
                        setActiveNoteIdx(0)
                    } else if (selectionStartIdx !== null) {
                        setActiveNoteIdx(Math.min(newNotes.length - 1, activeNotesRange[0]))
                    } else {
                        setActiveNoteIdx(Math.min(newNotes.length - 1, activeNoteIdx - (isLatestNote ? 1 : 0)))
                    }
                    
                    setSelectionStartIdx(null)
                    break;
                }

                /*
                |--------------------------------------------------------------------------
                | ASDF23
                |--------------------------------------------------------------------------
                */
                
                case KEY_PLAY:
                    playMelody({ notes, settings: {
                        root: NOTES[root],					
                        tempo: tempo
                    } })
                    break;

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
                    setRoot(s => cycleArrayValue("down", NOTES_IN_ORDER.map(o => o.name), s))
                    break;

                case KEY_SCALE_UP:
                    setRoot(s => cycleArrayValue("up", NOTES_IN_ORDER.map(o => o.name), s))
                    break;
        
                /*
                |--------------------------------------------------------------------------
                | METRONOME
                |--------------------------------------------------------------------------
                */

                case KEY_METRNOME_TOGGLE:
                    setIsMetronomeOn(prev => {
                        const newState = !prev
                        
                        if (newState) {
                            startMetronome(tempo, metronomeFreq)
                        } else {
                            stopMetronome()
                        }
                        
                        return newState
                    })
                    break;

                case KEY_METRNOME_FREQ_DOWN:
                    setMetronomeFreq(s => {
                        const newFreq = cycleArrayValue("down", DNOTE_DURS, s)
                        
                        if (isMetronomeOn) {
                            stopMetronome()
                            setTimeout(() => startMetronome(tempo, newFreq), 0)
                        }
                        
                        return newFreq
                    })
                    break;

                case KEY_METRNOME_FREQ_UP:
                    setMetronomeFreq(s => {
                        const newFreq = cycleArrayValue("up", DNOTE_DURS, s)
                        
                        // If metronome is currently playing, restart it with new frequency
                        if (isMetronomeOn) {
                            stopMetronome()
                            setTimeout(() => startMetronome(tempo, newFreq), 0)
                        }
                        
                        return newFreq
                    })
                    break;

                /*
                |--------------------------------------------------------------------------
                | DEG
                |--------------------------------------------------------------------------
                */

                case KEY_DEG_1:
                    if (isBodyNotFocused) return
                    updateNote("deg", "1");
                    break;
                case KEY_DEG_F2:
                    if (isBodyNotFocused) return
                    updateNote("deg", "f2");
                    break;
                case KEY_DEG_2:
                    if (isBodyNotFocused) return
                    updateNote("deg", "2");
                    break;
                case KEY_DEG_3:
                    if (isBodyNotFocused) return
                    updateNote("deg", "3");
                    break;
                case KEY_DEG_S3:
                    if (isBodyNotFocused) return
                    updateNote("deg", "s3");
                    break;
                case KEY_DEG_4:
                    if (isBodyNotFocused) return
                    updateNote("deg", "4");
                    break;
                case KEY_DEG_S4:
                    if (isBodyNotFocused) return
                    updateNote("deg", "s4");
                    break;
                case KEY_DEG_5:
                    if (isBodyNotFocused) return
                    updateNote("deg", "5");
                    break;
                case KEY_DEG_6:
                    if (isBodyNotFocused) return
                    updateNote("deg", "6");
                    break;
                case KEY_DEG_S6:
                    if (isBodyNotFocused) return
                    updateNote("deg", "s6");
                    break;
                case KEY_DEG_7:
                    if (isBodyNotFocused) return
                    updateNote("deg", "7");
                    break;
                case KEY_DEG_S7:
                    if (isBodyNotFocused) return
                    updateNote("deg", "s7");
                    break;

                /*
                |--------------------------------------------------------------------------
                | SHIFT
                |--------------------------------------------------------------------------
                */

                case KEY_SHIFT_DOWN:
                    if (isBodyNotFocused) return
                    setNotes(prev =>
                        prev.map((settings, i) => (i === activeNoteIdx ? { ...settings, "shift": cycleArrayValue("down", SHIFT_VALS, settings.shift) } : settings))
                    );
                    break;
                
                case KEY_SHIFT_UP:
                    if (isBodyNotFocused) return
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
                    if (isBodyNotFocused) return
                    setNotes(prev =>
                        prev.map((settings, i) => (i === activeNoteIdx ? { ...settings, "dur": cycleArrayValue("down", DNOTE_DURS, settings.dur) } : settings))
                    );
                    break;

                case KEY_DURATION_UP:
                    if (isBodyNotFocused) return
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
                    // setTimeout(() => {
                    //     console.log('Now activeElement is:', document.activeElement)
                    // }, 0)
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
    }, [notes, activeNoteIdx, activeNotesRange, root, tempo])
    
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
                    <label htmlFor="root" style={{ marginRight: 8 }}>Scale:</label>
                    <input
                        style={{ width: 40 }} 
                        value={root} 
                        type="text" 
                        id="root" 
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
                            id="root" 
                        />
                    </div>

                    {/* Dur */}
                    <div style={{ marginBottom: 12 }}>
                        <label htmlFor="shift" style={{ marginRight: 8 }}>Dur:</label>
                        <input
                            style={{ width: 53 }} 
                            value={currNote.dur} 
                            type="text" 
                            id="root" 
                        />
                    </div>

                    {/* Int */}
                    <div style={{ marginBottom: 12 }}>
                        <label htmlFor="int" style={{ marginRight: 8 }}>Int:</label>
                        <select
                            ref={intSelectRef}
                            style={{ width: 60, height: 21 }}
                            value={currNote.int}
                            onChange={e => {
                                if (!(document.activeElement && document.activeElement !== document.body)) return
                                updateNote("int", e.target.value as DNoteInt)
                                setTimeout(() => {
                                    intSelectRef.current?.focus()
                                }, 0)
                            }}
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
                            id="root" 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

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
    const { deg, dur, int, shift } = s
    const width = 100 / dur
    return (
        <div style={{ 
            border: "1px solid black", 
            backgroundColor: isActive ? "white" : "DarkTurquoise", 
            height: 20, 
            width: `${width}%`, 
            fontSize: 15, 
            textAlign: "center", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <span style={{ fontWeight: "bold" }}>d{renderShift(shift)}{deg}</span>
            <span style={{}}>i{int}</span>
            <span style={{}}>x{dur}</span>
        </div>
    )

    function renderShift(shift: number): string {
        if ((shift < -5) || (shift > 5)) throw new Error(`Shift should be within -5 and 5`)
        if (!shift) return ""
        
        const isLower = Math.sign(shift) === -1
        const n = Math.abs(shift)
        return (isLower ? "$" : "_").repeat(n)
    }
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