import ItemController from "./itemctrl";
import UIController from "./uictrl";
import Storage from "./storage";

class AppController {

    constructor() {

        new UIController().hideEditButton();

        this.loadEvents();

        let items = ItemController.getItems();

        new UIController().showDataItems(items);

        let total = ItemController.totalCalories();

        new UIController().showTotal(total);

    }

    loadEvents() {

        const UISelectors = new UIController().selectors;

        let idGenerator = ItemController.generateId();

        document.querySelector(UISelectors.addBtn).addEventListener('click', (e) => {

            e.preventDefault();

            let input = new UIController().getItemInput();

            let id = idGenerator.next().value;

            if(input.name !== '' && input.calories !== '') {

                let item = new ItemController(id, input.name, input.calories);

                ItemController.addItem(item);

                let items = ItemController.getItems();
                
                new UIController().showDataItems(items);

                let total = ItemController.totalCalories();

                new UIController().showTotal(total);

                new UIController().clearInputs();

                Storage.storeInStorage(item);


            } else {

                alert('Please fill all fields!')

            }

            
        });

        document.querySelector(UISelectors.listItem).addEventListener('click', (e) => {

            if(e.target.classList.contains('fa-pencil-alt')) {

                const listId = e.target.parentNode.parentNode.id;

                const listArr = listId.split('-');

                const id = parseInt(listArr[1]);

                let itemToEdit = ItemController.getItemById(id);

                ItemController.setCurrentItem(itemToEdit);

                new UIController().showEditButton();

                new UIController().fillEditItem();

            }

        });

        document.querySelector(UISelectors.updateBtn).addEventListener('click', (e) => {

            e.preventDefault();

            const input = new UIController().getItemInput();

            const updatedItem = ItemController.updateItems(input.name, input.calories);

            new UIController().showUpdateItems(updatedItem);

            let total = ItemController.totalCalories();

            new UIController().showTotal(total);

            Storage.updateStorage(updatedItem);

            new UIController().clearInputs();

            new UIController().hideEditButton();

        });

        document.querySelector(UISelectors.backBtn).addEventListener('click', (e) => {

            e.preventDefault();

            new UIController().clearInputs();

            new UIController().hideEditButton();

        });

        document.querySelector(UISelectors.deleteBtn).addEventListener('click', (e) => {

            e.preventDefault();

            const currentItemID = ItemController.getCurrentItem().id;

            ItemController.deleteItem(currentItemID);

            UIController.removeItem(currentItemID);

            let total = ItemController.totalCalories();

            new UIController().showTotal(total);

            Storage.deleteFromStorage(currentItemID);

            new UIController().clearInputs();

            new UIController().hideEditButton();

        });

        document.querySelector(UISelectors.btnClear).addEventListener('click', (e) => {

            e.preventDefault();

            ItemController.clearItems();

            new UIController().removeItems();

            let total = ItemController.totalCalories();

            new UIController().showTotal(total);

            Storage.clearStorage();

            new UIController().clearInputs();

            new UIController().hideEditButton();

        });

    }

}

export default AppController;