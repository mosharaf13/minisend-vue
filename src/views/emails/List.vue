<template>


  <list-item class="" v-for="email in emails" :key="email.id" :email="email">

  </list-item>

</template>

<style>

</style>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import axios from "axios";
import ListItem from "@/views/emails/ListItem.vue";

export default defineComponent({
  name: "email-list",
  components: {
    ListItem
  },
  setup() {
    let emails = ref();
    const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;

    onMounted(() => {
      fetchEmails();
    });

    const fetchEmails = () => {
      axios.get(`${apiEndpoint}/email`).then((response: any) => {
        emails.value = response.data;
        console.log(emails);
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
