"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xForYRule = void 0;
var inventory_1 = require("../inventory");
var xForYRule = /** @class */ (function () {
    function xForYRule(sku, minimumBuyQuantity, sellForQuantity) {
        this.sku = sku;
        this.price = inventory_1.productPricing[this.sku] || 0;
        this.minimumBuyQuantity = minimumBuyQuantity;
        this.sellForQuantity = sellForQuantity;
    }
    xForYRule.prototype.checkRule = function (scannedItems) {
        var itemsRedeemed = {};
        if (this.minimumBuyQuantity > this.sellForQuantity) {
            var itemSets = Math.floor((scannedItems[this.sku] || 0) / this.minimumBuyQuantity);
            itemsRedeemed[this.sku] = itemSets * this.minimumBuyQuantity;
            return { totalPrice: itemSets * this.sellForQuantity * this.price, itemsRedeemed: itemsRedeemed };
        }
        else {
            return { totalPrice: 0, itemsRedeemed: itemsRedeemed };
        }
    };
    return xForYRule;
}());
exports.xForYRule = xForYRule;
