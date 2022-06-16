<template>

  <router-link
      :to="{ name: 'show-email', params: { email_id: email.id } }"
  >
    <div class="email-row-wrapper flex justify-between">
      <div class="email-row flex justify-start">

        <div class="rounded-full align-middle w-3 h-3" :class="getColorClass()">

        </div>
        <div class="table-cell text-left text-sm ml-4 md:ml-9">
          {{ email.from }}
        </div>
        <div class="table-cell text-left text-sm mx-4 md:mx-9">
          {{ email.to }}
        </div>
        <div class="table-cell text-left text-sm">
          {{ email.subject }}
        </div>
      </div>
      <div class="posted-time text-sm">
        {{ email.updated_at }}
      </div>
    </div>
  </router-link>

</template>

<style>
.email-row-wrapper {
  border-bottom: 1px solid #e5e5e5;
  transition: box-shadow .15s;
  padding: .5rem 2rem;
  cursor: pointer;
}

.email-row-wrapper:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, .2);
}
</style>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "email-item",
  components: {},
  props: {
    email: {
      required: true,
      type: Object
    }
  },
  setup(props) {
    const getColorClass = () => {
      if (props.email.status == 'posted') {
        return 'bg-gray-400';
      } else if (props.email.status == 'sent') {
        return 'bg-green-400';
      } else {
        return 'bg-red-400';
      }
    }
    return {
      getColorClass
    }
  }
});
</script>
