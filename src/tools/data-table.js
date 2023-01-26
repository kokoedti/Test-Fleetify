const Columns = [
    {
        name: 'Product Name',
        selector: row => row.title,
        sortable: true
    },
    {
        name: 'Brand',
        selector: row => row.brand,
    },
    {
        name: 'Category',
        selector: row => row.category,
        sortable: true
    },
    {
        name: 'Price',
        selector: row => `${Currency} ${row.price}`,
        sortable: true
    },
    {
        name: 'Rating',
        selector: row => row.rating,
    },
    {
        name: 'Stock',
        selector: row => row.stock,
    },
];

const Currency = '$'

export {Columns, Currency}