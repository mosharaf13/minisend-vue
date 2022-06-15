<template>
    <router-link :to="{ name: 'email' }">
      <button
          class="
          bg-white
          hover:bg-gray-100
          text-gray-800
          font-semibold
          py-2
          px-4
          border border-gray-400
          rounded
          shadow
          my-8
        "
      >
        <span class="flex">
          <span class="flex flex-col justify-center mr-1">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
            >
              <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </span>
          Back
        </span>
      </button>
    </router-link>
</template>

<style>
</style>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "back-button",
  components: {},

});
</script>
