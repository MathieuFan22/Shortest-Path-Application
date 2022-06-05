const { mooreDijkstra, floydWarshall }= require('./shortestPathAlgorithms');
/* List of functions to create chords */
const notes= ['A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab'];	// 12 notes


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
const getInterval= (note, degree= 8) => {	// Degree is an optional variable
	const intervals= {
		'2': 2,
		'3m': 3,
		'3': 4,
		'4': 5,
		'5dim': 6,
		'5': 7,
		'5aug': 8,
		'6': 9,
		'7': 10,
		'7M': 11,
		'8': 12
	}
	console.log(intervals[degree]);
	return notes[(notes.indexOf(note.toUpperCase()) + intervals[degree]) % 12];
}


/* CHORDS */
console.log(floydWarshall(M)['from-0'], mooreDijkstra(M, 0));