import { RawTune, sheetUrl } from "../helpers";

export const tuneName = "Samba Reggae";

export const tune: RawTune = {
	categories: [ "common", "medium", "cultural-appropriation" ],
	sheet: sheetUrl + "samba-reggae.pdf",
	patterns: {
		Tune: {
			loop: true,
			ls: '0   X   0   X X ',
			ms: 'X   0   X   0   ',
			hs: 'X     X X   XXXX',
			re: '..XX..XX..XX..XX',
			sn: 'X..X..X...X..X..',
			ta: 'X  X  X   X X   ',
			ag: 'o a a oo a aa o ',
			sh: '................'
		},
		'Call Break': {
			ls: '          X X             X X             X X                                                                 X ',
			ms: '          X X             X X             X X                                                                   ',
			hs: '@ms',
			re: 'f XX XX X       f XX XX X       f XX XX X                                                                       ',
			sn: '          X X             X X             X X                   X..X..X...X.X...X..X..X...X.X...X..X..X...X.X...',
			ta: '          X X             X X             X X   X  X  X   X X   X  X  X   X X   X  X  X   X X   X  X  X   X X   ',
			ag: '@ms',
			sh: '@ms'
		}/*,
		'Break 1': {
			ls: '                X X XX XX                       X  X  X X                                  XX                              XX                              XX                   ',
			ms: '@ls',
			hs: '                X X XX XX                       X  X  X X                                  XX                              XX                              XX               XXXX',
			re: 'XX XX XXXX XX                   XX XX XXXX XX                                              XX                              XX                              XX                   ',
			sn: '                X X XX XX                       X  X  X X       X..X..X.X..X..X.X..X..X.X       X..X..X.X..X..X.X..X..X.X       X..X..X.X..X..X.X..X..X.X       X  X  X   X     ',
			ta: '@ls',
			ag: '@ls',
			sh: '@ls'
		},*/
	},
	exampleSong: [[ "Tune", "Tune", "Tune", "Tune", "Call Break", "Tune", "Tune", "Tune", "Tune"/*, "Break 1", "Tune", "Tune", "Tune", "Tune", "Break 2", "Tune", "Tune", "Tune", "Tune", "Break 3", "Tune", "Tune", "Tune", "Tune", "SOS Break", "Tune", "Tune", "Tune", "Tune", "Knock On The Door Break", "Knock On The Door (Cut)", "Tune", "Tune", "Tune", "Tune", "Dancing Break", "Tune", "Tune", "Tune", "Tune"*/ ]]
};
