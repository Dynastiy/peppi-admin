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
      @view="getCategory($event, 'view')"
      @edit="getCategory($event, 'edit')"
      @delete="deleteRecord"
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
      @toggle="closeModal"
      @done="done"
      :title="title"
      :editMode="editMode"
      :data="category"
    />

    <!-- View Category  -->
    <view-category
      :data="category"
      :visible="viewCategory"
      @toggle="closeCategory"
    />
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
import CreateCategory from "@/components/Inventory/CreateCategory.vue";
import ViewCategory from "@/components/Inventory/ViewCategory.vue";
export default {
  components: { TableComponent, CreateCategory, ViewCategory },
  data() {
    return {
      items: [],
      category: {},
      dialogVisible: false,
      viewCategory: false,
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
      title: "",
      editMode: false,
    };
  },

  methods: {
    list(page = 2) {
      this.busy = true;
      console.log(page, "kkk");
      this.$request(`admin/categories?page=` + page)
        .then((res) => {
          let resPayload = res.data.categories;
          this.items = resPayload;
          console.log(res.data);
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },

    getCategory(e, value) {
      this.$request(`admin/categories/${e.id}`)
        .then((res) => {
          let resPayload = res.data.category;
          this.category = resPayload;
          console.log(resPayload);
          if (value === "edit") {
            this.editMode = true;
            this.toggleModal();
          } else {
            this.viewCategory = true;
          }
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },

    toggleModal() {
      if (this.editMode) {
        this.title = "Edit Category";
        this.dialogVisible = !this.dialogVisible;
      } else {
        this.title = "Create Category";
        this.dialogVisible = !this.dialogVisible;
      }
    },

    done() {
      this.closeModal();
      this.list();
    },

    closeCategory() {
      this.viewCategory = !this.viewCategory;
    },

    closeModal() {
      this.category = {};
      this.dialogVisible = !this.dialogVisible;
      this.editMode = false;
    },

    deleteCategory(value) {
      this.$request
        .post(`admin/categories/delete/${value.id}`)
        .then((res) => {
          this.$swal.fire(
            "Deleted!",
            "Category deleted succesfully.",
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
            this.deleteCategory(value);
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
