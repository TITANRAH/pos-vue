

import { useFirebaseStorage } from 'vuefire'
import {ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import {uid} from 'uid'
import { computed, ref } from 'vue'

// usamos composables por que no necesito estados

export default function useImage(){

    const url = ref('')

    const storage = useFirebaseStorage()
    // asi nos conectamos ayudado de vuefire que va a nuestras variables de entorno
    // y verifica las credenciales yr ealzia la conexion


    const onFileChange = e =>{
        
        // ASI ACCEDO AL PRIMER ELEMENTO AL QUE necesito
        // TRAE COSAS COMO SIZE DONDE VALIDO QUE NO SEA MAYOR A 300 KB POR EJEM
        // console.log(e.target.files[0]);
        const file = e.target.files[0]
        const filename = uid() + '.jpg'

        // ESTA ES LA UBICACION DE DONDE SE ALMACENARAN LAS IMAGENES
        // TOMA 2 PARAMETROS EL IDENTIFICADOER DEL STORAGE Y LA URL DONDE SE ALMACENARAN LAS IMAGENS
        const sRef = storageRef(storage, '/products/' + filename)

        //SUBE EL ARCHIVO
        // NUEVA FORMA NO REALIZADA EN LOS PROYECTOS ANTERIORES
        // TOMA DOS PARAMETROS, DONDE SUBIR ARCHIVO Y EL ARCHIVO
        const uploadTask = uploadBytesResumable(sRef, file)

        // finalmente lo que sube el archivo es esta funcion
        uploadTask.on('state_changed',
              () => {},
              (error) => console.log(error),
              () => {
                  console.log(uploadTask.snapshot.ref)
                // LA IMAGEN YA SE SUBIO EN ESTA ETAPA

                // ESTA FUNCION DE FIREBASE LA USO EN ESTA ETAPA Y ME DEUVELVE LA URL DE LA IAMGEN
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                // GUARDAMOS LA URL EN ESTA VARIABLE REF Y REACCIONAMOS AL
                // REF EN UN COMPUTED PROPERTY
                    
                    url.value = downloadURL
                    console.log(url.value)
                })
              }
        )
    }


    // SI LA VARIABLE SE LLENA CON ALGO DEJALA ASI SI NO SU VALOR ES NULO
    const isImageUploaded = computed(()=>{
        return url.value ? url.value : null
    })

    return {
        url,
        onFileChange,
        isImageUploaded
    }
}