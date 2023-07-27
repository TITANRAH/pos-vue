import { defineStore } from "pinia";
import {computed, ref} from 'vue'
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";
import { collection, addDoc, getDoc, where, limit, orderBy, query, updateDoc, doc, deleteDoc } from "firebase/firestore";
import {ref as storageRef, deleteObject} from 'firebase/storage'

export const useProductStores = defineStore('products', ()=>{

    // crendenciales que se usan con vuefire
    // tanto para firestore con el storage donde guardo las fotos
    const db = useFirestore()
    const storage = useFirebaseStorage()

    const selectedCategory = ref(1)

    const categories = [
        {id: 1, name: 'Sudaderas'},
        {id: 2, name: 'Tenis'},
        {id: 3, name: 'Lentes'}
    ]

    // instancio la query y apunto hacia la coleccion
    const q = query(
        collection(db, 'products'),
        // para buscar con where 
        // where('price', '<', 50)
        // traerte solo de a 2 o lo que quiera en cantidad
        // limit(2)
       // orderBy('price','asc'),  el precio mas barato primero
        orderBy('availability','asc')
    )
    
    // insstancio el use coleccion y uso q
    // si solo quisiera usar la coleccion sin qyuerys le puedo pasar directamente la col
    const productsCollection = useCollection(collection(db, 'products'))

    async function createProduct(product){
        await addDoc(collection(db, 'products'), product).then((resp) => {
            console.log(resp);
        })
    }

    async function updateProduct(docRef, product){
        console.log('product a editar desde updateProduct store', product)

        // destructuramos y sacamos los valores
        const {image, url, ...values} = product

        // si viene una imagen
        if(image.length){

            // en caso de que haya una imagen leemos la url simplemente
            // que trae producto y le mandamos la misma url
            await updateDoc(docRef, {
                ...values,
                image: url.value
            })
        }else {
            // si no hay una imagen en el producto a editar que viene de bd 
            // entonces toma todos los valores incluso la imagen y mandala a firebase
            await updateDoc(docRef, values)
        }

    }

    async function deleteProduct(id){

        console.log('id desde store en delete', id)
        if(confirm('Eliminar Producto ?')) {
            const docRef = doc(db, 'products', id)
            // para eliminar imagen al eliminar un producto
            const docSnap = await getDoc(docRef)
            // const product = docSnap.data() lo comento por que ahre destructuring
            const {image} = docSnap.data()

            console.log('producto en firebase desde delete', image)

            const imageRef = storageRef(storage, image)

            //  ejecuto las dos funciones de eliminar al mismo tiempo 
            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ])
        }
    }


 
    const categoryOptions = computed(()=>{
        const options = [
            {label: 'Seleccione', value: '', attrs: {disabled: true}},
            ...categories.map(category => (
                {label: category.name, value: category.id}
            ))
        ]
        return options
    })

    const noResult = computed(()=>{
        productsCollection.value.length === 0
    })


    const filteredProducts = computed(()=>{
        // el valor que le pase a selectedCategory es 1 por loq ue dice filtra los productos por categoria 1 
        return productsCollection.value.filter(product => product.category === selectedCategory.value)
    })

    return {
        createProduct,
        categoryOptions,
        productsCollection,
        categories,
        selectedCategory,
        noResult,
        updateProduct,
        deleteProduct,
        filteredProducts
    }
})