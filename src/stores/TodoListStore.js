import {
    observable,
    makeObservable,
    action,
    computed,
    values,
} from 'mobx';
import _ from 'lodash';
import TodoItemStore from './TodoItemStore';

class TodoListStore {
    allTodoList = {};

    constructor (opts) {
        const { list = {} } = opts;
        makeObservable(this, {
            allTodoList: observable,
            lists: computed,
            updateTodoList: action.bound,
            addList: action.bound,
        });

        this.addList({
            list
        });
    }

    get lists () {
        return values(this.allTodoList);
    }

    updateTodoList (data = {}) {
        if(data?.todoList?.length > 0) {
           _.forEach(data.todoList, (list) => {
            this.addList({ list });
           });
        }
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
            _.forEach(items, (item) => {
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