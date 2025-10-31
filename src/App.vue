
<template>
  <div class="main">
    <CalculatorForm @calculate="calculateLease" :isCalculationLoading="loading"/>
    <Sidebar/>
  </div>
</template>

<script setup lang="ts">
import CalculatorForm from './components/CalculatorForm.vue';
import Sidebar from './components/Sidebar.vue';
import { useQuery } from '@vue/apollo-composable';
import gql from "graphql-tag";
import { ref, type Ref } from "vue"
import type { ICalculationParams, ICalculationResult, ISavedCalculation } from './interfaces';

const queryParams: Ref<ICalculationParams | undefined> = ref()

const CALCULATE = gql`
query Calculate($brand: String!, $type: String!, $year: Int!, $purchasePrice: Float!) {
    leaseCalculation(input: {
        purchasePrice: $purchasePrice,
        object: {
            year: $year
            brand: $brand
            type: $type
        }
    }) {
        totalCosts
        downPayment
        tenor
        balloonPayment
        monthlyPayment
    }
}`;
// handlingFee /* ?? */

const { result, loading, error } = useQuery(CALCULATE, queryParams)
const calculateLease = (formData: ICalculationParams) => {
  let formattedPurchasePrice: number = formData.purchasePrice
  
  if(typeof(formattedPurchasePrice) == "string") {
    // Make sure purchasePrice is formatted to proper float
    // Remove periods and change comma (European decimal number indiator) to period, because parseFloat ignores commas.
    formattedPurchasePrice = parseFloat((formattedPurchasePrice as string).replace(".", "").replace(",","."))
  }

  queryParams.value = {
    ...formData,
    purchasePrice: formattedPurchasePrice
  }
  if(result.value) {
    saveCalculation(result.value?.leaseCalculation)
  }
}

const saveCalculation = (newCalculationResult: ICalculationResult) => {
  let currentCalculations: ISavedCalculation[] = []
  if(localStorage.getItem('savedCalculations')) {
    currentCalculations = (JSON.parse(localStorage.getItem('savedCalculations')!) as unknown as ISavedCalculation[])
  }

  let newCalculations = [
    ...currentCalculations, 
    {  params: queryParams.value, result: newCalculationResult }
  ]


  const stringified = JSON.stringify(newCalculations)
  localStorage.setItem('savedCalculations', stringified)
}
</script>
