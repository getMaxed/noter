const notes = [
    { shift: 0, deg: "1", int: "5", dur: 1, durMod: 600 },
    [2, { shift: 0, deg: "s4", int: "5", dur: 2, durMod: 0 }],
    [2, { shift: 0, deg: "s4", int: "5", dur: 4, durMod: 0 }],
    [4, { shift: 0, deg: "s4", int: "5", dur: 8, durMod: 0 }],
    { shift: 0, deg: "1", int: "5", dur: 1, durMod: 600 },
    [2, { shift: 0, deg: "s4", int: "5", dur: 2, durMod: 0 }],
    [2, { shift: 0, deg: "s4", int: "5", dur: 4, durMod: 0 }],
    [4, { shift: 0, deg: "s4", int: "5", dur: 8, durMod: 0 }],
    { shift: 0, deg: "1", int: "5", dur: 1, durMod: 600 },
    [2, { shift: 0, deg: "s4", int: "5", dur: 2, durMod: 0 }],
    [2, { shift: 0, deg: "s4", int: "5", dur: 4, durMod: 0 }],
    [4, { shift: 0, deg: "s4", int: "5", dur: 8, durMod: 0 }],
    { shift: 0, deg: "1", int: "5", dur: 1, durMod: 600 },
    [2, { shift: 0, deg: "s4", int: "5", dur: 2, durMod: 0 }],
    [2, { shift: 0, deg: "s4", int: "5", dur: 4, durMod: 0 }],
    [4, { shift: 0, deg: "s4", int: "5", dur: 8, durMod: 0 }],
]


			{/* <div style={{ marginBottom: 12 }}>
				<label htmlFor="dur" style={{ marginRight: 12 }}>Duration</label>
				<input value={dur} type="text" id="dur" />
			</div> */}
			// case "a":
			// 	setIsMetronomeOn(m => !m);
			// 	break;
			// case "w":
			// 	setDur(prev => {
			// 		const i = DURATION_STEPS.indexOf(prev);
			// 		return DURATION_STEPS[(i + 1) % DURATION_STEPS.length];
			// 	});
			// 	break;
			// case "s":
			// 	setDur(prev => {
			// 		const i = DURATION_STEPS.indexOf(prev);
			// 		return DURATION_STEPS[(i - 1 + DURATION_STEPS.length) % DURATION_STEPS.length];
			// 	});
			// 	break;


			// const [isHotKeyMode, setIsHotKeyMode] = React.useState(false)

				// if (e.altKey && e.shiftKey) {
	// if (e.ctrlKey) {
		// e.preventDefault();
		// e.stopPropagation();

					{/* Tempo */}
			{/* <div style={{ marginBottom: 12 }}>
				<label htmlFor="tempo" style={{ marginRight: 12 }}>Tempo</label>
				<p>HK Mode: {isHotKeyMode.toString()}</p>
			</div> */}

/* 
- before prompting: cleanup everythingh


- add all controls
- cleanup everything
- add main styles
- refactor shit

CONTROLS
- play
- play from beginning of riff
- play from beginning of part

ADDT KEYS
- add metadata
- add drums
- add additional instruments

URL Structure
- musicm.app/write
- musicm.app/write/{draftId}
- musicm.app/riffs/write/{riffId}
- musicm.app/parts/write/{partId}
- musicm.app/songs/write/{songId}




- add hook: registerButtons


- tempo

- scale
- metronome

- shift
- dur
- int
- durMod





TO DO
- add metronome (as #1)
  - on/off 
  - freq

TO DO LATER
- when removing metronome freq: reset the default

PENDING
- make sure that refs are cleared on ESC
- add chords (make sure it's extensible)
- add triplets

durModInputRef
*/