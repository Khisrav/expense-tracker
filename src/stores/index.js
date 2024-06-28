import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { initTracker } from "../services/main";

export const useTracker = defineStore('tracker', () => {
    const operations = ref(initTracker())
    const selected = ref([]);
    
    const income = () => {
        return operations.value.reduce((acc, operation) => {
            return operation.type === 'Income' ? acc + operation.amount : acc;
        }, 0);
    }

    const expenses = () => {
        return operations.value.reduce((acc, operation) => {
            return operation.type === 'Expense' ? acc + operation.amount : acc;
        }, 0);
    }
    
    const balance = computed(() => income() - expenses())

    const remove = () => {
        operations.value = operations.value.filter(operation => !selected.value.includes(operation.id));

        localStorage.setItem('tracker', JSON.stringify(operations.value));

        selected.value = [];
    }

    const select = (id) => {
        if (selected.value.includes(id)) {
            //remove
            selected.value = selected.value.filter(operation => operation !== id);
        } else {
            //add
            selected.value.push(id);
        }
        console.log(selected.value);
    }

    const add = (operation) => {
        operations.value.push({
            id: Math.random().toString(36).substr(2, 9),
            type: operation.type,
            amount: operation.amount,
            time: operation.time,
            title: operation.title
        })

        localStorage.setItem('tracker', JSON.stringify(operations.value))
    }

    return {
        operations,
        balance,
        income,
        expenses,
        remove,
        add,
        select,
        selected,
    }
})