<template>
  <div class="calculator spacing-p-vertical spacing-p-horizontal spacing-gap">
    <form class="form spacing-gap">
      <div class="form-section spacing-gap">
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Merk</label>
          <input class="form-item__input" placeholder="Bijvoorbeeld DAF"/>
        </div>
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Type</label>
          <input class="form-item__input" placeholder="Bijvoorbeeld XF480"/>
        </div>
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Bouwjaar</label>
          <input class="form-item__input" placeholder="Bijvoorbeeld 2021"/>
          <p class="form-item__info text">Tussen 2013 en 2022</p>
        </div>
        <div class="form-item spacing-gap--small">
          <label class="form-item__label title-s">Aanschafwaarde</label>
          <input class="form-item__input" placeholder="Bijvoorbeeld 50000"/>
          <p class="form-item__info text" >Tussen € 15.000 en € 1.000.000</p>
        </div>
      </div>
      <button>Berekening opslaan</button>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>