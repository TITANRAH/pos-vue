        
<script setup>

import { useCuponStore} from '../stores/cupons'

const store = useCuponStore()

</script>

<template>
   <p class="mt-5 py-5 font-bold border-t border-gray-200">¿Tienes un cupón?</p>

   <div class="flex">
        <input 
            type="text"
            placeholder="Ingresa un cupón"
            class="p-2 bg-white border-gray-300 w-full"
            v-model="store.cuponInput"
            >
            <button
                type="button"
                class="p-3 bg-green-400 font-bold"
                @click="store.applyCupon"
                :disabled="store.isValidCupon"
            >
                Canjear
            </button>
   </div>

   <p class="py-2 text-center text-sm font-extrabold">
        {{ store.cuponValidationMessage }}
   </p>

</template>

