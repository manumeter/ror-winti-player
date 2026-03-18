import config, { Instrument } from "./config";
import { clone } from "./utils";
import { AllVolumeHack, normalizePattern, Pattern, compressedPatternValidator } from "./state/pattern";
import { normalizeTune, Tune } from "./state/tune";
import * as z from "zod";
import { PatternReference } from "./state/song";

function stretch(from: number, to: number, pattern: string): string {
	return pattern.split("").concat([ "" ]).join(repeat((to/from)-1, " "));
}

function repeat(n: number, pattern: string): string {
	let ret = "";
	for(let i=0; i<n; i++)
		ret += pattern;
	return ret;
}

function crescendo(length: number, start: number = 0): AllVolumeHack {
	const r: AllVolumeHack = { };
	const a = .05;
	const b = (1-a)/(length-1);
	for(let i=0; i<length; i++)
		r[start+i] = a+b*i;
	return r;
}

function decrescendo(length: number): AllVolumeHack {
	const r: AllVolumeHack = { };
	const b = 0.95/(length-1);
	for(let i=0; i<length; i++)
		r[i] = 1-b*i;
	return r;
}

const sheetUrl = "https://github.com/rhythms-of-resistance/sheetbook/blob/master/generated/single/";

type RawTune = Partial<Omit<Tune, 'patterns'>> & {
	patterns: Record<string, z.input<typeof compressedPatternValidator>>;
	time?: number;
};

