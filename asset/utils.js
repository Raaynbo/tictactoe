console.log("utils loaded");

const pfp_list = ["pfp1.png",
		"pfp2.png",
		"pfp3.png"];

const pfp_dir = "asset/pfp/";
const marker_dir = "asset/marker/";

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
let pfp_index= 0;

const pfp_selector_leftarrow = document.querySelectorAll(".leftarrow");
const pfp_selector_rightarrow = document.querySelectorAll(".rightarrow");
const pfp_display_p1 = document.querySelector("#ng_player1_pfp_display");
const marker_icons = document.querySelectorAll(".marker_icon");


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
		console.log(marker);	
		const marker_img = document.createElement("img");
		marker_img.style.width = "156px";
		marker_img.style.height ="156px";
		marker_img.src = marker_dir + markers_list[counter];
		counter++;
		
		marker.appendChild(marker_img);
	});
}


loadMarkerSelector();
