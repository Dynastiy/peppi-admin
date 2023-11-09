<template>
    <div class="tw-bg-white tw-p-6">
      <table-component
        :items="items"
        :busy="busy"
        :fields="fields"
        @view="viewOrder"
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
      };
    },
  
    methods: {
      list(page = 1) {
        this.busy = true;
        console.log(page, "kkk");
        this.$request.get(`admin/payments?page=` + page)
          .then((res) => {
            let resPayload = res.data;
            this.items = resPayload.data;
            this.totalRows = resPayload.total;
            this.showFrom = resPayload.from;
            this.showTo = resPayload.to;
            this.totalRecords = resPayload.total;
            this.currentPage = resPayload.current_page;
            this.perPage = resPayload.per_page;
            this.pages = Math.ceil(resPayload.total / resPayload.per_page);
            // console.log(this.pages, "kkk");
            console.log(res.data);
            this.busy = false;
          })
          .catch((err) => {
            console.log(err);
            this.busy = false;
          });
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
  