const rawTunes: {[tuneName: string]: RawTune} = {
	'General Breaks': {
		categories: [ "common", "uncommon", "new", "proposed", "custom", "onesurdo", "easy", "medium", "tricky", "western", "cultural-appropriation" ],
		sheet: sheetUrl + "breaks.pdf",
		video: "https://tube.rhythms-of-resistance.org/videos/embed/37596e72-e93b-44f1-8770-760be8e5ce87",
		patterns: {
			"Clave": {
				ls: 'X  X  X   X X   ',
				ms: '@ls',
				hs: '@ls',
				re: '@ls',
				sn: '@ls',
				ta: '@ls',
				ag: '@ls',
				sh: '@ls'
			},
			'Clave Inverted': {
				ls: '  X X   X  X  X ',
				ms: '@ls',
				hs: '@ls',
				re: '@ls',
				sn: '@ls',
				ta: '@ls',
				ag: '@ls',
				sh: '@ls'
			},
			'4 Silence': {
				ls: repeat(16, ' ')
			},
			'Boom Break': {
				ls: 'X               ',
				ms: '@ls',
				hs: '@ls',
				re: '@ls',
				sn: '@ls',
				ta: '@ls',
				ag: '@ls',
				sh: '@ls'
			},
			"Whistle in": {
				ot: 'y   y   y   y   '
			}
		}
	},
	'Antitek': {
		categories: ["uncommon", "new", "easy", "onesurdo"],
		sheet: sheetUrl + "antitek.pdf",
		descriptionFilename: "antitek",
		patterns: {
			Tune: {
				loop: true,
				ls: "X   X   X   X   X   X   X   X   ",
				ms: "@ls",
				hs: "@ls",
				re: "r X r X r X r X r X r X r XXr X ",
				sn: "....X.......X.......X.......X...",
				ta: "X  X  X  X        XX            ",
				ag: "o  a  a o  a  a o  a  a o   a   ",
				sh: "................................"
			},
			"Break 1": {
				ls: "X       X  X  X ",
				ms: "@ls",
				hs: "@ls",
				re: "@ls",
				sn: "@ls",
				ta: "@ls",
				ag: "@ls",
				sh: "@ls"
			},
			"Break 2": {
				ls: "XXX XXX XXX XXX ",
				ms: "@ls",
				hs: "@ls",
				re: "@ls",
				sn: "@ls",
				ta: "@ls",
				ag: "@ls",
				sh: "@ls"
            }
		},
		exampleSong: ["Tune", "Tune", "Break 1", "Tune", "Tune", "Break 2", "Tune", "Tune"/*, "Call Break", "Tune", "Tune"*/]
	},
	'Funk': {
		categories: [ "common", "onesurdo", "easy" ],
		sheet: sheetUrl + "funk.pdf",
		descriptionFilename: "funk",
		patterns: {
			Tune: {
				loop: true,
				ls: 'X  X  X X X     X  X  X X       ',
				ms: '@ls',
				hs: '@ls',
				re: 'f  hf  hf  hf  hf  hf  hf  hXhrh',
				sn: '....X.......X.......X.......X...',
				ta: '    X       X X     X     X X   ',
				ag: 'o  a  o   a a a o  a  o   a a a ',
				sh: 'X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.'
			},
			"Tune (einfacher)": {
				loop: true,
				ls: 'X  X  X X X     X  X  X X       ',
				ms: '@ls',
				hs: '@ls',
				re: 'X  hX  hX  hX  hX  hX  hX  hX  h',
				sn: '....X.......X.......X.......X...',
				ta: '    X       X X     X     X X   ',
				ag: 'o  a  o   a a a o  a  o   a a a ',
				sh: 'X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.'
			},
			"Break 2": {
				ls: 'X X X X X X X X ',
				ms: '@ls',
				hs: '@ls',
				re: '@ls',
				sn: '@ls',
				ta: '@ls',
				ag: 'o o o o o o o o ',
				sh: '@ls'
			}
		},
		exampleSong: [ "Tune", "Tune", /*"Break 1", "Tune", "Tune",*/ "Break 2", "Tune", "Tune" ]
	},
	'Ragga': {
		categories: [ "common", "tricky" ],
		sheet: sheetUrl + "ragga.pdf",
		descriptionFilename: "ragga",
		video: "https://tube.rhythms-of-resistance.org/videos/embed/bb2a4cd6-021b-4596-9917-f53bed8363a8",
		patterns: {
			Tune: {
				loop: true,
				ls: 'X  X  0 X  X  0 X  X  0 X  X  0 ',
				ms: '0  X  X 0  X  X 0  X  X 0  X  X ',
				hs: '0     X 0     X 0     X 0     X ',
				re: '  X   X   X   X   X   X  XXX  X ',
				sn: '..XX..X...XX..X...XX..X...XX..X.',
				ta: '  X   X   X   X   X   X   XX  X ',
				ag: 'o a o a oa ao a o a  oooo a o   ',
				sh: 'X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.'
			},
			"Tune (einfacher)": {
				loop: true,
				ls: 'X  X  X X  X  X X  X  X X  X  X ',
				ms: 'X  X  X X  X  X X  X  X X  X  X ',
				hs: 'X     X X     X X     X X     X ',
				re: '  X   X   X   X   X   X   X   X ',
				sn: '..XX..X...XX..X...XX..X...XX..X.',
				ta: '  X   X   X   X   X   X   X   X ',
				ag: 'o a o a oa ao a o a  oooo a o   ',
				sh: 'X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.'
			},
			'Kick Back 1': {
				loop: true,
				ls: 'X  X    X  X    X  X    X  X    ',
				ms: '@ls',
				hs: '@ls',
				re: '      X       X       X       X ',
				sn: '@re',
				ta: '@re',
				ag: '@re',
				sh: '@re'
			},
			'Break 2': {
				ls: 'X           XXX ',
				ms: '@ls',
				hs: '@ls',
				re: '@ls',
				sn: '@ls',
				ta: '@ls',
				ag: '@ls',
				sh: '@ls'
			},
			'Break 3': {
				ls: 'X  X  X         ',
				ms: '@ls',
				hs: '@ls',
				re: '        X  X  X ',
				sn: '@re',
				ta: '@re',
				ag: '@re',
				sh: '@re'
			},
			'Zorro-Break': {
				loop: true,
				ls: 'X       X       X       X  X  X ',
				ms: '@ls',
				hs: '@ls',
				re: '  X   X   X   X   X   X  XXX  X ',
				sn: '..XX..X...XX..X...XX..X...XX..X.',
				ta: '  X   X   X   X   X   X   XX  X ',
				ag: 'o a o a oa ao a o a  oooo a o   ',
				sh: 'X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.'
			}
		},
		exampleSong: [ "Tune", "Tune", "Break 2", "Tune", "Tune", "Break 3", "Tune", "Tune", "Kick Back 1", "Kick Back 1", "Tune", "Tune", "Zorro-Break", "Zorro-Break", "Tune", "Tune" ]
	},
	'Samba Reggae': {
		categories: [ "common", "medium", "cultural-appropriation" ],
		sheet: sheetUrl + "samba-reggae.pdf",
		descriptionFilename: "samba-reggae",
		patterns: {
			Tune: {
				loop: true,
				ls: '0   X   0   X X ',
				ms: 'X   0   X   0   ',
				hs: '0     X 0   XXXX',
				re: '  XX  XX  XX  XX',
				sn: 'X..X..X...X..X..',
				ta: 'X  X  X   X X   ',
				ag: 'o a a oo a aa o ',
				sh: '................'
			},
			"Tune (einfacher)": {
				loop: true,
				ls: '    X       X   ',
				ms: 'X       X       ',
				hs: 'X     X X   X   ',
				re: '  X   X   X   X ',
				sn: 'X..X..X...X..X..',
				ta: 'X  X  X   X X   ',
				ag: 'o a a oo a aa o ',
				sh: '................'
			}
		},
		exampleSong: [ "Tune", "Tune", "Tune", "Tune"/*, "Bra Break", "Tune", "Tune", "Tune", "Tune", "Break 1", "Tune", "Tune", "Tune", "Tune", "Break 2", "Tune", "Tune", "Tune", "Tune", "Break 3", "Tune", "Tune", "Tune", "Tune", "SOS Break", "Tune", "Tune", "Tune", "Tune", "Knock On The Door Break", "Knock On The Door (Cut)", "Tune", "Tune", "Tune", "Tune", "Dancing Break", "Tune", "Tune", "Tune", "Tune"*/ ]
	}
};

