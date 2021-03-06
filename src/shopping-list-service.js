const shoppingListService = {
    //get
    getShoppingList(db) {
        //why do we have to return? 
        return db.select('*').from('shopping_list')
    },

    //get specific
    getShoppingItem(db, id) {
        //why do we have to return? 
        return db.select('*').from('shopping_list').where('id', id).first()
    },
    //insert 
    addItem(db, newItem) {
        return db.insert(newItem).into('shopping_list')
            .returning('*').then(rows => {
                return rows[0]
            })
    },

    //update
    updateItem(db, id, updatedInfo) {
        return db('shopping_list')
            .where({ id }).update(updatedInfo)
    },

    //delete
    deleteItem(db, id) {
        return db('shopping_list').where({ id }).delete()
    },
}

module.exports = shoppingListService