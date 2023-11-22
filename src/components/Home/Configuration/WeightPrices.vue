<template>
  <div>
    <div class="tw-flex tw-justify-between tw-items-center">
      <h5 class="tw-mb-1 tw-font-semibold">Weight Prices</h5>
    </div>

    <div class="tw-mt-5 tw-bg-white tw-p-6">
      <table-component
        :items="items"
        :fields="fields"
        :busy="busy"
        @view="getWeightPricing($event, 'view')"
        @edit="getWeightPricing($event, 'edit')"
        @delete="deleteRecord"
        :currentPage="currentPage"
        :totalRows="totalRows"
        :perPage="perPage"
        :pages="pages"
      >
        <template #button>
          <button class="peppi-btn peppi-primary" @click="toggleModal">
            Add Weight Price
          </button>
        </template>
      </table-component>
    </div>

    <!--Shipping Location Modal  -->
    <create-weight-price
      :visible="dialogVisible"
      @toggle="closeModal"
      @done="done"
      :title="title"
      :editMode="editMode"
      :viewMode="viewMode"
      :data="weight_pricing"
    />
  </div>
</template>

<script>
import CreateWeightPrice from "@/components/Modals/Shipping/CreateWeightPrice.vue";
import TableComponent from '@/components/TableComponent.vue';
export default {
  components: { CreateWeightPrice, TableComponent },
  data() {
    return {
      items: [],
      fields: [
        { key: "weight.name", label: "WEIGHT(kg)" },
        {
          key: "price",
          label: "Shipping Fees",
          formatter: (item) => {
            return item
              ? Number(item).toLocaleString("en-US", {
                  style: "currency",
                  currency: "NGN",
                })
              : "NGN 0.00";
          },
        },
        { key: "state.name", label: "State" },
        { key: "pickup_location.name", label: "Pickup Location" },
        { key: "actions", label: "" },
      ],
      weight_pricing: {},
      dialogVisible: false,
      viewLocationModal: false,
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
      viewMode:false
    };
  },

  methods: {
    list() {
      this.busy = true;
      this.$request(`admin/weight-pricings`)
        .then((res) => {
          let resPayload = res.data;
          this.items = resPayload.weightPricings;
          this.totalRows = resPayload.total;
          this.showFrom = resPayload.from;
          this.showTo = resPayload.to;
          this.totalRecords = resPayload.total;
          this.currentPage = resPayload.current_page;
          this.perPage = resPayload.per_page;
          // this.pages = Math.ceil(resPayload.total / resPayload.per_page);
          this.pages = resPayload.last_page
          console.log(res.data);
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },

    getWeightPricing(e, value) {
      this.$request(`admin/weight-pricings/${e.id}`)
        .then((res) => {
          let resPayload = res.data;
          this.weight_pricing = resPayload.weightPricing;
          console.log(resPayload);
          if (value === "edit") {
            this.editMode = true;
            this.toggleModal();
          } else {
            this.viewMode = true;
            this.toggleModal();
          }
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },

    view(item) {
      this.$router.push(`/configuration/shipping/${item.id}`);
    },

    toggleModal() {
      if (this.editMode) {
        this.title = "Edit Weight Price";
        this.dialogVisible = !this.dialogVisible;
      } else {
        this.title = "Add Weight Price";
        this.dialogVisible = !this.dialogVisible;
      }
    },

    done() {
      this.closeModal();
      this.list();
    },

    closeCategory() {
      this.viewLocationModal = !this.viewLocationModal;
    },

    closeModal() {
      this.weight_pricing = {};
      this.dialogVisible = !this.dialogVisible;
      this.editMode = false;
    },

    deleteWeight(value) {
      this.$request
        .post(`admin/weight-pricings/delete/${value.id}`)
        .then((res) => {
          this.$swal.fire(
            "Deleted!",
            "Weight Pricing deleted succesfully.",
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
            this.deleteWeight(value);
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