const defaultTunes: { [tuneName: string]: Tune } = { };

for(const i in rawTunes) {
	const tune = rawTunes[i];

	const newTune = clone(tune) as any as Tune;

	for(const j in tune.patterns) {
		const pattern = tune.patterns[j];
		const newPattern = clone(pattern) as any as Pattern;
		if(!newPattern.time && tune.time)
			newPattern.time = tune.time;

		for(const k of config.instrumentKeys) {
			const thisPattern = pattern[k] = pattern[k] || "";
			const m = thisPattern.match(/^@([a-z]{2})$/);
			if(m)
				newPattern[k] = clone(newPattern[m[1] as Instrument]);
			else {
				newPattern[k] = thisPattern.split('');
				newPattern.length = Math.max(newPattern.length || 0, newPattern[k].length - (pattern.upbeat || 0));
			}

			if(k == "ag")
				newPattern[k] = newPattern[k].map(function(it) { return it == "X" ? "o" : it; });
		}

		newPattern.length = Math.ceil(newPattern.length / (newPattern.time || 4));
		if (newPattern.length % 4) {
			// eslint-disable-next-line no-console
			console.error(`Unusual length ${newPattern.length} for ${j} of ${i}.`);
		}

		newTune.patterns[j] = normalizePattern(newPattern);
	}

	defaultTunes[i] = normalizeTune(newTune);

	const unknown = (defaultTunes[i].exampleSong || []).filter((patternName) => !defaultTunes[i].patterns[typeof patternName === 'string' ? patternName : patternName.patternName]);
	if(unknown.length > 0) {
		// eslint-disable-next-line no-console
		console.error(`Unknown breaks in example song for ${i}: ${unknown.join(", ")}`);
	}
}

Object.defineProperty(defaultTunes, "getPattern", {
	configurable: true,
	value: function(tuneName: string | PatternReference, patternName?: string): Pattern | null {
		if(Array.isArray(tuneName)) {
			patternName = tuneName[1];
			tuneName = tuneName[0];
		}

		return this[tuneName]?.patterns[<string> patternName];
	}
});

Object.defineProperty(defaultTunes, "firstInSorting", {
	configurable: true,
	value: [ "General Breaks", "Special Breaks", "Shouting Breaks" ]
});

interface DefaultTunesMethods {
	getPattern(tuneName: string, patternName?: string): Pattern | undefined;
	getPattern(patternReference: PatternReference): Pattern | undefined;
	firstInSorting: Array<string>;
}

type DefaultTunes = Record<string, Tune> & DefaultTunesMethods;

export default defaultTunes as DefaultTunes;
