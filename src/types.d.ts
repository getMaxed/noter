/*
|--------------------------------------------------------------------------
| DNOTE
|--------------------------------------------------------------------------
*/

type DNoteDur = 1 | 2 | 4 | 8 | 16 | 32

type DNoteInt =
  | "1"
  | "2"
  | "2min"
  | "2maj"
  | "3"
  | "3min"
  | "3maj"
  | "4"
  | "5"
  | "6"
  | "6min"
  | "6maj"
  | "7"
  | "7min"
  | "7maj"
  | "8";

type DNoteDeg = 
  | "1" 
  | "f2" 
  | "2" 
  | "3" 
  | "s3" 
  | "4" 
  | "s4" 
  | "5" 
  | "6" 
  | "s6" 
  | "7" 
  | "s7"

type DNote = {
    shift: number, // -5 - 5
    deg: DNoteDeg
    int: DNoteInt
    dur: DNoteDur
    durMod: null | number
}

/*
|--------------------------------------------------------------------------
| NOTE
|--------------------------------------------------------------------------
*/

type NoteName = 
    // Octave 0
    | 'C0' | 'CS0' | 'D0' | 'DS0' | 'E0' | 'F0' | 'FS0' | 'G0' | 'GS0' | 'A0' | 'AS0' | 'B0'
    // Octave 1
    | 'C1' | 'CS1' | 'D1' | 'DS1' | 'E1' | 'F1' | 'FS1' | 'G1' | 'GS1' | 'A1' | 'AS1' | 'B1'
    // Octave 2
    | 'C2' | 'CS2' | 'D2' | 'DS2' | 'E2' | 'F2' | 'FS2' | 'G2' | 'GS2' | 'A2' | 'AS2' | 'B2'
    // Octave 3
    | 'C3' | 'CS3' | 'D3' | 'DS3' | 'E3' | 'F3' | 'FS3' | 'G3' | 'GS3' | 'A3' | 'AS3' | 'B3'
    // Octave 4
    | 'C4' | 'CS4' | 'D4' | 'DS4' | 'E4' | 'F4' | 'FS4' | 'G4' | 'GS4' | 'A4' | 'AS4' | 'B4'
    // Octave 5
    | 'C5' | 'CS5' | 'D5' | 'DS5' | 'E5' | 'F5' | 'FS5' | 'G5' | 'GS5' | 'A5' | 'AS5' | 'B5'
    // Octave 6
    | 'C6' | 'CS6' | 'D6' | 'DS6' | 'E6' | 'F6' | 'FS6' | 'G6' | 'GS6' | 'A6' | 'AS6' | 'B6'
    // Octave 7
    | 'C7' | 'CS7' | 'D7' | 'DS7' | 'E7' | 'F7' | 'FS7' | 'G7' | 'GS7' | 'A7' | 'AS7' | 'B7'
    // Octave 8
    | 'C8' | 'CS8' | 'D8' | 'DS8' | 'E8' | 'F8' | 'FS8' | 'G8' | 'GS8' | 'A8' | 'AS8' | 'B8';

type NoteLabel = 
    // Octave 0
    | 'C0' | 'C#0' | 'D0' | 'D#0' | 'E0' | 'F0' | 'F#0' | 'G0' | 'G#0' | 'A0' | 'A#0' | 'B0'
    // Octave 1
    | 'C1' | 'C#1' | 'D1' | 'D#1' | 'E1' | 'F1' | 'F#1' | 'G1' | 'G#1' | 'A1' | 'A#1' | 'B1'
    // Octave 2
    | 'C2' | 'C#2' | 'D2' | 'D#2' | 'E2' | 'F2' | 'F#2' | 'G2' | 'G#2' | 'A2' | 'A#2' | 'B2'
    // Octave 3
    | 'C3' | 'C#3' | 'D3' | 'D#3' | 'E3' | 'F3' | 'F#3' | 'G3' | 'G#3' | 'A3' | 'A#3' | 'B3'
    // Octave 4
    | 'C4' | 'C#4' | 'D4' | 'D#4' | 'E4' | 'F4' | 'F#4' | 'G4' | 'G#4' | 'A4' | 'A#4' | 'B4'
    // Octave 5
    | 'C5' | 'C#5' | 'D5' | 'D#5' | 'E5' | 'F5' | 'F#5' | 'G5' | 'G#5' | 'A5' | 'A#5' | 'B5'
    // Octave 6
    | 'C6' | 'C#6' | 'D6' | 'D#6' | 'E6' | 'F6' | 'F#6' | 'G6' | 'G#6' | 'A6' | 'A#6' | 'B6'
    // Octave 7
    | 'C7' | 'C#7' | 'D7' | 'D#7' | 'E7' | 'F7' | 'F#7' | 'G7' | 'G#7' | 'A7' | 'A#7' | 'B7'
    // Octave 8
    | 'C8' | 'C#8' | 'D8' | 'D#8' | 'E8' | 'F8' | 'F#8' | 'G8' | 'G#8' | 'A8' | 'A#8' | 'B8';

type Note = { 
    name: NoteName; 
    label: NoteLabel;
    freq: number 
};

type BaseNoteEntry = {
	dur: number
	modLengthByPerc?: number
}

type NoteEntry = BaseNoteEntry & {
	pitchNotes: Note[]
}

type PlayableNote = BaseNoteEntry & {
	notes: Note["label"][]
}

type NoteOctave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type NoteDuration = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128

type NoteInterval = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type Instrument = "distortion-guitar"
type SongPartType = 
    | "intro"
    | "main"

type SongPart = {
    type: SongPartType
    part: DNoteEntry[] | [times: number, notes: DNoteEntry[]]
}

type SongMetadata = {
    code: string
}

type Song = {
    metadata: SongMetadata
    parts: SongPart[]
}

/*
|--------------------------------------------------------------------------
| DRUMS
|--------------------------------------------------------------------------
*/

type DrumDensity = 1 | 2 | 4 | 8 | 16

type KickDensity = 8 | 16

type DrumRhythmType = "n" | "r";

type DrumCymbalsType = "k" | "s" | "hc" | "ho" | "r" | "c"

type DrumTrack = {
    d: DrumDensity
    type?: DrumRhythmType;
    cymbals?: {
        type: DrumCymbalsType
        d: DrumDensity
    }
    kD?: KickDensity
};

/*
|--------------------------------------------------------------------------
| MELODY
|--------------------------------------------------------------------------
*/

type MelodyMetadata = Partial<{
    title: string
    details: string
    artistCode: string
}>

type MelodySettings = Partial<{
    root: Note
    dur: NoteDuration
    int: NoteInterval
    tempo: number
    instrument: Instrument
}>

type Melody = { 
    notes: DNoteEntry[]
    settings?: MelodySettings
    metadata?: MelodyMetadata
}