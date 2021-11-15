import ItemController from "./itemctrl";

class UIController {

    constructor() {

        this.selectors = {

            addBtn : '.btn-add',
            updateBtn : '.btn-update',
            deleteBtn : '.btn-delete',
            backBtn : '.btn-back',
            btnClear : '.btn-clear',
            itemName : '#item-name',
            itemCalories : '#item-calorie',
            listItem : '#list-item',
            listItems : '#list-item li',
            totalCal : '#total-cal'

        }

        let items = ItemController.getItems();

        this.showDataItems(items);

    }

    getItemInput() {

        return {

            name : document.querySelector(this.selectors.itemName).value,
            calories : document.querySelector(this.selectors.itemCalories).value
            

        }

    }

    showDataItems(items) {

        let html = '';

        items.forEach(item => {

            html += `
            
            <li id="item-${item.id}" class="collection-item"><strong>${item.name}</strong> <span class="new badge ${item.calories > 900 ? 'red' : 'green'}" data-badge-caption="${item.calories} calories" style="float:none"></span> <a href="#" class="right"><i class="fa fa-pencil-alt green-text"></i></a></li>
            
            `

            document.querySelector(this.selectors.listItem).innerHTML = html;

        });

    }

    clearInputs() {

        document.querySelector(this.selectors.itemName).value = '';
        document.querySelector(this.selectors.itemCalories).value = '';
    }

    showTotal(total) {

        document.querySelector(this.selectors.totalCal).textContent = total;

    }

    hideEditButton() {

        document.querySelector(this.selectors.updateBtn).style.display = 'none';

        document.querySelector(this.selectors.deleteBtn).style.display = 'none';
        
        document.querySelector(this.selectors.backBtn).style.display = 'none';

        document.querySelector(this.selectors.addBtn).style.display = 'inline';
        
    }

    showEditButton() {

        document.querySelector(this.selectors.updateBtn).style.display = 'inline';

        document.querySelector(this.selectors.deleteBtn).style.display = 'inline';
        
        document.querySelector(this.selectors.backBtn).style.display = 'inline';

        document.querySelector(this.selectors.addBtn).style.display = 'none';

    }

    fillEditItem() {

        document.querySelector(this.selectors.itemName).value = ItemController.getCurrentItem().name;

        document.querySelector(this.selectors.itemCalories).value = ItemController.getCurrentItem().calories;

    }

    showUpdateItems(item) {

        let listItems = document.querySelectorAll(this.selectors.listItems);

        const liArr = Array.from(listItems);

        liArr.forEach(listItem => {

            if(listItem.id === `item-${item.id}`) {

                document.querySelector(`#${listItem.id}`).innerHTML = `
                <strong>${item.name}</strong> <span class="new badge ${item.calories > 900 ? 'red' : 'green'}" data-badge-caption="${item.calories} calories" style="float:none"></span> <a href="#" class="right"><i class="fa fa-pencil-alt green-text"></i></a></li>
                `;

            }

        });

    }

    static removeItem(id) {

        let itemID = `#item-${id}`;

        let listItem = document.querySelector(itemID);

        listItem.remove();

    }

    removeItems() {

        const listItems = document.querySelectorAll(this.selectors.listItems);

        const listArr = Array.from(listItems);

        listArr.forEach(item => {

            item.remove();

        });

    }

}

export default UIController;