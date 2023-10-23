<template>
  <div>
    <div class="tw-mb-4">
      <h4 class="tw-mb-0 tw-font-semibold">
        {{ item.name }}
      </h4>
      <span class="tw-text-xs tw-text-primary">
        {{
          `(${item.pickup_locations.length} pickup location${
            item.pickup_locations.length > 1 ? "s" : ""
          })`
        }}
      </span>
    </div>

    <div class="tw-bg-white tw-rounded-lg tw-p-6">
      <!-- Table component -->
      <table-component
        :items="pickup_locations"
        :busy="busy"
        :fields="fields"
        @view="getRecord($event, 'view')"
        @edit="getRecord($event, 'edit')"
        @delete="deleteRecord"
      >
        <template #button>
          <button class="peppi-btn peppi-primary" @click="toggleModal">
            Add Pickup Location
          </button>
        </template>
      </table-component>
    </div>

    <!-- <table-component
      :items="pickup_locations"
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
    </table-component> -->

    <!--Shipping Location Modal  -->
    <pickup-location-modal
      :visible="dialogVisible"
      @toggle="closeModal"
      @done="done"
      :title="title"
      :editMode="editMode"
      :data="singleRecord"
    />
  </div>
</template>

<script>
import PickupLocationModal from "@/components/Modals/Shipping/PickupLocationModal.vue";
import TableComponent from "@/components/TableComponent.vue";
export default {
  components: { PickupLocationModal, TableComponent },
  data() {
    return {
      item: {},
      singleRecord: {},
      pickup_locations: [],
      dialogVisible: false,
      viewLocationModal: false,
      busy: false,
      fields: [
        {
          key: "address",
          label: "Address",
          formatter: (item) => {
            return item.slice(0, 25) + "...";
          },
        },
        {
          key: "shipping_fee",
          label: "Shipping Fee",
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
          label: "Date Created",
        },
        {
            key: 'actions',
            label: ""
        }
      ],
      totalRows: null,
      currentPage: null,
      perPage: null,
      showFrom: null,
      showTo: null,
      totalRecords: null,
      pages: null,
      title: "",
      editMode: false,
      id: this.$route.params.id,
    };
  },

  methods: {
    list() {
      this.busy = true;
      this.$request(`admin/states/${this.id}`)
        .then((res) => {
          let resPayload = res.data.state;
          this.item = resPayload;
          this.pickup_locations = resPayload.pickup_locations;
          console.log(res.data);
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },

    getRecord(e, value) {
      this.$request(`/admin/pickup-locations/${e.id}`)
        .then((res) => {
          let resPayload = res.data;
          this.singleRecord = resPayload.location;
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

    view(item) {
      this.$router.push(`/shipping/state/${item.id}`);
    },

    toggleModal() {
      if (this.editMode) {
        this.title = "Edit Pickup Location";
        this.dialogVisible = !this.dialogVisible;
      } else {
        this.title = "Create Pickup Location";
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
      this.singleRecord = {};
      this.dialogVisible = !this.dialogVisible;
      this.editMode = false;
    },

    completeDeleteOperation(value) {
      this.$request
        .post(`admin/pickup-locations/delete/${value.id}`)
        .then((res) => {
            console.log(res);
          this.$swal.fire(
            "Deleted!",
            `${res.data.message}`,
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
            this.completeDeleteOperation(value);
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
