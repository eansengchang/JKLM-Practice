function findTop(strings, rarity) {
	let topsubstrings = []

	let map = new Map();

	//3 letter substrings
	for (let string of strings) {
		for (let i = 0; i < string.length - 2; i++) {
			let substring = string.slice(i, i + 3)
			map.set(substring, map.get(substring) ? map.get(substring) + 1 : 1)
		}
	}

	//2 letter substrings
	for (let string of strings) {
		for (let i = 0; i < string.length - 1; i++) {
			let substring = string.slice(i, i + 2)
			if (!substring.includes('-') && !substring.includes("'")) {
				map.set(substring, map.get(substring) ? map.get(substring) + 1 : 1)
			}
		}
	}

	for (let substring of map) {
		if(substring[1] >= rarity){
			topsubstrings.push(substring[0])
		}
	}
	return topsubstrings
}