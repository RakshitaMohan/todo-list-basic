import {
    observable,
    makeObservable,
    action,
    computed,
    values,
} from 'mobx';
import TodoItemStore from './TodoItemStore';

class TodoListStore {
    allTodoList = {};

    constructor (opts = {}) {
        const { list = {} } = opts;
        makeObservable(this, {
            allTodoList: observable,
            lists: computed,
            addList: action.bound,
        });

        this.addList({
            list
        });
    }

    get lists () {
        return values(this.allTodoList);
    }

    addList ({ list }) {
        if (!list || !list.listId) {
            return;
        }

        const { listName, listId, items = [] } = list;

        this.allTodoList[listId] = new TodoItemStore({
            listId,
            listName
        });

        if (items.length > 0) {
            items.forEach((item) => {
                this.allTodoList[listId].addItem({ item });
            })
        }
    }
} 

const store = new TodoListStore({
    list: {
        listName: 'Things To Do',
        listId: 'tekfdkffpffpfk',
        items: [
            {
                itemId: 'grocery',
                text: 'Tomato, Potato, Fruits',
                isStarred: true
            },
            {
                itemId: 'crayons',
                text: 'Buy crayons',
            },            {
                itemId: 'oliveOil',
                text: 'Get Extra virgin Olive Oil',
            },
            {
                itemId: 'GasFill',
                text: 'GasFill',
                isCompleted: true,
            }
        ]
    }
});

export default store;