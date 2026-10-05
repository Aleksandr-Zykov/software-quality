import {
    describe,
    expect,
    test,
} from 'vitest';

import {
    calculateDiscount,
    validateQuantity,
    getShippingCost,
} from '../src/shop-utils.js';

describe('calculateDiscount', () => {
    test(
        'returns 90 for price 100 and discount 10%',
        () => {
            // Arrange
            const price = 100;
            const percent = 10;

            // Act
            const result = calculateDiscount(
                price,
                percent
            );

            // Assert
            expect(result).toBe(90);
        }
    );

    test(
        'returns 100 for price 100 and discount 0%',
        () => {
            // Arrange
            const price = 100;
            const percent = 0;

            // Act
            const result = calculateDiscount(
                price,
                percent
            );

            // Assert
            expect(result).toBe(100);
        }
    );

    test(
        'returns 0 for price 100 and discount 100%',
        () => {
            // Arrange
            const price = 100;
            const percent = 100;

            // Act
            const result = calculateDiscount(
                price,
                percent
            );

            // Assert
            expect(result).toBe(0);
        }
    );

    test(
        'throws error for negative price',
        () => {
            // Arrange
            const price = -10;
            const percent = 10;

            // Act + Assert
            expect(
                () => calculateDiscount(price, percent)
            ).toThrow(
                'Price must be a non-negative number'
            );
        }
    );

    // Додаткове завдання: покриття останньої непокритої гілки -
    // валідація percent ('Discount must be between 0 and 100')
    test(
        'throws error for discount above 100',
        () => {
            // Arrange
            const price = 100;
            const percent = 150;

            // Act + Assert
            expect(
                () => calculateDiscount(price, percent)
            ).toThrow(
                'Discount must be between 0 and 100'
            );
        }
    );
});

describe('validateQuantity', () => {
    // Equivalence partitions:
    // < 1 - Invalid (false), 1-10 integer - Valid (true),
    // > 10 - Invalid (false), не ціле число - Invalid (false)
    // Boundary Value Analysis: 0 | 1 | 2 та 9 | 10 | 11, додатково 1.5
    test.for([
        { quantity: 0, expected: false },
        { quantity: 1, expected: true },
        { quantity: 2, expected: true },
        { quantity: 9, expected: true },
        { quantity: 10, expected: true },
        { quantity: 11, expected: false },
        { quantity: 1.5, expected: false },
    ])(
        'validateQuantity($quantity) returns $expected',
        ({ quantity, expected }) => {
            expect(
                validateQuantity(quantity)
            ).toBe(expected);
        }
    );
});

describe('getShippingCost', () => {
    test(
        'returns 100 for total below 1000',
        () => {
            // Arrange
            const total = 999;

            // Act
            const result = getShippingCost(total);

            // Assert
            expect(result).toBe(100);
        }
    );

    test(
        'returns 0 for total equal to 1000',
        () => {
            // Arrange
            const total = 1000;

            // Act
            const result = getShippingCost(total);

            // Assert
            expect(result).toBe(0);
        }
    );

    test(
        'throws error for negative total',
        () => {
            // Arrange
            const total = -1;

            // Act + Assert
            expect(
                () => getShippingCost(total)
            ).toThrow(
                'Total must be a non-negative number'
            );
        }
    );
});
