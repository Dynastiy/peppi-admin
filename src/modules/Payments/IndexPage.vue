<template>
  <div class="tw-bg-white tw-p-6">
    <table-component
      :items="items"
      :busy="busy"
      :fields="fields"
      @view="viewOrder"
      :currentPage="currentPage"
      :perPage="perPage"
      :pages="pages"
      @page-changed="filter($event)"
      :disableEditAction="true"
      :disableDeleteAction="true"
    >
    </table-component>
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
export default {
  components: { TableComponent },
  data() {
    return {
      items: [],

      fields: [
        {
          key: "item-status",
          label: "Status",
        },

        {
          key: "amount",
          label: "Total Amount",
          formatter: (item) => {
            return item
              ? Number(item).toLocaleString("en-US", {
                  style: "currency",
                  currency: "NGN",
                })
              : "NGN 0.00";
          },
        },

        {
          key: "created_at",
          label: "Date",
        },

        {
          key: "description",
          label: "Description",
        },

        { key: "actions", label: "" },
      ],

      busy: false,
      totalRows: 0,
      currentPage: 1,
      pages: 10,
      perPage: 0
    };
  },

  methods: {
    list(page = 1) {
      this.busy = true;
      console.log(page, "kkk");
      this.$request
        .get(`admin/payments?page=` + page)
        .then((res) => {
          let resPayload = res.data;
          this.items = resPayload.data;
          this.totalRows = resPayload.total;
          this.showFrom = resPayload.from;
          this.showTo = resPayload.to;
          this.currentPage = resPayload.current_page;
          this.perPage = resPayload.per_page;
          this.pages = resPayload.last_page
          console.log(this.perPage, "kkk");
          console.log(res.data);
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },

    filter(e) {
      console.log(e);
    },

    viewOrder(e) {
      this.$router.push(`/payment/${e.id}`);
    },
  },

  beforeMount() {
    this.list();
  },
};
</script>

<style></style>
