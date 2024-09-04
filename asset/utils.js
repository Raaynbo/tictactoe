
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

const ng_btn = document.querySelector("#ng");
const pfp_selector_leftarrow = document.querySelectorAll(".leftarrow");
const pfp_selector_rightarrow = document.querySelectorAll(".rightarrow");
const marker_icons = document.querySelectorAll(".marker_icon");
const ft_button = document.querySelectorAll(".ft_button");

const container = document.querySelector(".toast_container");

const p1_name = document.querySelector("#p1name");
const p2_name = document.querySelector("#p2name");

// --------------------------------------------- Modal var
const modal = document.querySelector(".modal");
const modal_open_btn = document.querySelector(".modal_open");
const overlay = document.querySelector(".overlay");
const modal_title = document.querySelector(".modal_title");
const modal_content = document.querySelector(".modal_content");



let selected_mode = 1;

ft_button.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		let temp = document.querySelector(".ft_button.selected");
		if (temp === btn){
			return false;
		}
		btn.classList.add("selected");
		temp.classList.remove("selected");
		selected_mode = e.target.textContent;
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
	if (prevMarker !== null){
		prevMarker.id = "";
		e.target.setAttribute("id",`${playerturn}`);
		
		marker_turn == 1 ? marker_turn = 0 : marker_turn = 1;
		return false;
	}
	e.target.id = `${playerturn}`;
		marker_turn == 1 ? marker_turn = 0 : marker_turn = 1;

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

function resetGrid(container){
	while (container.firstChild ){
		container.removeChild(container.lastChild);
	}
	createGrid(cellNb, gridDim, container, false)
	
}


function changeState(actual, newState, player1, player2){
	actual.style.display = "none";
	newState.style.display =  "flex";
	if (newState === boardui){
		while (boardui.firstChild){
			boardui.removeChild(boardui.lastChild);
		}
		let scoreboard = document.createElement('div');
		let container = document.createElement('div');
		container.classList.add("board_container");
		scoreboard.classList.add("scoreboard");
		createScoreboard(scoreboard, player1, player2);
		boardui.appendChild(scoreboard);

		boardui.appendChild(container);
		return container;
	}
	return true;

}

function createScoreboard(container, player1, player2){
	const p1_pfp = document.createElement('div');
	const p2_pfp = document.createElement('div');
	const p1_score = document.createElement('div');
	const p2_score = document.createElement('div');
	const separator = document.createElement('div');
	p2_pfp.classList.add("player_card");
	p1_pfp.classList.add("player_card");
	separator.classList.add("scoreboard_sep");
	p1_score.textContent = player1.playerScore;
	p2_score.textContent = player2.playerScore;
	p1_score.classList.add("pscore");
	p1_score.id = "p1score";
	p2_score.id = "p2score";
	p2_score.classList.add("pscore");
	createPlayerIcon(player1, p1_pfp);
	createPlayerIcon(player2, p2_pfp);

	container.appendChild(p1_pfp);
	container.appendChild(p1_score);
	container.appendChild(separator);
	container.appendChild(p2_score);
	container.appendChild(p2_pfp);

}

function createPlayerIcon(player, container){
	const pfp = document.createElement('img');
	pfp.src = player.playerIcon;
	pfp.classList.add("ng_player_pfp_display");
	pfp.classList.add("icon");
	const name = document.createElement('span');
	name.textContent = player.playerName;
	container.appendChild(name);
	container.appendChild(pfp);
}

function interactModal(){
	modal.classList.toggle("hidden");
	modal.classList.toggle("modal_display");
	overlay.classList.toggle("hidden");
}

function populateModal(title, content){
	modal_title.textContent = title;
	modal_content.textContent = content;
	
}



async function createNotif(title, content, time=9900 ){
	const toast = document.createElement('div');
	const toast_title = document.createElement('div');
	const toast_content = document.createElement('div');
	toast.classList.add("toast");
	toast.classList.add("hidden");
	toast_title.classList.add("toast_title");
	toast_content.classList.add("toast_content");

	toast.appendChild(toast_title);
	toast.appendChild(toast_content);
	container.appendChild(toast);
	await notifGenerator(toast, time);
	toast_title.textContent = title;
	toast_content.textContent = content;

}


async function notifGenerator(toast, time = 9900) {
  return new Promise((resolve, reject) => {
	toast.classList.add("toast_notif");
	toast.classList.remove("hidden");
	
	resolve(setTimeout(() => {
		toast.parentNode.removeChild(toast);
		toast.classList.remove("toast_notif")
		toast.classList.add("hidden")
	}, time))
  });
}
loadMarkerSelector()
