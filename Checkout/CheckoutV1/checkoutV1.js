"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutV1 = void 0;
var inventory_1 = require("../inventory");
var CheckoutV1 = /** @class */ (function () {
    function CheckoutV1(pricingRules) {
        this.items = {};
        this.pricingRules = pricingRules;
    }
    CheckoutV1.prototype.scan = function (sku) {
        // @ts-ignore
        var product = inventory_1.productCatalog.find(function (item) { return item.sku === sku; });
        if (product) {
            this.items[product.sku] = (this.items[product.sku] || 0) + 1;
            return;
        }
        console.log('Error:Invalid Scan');
    };
    CheckoutV1.prototype.calculateTotal = function () {
        var _this = this;
        var ruleResponse;
        var total = 0;
        var discountedInventory = {};
        var _loop_1 = function (eachRule) {
            ruleResponse = eachRule.checkRule(this_1.items);
            total += ruleResponse.totalPrice;
            var itemsRedeemed = ruleResponse.itemsRedeemed;
            Object.keys(itemsRedeemed).map(function (sku) {
                discountedInventory[sku] = (discountedInventory[sku] || 0) + itemsRedeemed[sku];
            });
        };
        var this_1 = this;
        // Apply pricing rules
        for (var _i = 0, _a = this.pricingRules; _i < _a.length; _i++) {
            var eachRule = _a[_i];
            _loop_1(eachRule);
        }
        // Calculate total for remaining items after rules
        total += Object.keys(this.items).reduce(function (sum, sku) {
            return sum + ((_this.items[sku] - (discountedInventory[sku] || 0)) * (inventory_1.productPricing[sku] || 0));
        }, 0);
        return total;
    };
    return CheckoutV1;
}());
exports.CheckoutV1 = CheckoutV1;
