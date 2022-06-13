<template>
<div>
  this is dumb
</div>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</template>

<style>

</style>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import axios from "axios";


export default defineComponent({
  name: "email-list",
  components: {},
  setup() {
    let emails = ref();
    const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;

    onMounted(() => {
      fetchEmails();
    });

    const fetchEmails = () => {
      axios.get(`${apiEndpoint}/email`).then((response: any) => {
        emails.value = response.data.data;
      }).catch(function (error: any) {
        console.log(error);
      });
    }

    return {
      emails
    };
  }
});
</script>
