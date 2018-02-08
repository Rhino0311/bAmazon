DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

SELECT * FROM products;

  CREATE TABLE `products` (
  `itemID` int(11) NOT NULL AUTO_INCREMENT,
  `productName` varchar(45) NOT NULL,
  `departmentName` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `stockQuantity` int(11) NOT NULL,
  PRIMARY KEY (`itemID`)
  );
  
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Halo", "Video Games", 29.95, 150),
  ("Call of Duty", "Video Games", 19.99, 200),
  ("Spam", "Food and Drink", 3.20, 50),
  ("Baller Shades", "Apparel", 15.00, 5),
  ("Jordan XIII", "Apparel", 99.99, 23),
  ("Batteries", "Necessities", 42.42, 42),
  ("iPod", "Electronics", 45.00, 25),
  ("The Punisher", "Films", 19.99, 5),
  ("Exploding Kittens", "Board Games", 30.00, 23),
  ("Mouse Trap", "Board Games", 49.95, 19);