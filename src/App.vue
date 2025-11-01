
<template>
  <div class="main">
    <CalculatorForm @calculate="calculateLease" :isCalculationLoading="loading"/>
    <Sidebar :savedCalculations="savedCalculations"/>
  </div>
</template>

<script setup lang="ts">
import CalculatorForm from './components/CalculatorForm.vue';
import Sidebar from './components/Sidebar.vue';
import { ref, type Ref } from "vue"
import type { ICalculationParams, ISavedCalculation } from './interfaces';
import { useCalculationQuery } from './composables/useCalculationQuery';

const queryParams: Ref<ICalculationParams | undefined> = ref()
const savedCalculations: Ref<ISavedCalculation[]> = ref([])
const calculationQuery = useCalculationQuery(queryParams)

const calculateLease = (formData: ICalculationParams) => {
  let formattedPurchasePrice: number = formData.purchasePrice
  if(typeof(formattedPurchasePrice) == "string") {
    // Format price input to proper float
    formattedPurchasePrice = parseFloat((formattedPurchasePrice as string).replace(".", "").replace(",","."))
  }
  
  queryParams.value = {
    ...formData,
    purchasePrice: formattedPurchasePrice
  }
  
  if(calculationQuery.result.value?.leaseCalculation) {
    saveCalculation()
  } else {
    // Room for error handling
  }
}

const saveCalculation = () => {
  savedCalculations.value = []
  if(localStorage.getItem('savedCalculations')) {
    savedCalculations.value = (JSON.parse(localStorage.getItem('savedCalculations')!) as unknown as ISavedCalculation[])
  }
  // Add new calculation to beginning of the array
  savedCalculations.value.splice(0, 0, { params: queryParams.value!, result: calculationQuery.result.value?.leaseCalculation })
  localStorage.setItem('savedCalculations', JSON.stringify(savedCalculations.value))
}
</script>
