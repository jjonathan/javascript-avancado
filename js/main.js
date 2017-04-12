
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
		table += '<td>Edit | Delete</td>';
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

setList(list);
console.log(getTotal(list));