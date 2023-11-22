<template>
  <div>
    <table-component
      :items="items"
      :fields="fields"
      :disableEditAction="true"
      :disableDeleteAction="true"
      @view="view"
      :currentPage="perPage"
      :totalRows="totalRows"
      :perPag="perPage"
      :pages="pages"
      @page-changed="list"
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
          key: "username",
          label: "Username",
        },

        {
          key: "email",
          label: "Email",
        },

        {
          key: "created_at",
          label: "Date Joined",
        },

        {
          key: "actions",
          label: "",
        },
      ],
      currentPage: null,
      perPage: null,
      showFrom: null,
      showTo: null,
      totalRecords: null,
      pages: null,
    };
  },

  methods: {
    list(page = 1) {
      this.busy = true;
      console.log(page, "kkk");
      this.$request(`admin/users?page=` + page)
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

    view(e) {
      this.$router.push(`/users/${e.id}`);
    },

    edit(e) {
      this.$router.push(`/product/${e.id}/edit`);
    },

    deleteProduct(value) {
      this.$request
        .post(`admin/products/delete/${value.id}`)
        .then((res) => {
          this.$swal.fire(
            "Deleted!",
            "Product deleted succesfully.",
            "success"
          );
          this.list();
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteRecord(value) {
      this.$swal
        .fire({
          title: "Continue?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          console.log(result, "kkk");
          if (result.isConfirmed) {
            this.deleteProduct(value);
          }
        });
    },
  },

  beforeMount() {
    this.list();
  },
};
</script>

<style></style>
