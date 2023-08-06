<script setup>
import { ref } from 'vue'
import VueTailwindDatePicker from 'vue-tailwind-datepicker'
import { UseSalesStore } from '../../stores/sales'
import SalesDetails from '../../components/SalesDetails.vue';
import { formatCurrency } from '../../helpers';


const sales = UseSalesStore()
const formatter = ref({
    date: 'DD/MM/YYYY',
    month: 'MMMM'
})

</script>
<template>
    <div>
        <h1 class="text-4xl font-black my-10">Resumen de Ventas</h1>
        <div class="md:flex md:items-start gap-5">
            <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center">
                <VueTailwindDatePicker i18n="es-Es" :as-single='true' no-input v-model="sales.date"
                    :formatter="formatter" />
            </div>
            <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-4 pb-32">
                <p class="text-center text-lg" v-if="sales.isDaySelected">
                    Ventas de la fecha: <span class="font-black">{{ sales.date }}</span>
                </p>
                <p class="text-center text-lg" v-else>Selecciona una fecha</p>

                <div class="space-y-5" v-if="sales.salesCollection.length">
                    <p class="text-right text-2xl">Total del día
                        <span class="font-black">
                            {{ formatCurrency(sales.totalSalesOfDay) }}
                        </span>
                    </p>
                    <SalesDetails v-for="sale in sales.salesCollection" :key="sale.id" :sale="sale"/>
                </div>
                <p v-else-if="sales.noSales" class="text-lg text-center">No hay ventas este día</p>
            </div>


        </div>

    </div>
</template>


<style scoped></style>