import {RuleResponse, PricingRule} from '../interfaces';

export class bulkBuyRule implements PricingRule {
    sku: string;
    ruleApplyCount: number;
    discountedPrice: number;

    constructor(sku: string, ruleApplyCount: number, discountedPrice: number) {
        this.sku = sku;
        this.ruleApplyCount = ruleApplyCount;
        this.discountedPrice = discountedPrice;
    }

    checkRule(scannedItems: object): RuleResponse {
        const itemsRedeemed = {}
        const scannedCount = scannedItems[this.sku] || 0;
        if (scannedCount > this.ruleApplyCount) {
            itemsRedeemed[this.sku] = scannedCount;
            return {itemsRedeemed, totalPrice:(scannedCount * this.discountedPrice)};
        }
        return {itemsRedeemed, totalPrice: 0};
    }
}
