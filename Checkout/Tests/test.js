"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkoutV1_1 = require("../CheckoutV1/checkoutV1");
var index_1 = require("../PriceRules/index");
// Helper function fora new Checkout instance
function createCheckout() {
    var pricingRules = [
        new index_1.xForYRule('atv', 3, 2),
        new index_1.bulkBuyRule('ipd', 4, 499.99)
    ];
    return new checkoutV1_1.CheckoutV1(pricingRules);
}
// Helper function for running test cases
function runTest(description, testFn) {
    try {
        testFn();
        console.log("\u2714\uFE0F  ".concat(description, " passed"));
    }
    catch (error) {
        console.error("\u274C  ".concat(description, " failed: ").concat(error.message));
    }
}
runTest('total for 3-for-2 Apple TV deal', function () {
    var checkout = createCheckout();
    checkout.scan('atv');
    checkout.scan('atv');
    checkout.scan('atv');
    var total = checkout.calculateTotal();
    console.assert(total === 219.00, "Should be: 219.00, Got: ".concat(total));
});
runTest(' Apple TV 3-for-2 deal and other items correctly', function () {
    var checkout = createCheckout();
    checkout.scan('atv');
    checkout.scan('atv');
    checkout.scan('atv');
    checkout.scan('vga');
    var total = checkout.calculateTotal();
    console.assert(total === 249.00, "Should be: 249.00, Got: ".concat(total));
});
runTest('bulk discount for iPad when buying more than 4', function () {
    var checkout = createCheckout();
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    var total = checkout.calculateTotal();
    console.assert(total === 2499.95, "Should be: 2499.95, Got: ".concat(total));
});
runTest(' bulk discount for iPad when buying 4 or less', function () {
    var checkout = createCheckout();
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    var total = checkout.calculateTotal();
    console.assert(total === 2199.96, "Should be: 2199.96, Got: ".concat(total));
});
runTest('testing a mix of rules and normal prices', function () {
    var checkout = createCheckout();
    checkout.scan('atv');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('atv');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('atv');
    var total = checkout.calculateTotal();
    console.assert(total === 2718.95, "Should be: 2718.95, Got: ".concat(total));
});
