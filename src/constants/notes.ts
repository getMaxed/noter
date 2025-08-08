// 20-20k herz: audible

export const MAP_NOTENAME_TO_FREQ: Record<NoteName, number> = {
    // Octave 0
    C0: 16.35,
    CS0: 17.32,
    D0: 18.35,
    DS0: 19.45,
    E0: 20.6,
    F0: 21.83,
    FS0: 23.12,
    G0: 24.5,
    GS0: 25.96,
    A0: 27.5, // piano start
    AS0: 29.14,
    B0: 30.87,

    // Octave 1
    C1: 32.7,
    CS1: 34.65,
    D1: 36.71,
    DS1: 38.89,
    E1: 41.2,
    F1: 43.65,
    FS1: 46.25,
    G1: 49.0,
    GS1: 51.91,
    A1: 55.0,
    AS1: 58.27,
    B1: 61.74, // metal guitar start

    // Octave 2
    C2: 65.41,
    CS2: 69.3,
    D2: 73.42,
    DS2: 77.78,
    E2: 82.41, // guitar start
    F2: 87.31,
    FS2: 92.5,
    G2: 98.0,
    GS2: 103.83,
    A2: 110.0,
    AS2: 116.54,
    B2: 123.47,

    // Octave 3
    C3: 130.81,
    CS3: 138.59,
    D3: 146.83,
    DS3: 155.56,
    E3: 164.81,
    F3: 174.61,
    FS3: 185.0,
    G3: 196.0,
    GS3: 207.65,
    A3: 220.0,
    AS3: 233.08,
    B3: 246.94,

    // Octave 4
    C4: 261.63,
    CS4: 277.18,
    D4: 293.66,
    DS4: 311.13,
    E4: 329.63,
    F4: 349.23,
    FS4: 369.99,
    G4: 392.0,
    GS4: 415.3,
    A4: 440.0,
    AS4: 466.16,
    B4: 493.88,

    // Octave 5
    C5: 523.25,
    CS5: 554.37,
    D5: 587.33,
    DS5: 622.25,
    E5: 659.25,
    F5: 698.46,
    FS5: 739.99,
    G5: 783.99,
    GS5: 830.61,
    A5: 880.0,
    AS5: 932.33,
    B5: 987.77,

    // Octave 6
    C6: 1046.5,
    CS6: 1108.73,
    D6: 1174.66,
    DS6: 1244.51,
    E6: 1318.51,
    F6: 1396.91,
    FS6: 1479.98,
    G6: 1567.98,
    GS6: 1661.22,
    A6: 1760.0,
    AS6: 1864.66,
    B6: 1975.53,

    // Octave 7
    C7: 2093.0,
    CS7: 2217.46,
    D7: 2349.32,
    DS7: 2489.02,
    E7: 2637.02, // guitar end
    F7: 2793.83,
    FS7: 2959.96,
    G7: 3135.96,
    GS7: 3322.44,
    A7: 3520.0,
    AS7: 3729.31,
    B7: 3951.07,

    // Octave 8
    C8: 4186.01, // piano end
    CS8: 4434.92,
    D8: 4698.63,
    DS8: 4978.03,
    E8: 5274.04,
    F8: 5587.65,
    FS8: 5919.91,
    G8: 6271.93,
    GS8: 6644.88,
    A8: 7040.0,
    AS8: 7458.62,
    B8: 7902.13,
} as const;

