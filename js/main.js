
var list = [
    {"desc":"rice","amount":"1","value":"5.40"},
    {"desc":"beer","amount":"12","value":"1.99"},
    {"desc":"meat","amount":"1","value":"15.00"}
];

function getTotal(list){
    var total = 0;
    for(var key in list){
        total += list[key].value * list[key].amount;
    }
    return total;
}

function setList(list){
	var table = '';
	table += '<thead>';
	table += '<tr>';
	table += '<th>Description</th>';
	table += '<th>Amount</th>';
	table += '<th>Value</th>';
	table += '<th>Actions</th>';
	table += '</tr>';
	table += '</thead>';
	table += '<tbody>';

	list.forEach(function(element, index, array){
		table += '<tr>';
		table += '<td>' + formatDesc(element.desc) + '</td>';
		table += '<td>' + element.amount + '</td>';
		table += '<td>' + formatValue(element.value) + '</td>';
		table += '<td>';
		table += '<div class="btn-group">';
		table += '<button class="btn btn-default" onclick="setUpdate(' + index + ');">Edit</button>';
		table += '<button class="btn btn-default" onclick="deleteData(' + index + ');">Delete</button>';
		table += '</div>';
		table += '</td>';
		table += '</tr>';
	});

	table += '</tbody>';
    document.getElementById("list-table").innerHTML = table;
}

function formatDesc(desc){
	var str = desc.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}

function formatValue(value){
	var str = parseFloat(value).toFixed(2) + "";
	str = str.replace(".", ",");
	str = "$ " + str;
	return str;
}

function addData(){
	var desc 	= document.getElementById('desc').value;
	var amount 	= document.getElementById('amount').value;
	var value 	= document.getElementById('value').value;

	list.unshift({
		'desc' 		: desc,
		'amount' 	: amount,
		'value'		: value, 
	});

	setList(list);
	resetForm();
}

function setUpdate(id){
	var obj = list[id];
	document.getElementById("desc").value 	= obj.desc;
	document.getElementById("amount").value = obj.amount;
	document.getElementById("value").value 	= obj.value;

	changeState("editing");
	document.getElementById("inputIdUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="' + id + '">';
}

function resetForm(){
	document.getElementById("desc").value 	= "";
	document.getElementById("amount").value = "";
	document.getElementById("value").value 	= "";

	changeState("default");
	document.getElementById("inputIdUpdate").innerHTML = '';
}

function changeState(state){
	switch(state){
		case "editing":
			document.getElementById("btn-update").style.display = "inline-block";
			document.getElementById("btn-add").style.display 	= "none";
			break;

		case "default":
			document.getElementById("btn-update").style.display = "none";
			document.getElementById("btn-add").style.display 	= "inline-block";
			break;
	}
}

function updateData(){
	var id 		= document.getElementById("idUpdate").value;
	var desc 	= document.getElementById('desc').value;
	var amount 	= document.getElementById('amount').value;
	var value 	= document.getElementById('value').value;
	list[id] = {
		"desc" 		: desc,
		"amount" 	: amount,
		"value" 	: value, 
	};
	resetForm();
	setList(list);
}

function deleteData(id){
	if (confirm("Delete "+ list[id].desc +"?")) {
		if (id === list.length - 1) {
			list.pop();
		}else if(id === 0){
			list.shift();
		}else{
			var arrAuxIni = list.slice(0, id);
			var arrAuxEnd = list.slice(id + 1);
			list = arrAuxIni.concat(arrAuxEnd);
		}
		setList(list);
	}
}

setList(list);