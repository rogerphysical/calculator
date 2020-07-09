function open_menu() {
	document.getElementById('h10').style.display = "block";
	$('#h12').slideDown(400);
	var h11 = document.getElementById('h11');
	h11.style.backgroundColor = "#F00";
	document.getElementById('h11_word').style.transform = "rotate(180deg)";
	document.body.style.overflowY = "hidden";
	h11.onclick = function() {
		close_menu();
	}
}
function close_menu() {
	document.getElementById('h10').style.display = "none";
	$('#h12').slideUp(400);
	var h11 = document.getElementById('h11');
	h11.style.backgroundColor = "unset";
	document.getElementById('h11_word').style.transform = "rotate(0deg)";
	document.body.style.overflowY = "unset";
	h11.onclick = function() {
		open_menu();
	}
}
function open_cont(th, id) {
	var title = th.innerHTML;
	document.getElementById('h2').innerHTML = "多種計算器:"+title;
	var now_cont = document.getElementById('now_cont').innerHTML;
	document.getElementById(now_cont).style.display = "none";
	$('#'+id).fadeIn(400);
	document.getElementById('now_cont').innerHTML = id;
}

function c1_use(use) {
	switch(use) {
		case "AC":
			document.getElementById('c11_t1').innerHTML = "";
			document.getElementById('c11_t2').innerHTML = "";
			document.getElementById('c11_t3').innerHTML = "";
			break;
		case "C":
			document.getElementById('c11_t3').innerHTML = "";
			break;
		case "CE":
			var c11_t3 = document.getElementById('c11_t3').innerHTML;
			var c11_t3_new = "";
			for (var i = 0; i < c11_t3.length-1; i++) {
				c11_t3_new += c11_t3[i];
			}
			document.getElementById('c11_t3').innerHTML = c11_t3_new;
			break;
		case "±":
			var c11_t3 = document.getElementById('c11_t3').innerHTML;
			if (c11_t3 !== "") {
				var value = parseFloat(document.getElementById('c11_t3').innerHTML);
				document.getElementById('c11_t3').innerHTML = 0-value;
			}
			break;

		case "+":
		case "-":
		case "×":
		case "÷":
			var c11_t1 = document.getElementById('c11_t1').innerHTML;
			var c11_t3 = document.getElementById('c11_t3').innerHTML;
			if (c11_t1 !== "" && c11_t3 !== "") {
				document.getElementById('c11_t1').innerHTML = c1_use("=");
				document.getElementById('c11_t2').innerHTML = use;
				document.getElementById('c11_t3').innerHTML = "";
			}
			else if (c11_t1 === "" && c11_t3 !== "") {
				document.getElementById('c11_t1').innerHTML = c11_t3;
				document.getElementById('c11_t3').innerHTML = "";
				document.getElementById('c11_t2').innerHTML = use;
			}
			else if (c11_t1 !== "" && c11_t3 === "") {
				document.getElementById('c11_t2').innerHTML = use;
			}
			break;

		case "=":
			var c11_t1 = document.getElementById('c11_t1').innerHTML;
			var c11_t2 = document.getElementById('c11_t2').innerHTML;
			var c11_t3 = document.getElementById('c11_t3').innerHTML;
			if (c11_t1 !== "" && c11_t2 !== "" && c11_t3 !== "") {
				switch(c11_t2) {
					case "+":
						var total = parseFloat(c11_t1)+parseFloat(c11_t3);
						break;
					case "-":
						var total = parseFloat(c11_t1)-parseFloat(c11_t3);
						break;
					case "×":
						var total = parseFloat(c11_t1)*parseFloat(c11_t3);
						break;
					case "÷":
						var total = parseFloat(c11_t1)/parseFloat(c11_t3);
						break;
				}
				document.getElementById('c11_t1').innerHTML = "";
				document.getElementById('c11_t2').innerHTML = "";
				document.getElementById('c11_t3').innerHTML = total;
				return total;
			}
			break;
	}
}
function c1_num(num) {
	var c11_t3 = document.getElementById('c11_t3').innerHTML;
	if (c11_t3.length < 16) {
		if (num === ".") {
			var judge = 0;
			for (var i = 0; i < c11_t3.length; i++) {
				if (c11_t3[i] === ".") {
					judge = 1;
				}
			}
			if (judge === 0) {
				document.getElementById('c11_t3').innerHTML += num;
			}
		}
		else {
			document.getElementById('c11_t3').innerHTML += num;
		}
	}
}
function c1_save() {
	var c12_i = document.getElementById('c12_i');
	var c11_t3 = document.getElementById('c11_t3').innerHTML;
	if (c12_i.children.length < 10 && c11_t3 !== "") {
		c12_i.innerHTML += "<div class=c12_item><input class=c12_i0 type=text placeholder=註解><div class=c12_i1 onclick=c1_show(this.innerHTML)>"+c11_t3+"</div><div class=c12_i2 onclick=c1_clear2(this)>&times;</div></div>";
	}
	else if (c12_i.children.length >= 10) {
		alert("儲存過多!");
	}
}
function c1_clear() {
	var judge = confirm("確定全部清除?");
	if (judge === true) {
		document.getElementById('c12_i').innerHTML = "";
	}
}
function c1_show(th_num) {
	document.getElementById('c11_t3').innerHTML = th_num;
}
function c1_clear2(th) {
	th.parentNode.parentNode.removeChild(th.parentNode);
}

