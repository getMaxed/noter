import { DEFAULT_MELODY_SETTINGS } from "../constants/defaults";
import { MAP_DEGREE_TO_BASE_SEMITONE, MAP_DEGREE_TO_INTERVAL_SEMITONE } from "../constants/degrees";
import { NOTES_IN_ORDER } from '../constants/notes';

export function parseDNotesIntoNoteEntrys(
    dNotes: DNote[],
    settingsProvided: MelodySettings
): NoteEntry[] {
    const settings: Required<MelodySettings> = {
        "dur": settingsProvided.dur ?? DEFAULT_MELODY_SETTINGS.dur,
        "int": settingsProvided.int ?? DEFAULT_MELODY_SETTINGS.int,
        "root": settingsProvided.root ?? DEFAULT_MELODY_SETTINGS.root,
        "tempo": settingsProvided.tempo ?? DEFAULT_MELODY_SETTINGS.tempo,
        "instrument": settingsProvided.instrument ?? DEFAULT_MELODY_SETTINGS.instrument,
    }

    const rootNoteIdx = NOTES_IN_ORDER.findIndex(n => n.name === settings.root.name)

    const result: NoteEntry[] = []

    for (const dNote of dNotes) {
        const notes = resolveDNotesToNotes(dNote.shift, dNote.deg, dNote.int)

        result.push({
            pitchNotes: notes,
            dur: dNote.dur,
            modLengthByPerc: dNote.durMod || undefined
        })
    }

    return result

    function resolveDNotesToNotes(
        shift: number, 
        deg: DNoteDeg,
        int: DNoteInt
    ): Note[] {
        const shiftSemitones = shift * 12

        const baseIdx = rootNoteIdx + shiftSemitones

        const noteIdx = baseIdx + MAP_DEGREE_TO_BASE_SEMITONE[deg]
        const note = NOTES_IN_ORDER[noteIdx]

        if (!int || int === "1") {
            return [note]
        }

        const intervalSemitones = MAP_DEGREE_TO_INTERVAL_SEMITONE[deg][int]
        const intervalNoteIdx = noteIdx + intervalSemitones
        const intervalNote = NOTES_IN_ORDER[intervalNoteIdx]
        
        return [note, intervalNote]
    }
}