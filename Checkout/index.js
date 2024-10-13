"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkoutV1_1 = require("./CheckoutV1/checkoutV1");
var index_1 = require("./PriceRules/index");
var inventory_1 = require("./inventory");
var pricingRules = [
    new index_1.xForYRule('atv', inventory_1.productCatalog, 3, 2),
    new index_1.bulkBuyRule('ipd', 4, 499.99)
];
var co = new checkoutV1_1.CheckoutV1(pricingRules);
// Scenario 1: SKUs Scanned: atv, atv, atv, vga Total expected: $249.00
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('vga');
console.log("Total expected: ".concat(co.calculateTotal())); // Total expected: $249.00
// Scenario 2: SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected: $2718.95
var co2 = new checkoutV1_1.CheckoutV1(pricingRules);
co2.scan('atv');
co2.scan('ipd');
co2.scan('ipd');
co2.scan('atv');
co2.scan('ipd');
co2.scan('ipd');
co2.scan('ipd');
console.log("Total expected: ".concat(co2.calculateTotal())); // Total expected: $2718.95
var co3 = new checkoutV1_1.CheckoutV1(pricingRules);
co3.scan('atv');
co3.scan('ipd');
console.log("Total expected: ".concat(co3.calculateTotal())); // Total expected: $2718.95