export const NOTES: Record<NoteName, Note> = {
	// Octave 0
	C0: { name: "C0", label: "C0", freq: 16.35 },
	CS0: { name: "CS0", label: "C#0", freq: 17.32 },
	D0: { name: "D0", label: "D0", freq: 18.35 },
	DS0: { name: "DS0", label: "D#0", freq: 19.45 },
	E0: { name: "E0", label: "E0", freq: 20.6 },
	F0: { name: "F0", label: "F0", freq: 21.83 },
	FS0: { name: "FS0", label: "F#0", freq: 23.12 },
	G0: { name: "G0", label: "G0", freq: 24.5 },
	GS0: { name: "GS0", label: "G#0", freq: 25.96 },
	A0: { name: "A0", label: "A0", freq: 27.5 },
	AS0: { name: "AS0", label: "A#0", freq: 29.14 },
	B0: { name: "B0", label: "B0", freq: 30.87 },

	// Octave 1
	C1: { name: "C1", label: "C1", freq: 32.7 },
	CS1: { name: "CS1", label: "C#1", freq: 34.65 },
	D1: { name: "D1", label: "D1", freq: 36.71 },
	DS1: { name: "DS1", label: "D#1", freq: 38.89 },
	E1: { name: "E1", label: "E1", freq: 41.2 },
	F1: { name: "F1", label: "F1", freq: 43.65 },
	FS1: { name: "FS1", label: "F#1", freq: 46.25 },
	G1: { name: "G1", label: "G1", freq: 49.0 },
	GS1: { name: "GS1", label: "G#1", freq: 51.91 },
	A1: { name: "A1", label: "A1", freq: 55.0 },
	AS1: { name: "AS1", label: "A#1", freq: 58.27 },
	B1: { name: "B1", label: "B1", freq: 61.74 },

	// Octave 2
	C2: { name: "C2", label: "C2", freq: 65.41 },
	CS2: { name: "CS2", label: "C#2", freq: 69.3 },
	D2: { name: "D2", label: "D2", freq: 73.42 },
	DS2: { name: "DS2", label: "D#2", freq: 77.78 },
	E2: { name: "E2", label: "E2", freq: 82.41 },
	F2: { name: "F2", label: "F2", freq: 87.31 },
	FS2: { name: "FS2", label: "F#2", freq: 92.5 },
	G2: { name: "G2", label: "G2", freq: 98.0 },
	GS2: { name: "GS2", label: "G#2", freq: 103.83 },
	A2: { name: "A2", label: "A2", freq: 110.0 },
	AS2: { name: "AS2", label: "A#2", freq: 116.54 },
	B2: { name: "B2", label: "B2", freq: 123.47 },

	// Octave 3
	C3: { name: "C3", label: "C3", freq: 130.81 },
	CS3: { name: "CS3", label: "C#3", freq: 138.59 },
	D3: { name: "D3", label: "D3", freq: 146.83 },
	DS3: { name: "DS3", label: "D#3", freq: 155.56 },
	E3: { name: "E3", label: "E3", freq: 164.81 },
	F3: { name: "F3", label: "F3", freq: 174.61 },
	FS3: { name: "FS3", label: "F#3", freq: 185.0 },
	G3: { name: "G3", label: "G3", freq: 196.0 },
	GS3: { name: "GS3", label: "G#3", freq: 207.65 },
	A3: { name: "A3", label: "A3", freq: 220.0 },
	AS3: { name: "AS3", label: "A#3", freq: 233.08 },
	B3: { name: "B3", label: "B3", freq: 246.94 },

	// Octave 4
	C4: { name: "C4", label: "C4", freq: 261.63 },
	CS4: { name: "CS4", label: "C#4", freq: 277.18 },
	D4: { name: "D4", label: "D4", freq: 293.66 },
	DS4: { name: "DS4", label: "D#4", freq: 311.13 },
	E4: { name: "E4", label: "E4", freq: 329.63 },
	F4: { name: "F4", label: "F4", freq: 349.23 },
	FS4: { name: "FS4", label: "F#4", freq: 369.99 },
	G4: { name: "G4", label: "G4", freq: 392.0 },
	GS4: { name: "GS4", label: "G#4", freq: 415.3 },
	A4: { name: "A4", label: "A4", freq: 440.0 },
	AS4: { name: "AS4", label: "A#4", freq: 466.16 },
	B4: { name: "B4", label: "B4", freq: 493.88 },

	// Octave 5
	C5: { name: "C5", label: "C5", freq: 523.25 },
	CS5: { name: "CS5", label: "C#5", freq: 554.37 },
	D5: { name: "D5", label: "D5", freq: 587.33 },
	DS5: { name: "DS5", label: "D#5", freq: 622.25 },
	E5: { name: "E5", label: "E5", freq: 659.25 },
	F5: { name: "F5", label: "F5", freq: 698.46 },
	FS5: { name: "FS5", label: "F#5", freq: 739.99 },
	G5: { name: "G5", label: "G5", freq: 783.99 },
	GS5: { name: "GS5", label: "G#5", freq: 830.61 },
	A5: { name: "A5", label: "A5", freq: 880.0 },
	AS5: { name: "AS5", label: "A#5", freq: 932.33 },
	B5: { name: "B5", label: "B5", freq: 987.77 },

	// Octave 6
	C6: { name: "C6", label: "C6", freq: 1046.5 },
	CS6: { name: "CS6", label: "C#6", freq: 1108.73 },
	D6: { name: "D6", label: "D6", freq: 1174.66 },
	DS6: { name: "DS6", label: "D#6", freq: 1244.51 },
	E6: { name: "E6", label: "E6", freq: 1318.51 },
	F6: { name: "F6", label: "F6", freq: 1396.91 },
	FS6: { name: "FS6", label: "F#6", freq: 1479.98 },
	G6: { name: "G6", label: "G6", freq: 1567.98 },
	GS6: { name: "GS6", label: "G#6", freq: 1661.22 },
	A6: { name: "A6", label: "A6", freq: 1760.0 },
	AS6: { name: "AS6", label: "A#6", freq: 1864.66 },
	B6: { name: "B6", label: "B6", freq: 1975.53 },

	// Octave 7
	C7: { name: "C7", label: "C7", freq: 2093.0 },
	CS7: { name: "CS7", label: "C#7", freq: 2217.46 },
	D7: { name: "D7", label: "D7", freq: 2349.32 },
	DS7: { name: "DS7", label: "D#7", freq: 2489.02 },
	E7: { name: "E7", label: "E7", freq: 2637.02 },
	F7: { name: "F7", label: "F7", freq: 2793.83 },
	FS7: { name: "FS7", label: "F#7", freq: 2959.96 },
	G7: { name: "G7", label: "G7", freq: 3135.96 },
	GS7: { name: "GS7", label: "G#7", freq: 3322.44 },
	A7: { name: "A7", label: "A7", freq: 3520.0 },
	AS7: { name: "AS7", label: "A#7", freq: 3729.31 },
	B7: { name: "B7", label: "B7", freq: 3951.07 },

	// Octave 8
	C8: { name: "C8", label: "C8", freq: 4186.01 },
	CS8: { name: "CS8", label: "C#8", freq: 4434.92 },
	D8: { name: "D8", label: "D8", freq: 4698.63 },
	DS8: { name: "DS8", label: "D#8", freq: 4978.03 },
	E8: { name: "E8", label: "E8", freq: 5274.04 },
	F8: { name: "F8", label: "F8", freq: 5587.65 },
	FS8: { name: "FS8", label: "F#8", freq: 5919.91 },
	G8: { name: "G8", label: "G8", freq: 6271.93 },
	GS8: { name: "GS8", label: "G#8", freq: 6644.88 },
	A8: { name: "A8", label: "A8", freq: 7040.0 },
	AS8: { name: "AS8", label: "A#8", freq: 7458.62 },
	B8: { name: "B8", label: "B8", freq: 7902.13 },
}

