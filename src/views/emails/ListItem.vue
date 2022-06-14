<template>

  <div class="email-row">
    {{email.subject}}
  </div>

</template>

<style>
  .email-row{
    border-bottom: 1px solid #e5e5e5;
    transition: box-shadow .15s;
    display: flex;
    justify-content: flex-start;
    padding: .5rem 2rem;
    cursor: pointer;
  }
  .email-row:hover {
    box-shadow: 0 0 11px rgba(33,33,33,.2);
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
