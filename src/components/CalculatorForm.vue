<template>
  <div class="calculator-form spacing-p-vertical spacing-p-horizontal spacing-gap">
    <form @submit="handleSubmit" class="form spacing-gap">
      <div class="form-section spacing-gap">
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Merk</label>
          <input v-model="brandInput" class="form-item__input" placeholder="Bijvoorbeeld DAF"/>
        </div>
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Type</label>
          <input v-model="typeInput" class="form-item__input" placeholder="Bijvoorbeeld XF480"/>
      </div>
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Bouwjaar</label>
          <input v-model="yearInput" type="number" :min="boundaries?.objectYear.min" :max="boundaries?.objectYear.max" step="1" class="form-item__input" placeholder="Bijvoorbeeld 2021"/>
          <p class="form-item__info text">Tussen {{boundaries?.objectYear.min || '-'}} en {{ boundaries?.objectYear.max || '-' }}</p>
        </div>
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Aanschafwaarde</label>
          <input v-model="purchasePriceInput" class="form-item__input" placeholder="Bijvoorbeeld 50000"/>
          <p class="form-item__info text" >Tussen {{formatPrettyPrice(boundaries?.purchasePrice.min)}} en {{ formatPrettyPrice(boundaries?.purchasePrice.max) }}</p>
        </div>
      </div>
      <button type="submit" class="button" :class="{'button--loading': props.isCalculationLoading}" :disabled="props.isCalculationLoading">Berekening opslaan</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, computed } from "vue"
import type { ICalculationParams, IBoundaries } from '../interfaces';
import { formatPrettyPrice } from "@/composables/formatPrice";
import { useBoundariesQuery } from "@/composables/useBoundariesQuery";

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

const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault()
  emit('calculate', {
    brand: brandInput.value, 
    type: typeInput.value,
    year: yearInput.value || 0, 
    purchasePrice: purchasePriceInput.value || 0
  })
}

const boundariesQuery = useBoundariesQuery()
const boundaries = computed((): IBoundaries => (boundariesQuery.result.value?.boundaries as IBoundaries))
</script>