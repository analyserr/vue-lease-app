<template>
<div class="sidebar">
    <h2 class="spacing-p-vertical spacing-p-horizontal title">Bewaarde berekeningen</h2>
    <div class="collection">
      <div 
        v-for="savedCalculation in props.savedCalculations" 
        v-bind:key="savedCalculation" 
        class="collection-item spacing-p-vertical--small spacing-p-horizontal spacing-gap--small"
        >
        <div class="collection-item__header title-s">
          <h3 class="collection-item__title">{{ savedCalculation.params.brand }} {{ savedCalculation.params.type }}</h3>
          <p class="collection-item__value"><span class="collection-item__header-price">{{ formatPrettyPrice(savedCalculation.result.monthlyPayment) }}</span> /mnd</p>
        </div>
        <div class="collection-item__row text">
          <p class="collection-item__row__label">Aanbetaling</p>
          <p class="collection-item__row__value">{{ formatPrettyPrice(savedCalculation.result.downPayment) }}</p>
        </div>
        <div class="collection-item__row text">
          <p class="collection-item__row__label">Slottermijn</p>
          <p class="collection-item__row__value">{{ formatPrettyPrice(savedCalculation.result.balloonPayment) }}</p>
        </div>
        <div class="collection-item__row text">
          <p class="collection-item__row__label">Looptijd</p>
          <p class="collection-item__row__value">{{savedCalculation.result.tenor}} maanden</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPrettyPrice } from "@/composables/formatNumbers";
import type { ISavedCalculation } from "@/interfaces";

const props = defineProps<{
  savedCalculations: ISavedCalculation[]
}>();

</script>
