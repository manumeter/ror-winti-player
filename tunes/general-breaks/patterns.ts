import { RawTune, repeat, sheetUrl } from "../helpers";

export const tuneName = "General Breaks";

export const tune: RawTune = {
	sortPriority: 1,
	categories: [ "common", "uncommon", "new", "proposed", "custom", "onesurdo", "easy", "medium", "tricky", "western", "cultural-appropriation" ],
	sheet: sheetUrl + "breaks.pdf",
	video: "https://tube.rhythms-of-resistance.org/videos/embed/37596e72-e93b-44f1-8770-760be8e5ce87",
	patterns: {
		"Karla Break": {
			ls: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX               ',
			ms: '@ls',
			hs: '@ls',
			re: '@ls',
			sn: '@ls',
			ta: 'X X X X X X X X X X X X X X X X X X X X X X X X X               ',
			ag: '@ta',
			sh: '@ta',
			volumeHack: { 0: .1, 16: .4, 32: .7, 48: 1  }
		},
		"Wulf Break": {
			ls: 'X X   XXX X    XX X    XX X     X X   XXX X     X X X X X       ',
			ms: '@ls',
			hs: '@ls',
			re: '    X       X       X       X       X       X   X X X X X       ',
			sn: '@re',
			ta: '@re',
			ag: '@re',
			sh: '@re',
			ot: '                                                          E D   '
		},
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
		'Progressive': {
			ls: 'X   X   X   X   X X X X X X X X XXXXXXXXXXXXXXXX',
			ms: '@ls',
			hs: '@ls',
			re: '@ls',
			sn: '@ls',
			ta: 'X   X   X   X   X X X X X X X X X X X X X X X X ',
			ag: '@ta',
			sh: '@ta'
		},
		'4 Silence': {
			ls: repeat(16, ' ')
		},
		'8 Silence': {
			ls: repeat(32, ' ')
		},
		'12 Silence': {
			ls: repeat(48, ' ')
		},
		'16 Silence': {
			ls: repeat(64, ' ')
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
};
