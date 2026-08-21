import { RawTune, sheetUrl } from "../helpers";

export const tuneName = "Funk";

export const tune: RawTune = {
	categories: [ "common", "onesurdo", "easy" ],
	sheet: sheetUrl + "funk.pdf",
	patterns: {
		Tune: {
			loop: true,
			ls: 'X  X  X X X     X  X  X X       ',
			ms: '@ls',
			hs: '@ls',
			re: 'X  hX  hX  hX  hX  hX  hX  hX r ',
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
			ag: '@ls',
			sh: '@ls'
		}
	},
	exampleSong: [[ "Tune", "Tune", /*"Break 1", "Tune", "Tune",*/ "Break 2", "Tune", "Tune" ]]
};
