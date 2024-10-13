"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkBuyRule = void 0;
var bulkBuyRule = /** @class */ (function () {
    function bulkBuyRule(sku, ruleApplyCount, discountedPrice) {
        this.sku = sku;
        this.ruleApplyCount = ruleApplyCount;
        this.discountedPrice = discountedPrice;
    }
    bulkBuyRule.prototype.checkRule = function (scannedItems) {
        var itemsRedeemed = {};
        var scannedCount = scannedItems[this.sku] || 0;
        if (scannedCount > this.ruleApplyCount) {
            itemsRedeemed[this.sku] = scannedCount;
            return { itemsRedeemed: itemsRedeemed, totalPrice: (scannedCount * this.discountedPrice) };
        }
        return { itemsRedeemed: itemsRedeemed, totalPrice: 0 };
    };
    return bulkBuyRule;
}());
exports.bulkBuyRule = bulkBuyRule;
