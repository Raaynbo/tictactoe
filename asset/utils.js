console.log("utils loaded");

const pfp_list = ["pfp1.png",
		"pfp2.png",
		"pfp3.png"];

const pfp_dir = "asset/pfp/";
let pfp_index= 0;

const pfp_selector_leftarrow = document.querySelectorAll(".leftarrow");
const pfp_display_p1 = document.querySelector("#ng_player1_pfp_display");

pfp_selector_leftarrow.forEach((arrow) => {
	arrow.addEventListener("click", (e) => {
		const trgt = e.target.nextElementSibling;
		const filename = trgt.src.split("/").pop();
		pfp_index = pfp_list.findIndex((pfp) => pfp === filename)
		pfp_index-=1;
		if (pfp_index < 0){
			pfp_index= pfp_list.length-1;
		}
		trgt.src = pfp_dir + pfp_list[pfp_index];
	});
})
