import { flattenEntries, getBeatDuration, getPlayableNotes, setMelodySettings } from "./utils/utils";
import { parseDNotesIntoNoteEntrys } from "./utils/dnotes";
import * as Tone from 'tone'
import { createDistortionGuitar } from "./instruments/distortion-guitar";

export async function playMelody(melody: Melody): Promise<void> {
	const settings = setMelodySettings(melody.settings)
	const instrument = createDistortionGuitar()
	const beatDuration = getBeatDuration(settings.tempo)

	const flatNotes = flattenEntries(melody.notes)
	const notes = parseDNotesIntoNoteEntrys(flatNotes, settings)
	const playableNotes = getPlayableNotes(notes)

	await Tone.start()
	let currentTime = Tone.now()

	playableNotes.forEach(note => {
		const beatsForThisNote = 4 / note.dur
		const duration = beatsForThisNote * beatDuration * (note.modLengthByPerc ?? 100) / 100
		instrument.triggerAttackRelease(note.notes, duration, currentTime)
		currentTime += duration
	});
}

export async function playDrums(track: DrumTrack) {
	const tempo = 190
	const players = new Tone.Players({
		k: "/samples/kick.wav",
		s: "/samples/snare.wav",
		hc: "/samples/hat-closed.wav",
		ho: "/samples/hat-open.wav",
		r: "/samples/ride.wav",
		c: "/samples/crash.wav",
	}).toDestination()

	await Tone.start()

	const beatDuration = 60 / tempo
	let currentTime = Tone.now()

	const hits = track.d
	const interval = (4 * beatDuration) / hits

	for (let i = 0; i < hits; i++) {
		const isSnare = track.type === "r" ? i % 2 === 0 : i % 2 === 1
		const drum = isSnare ? "s" : "k"
		players.player(drum).start(currentTime)
		currentTime += interval
	}
}