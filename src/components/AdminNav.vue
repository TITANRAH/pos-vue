<script setup>
import Link from './Link.vue';
import Logo from './Logo.vue';
import { RouterLink } from 'vue-router';




</script>

<template>
 <header class="px-10 py-5 bg-gray-700 flex justify-between absolute top-0 w-full z-10">
    <div>
        <Logo/>   
    </div>
    <nav>   
        <RouterLink
        :to="{name: 'products'}"
        class="rounded text-white font-bold p-2"
        >
            Productos
        </RouterLink>
        <RouterLink
        :to="{name: 'sales'}"
        class="rounded text-white font-bold p-2"
        >
            Ventas
        </RouterLink>

        <!-- este se usa asi por que es un boton y
        los demas son routerlink por que son solo enlaces -->
        <Link to="shop">
            Ir a Tienda
        </Link>
    </nav>
 </header>
</template>
