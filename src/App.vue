
<template>
  <div class="main">
    <CalculatorForm @save="calculate" :isCalculationLoading="loading"/>
    <Sidebar/>
  </div>
</template>

<script setup lang="ts">
import CalculatorForm from './components/CalculatorForm.vue';
import Sidebar from './components/Sidebar.vue';
import { useQuery } from '@vue/apollo-composable';
import gql from "graphql-tag";
import { ref, type Ref } from "vue"
import type { ICalculationParams } from './interfaces';

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
        handlingFee
        balloonPayment
        monthlyPayment
    }
}`;

const { result, loading, error } = useQuery(CALCULATE, queryParams)
const calculate = (formData: ICalculationParams) => {
  let formattedPurchasePrice: number = formData.purchasePrice
  
  // Make sure purchasePrice is formatted to proper float
  if(typeof(formattedPurchasePrice) == "string") {
    // Remove periods and change comma (European decimal number indiator) to period, because parseFloat ignores commas.
    formattedPurchasePrice = parseFloat((formattedPurchasePrice as string).replace(".", "").replace(",","."))
  }

  queryParams.value = {
    ...formData,
    purchasePrice: formattedPurchasePrice
  }
  console.log("result: ", result)
}
</script>
