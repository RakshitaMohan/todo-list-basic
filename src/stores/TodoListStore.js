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

    constructor () {
        makeObservable(this, {
            allTodoList: observable,
            lists: computed,
            updateTodoList: action.bound,
            addList: action.bound,
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

const store = new TodoListStore();

export default store;