export const NOTES_IN_ORDER: Note[] = [
    NOTES.C0, NOTES.CS0, NOTES.D0, NOTES.DS0, NOTES.E0, NOTES.F0, NOTES.FS0, NOTES.G0, NOTES.GS0, NOTES.A0, NOTES.AS0, NOTES.B0,
    NOTES.C1, NOTES.CS1, NOTES.D1, NOTES.DS1, NOTES.E1, NOTES.F1, NOTES.FS1, NOTES.G1, NOTES.GS1, NOTES.A1, NOTES.AS1, NOTES.B1,
    NOTES.C2, NOTES.CS2, NOTES.D2, NOTES.DS2, NOTES.E2, NOTES.F2, NOTES.FS2, NOTES.G2, NOTES.GS2, NOTES.A2, NOTES.AS2, NOTES.B2,
    NOTES.C3, NOTES.CS3, NOTES.D3, NOTES.DS3, NOTES.E3, NOTES.F3, NOTES.FS3, NOTES.G3, NOTES.GS3, NOTES.A3, NOTES.AS3, NOTES.B3,
    NOTES.C4, NOTES.CS4, NOTES.D4, NOTES.DS4, NOTES.E4, NOTES.F4, NOTES.FS4, NOTES.G4, NOTES.GS4, NOTES.A4, NOTES.AS4, NOTES.B4,
    NOTES.C5, NOTES.CS5, NOTES.D5, NOTES.DS5, NOTES.E5, NOTES.F5, NOTES.FS5, NOTES.G5, NOTES.GS5, NOTES.A5, NOTES.AS5, NOTES.B5,
    NOTES.C6, NOTES.CS6, NOTES.D6, NOTES.DS6, NOTES.E6, NOTES.F6, NOTES.FS6, NOTES.G6, NOTES.GS6, NOTES.A6, NOTES.AS6, NOTES.B6,
    NOTES.C7, NOTES.CS7, NOTES.D7, NOTES.DS7, NOTES.E7, NOTES.F7, NOTES.FS7, NOTES.G7, NOTES.GS7, NOTES.A7, NOTES.AS7, NOTES.B7,
    NOTES.C8, NOTES.CS8, NOTES.D8, NOTES.DS8, NOTES.E8, NOTES.F8, NOTES.FS8, NOTES.G8, NOTES.GS8, NOTES.A8, NOTES.AS8, NOTES.B8
];

export const NOTE_NAMES_IN_ORDER: NoteName[] = NOTES_IN_ORDER.map(n => n.name);

export const NOTE_FREQS_IN_ORDER: number[] = NOTES_IN_ORDER.map(n => n.freq);