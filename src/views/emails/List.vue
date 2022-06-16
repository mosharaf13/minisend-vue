<template>

  <div class="h-full">
    <div class="meta flex justify-between">
      <div class="stats flex justify-start">
        <div class="posted-stat px-6 py-3 mx-4 text-gray-400 bg-gray-50 rounded-md">
             {{emailStatistics?.posted}} Posted
        </div>
        <div class="sent-stat px-6 py-3 mx-4 text-green-400 bg-green-50 rounded-md">
            <span class="status-name">
              Sent
            </span>
            <span class="status-count">
              {{emailStatistics?.sent}}
            </span>
        </div>   
        <div class="failed-stat px-6 py-3 mx-4 text-red-400 bg-red-50 rounded-md">
            <span class="status-name">
              Failed
            </span>
            <span class="status-count">
              {{emailStatistics?.failed}}
            </span>
        </div>
      </div>
      <div class="paginator flex justify-end">
        <button
            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mx-2 border border-gray-400 rounded shadow"
            :disabled="paginator.previousPageUrl === null" @click="fetchEmails(paginator.previousPageUrl)">Previous
        </button>
        <button
            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mx-2 border border-gray-400 rounded shadow"
            :disabled="paginator.nextPageUrl === null" @click="fetchEmails(paginator.nextPageUrl)">Next
        </button>
      </div>
    </div>

    <div class="table w-full">
      <list-item  class="table-row" v-for="email in emails" :key="email.id" :email="email"></list-item>
    </div>

  </div>


</template>

<style>
.meta {
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  padding: 1rem 0;
  margin-bottom: 1rem;
}
</style>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import axios from "axios";
import ListItem from "@/views/emails/ListItem.vue";

interface Paginator {
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

export default defineComponent({
  name: "email-list",
  components: {
    ListItem
  },
  setup() {
    let emails = ref();
    let emailStatistics = ref();

    let paginator = ref<Paginator>({
      nextPageUrl: null,
      previousPageUrl: null
    });

    const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;

    onMounted(() => {
      fetchEmailStatistics(`${apiEndpoint}/email/status/statistics`);
      fetchEmails(`${apiEndpoint}/email`);
    });

    const fetchEmails = (route: string) => {
      axios.get(route).then((response: any) => {
        emails.value = response.data.data;
        paginator.value.nextPageUrl = response.data.next_page_url;
        paginator.value.previousPageUrl = response.data.prev_page_url;
      }).catch(function (error: any) {
        console.log(error);
      });
    }

    const fetchEmailStatistics = (route: string) => {
      axios.get(route).then((response: any) => {
        emailStatistics.value = response.data;
        console.log(emailStatistics.value.posted);
        console.log(emailStatistics.value.sent);
        console.log(emailStatistics.value.failed);
      }).catch(function (error: any) {
        console.log(error);
      });
    }

    return {
      emails,
      fetchEmails,
      paginator,
      emailStatistics
    };
  }
});
</script>
