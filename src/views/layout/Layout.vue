<template>
  <div class="container mx-auto" style="background-color: bisque">
    <router-view />
  </div>

</template>



<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";


export default defineComponent({
  name: "App-Layout",
  components: {},
});
</script>
