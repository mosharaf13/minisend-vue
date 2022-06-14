<template>

  <div class="h-full">
    <div class="paginator">
      <button
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mx-2 border border-gray-400 rounded shadow"
          :disabled="paginator.previousPageUrl === null" @click="fetchEmails(paginator.previousPageUrl)">Previous
      </button>
      <button
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mx-2 border border-gray-400 rounded shadow"
          :disabled="paginator.nextPageUrl === null" @click="fetchEmails(paginator.nextPageUrl)">Next
      </button>
    </div>
    <div class="table w-full">
      <list-item class="table-row" v-for="email in emails" :key="email.id" :email="email"></list-item>
    </div>

  </div>


</template>

<style>
.paginator {
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  padding: 1rem 0;
  display: flex;
  justify-content: flex-end;
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
    let paginator = ref<Paginator>({
      nextPageUrl: null,
      previousPageUrl: null
    });

    const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;

    onMounted(() => {
      let route = `${apiEndpoint}/email`;
      fetchEmails(route);
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

    return {
      emails,
      fetchEmails,
      paginator
    };
  }
});
</script>
