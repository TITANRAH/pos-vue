import {generateClasses} from '@formkit/themes'


const config = {
    config: {
        classes: generateClasses({
            // global es para no repetir lineas de codigo pro cada objeto
            // en este caso todos los label seran asi y todos los message
            // si necesitoq ue uno no lo tengo aplico   message: '$reset'
            global: {
                label: 'block mb-1 font-bold text-lg',
                message: 'text-red-500',
                wrapper: 'space-y-2 mb-3',
                input: 'w-full border border-gray-300 rounded text-gray-700 placeholder-gray-400'
            },
            file: {
                noFile: 'block my-2',
                fileItem: 'hidden'
            },
            submit: {
                input: '$reset bg-green-400 hover:bg-green-500 w-full p-2 mt-4 font-bold uppercase'
            }

        })
    }
}

export default config;