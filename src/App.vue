<template>
  <div class="main">
    <CalculatorForm @calculate="calculateLease" :isCalculationLoading="loading"/>
    <Sidebar :savedCalculations="savedCalculations"/>
  </div>
</template>

<script setup lang="ts">
import CalculatorForm from './components/CalculatorForm.vue';
import Sidebar from './components/Sidebar.vue';
import { onMounted, ref, watch, type Ref } from "vue"
import type { ICalculationParams, ISavedCalculation } from './interfaces';
import { useCalculationQuery } from './composables/useCalculationQuery';
import { formatNumberStringToFloat } from './composables/formatNumbers';

const queryParams: Ref<ICalculationParams | undefined> = ref()
const savedCalculations: Ref<ISavedCalculation[]> = ref([])
const calculationQuery = useCalculationQuery(queryParams)

const calculateLease = (formData: ICalculationParams) => {  
  queryParams.value = {
    ...formData,
    year: formatNumberStringToFloat(formData.year),
    purchasePrice: formatNumberStringToFloat(formData.purchasePrice)
  }
}

watch(calculationQuery.result, () => {
  if(calculationQuery.result.value?.leaseCalculation) {
    saveCalculation()
  }
})

const loadSavedCalculationsFromLocalStorage = () => {
  if(localStorage.getItem('savedCalculations')) {
    savedCalculations.value = (JSON.parse(localStorage.getItem('savedCalculations')!) as unknown as ISavedCalculation[])
  } else {
    savedCalculations.value = []
  }
}

const saveCalculation = () => {
  loadSavedCalculationsFromLocalStorage()
  // Add new calculation to beginning of the array
  savedCalculations.value.splice(0, 0, { params: queryParams.value!, result: calculationQuery.result.value?.leaseCalculation })
  localStorage.setItem('savedCalculations', JSON.stringify(savedCalculations.value))
}

onMounted(() => {
  loadSavedCalculationsFromLocalStorage()
})

</script>
