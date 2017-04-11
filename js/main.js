var list = [
	{
		"desc" 		: "rice",
		"amount"   	: "1", 
		"value" 	: "5.40" 
	},
	{
		"desc" 		: "soup",
		"amount"   	: "2", 
		"value" 	: "3.00" 
	},
	{
		"desc"  	: "pork",
		"amount"	: "1", 
		"value" 	: "6.30" 
	},
	{
		"desc"  	: "beer",
		"amount"   	: "12", 
		"value" 	: "1.49" 
	}
];

function getTotal(list){
	var total = 0;

	list.forEach(function(element, index, array){
		total += (element.amount * element.value);
	});
}