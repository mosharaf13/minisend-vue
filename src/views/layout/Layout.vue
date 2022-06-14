<template>
  <div class="layout py-4 md:py-8">
    <div class="container mx-auto bg-white">
      <router-view/>
    </div>
  </div>


</template>

<style>
.layout {
  background-color: #F5F8FA;
}
</style>

<script lang="ts">
import {defineComponent} from "vue";


export default defineComponent({
  name: "App-Layout",
  components: {},
});
</script>
