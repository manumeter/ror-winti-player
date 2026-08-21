import { RawTune, sheetUrl } from "../helpers";

export const tuneName = "Antitek";

export const tune: RawTune = {
	categories: ["uncommon", "new", "easy", "onesurdo"],
	sheet: sheetUrl + "antitek.pdf",
	patterns: {
		Tune: {
			loop: true,
			ls: "X   X   X   X   X   X   X   X   ",
			ms: "@ls",
			hs: "@ls",
			re: "r X r X r X r X r X r X r XXr X ",
			sn: "....X.......X.......X.......X...",
			ta: "X  X  X           XX            ",
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
	exampleSong: [[ "Tune", "Tune", "Break 1", "Tune", "Tune", "Break 2", "Tune", "Tune"/*, "Call Break", "Tune", "Tune"*/ ]]
};
