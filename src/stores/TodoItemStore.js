import {
    observable,
    makeObservable,
    action,
    computed,
    values
} from 'mobx';
import ItemStore from './ItemStore';

class TodoItemStore {
    todoItems = {};
    listName = null;
    listId = null;

    constructor (opts) {
        const { listName, listId } = opts;
        makeObservable(this, {
            todoItems: observable,
            listName: observable,
            listId: observable,
            addItem: action.bound,
            updateListName: action.bound,
            items: computed,
        });

        this.listId = listId;
        this.listName = listName;
    }

    get items () {
        return values(this.todoItems).sort((a, b) => {
            if (a.time > b.time) {
                return -1;
            }
            if (a.time < b.time) {
                return 1;
            }
            return 0;
        });
    }
    
    updateListName ({ listName }) {
        if (listName) {
            this.listName = listName;
        }
    } 

    addItem({ item }) {
        const { itemId, text = 'Untitled List', isCompleted = false, isStarred = false, time } = item;

        if(!itemId) {
            return;
        }

        this.todoItems[itemId] = new ItemStore({
            itemId: itemId,
            text: text,
            isCompleted: isCompleted,
            isStarred: isStarred,
            time: time
        })
    }
}

export default TodoItemStore;