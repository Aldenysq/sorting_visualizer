function random_number(min, max){
	return min + Math.floor((max-min)*Math.random());
}
let n = 0;
let from = 0;
let to = 100;

let margin_top = 100;
let maxi = 150;
let all = [];
let time_red = 70;
let swap_after = time_red/2;

function create(i){
	let element = new Object();
	let div = document.createElement("div");
	div.className = "rectangle";
	element.value = random_number(from, to);
	// element.value = 10;
	element.id = i.toString();
	div.style.marginTop = 3*(maxi - element.value)+"px";
	div.id = element.id;
	div.style.height = element.value * 3 + "px";
	document.getElementById("area").appendChild(div);
	element.div = div;
	return element;
}




function rearrange(first, second){
	setTimeout(make_gray, time_red, first.div);
	setTimeout(make_gray, time_red, second.div);
	first.div.style.backgroundColor = "red";
	second.div.style.backgroundColor = "red";

	function swap_places(){



	first.div.style.marginTop = 3*(maxi - second.value)+"px";
	second.div.style.marginTop = 3*(maxi - first.value)+"px";

	first.div.style.height = second.value * 3 + "px";
	second.div.style.height = first.value * 3 + "px";

	
	[first.value, second.value] = [second.value, first.value];

}
	setTimeout(swap_places, swap_after);
	
}

function make_gray(div){
	div.style.backgroundColor = "gray";
}


async function bubbleSort(){
	disable();
	for (let i = 0; i < n; i++)
		for (let j = 0; j < n-1; j++){
			if (all[j].value > all[j+1].value){

				 rearrange(all[j], all[j+1]);
				 await wait(time_red);
			}	
		}
		activate();
}

async function selectionSort(){
	disable();
	for (let i = 0; i < n; i++)
		for (let j = 0; j < i; j++){
			if (all[i].value < all[j].value){

				 rearrange(all[i], all[j]);
				 await wait(time_red);
			}	
		}
	activate();
}



async function qSort(){
 	disable();
 	await quickSort(0, n-1);
 	activate();
	}


async function quickSort(low, high){

    let i = low;
    let j = high;
    let mid = (i+j)/2;
    mid = Math.floor(mid);
    let pivot = all[mid].value;
    while (i <= j)
    {
        while (all[i].value < pivot)
            i++;
        while (all[j].value > pivot)
            j--;
        if (i <= j)
        {
            rearrange(all[i], all[j]);
            await wait(time_red);
            i++;
            j--;
        }
    }
    if (j > low)
        await quickSort(low, j);
    if (i < high)
        await quickSort(i, high);

   return 1;
}


async function wait(ms){
	let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("готово!"), ms)
  });
		let result = await promise;
	return;
}


async function heapify(n, i)
{
    let largest = i;
    let l = 2 * i + 1; 
    let r = 2 * i + 2; 
 
    if (l < n && all[l].value > all[largest].value)
        largest = l;
 
    if (r < n && all[r].value > all[largest].value)
        largest = r;
 
    if (largest != i) {

        rearrange(all[i], all[largest]);
        await wait(time_red);
        await heapify(n, largest);
    }
    return 1;
}
 

async function heapSort()
{
	disable();
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        await heapify(n, i);
 
    for (let i = n - 1; i > 0; i--) {
        rearrange(all[0], all[i]);
 		await wait(time_red);
        await heapify(i, 0);
    }
    activate();
    return 1;

}


var size_array = document.getElementById("arraySize");
var size_array_v = document.getElementById("arraySizeV");

size_array.addEventListener("input", update_size, false);

size_array.value = 1+"";
update_size();

function update_size() {
	size_array_v.innerHTML = size_array.value;
  update_array();
  }
function update_array(){
	let div = document.getElementById("area");
	for (let i = 0; i < n; i++) div.removeChild(all[i].div);
	all = [];
	n = Number(size_array.value);
	for (let i = 0; i < n; i++) all.push(create(i));
	div.style.marginLeft = -830*n/83 + 830 + "px";
	}

var sort_speed = document.getElementById("sortSpeed");
var sort_speed_v = document.getElementById("sortSpeedV");

sort_speed.addEventListener("input", update_speed, false);

function update_speed(){
	sort_speed_v.innerHTML = sort_speed.value;
	time_red = 320 - Number(sort_speed.value);
	}
sort_speed_v.innerHTML = 250;


var minel = document.getElementById("minimum");
var minel_v = document.getElementById("minimumv");

minel.addEventListener("input", update_min, false);

function update_min(){
	minel_v.innerHTML = minel.value;
	from = Number(minel.value);
	if (from >= to){
		to = from+1;
		maxel_v.innerHTML = from + "";
		maxel.value = from + "";
	}
	update_array();

	}

var maxel = document.getElementById("maximum");
var maxel_v = document.getElementById("maximumv");

maxel.addEventListener("input", update_max, false);

function update_max(){
	maxel_v.innerHTML = maxel.value;
	to = Number(maxel.value);
	to++;
	if (to <= from){
		from = to-1;
		minel_v.innerHTML = from + "";
		minel.value = from + "";	
	}
	update_array();
	
	}
maxel_v.innerHTML = 100;

function disable(){
	let buttons = document.getElementsByClassName("label");
	for (let i = 0; i < buttons.length; i++){
		buttons[i].classList.add("disabled");
	}
	let rest = document.getElementsByClassName("potential"); //range-slider__range potential
	for (let i = 0; i < rest.length; i++){
		rest[i].classList.add("disabled");
	}

}	

async function activate(){

	for (let i = 0; i <n; i++){
		all[i].div.style.backgroundColor = "green";
	}
	await wait(500);
	for (let i = 0; i <n; i++){
		all[i].div.style.backgroundColor = "gray";
	}

	let buttons = document.getElementsByClassName("label");
	for (let i = 0; i < buttons.length; i++){
		buttons[i].classList.remove("disabled");
	}
	let rest = document.getElementsByClassName("potential"); //range-slider__range potential
	for (let i = 0; i < rest.length; i++){
		rest[i].classList.remove("disabled");
	}
	
	

}
