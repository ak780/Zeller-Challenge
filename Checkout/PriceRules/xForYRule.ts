import { PricingRule, RuleResponse } from '../interfaces';
import { productPricing } from '../inventory';

export class xForYRule implements PricingRule {
    sku: string;
    price: number;
    minimumBuyQuantity: number;
    sellForQuantity: number;

    constructor(sku: string, minimumBuyQuantity: number, sellForQuantity: number) {
        this.sku = sku;
        this.price = productPricing[this.sku] || 0;
        this.minimumBuyQuantity = minimumBuyQuantity;
        this.sellForQuantity = sellForQuantity
    }

    checkRule(scannedItems: object): RuleResponse {
        const itemsRedeemed = {};
        if (this.minimumBuyQuantity > this.sellForQuantity) {
            const itemSets = Math.floor((scannedItems[this.sku] || 0) / this.minimumBuyQuantity);
            itemsRedeemed[this.sku] = itemSets * this.minimumBuyQuantity;
            return {totalPrice: itemSets * this.sellForQuantity * this.price, itemsRedeemed};
        } else {
            return {totalPrice: 0, itemsRedeemed};

        }
    }
}
