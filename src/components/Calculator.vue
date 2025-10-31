<template>
  <div class="calculator spacing-p-vertical spacing-p-horizontal spacing-gap">
    <form @submit="save" class="form spacing-gap">
      <div class="form-section spacing-gap">
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Merk</label>
          <input v-model="brand" class="form-item__input" placeholder="Bijvoorbeeld DAF"/>
        </div>
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Type</label>
          <input v-model="type" class="form-item__input" placeholder="Bijvoorbeeld XF480"/>
        </div>
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Bouwjaar</label>
          <input v-model="year" type="number" min="2013" max="2022" step="1" class="form-item__input" placeholder="Bijvoorbeeld 2021"/>
          <p class="form-item__info text">Tussen 2013 en 2022</p>
        </div>
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Aanschafwaarde</label>
          <input v-model="purchasePrice" class="form-item__input" placeholder="Bijvoorbeeld 50000"/>
          <p class="form-item__info text" >Tussen € 15.000 en € 1.000.000</p>
        </div>
      </div>
      <button type="submit">Berekening opslaan</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import gql from "graphql-tag";
import { ref, type Ref } from "vue"

type QueryParams = {
  brand: string,
  type: string
  year: number,
  purchasePrice: number
}

const brand: Ref<string> = ref('testing');
const type: Ref<string> = ref('123');
const year: Ref<number> = ref(2020);
const purchasePrice: Ref<number> = ref(15000)

const queryParams: Ref<QueryParams | undefined> = ref()
  
// const 
const CALCULATION = gql`
query($brand: String!, $type: String!, $year: Int!, $purchasePrice: Float!) {
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

const { result, loading, error } = useQuery(CALCULATION, queryParams)

async function save(event: SubmitEvent) {
  event.preventDefault()
  console.log("save the calculation.")
  
  queryParams.value = {
    brand: brand.value,
    type: type.value,
    year: year.value,
    purchasePrice: purchasePrice.value
  }
  
  console.log("result:", result)
  console.log("error: ", error)
}

</script>

<style>

</style>