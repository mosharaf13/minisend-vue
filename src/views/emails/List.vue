<template>
  <div class="h-full">
    <div class="meta">
      <div class="stats flex justify-center">
        <div
            class="posted-stat px-6 py-3 mx-4 text-gray-400 bg-gray-50 rounded-md"
        >
          {{ emailStatistics?.posted }} Posted
        </div>
        <div
            class="sent-stat px-6 py-3 mx-4 text-green-400 bg-green-50 rounded-md"
        >
          <span class="status-name"> Sent </span>
          <span class="status-count">
            {{ emailStatistics?.sent }}
          </span>
        </div>
        <div
            class="failed-stat px-6 py-3 mx-4 text-red-400 bg-red-50 rounded-md"
        >
          <span class="status-name"> Failed </span>
          <span class="status-count">
            {{ emailStatistics?.failed }}
          </span>
        </div>
      </div>
    </div>
    <div class="meta flex justify-center">
      <div class="filter-type w-1/5 m-6 flex justify-end">
        <select class="select-text p-2" v-model="filterType">
          <option value="subject" selected>Subject</option>
          <option value="sender">Sender</option>
          <option value="recipient">Recipient</option>
        </select>
      </div>
      <div class="filter-value w-4/6 m-6 border-blue-400">
        <input
            v-on:keyup.enter="fetchEmails()"
            class="p-2 w-full"
            v-model.trim="filterValue"
            :placeholder="'Search by ' + filterType"
        />
      </div>
    </div>
    <div class="meta flex justify-end">
      <div class="paginator flex justify-end">
        <div class="pagination-numbers text-xs flex items-center">
          {{ paginator.from }} - {{ paginator.to }} of {{ paginator.total }}
        </div>
        <button
            class="
            bg-white
            hover:bg-gray-100
            text-gray-800
            font-semibold
            py-2
            px-4
            mx-2
            border border-gray-400
            rounded
            shadow
          "
            :disabled="paginator.previousPageUrl === null"
            @click="fetchEmails(paginator.previousPageUrl)"
        >
          Previous
        </button>
        <button
            class="
            bg-white
            hover:bg-gray-100
            text-gray-800
            font-semibold
            py-2
            px-4
            mx-2
            border border-gray-400
            rounded
            shadow
          "
            :disabled="paginator.nextPageUrl === null"
            @click="fetchEmails(paginator.nextPageUrl)"
        >
          Next
        </button>
      </div>
    </div>

    <div class="table w-full">
      <list-item
          class="table-row"
          v-for="email in emails"
          :key="email.id"
          :email="email"
      ></list-item>
    </div>
  </div>
</template>

<style>
.meta {
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  padding: 1rem 0;
}
</style>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import axios from "axios";
import ListItem from "@/views/emails/ListItem.vue";

interface Paginator {
  nextPageUrl: string | null;
  previousPageUrl: string | null;
  from: number;
  to: number;
  total: number;
}

export default defineComponent({
  name: "email-list",
  components: {
    ListItem,
  },
  setup() {
    let emails = ref();
    let emailStatistics = ref();
    let filterType = ref("subject");
    let filterValue = ref();
    let paginator = ref<Paginator>({
      nextPageUrl: null,
      previousPageUrl: null,
      from: 0,
      to: 0,
      total: 0
    });
    const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;
    const emailEndpoint = `${apiEndpoint}/email`;

    onMounted(() => {
      fetchEmailStatistics();
      fetchEmails();
    });

    const fetchEmails = (url: string = emailEndpoint) => {
      axios
          .get(url, {
            params: {
              filterType: filterType.value,
              filterValue: filterValue.value,
            },
          })
          .then((response: any) => {
            emails.value = response.data.data;
            paginator.value.nextPageUrl = response.data.next_page_url;
            paginator.value.previousPageUrl = response.data.prev_page_url;
            paginator.value.from = response.data.from;
            paginator.value.to = response.data.to;
            paginator.value.total = response.data.total;
          }).then(() => {
        fetchEmailStatistics();
      }).catch(function (error: any) {
        console.log(error);
      });
    };

    const fetchEmailStatistics = () => {
      axios
          .get(`${apiEndpoint}/email/status/statistics`, {
            params: {
              filterType: filterType.value,
              filterValue: filterValue.value,
            },
          })
          .then((response: any) => {
            emailStatistics.value = response.data;
          })
          .catch(function (error: any) {
            console.log(error);
          });
    };

    return {
      emails,
      fetchEmails,
      paginator,
      emailStatistics,
      filterType,
      filterValue,
    };
  },
});
</script>
