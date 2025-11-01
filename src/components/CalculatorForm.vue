<template>
  <div class="calculator-form__wrapper spacing-p-vertical spacing-p-horizontal spacing-gap">
    <form ref="formEl" class="form spacing-gap">
      <div class="form-section spacing-gap">
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Merk</label>
          <input v-model="brandInput" @input="validateSingleInput($event.target)" required class="form-item__input" placeholder="Bijvoorbeeld DAF"/>
        </div>
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Type</label>
          <input v-model="typeInput" @input="validateSingleInput($event.target)" required class="form-item__input" placeholder="Bijvoorbeeld XF480"/>
        </div>
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Bouwjaar</label>
          <input v-model="yearInput" @input="validateSingleInput($event.target)" required class="form-item__input" placeholder="Bijvoorbeeld 2021" inputmode="numeric" :data-numbers-only="true" :data-min-number="boundaries?.objectYear.min" :data-max-number="boundaries?.objectYear.max"/>
          <p class="form-item__info text">Tussen {{boundaries?.objectYear.min || '-'}} en {{ boundaries?.objectYear.max || '-' }}</p>
        </div>
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Aanschafwaarde</label>
          <input v-model="purchasePriceInput" @input="validateSingleInput($event.target)" required class="form-item__input" placeholder="Bijvoorbeeld 50000" inputmode="decimal" :data-numbers-only="true" :data-min-number="boundaries?.purchasePrice.min" :data-max-number="boundaries?.purchasePrice.max"/>
          <p class="form-item__info text" >Tussen {{formatPrettyPrice(boundaries?.purchasePrice.min)}} en {{ formatPrettyPrice(boundaries?.purchasePrice.max) }}</p>
        </div>
      </div>
      <button @click="handleSubmit" type="submit" class="button" :class="{'button--loading': props.isCalculationLoading}" :disabled="props.isCalculationLoading">Berekening opslaan</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, computed, useTemplateRef } from "vue"
import type { ICalculationParams, IBoundaries } from '../interfaces';
import { formatPrettyPrice } from "@/composables/formatNumbers";
import { useBoundariesQuery } from "@/composables/useBoundariesQuery";
import { validateForm, validateSingleInput } from "@/composables/validateForm";

const brandInput: Ref<string> = ref('');
const typeInput: Ref<string> = ref('');
const yearInput: Ref<number | undefined> = ref();
const purchasePriceInput: Ref<number | undefined> = ref()

const emit = defineEmits<{
  calculate: [ICalculationParams]
}>();

const props = defineProps<{
  isCalculationLoading: boolean
}>();

const formEl = useTemplateRef<HTMLFormElement>('formEl')

const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault()
  if(!validateForm(formEl.value)) return

  emit('calculate', {
    brand: brandInput.value, 
    type: typeInput.value,
    year: yearInput.value || 0, 
    purchasePrice: purchasePriceInput.value || 0
  })
  resetInputs()
}

const resetInputs = () => {
  brandInput.value = ''
  typeInput.value = ''
  yearInput.value = undefined
  purchasePriceInput.value = undefined
}

const boundariesQuery = useBoundariesQuery()
const boundaries = computed((): IBoundaries => (boundariesQuery.result.value?.boundaries as IBoundaries))
</script>