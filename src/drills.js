const knex = require('knex');
require('dotenv').config();

const db = knex({
    client:'pg',
    connection: process.env.DB_URL
});

function getTextItems(searchTerm){
    db
        .select('id', 'name', 'price')
        .from('shopping_list')
        .where('name', 'LIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
};

//working
// getTextItems('Salad');

function itemsPaginated(pageNumber) {
    const productsPerPage = 6
    const offset = productsPerPage * (pageNumber - 1)
    db
        .select('*')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
};

//working
// itemsPaginated(2);

function getItemsAfterDateAdded(daysAgo) {
    db
        .select('*')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            db.raw(`now() - '?? days'::INTERVAL`, daysAgo))
        .then(result => {
            console.log(result)
        })
};

//working
// getItemsAfterDateAdded(15);

function categoryTotalCost() {
    db
        .select('category')
        .sum('price AS TOTAL')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })
}
//couldn't quit figure out on my own
categoryTotalCost();