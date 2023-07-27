import { ref, computed, watchEffect} from 'vue';
import { defineStore } from "pinia";

export const useCartStore = defineStore('cart',()=>{



    const items = ref([])
    const subtotal = ref(0)
    const taxes = ref(0)
    const total = ref(0)

    const max_products = 5;
    const tax_rate = .19;

    // watch(items,()=>{
       
    // }, {
    //     deep: true
    // })

    watchEffect(()=>{
        subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0)
        taxes.value = subtotal.value * tax_rate
        total.value = subtotal.value + taxes.value
    })

    function addItem(item){
        // asi evito registros repetidos en el carrito con el index
        // cuando el elemento no existe siempre regresara -1 por no encontrar el indice del elemento a buscar
        // cuando encuebntra un elemento regresara la posiucion del arreglo por loq ue si existe  
        const index = isItemInCart(item.id)
        // console.log(index);

        if(index >= 0){

            if(isProductAvailibility(item, index)) {
                alert('Has alcanzado el límite')
                return
            }
                // si el elemento existe al pinchar no se agreara al arreglo pero 
                // podemos actualizar la cantidad en item.value en la posicion index               
                items.value[index].quantity++
         
        }else {
            
            items.value.push({...item, quantity: 1, id: item.id})
        }
    }

    // como esta funcion itera en un select esta para todos los productos y la funcion dice 
    // hace un map de items.value y si el id que le paso a la funcion es igual a el id de un item dentro de el arreglo 
    // actualiza su cantidad y escribe la nueva cantidad que le estoy pasando mediante quantity y que en la vista es 
    // event.target.value si el id no es igual manten el item eso logra que solo afectemos al item con el id que toma la funcion 
    //  y los demas item quedan tal cual
    function updateQuantity(id, quantity){
        items.value = items.value.map(item => item.id === id ? {...item, quantity} : item);
    }

    function removeItem(id){
       items.value = items.value.filter(item => item.id != id)
    }

    const isItemInCart = id => items.value.findIndex(item => item.id === id)

    // esta funcion me sirver para limitar la cantidad de click que puede darle al item 
    // para agregar al carrito
    const isProductAvailibility = (item, index) => {

        // si la cantidad es mayor o igual al stock que es availibility no hagas nada
        return items.value[index].quantity >= item.availability || items.value[index].quantity >= max_products;
    }

    const isEmpty = computed(()=> items.value.length === 0)

    // tomamos el producto y verificamos su cantidad y si es menor a 3 le asignamos esa cantidad 
    // si no le pasamos 5
    const checkProductAvailability = computed(()=>{

        return (product) => product.availability <  max_products ? product.availability :  max_products
    })
    return {
        addItem,
        removeItem,
        subtotal,
        taxes,
        isEmpty,
        total,
        items,
        checkProductAvailability,
        updateQuantity
    }
})