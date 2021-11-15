import Storage from "./storage";

const data = {

    items : Storage.getFromStorage(),
    currentItem : null,
    totalCalories : 0

}

class ItemController {

    constructor(id, name, calories) {

        this.id = id;
        this.name = name;
        this.calories = calories;

    }

    static *generateId() {

        let id = data.items.lenght > 0 ? data.items[data.items.lenght - 1].id : 0;

        while(true) {

            id++;

            yield id;

        }

    }

    static addItem(item) {


        data.items.push(item);

    }

    static getItems() {

        return data.items;

    }

    static totalCalories() {

        let total = 0;

        data.items.forEach(item => {

            total += parseInt(item.calories);

        });       

        data.totalCalories = total;

        return total;

    }

    static getItemById(id) {

        let found = null;

        data.items.forEach(item => {

            if(item.id === id) {

                found = item;

            }

        });

        return found;

    }

    static setCurrentItem(item) {

        data.currentItem = item;

    }

    static getCurrentItem() {

        return data.currentItem;

    }

    static updateItems(name, calorie) {

        let found = null;

        let calories = parseInt(calorie);

        data.items.forEach(item => {

            if(item.id === data.currentItem.id) {

                item.name = name;

                item.calories = calories;

                found = item;

            }

        });

        return found;

    }

    static deleteItem(id) {

        let ids = data.items.map(item => {

            return item.id;

        });

        const index = ids.indexOf(id);

        data.items.splice(index, 1);

    }

    static clearItems() {

        data.items = [];

    }

}

export default ItemController;