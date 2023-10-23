<template>
  <div>
    <div class="tw-flex tw-justify-between tw-items-center">
      <h4>Shipping</h4>
      <button class="peppi-btn peppi-primary" @click="toggleModal">
        Add Shipping Location
      </button>
    </div>
    
   <div class="tw-mt-5">
    <b-skeleton-wrapper :loading="busy">
      <template #loading>
          <div class="tw-flex tw-flex-col tw-gap-3">
            <b-skeleton v-for="item in 6" :key="item" width="100%" height="50px"></b-skeleton>
          </div>
      </template>
      <div class="tw-flex tw-flex-col tw-gap-3">
      <div
        v-for="(item, idx) in items"
        :key="idx"
        class="tw-bg-white tw-p-3 tw-flex tw-justify-between tw-items-center tw-rounded-lg"
      >
        <span>
          <span class="tw-font-medium">
            {{ item.name }}
          </span>
          <span class="tw-text-xs tw-text-primary">
            {{
              `(${item.pickup_locations.length} pickup location${
                item.pickup_locations.length > 1 ? "s" : ""
              })`
            }}
          </span>
        </span>
        <div class="tw-flex tw-items-center tw-gap-4">
          <!-- <button class="peppi-btn peppi-primary tw-py-2 tw-px-2 tw-text-[12px]" @click="toggleModal">
            Add Pickup Location
          </button> -->
          <span
            class="tw-text-amber-700"
            role="button"
            @click="getShippingLocation(item, 'edit')"
            ><i-icon icon="iconamoon:edit" width="16px"
          /></span>
          <span
            class="tw-text-red-600"
            role="button"
            @click="deleteRecord(item)"
            ><i-icon icon="fluent:delete-12-regular" width="16px"
          /></span>
          <span class="tw-text-green-600" role="button"
            @click="view(item)"><i-icon icon="grommet-icons:view" width="16px"
          /></span>
        </div>
      </div>
    </div>
      </b-skeleton-wrapper>
   </div>
    

    <!--Shipping Location Modal  -->
    <shipping-location-modal
      :visible="dialogVisible"
      @toggle="closeModal"
      @done="done"
      :title="title"
      :editMode="editMode"
      :data="shipping_location"
    />
  </div>
</template>

<script>
import ShippingLocationModal from "@/components/Modals/Shipping/ShippingLocationModal.vue";
export default {
  components: { ShippingLocationModal },
  data() {
    return {
      items: [],
      shipping_location: {},
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
    };
  },

  methods: {
    list() {
      this.busy = true;
      this.$request(`admin/states`)
        .then((res) => {
          let resPayload = res.data.states;
          this.items = resPayload;
          console.log(res.data);
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },

    getShippingLocation(e, value) {
      this.$request(`admin/states/${e.id}`)
        .then((res) => {
          let resPayload = res.data;
          this.shipping_location = resPayload.state;
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
        this.$router.push(`/shipping/state/${item.id}`)
    },

    toggleModal() {
      if (this.editMode) {
        this.title = "Edit Shipping Location";
        this.dialogVisible = !this.dialogVisible;
      } else {
        this.title = "Create Shipping Location";
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
      this.shipping_location = {};
      this.dialogVisible = !this.dialogVisible;
      this.editMode = false;
    },

    deleteShippingLocation(value) {
      this.$request
        .post(`admin/states/delete/${value.id}`)
        .then((res) => {
          this.$swal.fire(
            "Deleted!",
            "Shipping location deleted succesfully.",
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
            this.deleteShippingLocation(value);
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
