import { RawTune, sheetUrl } from "../helpers";

export const tuneName = "Karla Shnikov";

export const tune: RawTune = {
	categories: [ "common", "onesurdo", "easy" ],
	sheet: sheetUrl + "karla-shnikov.pdf",
	video: "https://tube.rhythms-of-resistance.org/videos/embed/cc4d0222-3713-4943-bba1-cc733cb84ccc",
	patterns: {
		Tune: {
			loop: true,
			ls: "X   0 XX    0   X   0 XX    0   X   0 XX    0   X   0 XX    0  ",
			ms: '@ls',
			hs: 'X   0 XX    0   X   0 XX    0   X   0 XX    0   X   0 XX X XX X ',
			re: 'X  XX  X X XX X X  XX  X X XX X X  XX  X X XX X X  XX  X X XX X ',
			sn: '....X.......X.......X.......X.......X.......X.......X.......X...',
			ta: '    X       X       X  X X XX       X       X       X  X X XX   ',
			ag: 'o  oa o o  oa o o  oa o o  oa o o  oa o o  oa o o  oa o o  oa o ',
			sh: '................................................................'
		},
		'Break 2': {
			ls: 'XXXXXXXXXXXXXXXXX   X   X   X   X X    X X      X X    X X      ',
			ms: '@ls',
			hs: '@ls',
			re: 'XXXXXXXXXXXXXXXXX   X   X   X       X      XXXX     X      XXXX ',
			sn: '@re',
			ta: 'X X X X X X X X X   X   X   X       X      XXXX     X      XXXX ',
			ag: '@ta',
			sh: '@ta'
		}
	},
	exampleSong: [[ "Tune", "Break 2", "Tune"/*, "Break 2 Inverted", "Tune"*/ ]]
};
