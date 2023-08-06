import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import { useCartStore } from "./cart";

export const useCuponStore = defineStore("cupon", () => {

  const cart = useCartStore()
  const cuponInput = ref("");
  const cuponValidationMessage = ref("");
  const discountPercentage = ref(0);
  const discount = ref(0)

  const valids_cupons = [
    { name: "10DESCUENTO", discount: 0.1 },
    { name: "20DESCUENTO", discount: 0.2 },
  ];

  watch(discountPercentage, () => {
    discount.value = (cart.total * discountPercentage.value).toFixed(2)
  })

  function applyCupon() {
    console.log("aplicando...");

    if (valids_cupons.some((cupon) => cupon.name === cuponInput.value)) {
      cuponValidationMessage.value = "Aplicando...";

      setTimeout(() => {
        console.log("entro al settime");
        discountPercentage.value = valids_cupons.find(
          (cupon) => cupon.name === cuponInput.value
        ).discount;
        cuponValidationMessage.value = "Descuento aplicado !";
      }, 3000);
    } else {
      cuponValidationMessage.value = "No existe el cupón";
    }

    setTimeout(() => {
      cuponValidationMessage.value = "";
    }, 6000);
  }

  function $reset(){
    cuponInput.value = "";
    cuponValidationMessage.value = "";
    discountPercentage.value = 0;
    discount.value = 0;
  }

  const isValidCupon = computed(()=> {

   return discountPercentage.value > 0
  })

  return {
    cuponInput,
    applyCupon,
    $reset,
    cuponValidationMessage,
    discount,
    isValidCupon
  };
});
