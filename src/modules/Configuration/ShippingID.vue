<template>
  <div>
    <div class="tw-flex tw-items-center tw-space-x-2">
      <span
        class="back-button peppi-btn peppi-primary"
        role="button"
        @click="$router.go(-1)"
      >
        <i-icon icon="ic:baseline-arrow-back" width="20px" />
      </span>

      <div>
        <small class="tw-font-light tw-text-xs tw-mb-0">Go Back</small>
        <span class="tw-flex tw-gap-2 tw-items-center">
          <h5
            class="tw-mb-0 tw-font-semibold"
          >
            {{ item.name }}
          </h5>
          <span class="tw-text-xs tw-text-primary">
            {{
              `(${item.pickup_locations.length} pickup location${
                item.pickup_locations.length > 1 ? "s" : ""
              })`
            }}
          </span>
        </span>
      </div>
    </div>

    <div class="tw-bg-white tw-rounded-lg tw-p-6 tw-mt-6">
      <!-- Table component -->
      <table-component
        :items="pickup_locations"
        :busy="busy"
        :fields="fields"
        @view="getRecord($event, 'view')"
        @edit="getRecord($event, 'edit')"
        @delete="deleteRecord"
        :showBaseCount="false"
      >
        <template #button>
          <button class="peppi-btn peppi-primary" @click="toggleModal">
            Add Pickup Location
          </button>
        </template>
      </table-component>
    </div>

    <!--Shipping Location Modal  -->
    <pickup-location-modal
      :visible="dialogVisible"
      @toggle="closeModal"
      @done="done"
      :title="title"
      :editMode="editMode"
      :data="singleRecord"
    />

    <!-- View Pickup location Modal  -->
    <view-pick-up-location
      :data="singleRecord"
      :visible="viewPickUpLocation"
      @toggle="closePickLocationModal"
    />
  </div>
</template>

<script>
import PickupLocationModal from "@/components/Modals/Shipping/PickupLocationModal.vue";
import TableComponent from "@/components/TableComponent.vue";
import ViewPickUpLocation from "@/components/Modals/Shipping/ViewPickUpLocation.vue";
export default {
  components: { PickupLocationModal, TableComponent, ViewPickUpLocation },
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
          key: "name",
          label: "Name",
        },
        {
          key: "address",
          label: "Address",
          formatter: (item) => {
            return item.slice(0, 25) + "...";
          },
        },
        //   {
        //     key: "shipping_fee",
        //     label: "Shipping Fee",
        //     formatter: (item) => {
        //       return item
        //         ? Number(item).toLocaleString("en-US", {
        //             style: "currency",
        //             currency: "NGN",
        //           })
        //         : "NGN 0.00";
        //     },
        //   },
        {
          key: "created_at",
          label: "Date Created",
        },
        {
          key: "actions",
          label: "",
        },
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
      viewPickUpLocation: false,
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
            this.viewPickUpLocation = true;
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

    closePickLocationModal() {
      this.viewPickUpLocation = !this.viewPickUpLocation;
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
          this.$swal.fire("Deleted!", `${res.data.message}`, "success");
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
