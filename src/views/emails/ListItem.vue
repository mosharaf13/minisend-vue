<template>

  <div class="email-row">
    <div class="table-cell text-left ml-4 md:ml-9">
      {{ email.from }}
    </div>
    <div class="table-cell text-left mx-4 md:mx-9">
      {{email.to}}
    </div>
    <div class="table-cell text-left">
      {{email.subject}}
    </div>

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
