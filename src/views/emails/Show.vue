<template>
  <div class="m-8 text-left">
    <back-button></back-button>
    <div class="email mx-8">
      <div class="subject text-xl py-8 border-b-2">
        {{ email.subject }}
      </div>

      <div class="body text-base py-8" v-dompurify-html="email.body">

      </div>
    </div>
  </div>
</template>

<style>
</style>


<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import BackButton from "@/views/emails/BackButton.vue";

interface Email {
  from: string;
  to: string;
  subject: string;
  body: string;
}

export default defineComponent({
  name: "email-list",
  components: {
    BackButton
  },
  setup() {
    const route = useRoute();
    const emailId = route.params.email_id;
    let email = ref({});
    const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;

    onMounted(() => {
      let route = `${apiEndpoint}/email/${emailId}`;
      fetchEmail(route);
    });

    const fetchEmail = (route: string) => {
      axios
          .get(route)
          .then((response: any) => {
            email.value = response.data;

            console.log(email.value);
          })
          .catch(function (error: any) {
            console.log(error);
          });
    };

    return {
      email,
    };
  },
});
</script>
