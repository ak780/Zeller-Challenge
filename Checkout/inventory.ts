import { Product } from "./interfaces";

export const productCatalog: Product[] = [
    { sku: 'vga', name: 'VGA adapter', price: 30.00 },
    { sku: 'ipd', name: 'Super iPad', price: 549.99 },
    { sku: 'mbp', name: 'MacBook Pro', price: 1399.99 },
    { sku: 'atv', name: 'Apple TV', price: 109.50 }
];

export const productPricing: object = {
    vga : 30.00,
    ipd: 549.99,
    mbp: 1399.99,
    atv: 109.50
};

