<template>
  <div>
    <table-component
      :items="items"
      :fields="fields"
      :busy="busy"
      @edit="edit"
      @view="view"
      @delete="deleteRecord"
      :currentPage="currentPage"
      :totalRows="totalRows"
      :perPage="perPage"
      :pages="pages"
      @page-changed="list"
    >
      <template #button>
        <button
          class="peppi-btn peppi-primary"
          @click="$router.push('/inventory/product/add-product')"
        >
          Create product
        </button>
      </template>
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
      dialogVisible: false,
      fields: [
        {
          key: "product_img",
          label: "",
        },

        {
          key: "name",
          label: "Product Name",
        },

        {
          key: "slug",
          label: "Slug",
        },

        {
          key: "price",
          label: "Price",
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
          key: "availability",
          label: "Availability",
        },

        {
          key: "created_at",
          label: "Date Created",
        },

        {
          key: "actions",
          label: "",
        },
      ],
      busy: false,
      totalRows: null,
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
      this.$request(`admin/products?page=` + page)
        .then((res) => {
          let resPayload = res.data.products;
          this.items = resPayload.data;
          this.totalRows = resPayload.total;
          this.showFrom = resPayload.from;
          this.showTo = resPayload.to;
          this.totalRecords = resPayload.total;
          this.currentPage = resPayload.current_page;
          this.perPage = resPayload.per_page;
          // this.pages = Math.ceil(resPayload.total / resPayload.per_page);
          this.pages = resPayload.last_page
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
      this.$router.push(`/product/${e.id}`);
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
