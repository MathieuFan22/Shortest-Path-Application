const { mooreDijkstra, floydWarshall }= require('./shortestPathAlgorithms');
/* List of functions to create chords */
const NOTES= ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab'];	// 12 notes

/* INPUT */

let M= [
	[0, 3, 1, 5, 0, 0],
	[0, 0, 0, 2, 0, 0],
	[0, 1, 0, 0, 6, 15],
	[0, 0, 3, 0, 2, 5],
	[0, 0, 0, 3, 0, 2],
	[0, 0, 0, 0, 0, 0]
];	// The adjacency matrix for testing the truthness of the implementation

/* INTERVALS */
const INTERVALS= {
	'1': 0,
	'2': 2,
	'm': 3,
	'3': 4,
	'4': 5,
	'5-': 6,
	'5': 7,
	'5+': 8,
	'6': 9,
	'7': 10,
	'7M': 11,
	'8': 12
}

/* CHORDS composition */
const CHORDS= {
	'm': [1, 'm', 5],
}
const getInterval= (note, degree= 8) => {	// Degree is an optional variable
	// Intervals
	return NOTES[(NOTES.indexOf(note.toUpperCase()) + INTERVALS[degree]) % 12];
}

/* CHORDS */
const chord= (tonic, c= '') => {
	// Get the chords represented by an array of notes
	let _chord= [];
	if (c) {
		const notations= c.split(' ');	// Get all the intervals
		notations.forEach((notation) => {
			if (notation in CHORDS) {
				// Breakdown the chords
				CHORDS[notation].forEach((interval) => {
					_chord.push(getInterval(tonic, interval));
				});
			}
			else if (notation in INTERVALS) {
				// Only one more note as interval
				console.log('Tonic is ' + tonic +' Notation is : ' + notation + ' and INTERVALS[NOTATION] is ' + INTERVALS[notation] + ' so the note is ' + getInterval(tonic, INTERVALS[notation]));
				_chord.push(getInterval(tonic, notation));
			}
		});
	}
	return _chord;
}


/* CHORDS */
console.log(chord('C', 'm 7M'));