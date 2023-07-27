import { ref, computed } from 'vue';
import { defineStore } from "pinia";

export const useCartStore = defineStore('cart',()=>{



    const items = ref([])

    const max_products = 5;

    function addItem(item){
        items.value.push({...item, quantity: 1, id: item.id})
    }

    function updateQuantity(id, quantity){
        items.value = items.value.map(item => item.id === id ? {...item, quantity} : item);
    }

    const isEmpty = computed(()=> items.value.length === 0)

    // tomamos el producto y verificamos su cantidad y si es menor a 3 le asignamos esa cantidad 
    // si no le pasamos 5
    const checkProductAvailability = computed(()=>{

        return (product) => product.availability <  max_products ? product.availability :  max_products
    })
    return {
        addItem,
        isEmpty,
        items,
        checkProductAvailability,
        updateQuantity
    }
})