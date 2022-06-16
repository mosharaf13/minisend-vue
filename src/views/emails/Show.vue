<template>
  <div class="m-8 text-left">
    <back-button></back-button>
    <div class="email mx-8 p-8">
      <div class="subject text-xl py-8 border-b-2">
        {{ email.subject }}
      </div>

      <div class="body text-base py-8" v-dompurify-html="email.body"></div>

      <div class="attachments flex">
        <div
          class="attachment flex flex-col justify-between md:w-1/6 mx-4 border p-4 rounded-br-md"
          v-for="attachment in email.email_attachments"
          :key="attachment.id"
        >
          <div class="filename text-sm pb-4">
            {{ attachment.original_name }}
          </div>

          <button
            class="
              bg-gray-300
              hover:bg-gray-400
              text-gray-800
              font-bold
              py-2
              px-4
              rounded
              inline-flex
              items-center
            "
            @click="downloadFile(attachment.id)"
          >
            <svg
              class="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Download</span>
          </button>
        </div>
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
    BackButton,
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
        })
        .catch(function (error: any) {
          console.log(error);
        });
    };

    const downloadFile = (id: number) => {
      window.location.href = `${apiEndpoint}/email/attachment/download/${id}`;
    };

    return {
      email,
      downloadFile
    };
  },
});
</script>
