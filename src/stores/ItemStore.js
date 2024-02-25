// This store holds the single Item of a todo list

import {
    observable,
    makeObservable,
    action,
    computed,
    reaction,
    values,
} from 'mobx';

class ItemStore {
    itemId = null;
    text = null;
    isCompleted = false;
    isStarred = false;
    time = null;

    constructor (opts) {
        const { itemId, text, isCompleted = false, isStarred = false, time } = opts;
        makeObservable(this, {
            itemId: observable,
            text: observable,
            isCompleted: observable,
            time: observable,
            isStarred: observable,
            updateText: action.bound,
            toggleStarred: action.bound,
            toggleComplete: action.bound
        });

        this.itemId = itemId;
        this.text = text;
        this.isCompleted = isCompleted;
        this.isStarred = isStarred;
        this.time = time;
    }

    updateText ({ text }) {
        if (text) {
            this.text = text;
        }
    }

    toggleComplete () {
        this.isCompleted = !this.isCompleted;
    }

    toggleStarred () {
        this.isStarred = !this.isStarred;
    }
}

export default ItemStore;