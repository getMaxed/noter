import * as Tone from 'tone'

export function createDistortionGuitar(): Tone.PolySynth {
	const distortion = new Tone.Distortion(0.8);
	const filter = new Tone.Filter(2000, "lowpass");
	const reverb = new Tone.Reverb(0.5);

	const guitar = new Tone.PolySynth(Tone.Synth).toDestination();
	guitar.chain(distortion, filter, reverb, Tone.getDestination());

	return guitar;
}