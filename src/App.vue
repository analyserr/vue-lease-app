
<template>
  <div class="main">
    <CalculatorForm @calculate="calculateLease" :isCalculationLoading="loading"/>
    <Sidebar/>
  </div>
</template>

<script setup lang="ts">
import CalculatorForm from './components/CalculatorForm.vue';
import Sidebar from './components/Sidebar.vue';
import { ref, type Ref } from "vue"
import type { ICalculationParams, ICalculationResult, ISavedCalculation } from './interfaces';
import { useCalculationQuery } from './composables/useCalculationQuery';
const queryParams: Ref<ICalculationParams | undefined> = ref()

// if(formIsValid(queryParams)) {
const calculationQuery = useCalculationQuery(queryParams.value!)
// }

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
  
  // calculationQuery.refetch(queryParams)
  if(calculationQuery.result.value?.leaseCalculation) {
    saveCalculation()
  } else {
    // Room for error handling
  }
}

const saveCalculation = () => {
  let savedCalculations: ISavedCalculation[] = []
  if(localStorage.getItem('savedCalculations')) {
    savedCalculations = (JSON.parse(localStorage.getItem('savedCalculations')!) as unknown as ISavedCalculation[])
  }
  savedCalculations.push( { params: queryParams.value!, result: calculationQuery.result.value?.leaseCalculation })
  localStorage.setItem('savedCalculations', JSON.stringify(savedCalculations))
}
</script>
