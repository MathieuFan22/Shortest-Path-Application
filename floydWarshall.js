// Shortest path using Floyd Warshall's algorithm
/*
	i will mark the antecedant (rows),
	j will mark the successor (columns)
*/

/*
	INPUT:
		* the vertex and their adjacency matrix
*/

/* INPUT */

let M= [
	[0, 3, 1, 5, 0, 0],
	[0, 0, 0, 2, 0, 0],
	[0, 1, 0, 0, 6, 15],
	[0, 0, 3, 0, 2, 5],
	[0, 0, 0, 3, 0, 2],
	[0, 0, 0, 0, 0, 0]
];	// The adjacency matrix for testing the truthness of the implementation


const floydWarshall= (M) => {
	let n= M.length;
	let L= [];	// L= [l(i, j)]: Shortest path matrix from i to j
	let P= [];	// P= [p(i, j)]: Predecessor of j on the shortest path from i to j
	let paths= {};

	/* Path finder function */
	const findPath= (row) => {
		// From row to others
		let len= {};
		for (let i= 0; i < n; i++) {
			// Only take i if i != row and there is a path between row and i
			let pathLen= L[row][i];
			let path;

			if (i !== row && pathLen !== Infinity) {
				path= [i];	// The path is by default set to the destination
				let h= P[row][i];	// Predecessor of i from row to i
				
				while (pathLen) {
					path.unshift(h);
					pathLen= L[row][h];	// The path length from row to h
					h= P[row][h];	// Go along to the next predecessor
				}
			}

			if (path) len[`to-${i}`]= path;	// Add to the path if path is defined
		}
		return len;
	}

	/* INITIALIZATION */

	// for i, j, l(i, j)= weight of the path if there is a path, else infinite
	for (let i= 0; i < n; i++) {	// i: rows
		let lij= [];
		let pij= [];
		for (let j= 0; j < n; j++) {	// j: columns
			if (i === j) {
				lij.push(0)	// The diagonal will always be 0 considering there is no loop in the graph
				pij.push(i);
			}
			else
				if (M[i][j]) {
					// There is a path between i and j
					pij.push(i);	// Predecessor
					lij.push(M[i][j]);	// Shortest path
				}
				else {
					// No path between i and j
					pij.push(null);	// No predecessor
					lij.push(Infinity);	// Shortest path
				}
		}
		// Add the row to L and P
		// console.log(pij);
		L.push(lij);
		P.push(pij);
	}

	/* TREATMENT */
	for (let k= 0; k < n; k++) {	// k: the intermediate vertice
		for (let i= 0; i < n; i++) {	// i: the antecedant
			// We don't consider k
			if (i === k)
				if (i === n - 1)
					break;
				else continue;
			else {
				if (L[i][k] + L[k][i] < 0)
					break;	// Absorbant circuit
				if (L[i][k] != Infinity) {
					for (let j= 0; j < n; j++) {	// j: the successor
						// We don't consider i
						if (i === j)
							if (i === n - 1)
								break;
							else continue;
						else {
							if (L[i][k] + L[k][j] < L[i][j]) {
								L[i][j]= L[i][k] + L[k][j];	// Set the shortest path length
								P[i][j]= P[k][j];	// Set the predecessor in the shortest path
							}
						}
					}
				}
			}
		}
	}
	
	for (let i= 0; i < n; i++) {
		// Get all the paths from each vertice to others
		paths[`from-${i}`]= findPath(i);
	}

	return {
		lengths: L,
		paths
	}
}