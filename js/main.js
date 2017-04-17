function getTotal(list){
    var total = 0;
    for(var key in list){
        total += list[key].value * list[key].amount;
    }
    document.getElementById("total-value").innerHTML = formatValue(total);
}

function setList(list){
	getTotal(list);
	saveListStorage(list);
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

	for(var key in list){
		table += '<tr>';
		table += '<td>' + formatDesc(list[key].desc) + '</td>';
		table += '<td>' + formatAmount(list[key].amount) + '</td>';
		table += '<td>' + formatValue(list[key].value) + '</td>';
		table += '<td>';
		table += '<div class="btn-group">';
		table += '<button class="btn btn-default" onclick="setUpdate(' + key + ');">Edit</button>';
		table += '<button class="btn btn-default" onclick="deleteData(' + key + ');">Delete</button>';
		table += '</div>';
		table += '</td>';
		table += '</tr>';
	}

	table += '</tbody>';
    document.getElementById("list-table").innerHTML = table;
}

function formatDesc(desc){
	var str = desc.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}

function formatAmount(value){
	return parseInt(value);
}

function formatValue(value){
	var str = parseFloat(value).toFixed(2) + "";
	str = str.replace(".", ",");
	str = "$ " + str;
	return str;
}

function addData(){
	if(!validation()){
		return;
	}
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
	document.getElementById("input-id-update").innerHTML = '<input id="idUpdate" type="hidden" value="' + id + '">';
}

function resetForm(){
	document.getElementById("desc").value 	= "";
	document.getElementById("amount").value = "";
	document.getElementById("value").value 	= "";

	changeState("default");
	document.getElementById("input-id-update").innerHTML = '';
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
	if(!validation()){
		return;
	}
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

function validation(){

	document.getElementById("errors").style.display = 'none';

	var desc 	= document.getElementById("desc").value;
	var amount 	= document.getElementById("amount").value;
	var value 	= document.getElementById("value").value;
	var errors 	= "";

	if (desc === "") {
		errors += '<p>Fill out description</p>';
	}

	if (amount === "") 
	{
		errors += '<p>Fill out amount</p>';
	}
	else if(amount != parseInt(amount))
	{
		errors += '<p>Fill out with a valid number</p>';
	}

	if (value === "") 
	{
		errors += '<p>Fill out value</p>';
	}
	else if(value != parseFloat(value))
	{
		errors += '<p>Fill out with a valid number</p>';
	}

	if (errors != "") {
		document.getElementById("errors").style.display = 			'block';
		document.getElementById("errors").style.backgroundColor = 	'rgba(85, 85, 85, 0.3)';
		document.getElementById("errors").style.color = 			'white';
		document.getElementById("errors").style.padding = 			'10px';
		document.getElementById("errors").style.margin = 			'10px';
		document.getElementById("errors").style.borderRadius = 		'13px';
		document.getElementById("errors").innerHTML = 				'<h3 style="color: red">Error:</h3>' + errors;
		return 0;
	}else{
		return 1;
	}

}

function deleteList(){
	if (confirm("Do you want to delete this list?")) {
		list = [];
		setList(list);
	}
}

function saveListStorage(list){
	var jsonStr = JSON.stringify(list);
	localStorage.setItem('list', jsonStr);
}

function initListStorage(){
	var testList = localStorage.getItem('list');
	if (testList) {
		list = JSON.parse(testList);
	}else{
		list = JSON.parse([]);
	}
	setList(list);	
}

initListStorage();