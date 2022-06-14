<template>
  <div class="layout">
    <div class="container mx-auto bg-white">
      <router-view/>
    </div>
  </div>


</template>

<style>
.layout {
  background-color: #F5F8FA;
  margin-top: 10rem;
}
</style>

<script lang="ts">
import {defineComponent} from "vue";


export default defineComponent({
  name: "App-Layout",
  components: {},
});
</script>
