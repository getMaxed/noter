import { NOTES } from "./notes";

export const DEFAULT_MELODY_SETTINGS: Required<MelodySettings> = {
	root: NOTES.E2,
	dur: 8,
	int: 1,
	tempo: 160,
	instrument: "distortion-guitar"
};

export const DEFAULT_DEMONSTRATIONAL_MELODY_SETTINGS: MelodySettings = {
	"root": NOTES.E3,
	"tempo": 60
}