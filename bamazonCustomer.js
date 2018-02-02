
var mysql = require('mysql');
var inquirer = require('inquirer');

// mysql
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: 'root',
	database: "bAmazon"
})

console.log("Welcome to the hood B-Amazon!");
//sql and start the products
connection.connect(function(err){
	if (err) throw err;
	console.log("connect as " + connection.threadId);
	start();
})

// prompt
var start = function (){
	inquirer.prompt(
	{
		name: "welcome",
		type: "list",
		message: "Welcome, would you like to shop our hood products?",
		choices: ["YES", "NO"]
	}).then(function(answer) {
		if (answer.welcome.toUpperCase() == "YES"){
			ourProducts();
		}
		else {
			console.log("Thanks, Enjoy your day. BTW Dedication 6 is out go listen to it");
			return;
		}
	})
};


var ourProducts = function (){
connection.query('SELECT * FROM products', function(err, res) {
    for (var i = 0; i < res.length; i++) {
    	//diplay products offered
        console.log(res[i].itemID + " | " + res[i].productName + " | " + res[i].departmentName + " | " + "$" + res[i].price);
    }
    console.log("-----------------------------------");
    //  3 second delay for question
    setTimeout(function() {nextAsk();}, 3000);
})
};

// prompts user questions to find out order
var nextAsk = function (){
	inquirer.prompt([
	{
		name: "productid",
		type: "list",
		message: "Choose the #ID of the product you wish to purchase:",
		choices: ["1", "2", "3", "4", "5", "6", "7"]
	},	
	{
		name: "productunits",
		type: "input",
		message: "How many units of this product would you like?",
		validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
	}]).then(function(answer) {
		console.log("-----------CHECK OUT------------------------");
			checkQuantity(answer);
	})
};

// compares availablility of products
var checkQuantity = function(answer) {
	console.log("Checking inventory");
	var query = 'SELECT stockQuantity, price FROM products WHERE itemID =?';
	var params = answer.productid;

		connection.query(query, params, function(err, res) {
			if ( res[0].stockQuantity < answer.productunits) {
				console.log("Insufficient quantity");
				nextAsk(1);
			}
			else {
				// calculating total 	
				var total = answer.productunits * res[0].price;
				var newQuantity = res[0].stockQuantity-answer.quantity;
				
				console.log("Total Cost: $" + total);

				connection.query("UPDATE `products` SET stockQuantity = (stockQuantity - ?) WHERE id = ?;", [answer.productunits, answer.productid], function(err, res){
					
						console.log("Your order had been processed at $" + total);
					});
				
				}
		});
			setTimeout(function(){
				console.log("Thank you, come again");
			},3000);
	
	
};


	