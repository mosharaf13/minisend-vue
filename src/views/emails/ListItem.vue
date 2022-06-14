<template>

  <div class="email-row">
    {{email.subject}}
  </div>

</template>

<style>
  .email-row{
    border-bottom: 1px solid #e5e5e5;
    transition: box-shadow .15s cubic-bezier(0.4,0,0.2,1);
    display: flex;
    justify-content: flex-start;
  }
</style>

<script lang="ts">
import {defineComponent} from "vue";


export default defineComponent({
  name: "email-item",
  components: {},
  props: {
    email: Object,
  }
});
</script>
