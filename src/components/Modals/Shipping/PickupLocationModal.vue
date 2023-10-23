<template>
    <div>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="30%"
      >
        <validation-observer v-slot="{ invalid, handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <div>
              <validation-provider
                name="Shipping Fee"
                rules="required|numeric"
                v-slot="{ dirty, invalid, errors }"
              >
                <label for="name">Shipping Fee</label>
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
                    v-model="dataObj.shipping_fee"
                    placeholder="Shipping Fee"
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
                name="Address"
                rules="required"
                v-slot="{ dirty, invalid, errors }"
              >
                <label for="name">Address</label>
                <div
                  class="input-field"
                  :class="{
                    error: dirty && invalid,
                  }"
                >
                  <textarea class="tw-w-full tw-border-0 tw-outline-0 tw-py-3" v-model="dataObj.address" name="" id="" cols="30" rows="5">

                  </textarea>
                </div>
                <span class="tw-text-xs tw-block tw-text-red-600" v-if="errors">{{
                  errors[0]
                }}</span>
                <span
                  class="tw-mb-5 tw-block tw-text-xs tw-text-red-600"
                  v-for="error in validationErrors.address"
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
                <span>{{ editMode ? 'Update' : 'Create'}}</span>
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
    },
    data() {
      return {
        dataObj: {
          shipping_fee: "",
          address: "",
        },
        busy: false,
        validationErrors: {},
        dialogVisible: false,
      };
    },
  
    methods: {
      onSubmit() {
        this.busy = true;
        console.log(this.dataObj);
        const payload = {
          shipping_fee: this.dataObj.shipping_fee,
          address: this.dataObj.address,
          state_id: this.$route.params.id
        }
        var url = this.editMode ?  `/admin/pickup-locations/update/${this.data.id}` : 'admin/pickup-locations/add'
        this.$request
          .post(`${url}`, payload)
          .then((res) => {
            console.log(res.data);
            this.busy = false;
            this.$toastify({
              text: this.editMode ? `Pickup Location Updated` : "Pickup Location Created",
              className: "info",
              position: "center",
              style: {
                background: "#1e1e1e",
                fontSize: "12px",
                borderRadius: "5px",
              },
            }).showToast();
            this.dataObj.name = ""
            this.$emit("done");
          })
          .catch((err) => {
            this.busy = false;
            this.validationErrors = err.data.errors;
            console.log(err.data.errors);
            this.dataObj.name = ""
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
        this.validationErrors = {}
        this.$emit("toggle");
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
              shipping_fee: val.shipping_fee,
              address: val.address,
            };
          }
        },
        immediate: true
      },
    },
  };
  </script>
  
  <style></style>
  