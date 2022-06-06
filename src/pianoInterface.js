const _$= (elt) => {
	return document.getElementById(elt);
}

const _create= (elt) => {
	return document.createElement(elt);
}

const TILES= ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];	// 12 tiles

class Tile {
	constructor(boss, note, nthOctave= 3) {
		let id= note + nthOctave;	// Create an id for it

		this.boss= boss;	// The container (piano)
		this.boss.tiles[id]= this;	// Map the tile to it's id and mark pressed as false
		this.tile= _create('div');
		this.tile.id= id;
		this.tile.classList.add('tile', note.length == 1? 'white': 'black');	// Black tiles have composed name
		this.octave= nthOctave;

		// Event Listener
		this.tile.addEventListener('mousedown', (e) => {
			if (e.button == 0) {	// Right click
				this.press();
				// Get the pressed tile
			}
		});
	}
	press() {
		// Press the tile
		this.tile.classList.add('pressed');
		this.boss.pressed.push(this.tile.id);	// Push the id of the tile to boss' pressed tiles
	}
	release() {
		// Release the tile
		this.tile.classList.remove('pressed');
	}
}

class Piano {
	constructor(boss, octave= 1, nthOctave= 3) {
		// Create the piano within it's boss with the given number of octave (default is 1) starting at nthOctave
		this.piano= _$(boss);
		this.pressed= [];
		this.tiles= {};

		let elt;	// The element
		for (let i= 0; i < octave; i++) {
			// One octave
			TILES.forEach((tile) => {
				let t= new Tile(this, tile, nthOctave);	// The tile will be in this
				this.piano.appendChild(t.tile);
			});

			// document.querySelectorAll('.tile').forEach((tile) => {
			// 	tile.addEventListener('mousedown', (e) => {
			// 		if (e.button == 0) {	// Right click
			// 			tile.classList.add('pressed');
			// 			// Get the pressed tile
			// 			this.pressed= tile;
			// 		}
			// 	});
			// });

			// Get to the upper octave
			nthOctave++;
		}

		// // When leaving the mouse
		// this.piano.addEventListener('mouseup', (e) => {
		// 	if (e.button == 0) 	// Right click
		// 		for (let tile of this.pressed) 
		// 			this.tiles[tile].release();	// Remove the pressed key
		// });
	}
	/*chord(tiles) {
		// tiles is an array of the id of the Tiles
		for (let tile of tiles) {
			tile= _$(note + nthOctave);
			// Color the chords
			tile.classList.add('pressed');
		}
	}*/

	/* CHORDS */
	chord(tonic, notations= '', octave= 3, permutation= 0) {
		// Get the chords represented by an array of notes
		// Intervals
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
			'M': ['3', 5],
			'm': ['m', 5],
		}

		const getInterval= (note, degree= 8) => {	// Degree is an optional variable
			return TILES[(TILES.indexOf(note.toUpperCase()) + INTERVALS[degree]) % 12];
		}

		let _chord= [tonic];
		if (notations) {
			notations= notations.split(' ');	// Get all the intervals
			notations.forEach((notation) => {
				if (notation in CHORDS) {
					// Breakdown the chords
					CHORDS[notation].forEach((interval) => {
						_chord.push(getInterval(tonic, interval));
					});	
				}
				else if (notation in INTERVALS) {
					// Only one more note as interval
					_chord.push(getInterval(tonic, notation));
				}
			}); 
		}

		// Press the corresponding keys
		_chord.forEach((note) => {
			this.tiles[note + octave].press();
		});
	}
}

let piano= new Piano('piano', 5, 1);

// When leaving the mouse
document.addEventListener('mouseup', (e) => {
	if (e.button == 0) 	// Right click
		piano.pressed.forEach((tile) => {
			piano.tiles[tile].release();	// Remove the pressed key
		});
});
piano.chord('A', 'M 7M', 1);