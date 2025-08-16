import { NOTES } from "../../constants/notes"

// GENERAL
export const DEFAULT_TEMPO = 140
export const DEFAULT_SCALE = NOTES.E2.name
export const DEFAULT_METRONOME_FREQ: DNoteDur = 8
export const DEFAULT_METRONOME_SOUND: DrumTrack = {
	d: DEFAULT_METRONOME_FREQ,
	
}

// NOTE
export const DEFAULT_DEG: DNoteDeg = "1"
export const DEFAULT_SHIFT: number = 0
export const DEFAULT_DUR: DNoteDur = 8
export const DEFAULT_INT: DNoteInt = "1"
export const DEFAULT_DUR_MOD: number = 100
export const DEFAULT_NOTE: DNote = {
	shift: DEFAULT_SHIFT,
	deg: DEFAULT_DEG,
	int: DEFAULT_INT,
	dur: DEFAULT_DUR,
	durMod: DEFAULT_DUR_MOD
}