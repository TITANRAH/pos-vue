<script setup>
      import { watch, reactive } from 'vue'
      import { useRoute, useRouter  } from 'vue-router'
      import {  doc  } from 'firebase/firestore'
      import { useFirestore, useDocument } from 'vuefire'
      import Link from '@/components/Link.vue';
      import { useProductStores } from '@/stores/products';
      import useImage from '@/composables/useImage'
      
      const route = useRoute()
      const router = useRouter()
      const { onFileChange,  url, isImageUploaded } = useImage()
      const products = useProductStores()
      const db = useFirestore()

    //   ya tengo lareferencia por lo que en el store no necesito hacer el proceso de referenciar otra vez 
      const docRef = doc(db, 'products', route.params.id)

    //   useDocument de vuefire lo uso aca por que lo necesito de manera de usar state no uso getDoc de firebase
    // como si use en el store donde necesitaba obtener la referencia solamente 
    const product = useDocument(docRef)
      console.log(product);

    

      const formData = reactive({
          name: '',
          category: '',
          price: '',
          availability: '',
          image: ''
      })

      watch(product, (product)=> {

        if(!product) {
            router.push({name: 'products'})
        }
        console.log('desde el watch', product)

        // puede ser asi tambien mas simple aun traer el producto guardado y 
        // asignarlo al formulario
        Object.assign((formData), product)
        // formData.name = product.name
        // formData.price = product.price
        // formData.category = product.category
        // formData.availability = product.availability
        // formData.image = product.image
      })

      const submitHandler = async data => {
        console.log(data)

        try {
            await products.updateProduct(docRef, {...data, url})
            router.push({name: 'products'})
        } catch (error) {
            console.log(error)
        }
      }

</script>

<template>
    <div class="mt-10">
        <Link
            to="products"
        >
            Volver
        </Link>
            <h1 class="text-4xl my-10 font-extrabold">Editar Producto</h1>

            <div class="flex justify-center bg-white shadow">
            <div class="mx-auto mt-10 p-10 w-full  2xl:w-2/4">
              
                <FormKit
                    type="form"
                    :value="formData"
                    submit-label="Guardar Cambios"
                    incomplete-message="No se pudo enviar, revisa los mensajes"
                    @submit="submitHandler"
                    :actions="false"
                >
                    <FormKit 
                        type="text"
                        label="Nombre"
                        name="name"
                        placeholder="Nombre de Producto"
                        validation="required"
                        v-model.trim="formData.name"
                        :validation-messages="{ required: 'El Nombre del Producto es Obligatorio' }"
                    />

                    <FormKit 
                        type="select"
                        label="Categoría"
                        name="category"
                        validation="required"
                        v-model.number="formData.category"
                        :validation-messages="{ required: 'La Categoría es Obligatoria' }"
                        :options="products.categoryOptions"
                    />

                    <FormKit
                        type="number"
                        label="Precio"
                        name="price"
                        placeholder="Precio de Producto"
                        step="1"
                        min="1"
                        v-model.number="formData.price"
                    />

                    <FormKit
                        type="number"
                        label="Disponibles"
                        name="availability"
                        placeholder="Productos Disponibles"
                        v-model.number="formData.availability"
                        step="1"
                        min="0"
                    />

                    <div v-if="isImageUploaded">
                        <p class="font-black">Imagen Nueva:</p>
                        <img    
                          :src="url"
                          alt="Nueva imagen Producto" 
                          class="w-52"
                        />  
                    </div>

                    <div v-else>
                        <p class="font-black">Imagen Actual:</p>
                        <img  
                          :src="formData.image"
                          :alt="'Imagen de' + formData.image" 
                          class="w-52"
                        />  
                    </div>
                    

                    <FormKit
                        type="file"
                        label="Cambiar Imagen"
                        name="image"
                        multiple="false"
                        accept=".jpg"
                        @change="onFileChange"
                    />


                    <FormKit
                        type="submit"
                    >Guardar Cambios</FormKit>

                </FormKit>
            </div>
        </div>
        </div>
</template>
