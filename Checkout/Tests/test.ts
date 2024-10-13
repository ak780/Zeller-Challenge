import { CheckoutV1 } from '../CheckoutV1/checkoutV1';
import { xForYRule, bulkBuyRule } from '../PriceRules/index';

// Helper function fora new Checkout instance
function createCheckout(): CheckoutV1 {
    const pricingRules = [
        new xForYRule('atv', 3, 2),
        new bulkBuyRule('ipd', 4, 499.99)
    ];
    return new CheckoutV1(pricingRules);
}

// Helper function for running test cases
function runTest(description: string, testFn: () => void): void {
    try {
        testFn();
        console.log(`✔️  ${description} passed`);
    } catch (error) {
        console.error(`❌  ${description} failed: ${error.message}`);
    }
}

runTest('total for 3-for-2 Apple TV deal', () => {
    const checkout = createCheckout();
    checkout.scan('atv');
    checkout.scan('atv');
    checkout.scan('atv');

    const total = checkout.calculateTotal();
    console.assert(total === 219.00, `Should be: 219.00, Got: ${total}`);
});

runTest(' Apple TV 3-for-2 deal and other items correctly', () => {
    const checkout = createCheckout();
    checkout.scan('atv');
    checkout.scan('atv');
    checkout.scan('atv');
    checkout.scan('vga');

    const total = checkout.calculateTotal();
    console.assert(total === 249.00, `Should be: 249.00, Got: ${total}`);
});

runTest('bulk discount for iPad when buying more than 4', () => {
    const checkout = createCheckout();
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');

    const total = checkout.calculateTotal();
    console.assert(total === 2499.95, `Should be: 2499.95, Got: ${total}`);
});

runTest(' bulk discount for iPad when buying 4 or less', () => {
    const checkout = createCheckout();
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');

    const total = checkout.calculateTotal();
    console.assert(total === 2199.96, `Should be: 2199.96, Got: ${total}`);
});

runTest('testing a mix of rules and normal prices', () => {
    const checkout = createCheckout();
    checkout.scan('atv');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('atv');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('atv');

    const total = checkout.calculateTotal();
    console.assert(total === 2718.95, `Should be: 2718.95, Got: ${total}`);
});
