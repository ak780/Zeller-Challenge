import { productCatalog, productPricing } from '../inventory';
import {PricingRule, RuleResponse} from '../interfaces';

export class CheckoutV1 {
    private items: object = {};
    private pricingRules: PricingRule[];

    constructor(pricingRules: PricingRule[]) {
        this.pricingRules = pricingRules;
    }

    scan(sku: string): void {
        // @ts-ignore
        const product = productCatalog.find(item => item.sku === sku);
        if (product) {
            this.items[product.sku] = (this.items[product.sku] || 0) + 1;
            return;
        }
        console.log('Error:Invalid Scan');
    }

    calculateTotal(): number {
        let ruleResponse: RuleResponse;
        let total = 0;
        let discountedInventory = {};
        // Apply pricing rules
        for (const eachRule of this.pricingRules) {
            ruleResponse = eachRule.checkRule(this.items);
            total += ruleResponse.totalPrice;
            const itemsRedeemed = ruleResponse.itemsRedeemed;
            Object.keys(itemsRedeemed).map(sku => {
                discountedInventory[sku] = (discountedInventory[sku] || 0) + itemsRedeemed[sku];
            });
        }
        // Calculate total for remaining items after rules
        total += Object.keys(this.items).reduce((sum, sku) => {
            return sum + ((this.items[sku] - (discountedInventory[sku] || 0)) * (productPricing[sku] || 0));
        },0);

        return total;
    }
}