function c2_ok() {
	var x = parseInt(document.getElementById('c2_x').value);
	var y = parseInt(document.getElementById('c2_y').value);
	var z = parseInt(document.getElementById('c2_z').value);
	var check = document.getElementById('c2_check').checked;
	if (x > y || z < 1) {
		alert("範圍輸入錯誤");
	}
	else {
		document.getElementById('c2_x').disabled = true;
		document.getElementById('c2_y').disabled = true;
		document.getElementById('c2_z').disabled = true;
		document.getElementById('c2_check').disabled = true;
		document.getElementById('c2_ok').style.display = "none";
		document.getElementById('c2_go').style.display = "block";
		document.getElementById('c2_reset').style.display = "block";
	}
	
}
function c2_reset() {
	document.getElementById('c2_x').disabled = false;
	document.getElementById('c2_y').disabled = false;
	document.getElementById('c2_z').disabled = false;
	document.getElementById('c2_check').disabled = false;
	document.getElementById('c2_ok').style.display = "block";
	document.getElementById('c2_go').style.display = "none";
	document.getElementById('c2_reset').style.display = "none";
	document.getElementById('c2_result').innerHTML = "";
	document.getElementById('c2_record').innerHTML = "";
}
function c2_start() {
	var x = parseInt(document.getElementById('c2_x').value);
	var y = parseInt(document.getElementById('c2_y').value);
	var z = parseInt(document.getElementById('c2_z').value);
	var check = document.getElementById('c2_check').checked;
	document.getElementById('c2_record').innerHTML += document.getElementById('c2_result').innerHTML;
	document.getElementById('c2_result').innerHTML = "";
	if (check === false) {
		if (y-x+1 >= z) {
			var record = [];
			var time = 0;

			while (time < z) {
				var ran = parseInt(Math.random()*(y-x+1))+x;
				if (!(record.includes(ran))) {
					record.push(ran);
					document.getElementById('c2_result').innerHTML += "<div>"+ran+"</div>";
					time ++;
				}
			}
		}
		else {
			alert("抽取數量過多");
		}
	}
	// check === true
	else {
		var c2_record = document.getElementById('c2_record').children;
		var record_l = c2_record.length;
		if (y-x+1 >= z+record_l) {
			var record = [];
			for (var i = 0; i < record_l; i++) {
				record.push(parseInt(c2_record[i].innerHTML));
			}
			var time = 0;

			while (time < z) {
				var ran = parseInt(Math.random()*(y-x+1))+x;
				if (!(record.includes(ran))) {
					record.push(ran);
					document.getElementById('c2_result').innerHTML += "<div>"+ran+"</div>";
					time ++;
				}
			}
		}
		else {
			alert("抽取數量過多");
		}
	}
}