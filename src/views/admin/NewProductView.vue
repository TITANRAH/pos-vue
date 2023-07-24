<script setup>
import Link from '../../components/Link.vue'
import useImage from '@/composables/useImage';
import { useProductStores } from '../../stores/products';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()



// de esta forma podemos solo llamar a composables 
// al llamar a stores asi rompemos la reactividad np aploicar destrucuring en stores
const {onFileChange ,url, isImageUploaded} = useImage()
const productStore = useProductStores()


//MAPEAMOS ESTE REACTIVE CON EL FORM
// PONIENDO EN LA PROPIEDAD VALUE DEL FORM EL NOMBRE DE FORMDATA
// Y AGREGASNDO LOS V-MODEL POR EJ NOMBRE v-model="formData.name"
const formData = reactive({
    name: '',
    category: '',
    price: '',
    availability: '',
    image: ''
})

// se pasa en automatico lo que se registrte en el form mediante el boton submit
const submitHandler = async (data) => {
    const { image, ...values} = data;

    try {
        await productStore.createProduct({
        ...values,
        image: url.value
    })

    router.push({name: 'products'})
    } catch (error) {
        console.log(error);
    }
}

</script>
<template>
    <div>
        <Link to="products">
        Volver
        </Link>

        <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>
        <div class="flex justify-center bg-white shadow">
            <div class="mt-10 p-10 w-full 2xl:w-2/4">
                <FormKit 
                    type="form"
                    submit-label="Agregar Producto"
                    incomplete-message="No se pudo enviar, revisa los mensajes requeridos"
                    @submit="submitHandler"
                    :value="formData"
                    >
                    <FormKit 
                        
                        type="text"
                        label="Nombre" 
                        name="name"
                        placeholder="Nombre de Producto"
                        validation="required"
                        :validation-messages="{required: 'el nombre del Producto es obligatorio'}"
                        v-model.trim = "formData.name"
                        />
                    <FormKit 
                        type="file"
                        label="Imagen Producto" 
                        name="image"                 
                        validation="required"
                        :validation-messages="{required: 'La imagen del producto es obligatoria'}"
                        accept=".jpg"
                        multiple="false"
                        @change="onFileChange"
                        v-model.trim = "formData.image"
                        />
                        
                        <!-- mandamos a llamar el computed que comprueba que se guardo la iamgen en firebase -->
                        <!-- a la vezx la usamos para mostrar por que contiene la url del produicto -->
                        <div v-if="isImageUploaded">
                            <p class="font-black">Imagen Producto:</p>
                           
                            <img 
                                :src="url" 
                                alt="imagen producto"
                                class="w-32">
                        </div>

                        <FormKit 
                        type="select"
                        label="Categoría" 
                        name="category"                 
                        validation="required"
                        :validation-messages="{required: 'La categoría es obligatoria'}"
                        :options="productStore.categoryOptions"
                        v-model.number = "formData.category"
                        />

                        <FormKit 
                        type="number"
                        label="Precio" 
                        name="price"
                        placeholder="Precio de Producto"                 
                        validation="required"
                        :validation-messages="{required: 'El precio es obligatorio'}"
                        min="1"
                        v-model.number = "formData.price"
                        />
                        <FormKit 
                        type="number"
                        label="Disponibles" 
                        name="availability"
                        placeholder="Cantidad disponible"                 
                        validation="required"
                        :validation-messages="{required: 'La cantidad es obligatoria'}"
                        min="1"
                        v-model.number = "formData.availability"
                        />
                </FormKit>

            </div>
        </div>

    </div>
</template>


<style lang="scss" scoped></style>