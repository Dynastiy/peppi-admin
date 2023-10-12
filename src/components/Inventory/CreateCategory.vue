<template>
  <div>
    <el-dialog
      title="Add Category"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="30%"
    >
      <validation-observer v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <div>
            <validation-provider
              name="category name"
              rules="required"
              v-slot="{ dirty, invalid, errors }"
            >
              <label for="name">Category Name</label>
              <div
                class="input-field"
                :class="{
                  error: dirty && invalid,
                }"
              >
                <input
                  type="text"
                  name="text"
                  id="name"
                  v-model="dataObj.category_name"
                  placeholder=" category name"
                />
              </div>
              <span class="tw-text-xs tw-block tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
              <span
                class="tw-mb-5 tw-block tw-text-xs tw-text-red-600"
                v-for="error in validationErrors.category_name"
                :key="error"
                >{{ error }}</span
              >
            </validation-provider>
          </div>

          <div class="tw-my-3">
            <validation-provider
              class=""
              name="password"
              rules=""
              v-slot="{ dirty, invalid, errors }"
            >
              <label for="password">Category Icon</label>
              <div
                class="input-field"
                :class="{
                  error: dirty && invalid,
                }"
              >
                <input
                  type="file"
                  name="file"
                  @change="handleUpload($event)"
                  id="file"
                />
              </div>
              <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
              <span
                class="tw-mb-5 tw-block tw-text-xs tw-text-red-600"
                v-for="error in validationErrors.icon_image"
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
              <span>Create</span>
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
  },
  data() {
    return {
      dataObj: {
        category_name: "",
        icon_image: "",
      },
      busy: false,
      validationErrors: {},
      dialogVisible: false,
    };
  },

  methods: {
    handleUpload() {
      const input = event.target;
      this.dataObj.icon_image = input.files[0];
      console.log(this.dataObj.icon_image);
    },

    onSubmit() {
      this.busy = true;
      const formData = new FormData();
      formData.append("category_name", this.dataObj.category_name);
      formData.append("icon_image", this.dataObj.icon_image);
      this.$request
        .post(`admin/categories/add`, formData)
        .then((res) => {
          console.log(res.data);
          this.busy = false;
          this.$toastify({
            text: `Category Created`,
            className: "info",
            position: "center",
            style: {
              background: "#1e1e1e",
              fontSize: "12px",
              borderRadius: "5px",
            },
          }).showToast();
          this.$emit("done");
        })
        .catch((err) => {
          this.busy = false;
          this.validationErrors = err.data.errors;
          console.log(err.data.errors);
          this.$toastify({
            text: `Category not created`,
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
  },
};
</script>

<style></style>
