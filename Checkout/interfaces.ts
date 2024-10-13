export interface Product {
    sku: string;
    name: string;
    price: number;
}

export interface RuleResponse {
    totalPrice: number;
    itemsRedeemed: object;
}

export interface PricingRule {
    checkRule: (scannedItems: object) => RuleResponse;
}
