<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="30%"
    >
      <validation-observer v-slot="{ invalid, handleSubmit }">
        <form
          class="tw-flex tw-flex-col tw-gap-3"
          @submit.prevent="handleSubmit(onSubmit)"
        >
          <div>
            <validation-provider
              name="pickup location"
              rules="required"
              v-slot="{ dirty, invalid, errors }"
            >
              <label for="name">Select Weight</label>
              <v-select
                v-model="dataObj.weight_id"
                :options="weights"
                :reduce="(item) => item.id"
                label="name"
                :readonly="viewMode"
                :class="{
                  error: dirty && invalid,
                }"
              >
                <template slot="no-options"> Nothing here.. </template>
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes"
                    ><i-icon
                      icon="radix-icons:caret-down"
                      color="#4F4F4F"
                      width="18px"
                  /></span>
                </template>
              </v-select>
              <span class="tw-text-xs tw-block tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
              <span
                class="tw-mb-5 tw-block tw-text-xs tw-text-red-600"
                v-for="error in validationErrors.name"
                :key="error"
                >{{ error }}</span
              >
            </validation-provider>
          </div>

          <div>
            <validation-provider
              name="price"
              rules="required|numeric"
              v-slot="{ dirty, invalid, errors }"
            >
              <label for="name">Price</label>
              <div
                class="input-field"
                :class="{
                  error: dirty && invalid,
                }"
              >
                <input
                  type="tel"
                  name="text"
                  id="shipping_fee"
                  v-model="dataObj.price"
                  placeholder="Shipping Fee"
                  :readonly="viewMode"
                />
              </div>
              <span class="tw-text-xs tw-block tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
              <span
                class="tw-mb-5 tw-block tw-text-xs tw-text-red-600"
                v-for="error in validationErrors.shipping_fee"
                :key="error"
                >{{ error }}</span
              >
            </validation-provider>
          </div>

          <div>
            <validation-provider
              name="state"
              rules="required"
              v-slot="{ dirty, invalid, errors }"
            >
              <label for="name">Select State</label>
              <v-select
                v-model="dataObj.state_id"
                :options="statesList"
                :reduce="(item) => item.id"
                label="name"
                :class="{
                  error: dirty && invalid,
                }"
                 :readonly="viewMode"
              >
                <template slot="no-options"> Nothing here.. </template>
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes"
                    ><i-icon
                      icon="radix-icons:caret-down"
                      color="#4F4F4F"
                      width="18px"
                  /></span>
                </template>
              </v-select>
              <span class="tw-text-xs tw-block tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
              <span
                class="tw-mb-5 tw-block tw-text-xs tw-text-red-600"
                v-for="error in validationErrors.name"
                :key="error"
                >{{ error }}</span
              >
            </validation-provider>
          </div>

          <div>
            <validation-provider
              name="pickup location"
              rules="required"
              v-slot="{ dirty, invalid, errors }"
            >
              <label for="name">Select Pickup Location</label>
              <v-select
                v-model="dataObj.pickup_location_id"
                :options="pickupLocations"
                :reduce="(item) => item.id"
                label="name"
                :readonly="viewMode"
                :class="{
                  error: dirty && invalid,
                }"
              >
                <template slot="no-options"> Nothing here.. </template>
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes"
                    ><i-icon
                      icon="radix-icons:caret-down"
                      color="#4F4F4F"
                      width="18px"
                  /></span>
                </template>
              </v-select>
              <span class="tw-text-xs tw-block tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
              <span
                class="tw-mb-5 tw-block tw-text-xs tw-text-red-600"
                v-for="error in validationErrors.name"
                :key="error"
                >{{ error }}</span
              >
            </validation-provider>
          </div>

          <div class="tw-mt-4">
            <button
              class="peppi-btn peppi-primary w-100"
              v-bind:disabled="invalid"
              :class="{ 'tw-bg-gray400': invalid, 'tw-bg-gray400': busy }"
            >
              <span>{{ editMode ? "Update" : "Create" }}</span>
            </button>
          </div>
        </form>
      </validation-observer>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },

    data: {
      type: Object,
      default: () => {},
    },

    editMode: {
      type: Boolean,
      default: false,
    },

    viewMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dataObj: {
        price: "",
        weight_id: "",
        pickup_location_id: "",
        state_id: "",
      },
      state: "",
      statesList: [],
      pickupLocations: [],
      weights: [],
      busy: false,
      validationErrors: {},
      dialogVisible: false,
    };
  },

  methods: {
    onSubmit() {
      this.busy = true;
      console.log(this.dataObj, "mmmm   ");

      var url = this.editMode
        ? `admin/weight-pricings/update/${this.data.id}`
        : "admin/weight-pricings/add";
      this.$request
        .post(`${url}`, this.dataObj)
        .then((res) => {
          console.log(res.data);
          this.busy = false;
          this.$toastify({
            text: this.editMode
              ? `Weight Pricing Updated`
              : "Weight Pricing Created",
            className: "info",
            position: "center",
            style: {
              background: "#1e1e1e",
              fontSize: "12px",
              borderRadius: "5px",
            },
          }).showToast();
          (this.dataObj.price = ""),
            (this.dataObj.weight_id = ""),
            (this.dataObj.pickup_location_id = ""),
            (this.dataObj.state_id = ""),
            this.$emit("done");
        })
        .catch((err) => {
          this.busy = false;
          this.validationErrors = err.data.errors;
          console.log(err.data.errors);
          (this.dataObj.price = ""),
            (this.dataObj.weight_id = ""),
            (this.dataObj.pickup_location_id = ""),
            (this.dataObj.state_id = ""),
            this.$toastify({
              text: `Error`,
              className: "info",
              position: "center",
              style: {
                background: "red",
                fontSize: "12px",
                borderRadius: "5px",
              },
            }).showToast();
          console.log(err);
        });
    },

    handleClose() {
      this.validationErrors = {};
      this.$emit("toggle");
    },

    list() {
      this.busy = true;
      this.$request(`admin/states`)
        .then((res) => {
          let resPayload = res.data.states;
          this.statesList = resPayload;
          console.log(res.data);
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },

    getWeights() {
      this.busy = true;
      this.$request(`admin/weights`)
        .then((res) => {
          let resPayload = res.data.weights;
          this.weights = resPayload;
          console.log(res.data);
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },

    getPickupLocation(e) {
      this.dataObj.pickup_location_id = "";
      this.$request
        .get(`admin/states/${e}`)
        .then((res) => {
          let resPayload = res.data;
          this.pickupLocations = resPayload.state.pickup_locations;
          console.log(resPayload);
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },
  },

  watch: {
    visible: {
      handler(val) {
        this.dialogVisible = val;
      },
      immediate: true,
    },

    data: {
      handler(val) {
        if (val) {
          this.dataObj = {
            price: val.price,
            weight_id: val.weight_id,
            pickup_location_id: val.pickup_location_id,
            state_id: val.state_id,
          };
        }
      },
      immediate: true,
    },

    "dataObj.state_id": {
      handler(val) {
        if (val) {
          this.getPickupLocation(val);
        }
      },
      immediate: true,
    },
  },

  beforeMount() {
    this.list();
    this.getWeights()
  },
};
</script>

<style></style>
