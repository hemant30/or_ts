namespace Origin.Core.Wijmo {
    export function SetupCulture() {

        wijmo.culture.FlexGridFilter = {
            ascending: '\u2191 Ascending',
            descending: '\u2193 Descending',
            apply: 'Apply',
            clear: 'Clear',
            conditions: 'Filter by Condition',
            values: 'Filter by Value',
            // value filter
            search: 'Search',
            selectAll: 'Select All',
            null: '(nothing)',
            // condition filter
            header: 'Show items where the value',
            and: 'And',
            or: 'Or',
            stringOperators: [
                { name: '(not set)', op: null },
                { name: 'Equals', op: 0 /* EQ */ },
                { name: 'Does not equal', op: 1 /* NE */ },
                { name: 'Begins with', op: 6 /* BW */ },
                { name: 'Ends with', op: 7 /* EW */ },
                { name: 'Contains', op: 8 /* CT */ },
                { name: 'Does not contain', op: 9 /* NC */ }
            ],
            numberOperators: [
                { name: '(not set)', op: null },
                { name: 'Equals', op: 0 /* EQ */ },
                { name: 'Does not equal', op: 1 /* NE */ },
                { name: 'Is Greater than', op: 2 /* GT */ },
                { name: 'Is Greater than or equal to', op: 3 /* GE */ },
                { name: 'Is Less than', op: 4 /* LT */ },
                { name: 'Is Less than or equal to', op: 5 /* LE */ }
            ],
            dateOperators: [
                { name: '(not set)', op: null },
                { name: 'Equals', op: 0 /* EQ */ },
                { name: 'Is Before', op: 4 /* LT */ },
                { name: 'Is After', op: 2 /* GT */ }
            ],
            booleanOperators: [
                { name: '(not set)', op: null },
                { name: 'Equals', op: 0 /* EQ */ },
                { name: 'Does not equal', op: 1 /* NE */ }
            ]
        };

    }
}