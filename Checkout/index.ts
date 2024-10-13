import { CheckoutV1 } from './CheckoutV1/checkoutV1';
import { xForYRule, bulkBuyRule } from './PriceRules/index';

const pricingRules = [
    new xForYRule('atv', 3, 2),
    new bulkBuyRule('ipd', 4, 499.99)
];

const c1 = new CheckoutV1(pricingRules);
c1.scan('atv');
c1.scan('atv');
c1.scan('atv');
c1.scan('atv');
c1.scan('atv');
c1.scan('atv');
c1.scan('vga');
console.log(`Total expected: ${c1.calculateTotal()}`);

const c2 = new CheckoutV1(pricingRules);
c2.scan('ipd');
c2.scan('ipd');
c2.scan('atv');
c2.scan('vga');
c2.scan('atv');
c2.scan('ipd');
c2.scan('ipd');
c2.scan('ipd');
console.log(`Total expected: ${c2.calculateTotal()}`);

const c3 = new CheckoutV1(pricingRules);
c3.scan('atv');
c3.scan('ipd');
console.log(`Total expected: ${c3.calculateTotal()}`);
