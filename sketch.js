let strings;
let input;
let bomb;
let substringList
let substring
let typedText = ""
let formattedTypedText = []
let correctness = true
let possibleWordsArray = []
let possibleWords = ""

const BOMBSIZE = 160
const TEXTSIZE = 150
const INPUTSIZE = 650

function preload() {
	strings = loadStrings('words.txt');
	bomb = loadImage('bomb.png');
}

function setup() {
	let cnv = createCanvas(windowWidth, windowHeight);
	cnv.style('display', 'block');
	textAlign(CENTER);

	input = createInput().size(INPUTSIZE)
	input.position(windowWidth / 2 - INPUTSIZE / 2, windowHeight - 100);
	input.size(INPUTSIZE)
	input.input(myInputEvent);

	substringList = findTop(strings, 500)

	textSize(32);
	fill(255)
	substring = random(substringList)
}

function myInputEvent() {
	typedText = input.value().toLowerCase()
	if (typedText.includes(substring)) {
		let i = typedText.indexOf(substring)
		let before = typedText.slice(0, i).toUpperCase()
		let thing = typedText.slice(i, i + substring.length).toUpperCase()
		let after = typedText.slice(i + substring.length, typedText.length).toUpperCase()
		formattedTypedText = [[before, "white"], [thing, [0, 200, 0]], [after, "white"]]
	} else {
		formattedTypedText = [[typedText.toUpperCase(), "white"]]
	}
}

function draw() {
	background(78, 68, 60)
	image(bomb, windowWidth / 2 - BOMBSIZE / 2 + 7, windowHeight / 2 - BOMBSIZE / 2 - 25, BOMBSIZE, BOMBSIZE);
	textAlign(CENTER)
	text(substring.toUpperCase(), windowWidth / 2, windowHeight / 2)
	drawtextCenter(windowWidth / 2, windowHeight / 2 - 140, formattedTypedText)
	textAlign(LEFT)
	fill(255)
	text(possibleWords, 50, 50)
}

function keyPressed() {
	correctness = true
	if (keyCode == 13) {
		input.value("")
		if (strings.includes(typedText.replace(/[^a-z-]/g, '')) && typedText.includes(substring)) {
			substring = random(substringList)
			typedText = ""
			formattedTypedText = []
			possibleWords = ""
			possibleWordsArray = []
		} else {
			correctness = false
			if(possibleWords == ""){
				for(let word of strings){
					if(word.includes(substring)){
						possibleWordsArray.push(word)
					}
				}
				const shuffled = possibleWordsArray.sort(() => 0.5 - random());
				let selected = shuffled.slice(0, 10);
				possibleWords = selected.join("\n")
			}
		}
	}
}

function drawtextCenter(x, y, text_array) {
	textAlign(LEFT)
	var pos_x = x - textWidth(typedText.toUpperCase()) / 2;
	for (var i = 0; i < text_array.length; ++i) {
		var part = text_array[i];
		var t = part[0];
		var c = part[1];
		var w = textWidth(t);
		fill(correctness ? c : [200, 0, 0]);
		text(t, pos_x, y);
		pos_x += w;
	}
}