import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { query, collection, where } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";
import Logo from "../components/Logo.vue";



export const UseSalesStore = defineStore('sales',()=>{
    const date = ref('')


    // retora false o true si cotiene algo la fecha
    const isDaySelected = computed(()=> date.value)

    const db = useFirestore()

    const salesSources = computed(()=>{
        if(date.value){
            const q = query(
                collection(db, 'sales'),
                where('date', '==', date.value)
            )

            console.log(q)

            return q
        }
    })


    const noSales = computed(()=>!salesCollection.length && date.value)

    const totalSalesOfDay = computed(()=>{

        return salesCollection.value ? salesCollection.value.reduce((total, sale) => total + sale.total, 0) : 0

    })
    // me sirve para usar documnentos de firebase pero para el state y optmizaciones
    const salesCollection = useCollection(salesSources)
    return{
        date,
        isDaySelected,
        salesCollection,
        noSales,
        totalSalesOfDay
    }

})