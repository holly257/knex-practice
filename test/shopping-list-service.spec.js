const shoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe('Shopping List service object', () => {
    //initialize variable
    let db

    //fake test data to use 
    const testData = [
        {
            id: 1,
            name: 'item one',
            price: '4.99',
            date_added: new Date(2020, 1, 2, 23, 32, 6),
            checked: false,
            category: 'Main'
        },
        {
            id: 2,
            name: 'item two',
            price: '9.00',
            date_added: new Date(2020, 2, 2, 23, 32, 6),
            checked: true,
            category: 'Lunch'
        },
        {
            id: 3,
            name: 'item three',
            price: '6.24',
            date_added: new Date(2020, 1, 4, 23, 32, 6),
            checked: false,
            category: 'Lunch'
        }
    ]

    before(() => {
        //sets up connection to database
        db = knex({
            client: 'pg',
            connection: process.env.TEST_SHOPPING_DB_URL
        })
    })

    //resets test database so that you are not adding to a full array every time a test runs
    beforeEach(() => db('shopping_list').truncate())
    
    //destroys the connection to the database
    after(() => db.destroy())

    //testing for functionality with data in table
    context('Shopping_list table with data', () => {
        beforeEach(() => {
            return db.into('shopping_list').insert(testData)
        })
        it('getShoppingList() returns all data from shopping_list', () => {
            return shoppingListService.getShoppingList(db)
                .then(actual => {
                    expect(actual).to.eql(testData)
            })
        })
        it('getShoppingItem() returns specific item from database', () => {
            const itemId = 2
            const testItem = testData[itemId - 1]
            return shoppingListService.getShoppingItem(db, itemId)
                .then(actual => {
                    expect(actual).to.eql(testItem)
            })
        })
        
    })

    //testing for functionality without any data
    context('Shopping_list table without data', () => {
        //if no data, returns empty array
        it('getShoppingList() returns an empty array', () => {
            return shoppingListService.getShoppingList(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })
        it('addItem() returns array with item added last', () => {
            const newItem = {
                id: 4,
                name: 'item four',
                price: '3.19',
                date_added: new Date(2020, 1, 4, 23, 32, 6),
                checked: true,
                category: 'Lunch'
            }
            return shoppingListService.addItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql(newItem)
            })
        })
    })

})