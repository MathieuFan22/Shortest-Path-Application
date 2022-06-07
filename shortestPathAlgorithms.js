// Shortest path algorithms

const tester= [
	[0, 3, 1, 5, 0, 0],
	[0, 0, 0, 2, 0, 0],
	[0, 1, 0, 0, 6, 15],
	[0, 0, 3, 0, 2, 5],
	[0, 0, 0, 3, 0, 2],
	[0, 0, 0, 0, 0, 0]
];	// The adjacency matrix for testing the truthness of the implementation

const mooreDijkstra= (M, origin= 0) => {
	/*
		INPUTS:
			* M: Adjacency Matrix
			* origin: the origin vertex
		OUTPUTS:
			* Shortest paths to other vertices along with their length
	*/

	let paths= {};
	/**********************************************************************************************************/
	// STEP 1: Initialization
	let n= M.length;
	let unvisited= [];	// unvisited vertices
	let pcc= [];
	// Setting the shortest path from the origin and filling the unvisited vertices list
	for (let i= 0; i < n; i++) {
		if (i !== origin) {
			unvisited.push(i);	// unvisited= S\{origin}
			// if M[origin][i] != 0, pcc[i]= M[origin][i] else pcc[i]= Infinity
			if (M[origin][i]) {
				pcc[i]= M[origin][i];
				paths[`to-${i}`]= [origin, i];	// The initials paths is starting from the origin
			}
			else
				pcc[i]= Infinity;
		}
		else
			pcc[i]= 0;
	}

	while (unvisited.length) {	// As long as we have unvisited paths
		// STEP 2:
		// Select j from unvisited where pcc[j]= min(pcc[unvisited])
		let j= unvisited[0];
		// pcc.length would always be n
		for (let v= 0; v < n; v++) {
			// pcc[v]: shortest path from origin to v
			// We only need the v included in unvisited
			if (pcc[v] < pcc[j] && unvisited.includes((vertex) => vertex == v)) {
				j= v;
			}	// END IF
		}	// END FOR
		unvisited= unvisited.filter((vertex) => vertex != j);	// Remove j from the unvisited list
		
		// STEP 3: For every successor of j set shortest path
		if (unvisited.length) {
			for (let i= 0; i < n; i++) {
				if (M[j][i]) {
					// If i is a successor of j
					if (pcc[j] + M[j][i] < pcc[i]) {
						// Passing by j is shorter
						pcc[i]= pcc[j] + M[j][i];
						paths[`to-${i}`]= [...paths[`to-${j}`], i];	// We pass to j first
					}	// END IF
				}	// END IF
			}	// END FOR
		}	// END IF
	}	// END WHILE
	/**************************************************************************************************************/

	// Setting the path length as the second element of the paths variable
	for (let i= 0; i < n; i++) {
		if (i !== origin){
			paths[`to-${i}`]= [paths[`to-${i}`], pcc[i]];
		}
	}
	return paths;
}

const floydWarshall= (M) => {
	/*
		INPUTS:
			* M: Adjacency Matrix
		OUTPUTS:
			* Shortest from each vertices to other vertices along with the paths' length
	*/
	let n= M.length;
	let lengths= [];	// L= [l(i, j)]: Shortest path matrix from i to j
	let P= [];	// P= [p(i, j)]: Predecessor of j on the shortest path from i to j
	let paths= {};

	const findPath= (row) => {
		/* Path finder function */
		/* From row to others */
		let len= {};
		for (let i= 0; i < n; i++) {
			// Only take i if i != row and there is a path between row and i
			let pathLen= lengths[row][i];
			let path;

			if (i !== row && pathLen !== Infinity) {
				path= [i];	// The path is by default set to the destination
				let h= P[row][i];	// Predecessor of i from row to i
				
				while (pathLen) {
					path.unshift(h);
					pathLen= lengths[row][h];	// The path length from row to h
					h= P[row][h];	// Go along to the next predecessor
				}
			}

			// Add to the path if path is defined the array such that
			// len[to-i]= [path-from-row-to-i, pathLen-from-row-to-i]	
			if (path) len[`to-${i}`]= [path, lengths[row][i]];
		}
		return len;
	}

	/**************************************************************************************************************/
	/* THE MAIN ALGORITHM */
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
		lengths.push(lij);
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
				if (lengths[i][k] + lengths[k][i] < 0)
					break;	// Absorbant circuit
				if (lengths[i][k] != Infinity) {
					for (let j= 0; j < n; j++) {	// j: the successor
						// We don't consider i
						if (i === j)
							if (i === n - 1)
								break;
							else continue;
						else {
							if (lengths[i][k] + lengths[k][j] < lengths[i][j]) {
								lengths[i][j]= lengths[i][k] + lengths[k][j];	// Set the shortest path length
								P[i][j]= P[k][j];	// Set the predecessor in the shortest path
							}
						}
					}
				}
			}
		}
	}
	/***********************************************************************************************************************/

	for (let i= 0; i < n; i++) {
		// Get all the paths from each vertice to others
		paths[`from-${i}`]= findPath(i);
	}

	return paths
}

module.exports= {
	mooreDijkstra,
	floydWarshall,
	tester
}