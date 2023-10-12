<template>
  <div>
    <table-component
      :items="items"
      :fields="fields"
      :busy="busy"
      :totalRows="totalRows"
      :currentPage="currentPage"
      :perPage="perPage"
      :showFrom="showFrom"
      :showTo="showTo"
      :totalRecords="totalRecords"
      @page-changed="list($event)"
      :pages="pages"
    >
      <template #button>
        <button class="peppi-btn peppi-primary" @click="toggleModal">
          Add Category
        </button>
      </template>
    </table-component>

    <!-- Create Category Modal  -->
    <create-category
      :visible="dialogVisible"
      @toggle="toggleModal"
      @done="done"
    />
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
import CreateCategory from "@/components/Inventory/CreateCategory.vue";
export default {
  components: { TableComponent, CreateCategory },
  data() {
    return {
      items: [],
      dialogVisible: false,
      fields: [
        {
          key: "table_img",
          label: "",
        },

        {
          key: "category_name",
          label: "Category Name",
        },
        {
          key: "slug",
          label: "Slug",
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
    list(page = 2) {
      this.busy = true;
      console.log(page, 'kkk');
      this.$request(`admin/categories?page=`+page)
        .then((res) => {
          let resPayload = res.data.categories;
          this.items = resPayload
          // console.log(this.pages, "kkk");
          console.log(res.data);
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },

    toggleModal() {
      this.dialogVisible = !this.dialogVisible;
    },

    done() {
      this.toggleModal();
      this.list();
    },

    onSubmit() {
      alert("Hello");
    },
  },

  beforeMount() {
    this.list();
  },
};
</script>

<style></style>
