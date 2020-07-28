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
				//解決浮點數誤差(換成整數)
				const c11_t1_l = (c11_t1.split('.')[1] || "").length;
				const c11_t3_l = (c11_t3.split('.')[1] || "").length;
				const c11_t_op = Math.pow(10, Math.max(c11_t1_l, c11_t3_l));
				switch(c11_t2) {
					case "+":
						var total = parseInt(c11_t1*c11_t_op+c11_t3*c11_t_op)/c11_t_op;
						break;
					case "-":
						var total = parseInt(c11_t1*c11_t_op-c11_t3*c11_t_op)/c11_t_op;
						break;
					case "×":
						const c11_t1_op2 = Math.pow(10, c11_t1_l);
						const c11_t3_op2 = Math.pow(10, c11_t3_l);
						const c11_t_op2 = Math.pow(10, c11_t1_l+c11_t3_l);
						var total = parseInt((c11_t1*c11_t1_op2)*(c11_t3*c11_t3_op2))/c11_t_op2;
						break;
					case "÷":
						var total = (parseInt(c11_t1*c11_t_op)/parseInt(c11_t3*c11_t_op));
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
	//接受長度
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
		var cont = "<div class=c12_item>";
		cont += "<div class=c12_i1 onclick=c1_show(this.innerHTML)>";
		cont += c11_t3;
		cont += "</div>";
		cont += "<div class=c12_i2 onclick=c1_clear2(this)>&times;</div></div>";
		cont += "</div>";
		c12_i.innerHTML += cont;
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
	var judge = confirm("將刪除抽取紀錄\r是否繼續?");
	if (judge === true) {
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
	
}
function c2_start() {
	var x = parseInt(document.getElementById('c2_x').value);
	var y = parseInt(document.getElementById('c2_y').value);
	var z = parseInt(document.getElementById('c2_z').value);
	var check = document.getElementById('c2_check').checked;
	document.getElementById('c2_record').innerHTML += document.getElementById('c2_result').innerHTML;
	document.getElementById('c2_result').innerHTML = "";

	var c2_record = document.getElementById('c2_record').children;
	var range = y-x+1;

	if (check === false && range < z) {
		alert("抽取數量過多");
		return false;
	}
	else if (check === true && range < z+c2_record.length) {
		alert("抽取數量過多");
		return false;
	}
	else {
		var record = [];
		if (check === true) {
			for (var i = 0; i < c2_record.length; i++) {
				record.push(parseInt(c2_record[i].innerHTML));
			}
		}

		var c2_result = "";
		var time = 0;
		while (time < z) {
			var ran = parseInt(Math.random()*(range))+x;
			if (!(record.includes(ran))) {
				record.push(ran);
				c2_result += "<div>"+ran+"</div>";
				time ++;
			}
		}

		document.getElementById('c2_result').innerHTML = c2_result;
		return true;
	}
}

function c3_clear_all() {
	var judge = confirm("確定清空項目?");
	if (judge === true) {
		document.getElementById('c3_iii').innerHTML = "";
	}
}
function c3_clear(th) {
	th.parentNode.parentNode.removeChild(th.parentNode);
}
function c3_add() {
	var c3_ii_t1 = document.getElementById('c3_ii_t1').value;
	var c3_ii_t2 = document.getElementById('c3_ii_t2').value;
	if (c3_ii_t1 === "" || c3_ii_t2 < 0) {
		alert("輸入錯誤");
	}
	else {
		var c3_iii = "<div class=c3_ii_i>";
		c3_iii += "<div class=c3_ii_i1>"+c3_ii_t1+"</div>";
		c3_iii += "<div class=c3_ii_i2>"+c3_ii_t2+"</div>";
		c3_iii += "<input class=c3_ii_i3 type=button value=&times; onclick=c3_clear(this)>";
		c3_iii += "</div>";
		document.getElementById('c3_iii').innerHTML += c3_iii;
	}
}
function c3_ok() {
	document.getElementById('c3_reset').style.display = "block";
	document.getElementById('c3_go').style.display = "block";
	document.getElementById('c3_ok').style.display = "none";
	document.getElementById('c3_ii_t1').disabled = true;
	document.getElementById('c3_ii_t2').disabled = true;
	document.getElementById('c3_ii_t3').disabled = true;
	var c3_ii_i3 = document.getElementsByClassName('c3_ii_i3');
	for (var i = 0; i < c3_ii_i3.length; i++) {
		c3_ii_i3[i].disabled = true;
	}
	// document.getElementById('c3_check').disabled = true;
}
function c3_reset() {
	document.getElementById('c3_reset').style.display = "none";
	document.getElementById('c3_go').style.display = "none";
	document.getElementById('c3_ok').style.display = "block";
	document.getElementById('c3_ii_t1').disabled = false;
	document.getElementById('c3_ii_t2').disabled = false;
	document.getElementById('c3_ii_t3').disabled = false;
	var c3_ii_i3 = document.getElementsByClassName('c3_ii_i3');
	for (var i = 0; i < c3_ii_i3.length; i++) {
		c3_ii_i3[i].disabled = false;
	}
	// document.getElementById('c3_check').disabled = false;

	document.getElementById('c3_result').innerHTML = "";
	document.getElementById('c3_record').innerHTML = "";
}
function c3_start() {
	// var check = document.getElementById('c3_check').checked;
	document.getElementById('c3_record').innerHTML += document.getElementById('c3_result').innerHTML;
	document.getElementById('c3_result').innerHTML = "";

	var c3_ii_i2 = document.getElementsByClassName('c3_ii_i2');
	var item = [];
	var total = 0;
	for (var i = 1; i < c3_ii_i2.length; i++) {
		var value = parseInt(c3_ii_i2[i].innerHTML);
		item.push(value);
		total += value;
	}

	if (total !== 0) {
		pos = 0;
		total2 = item[0];
		var ran = parseInt(Math.random()*total)+1;
		while (total2 < ran) {
			pos ++;
			total2 += item[pos];
		}

		document.getElementById('c3_result').innerHTML = "<div>"+document.getElementsByClassName('c3_ii_i1')[pos+1].innerHTML+"</div>";
	}
}
