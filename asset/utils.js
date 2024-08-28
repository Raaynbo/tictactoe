console.log("utils loaded");

const pfp_list = ["pfp1.png",
		"pfp2.png",
		"pfp3.png"];

const pfp_dir = "asset/icons/pfp/";
const marker_dir = "asset/icons/marker/";

const markers_list = [
	"marker_1.png",
	"marker_2.png",
	"marker_3.png",
	"marker_4.png",
	"marker_5.png",
	"marker_6.png",
	"marker_7.png",
	"marker_8.png"
];

let marker_turn = 0;
let pfp_index= 0;

let x,y = 0;

const pfp_selector_leftarrow = document.querySelectorAll(".leftarrow");
const pfp_selector_rightarrow = document.querySelectorAll(".rightarrow");
const marker_icons = document.querySelectorAll(".marker_icon");
const ft_button = document.querySelectorAll(".ft_button");

const p1_name = document.querySelector("#p1name");
const p2_name = document.querySelector("#p2name");

//const p1marker = "";
//const p2marker = "";
let selected_mode = 1;

ft_button.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		let temp = document.querySelector(".ft_button.selected");
		if (temp === btn){
			return false;
		}
		btn.classList.add("selected");
		console.log(temp);
		temp.classList.remove("selected");
		selected_mode = e.target.textContent;
		console.log(selected_mode);
	})
});

pfp_selector_leftarrow.forEach((arrow) => {
	arrow.addEventListener("click", (e) => changePfp(e, "left"));
});
pfp_selector_rightarrow.forEach((arrow) => {
	arrow.addEventListener("click", (e) => changePfp(e, "right"));
});

function getFilename(trgt){
	return trgt.src.split("/").pop();
}

function changePfp(e, direction){
	direction === "left" ? trgt = e.target.nextElementSibling : trgt = e.target.previousElementSibling;
	const filename = getFilename(trgt); 
	index = pfp_list.findIndex((pfp) => pfp === filename)
	switch (direction){
		case "left":
			index -= 1;
			if (index < 0){
				index= pfp_list.length-1;
			}
			break;
		case "right":
			index += 1;
			if (index == pfp_list.length){
				index = 0;
			}
			break;
	}
	trgt.src = pfp_dir + pfp_list[index];
}

function loadMarkerSelector(){
	let counter = 0;
	marker_icons.forEach((marker) => {
		const marker_img = document.createElement("img");
		marker_img.style.width = "156px";
		marker_img.style.height ="156px";
		marker_img.src = marker_dir + markers_list[counter];
		counter++;
		
		marker.appendChild(marker_img);
		marker_img.addEventListener("click", (e) => definePlayerMarker(e));
	});
}

function definePlayerMarker(e){
	let playerturn;
	marker_turn == 0 ? playerturn ="p1marker": playerturn = "p2marker";
	const prevMarker = document.querySelector(`#${playerturn}`) ;
	console.log(playerturn);
	if (prevMarker !== null){
		prevMarker.id = "";
		e.target.setAttribute("id",`${playerturn}`);
		
		console.log(e.target);
		marker_turn == 1 ? marker_turn = 0 : marker_turn = 1;
		return false;
	}
		console.log("player had no marker")
	e.target.id = `${playerturn}`;
		marker_turn == 1 ? marker_turn = 0 : marker_turn = 1;
		console.log(e.target);
	console.log(marker_turn)

}

async function myPromiseGenerator() {
  return new Promise((resolve, reject) => {
	const cells = document.querySelectorAll(".cell");
	cells.forEach((cell) => {
		cell.addEventListener('click',function(e) {
		/// do something to process the answer
				x = e.target.id.split("-")[1];
				y = e.target.id.split("-")[2];
		resolve(x, y);
		    }, {once: true});
		})
  });
}

function drawMarker(src, cellid){
	let cell = document.querySelector(`#${cellid}`)
	let img = document.createElement("img");
	img.src = src;
	img.style.width = "100%";
	img.style.height = "100%";
	cell.appendChild(img)

}

function createGrid(cellNb, gridDim, target, preview){
	target.style.width , target.style.height = gridDim + "px";
	cellDim = (gridDim/cellNb) + "px";
	for ( let j = 0; j <= cellNb-1; ++j){
		let row = document.createElement('div');
		row.classList.add("board_row"); 
		row.style.height = cellDim;
		target.appendChild(row);
		for (let i = 0; i <= cellNb-1; ++i){
			let cell = document.createElement("div");
			const baseTagId = "cell-";
			cell.style.width = cellDim;
			cell.style.height = cellDim;
			cell.id = baseTagId + j + "-" + i;
			cell.classList.add("cell");
			row.appendChild(cell);
			if (preview){
			setEventOnCells(cell);
			}
		}
	}
}

loadMarkerSelector()
