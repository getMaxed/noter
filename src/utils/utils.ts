import { DEFAULT_MELODY_SETTINGS } from "../constants/defaults"

export function flattenEntries<T>(entries: (T | [number, T])[]): T[] {
	return entries.flatMap(e =>
		Array.isArray(e) ? Array(e[0]).fill(e[1]) : [e]
	)
}

export function setMelodySettings(settingsProvided?: MelodySettings): Required<MelodySettings> {
	return {
        "dur": settingsProvided?.dur ?? DEFAULT_MELODY_SETTINGS.dur,
        "int": settingsProvided?.int ?? DEFAULT_MELODY_SETTINGS.int,
        "root": settingsProvided?.root ?? DEFAULT_MELODY_SETTINGS.root,
        "tempo": settingsProvided?.tempo ?? DEFAULT_MELODY_SETTINGS.tempo,
        "instrument": settingsProvided?.instrument ?? DEFAULT_MELODY_SETTINGS.instrument,
    }
}

export function getBeatDuration(tempo: number): number {
	return 60 / tempo
}

export function getPlayableNotes(notes: NoteEntry[]): PlayableNote[] {
    return notes.map(n => ({ ...n, notes: n.pitchNotes.map(n => n.label) }))
}