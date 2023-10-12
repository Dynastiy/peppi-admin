<template>
  <div>
    <div v-if="busy" class="tw-text-sm">Retrieving Product Details...</div>
    <div v-else>
      <div class="tw-flex tw-justify-between tw-items-center">
        <div class="tw-flex tw-items-center tw-space-x-2">
          <span
            class="back-button peppi-btn peppi-primary"
            role="button"
            @click="$router.go(-1)"
          >
            <i-icon icon="ic:baseline-arrow-back" width="20px" />
          </span>

          <div>
            <small class="tw-font-light tw-text-xs tw-mb-0"
              >Go Back</small
            >
            <h5 class="tw-mb-0 tw-text-14 tw-font-bold tw-capitalize">
              {{ item.name }}
            </h5>
          </div>
        </div>
        <div class="tw-flex tw-space-x-2 tw-my-4">
          <span
            role="button"
            @click="deleteRecord"
            class="tw-bg-red-600 tw-flex tw-space-x-2 tw-items-center tw-text-sm tw-px-4 tw-py-1 tw-text-white tw-rounded"
          >
            <i-icon icon="fluent:delete-12-regular" />
            <span>Delete</span>
          </span>
        </div>
      </div>
      <div class="tw-mt-4">
        <div class="tw-grid tw-grid-cols-2 tw-gap-8 tw-my-8">
      <div class="left-data-content tw-flex tw-flex-col tw-space-y-3">
        <div>
          <div class="input-container">
            <div class="mb-3">
              <label for="">Product Name</label>
              <input type="text" v-model="dataObj.product_name" />
            </div>
          </div>

          <div class="input-container">
            <div class="mb-3">
              <label for="">Product Category</label>
              <v-select
                class=""
                placeholder="Select Category"
                label="category_name"
                v-model="dataObj.category_ids"
                :options="categories"
                :reduce="(option) => option.id"
                multiple
              >
                <template #open-indicator="{ attributes }">
                  <span v-bind="attributes"
                    ><i-icon
                      icon="radix-icons:caret-down"
                      color="#4F4F4F"
                      width="18px"
                  /></span>
                </template>
              </v-select>
            </div>
          </div>

          <div class="input-container">
            <div>
              <div>
                <label
                  for=""
                  class="d-flex align-items-center"
                  style="gap: 5px"
                >
                  <span>Price</span>
                  <el-tooltip class="item" effect="light" placement="right-end">
                    <div slot="content">Actual Product Price</div>
                    <i-icon icon="ic:baseline-help-outline" />
                  </el-tooltip>
                </label>
                <input type="text" v-model="dataObj.price" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-data-content tw-flex tw-flex-col tw-space-y-3">
        <div>
          <h4
            class="product-create-header tw-flex tw-items-center tw-space-x-1 tw-mb-0"
          >
            <span>Product Images</span>
            <el-tooltip class="item" effect="light" placement="right-end">
              <div slot="content">
                Select four images(jpg/png files with a size less than 500kb)
              </div>
              <i-icon icon="ic:baseline-help-outline" />
            </el-tooltip>
          </h4>
          <span class="tw-block tw-text-red-600 tw-text-xs">
            *The first selected image is the featured image.
          </span>
          <div class="tw-mt-3">
            <div class="add-file" role="button">
              <input
                @change="handleUpload"
                type="file"
                accept="image/*"
                id="choose-file"
                name="choose-file"
                class="tw-p-0"
              />
              <label class="m-0" for="choose-file"
                ><i-icon icon="iconoir:plus" class="file--icons" />
              </label>
            </div>

            <div class="tw-mt-3">
              <span
                v-for="(item, idx) in photos"
                :key="idx"
                class="tw-flex tw-items-center tw-space-x-2"
              >
                <span class="tw-text-xs">{{ item.slice(0, 14) + "..." }}</span>
                <span role="button" @click="removePhoto(idx)">
                  <i-icon
                    icon="carbon:close-outline"
                    class="tw-font-bold tw-text-red-600 tw-text-xs"
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
        <div>
          <!-- <h4
            class="product-create-header tw-flex tw-items-center tw-space-x-1"
          >
            <span>Pricing</span>
            <el-tooltip class="item" effect="light" placement="right-end">
              <div slot="content">
                Enter actual product price or/and discount price
              </div>
              <i-icon icon="ic:baseline-help-outline" />
            </el-tooltip>
          </h4> -->
        </div>
        <div>
          <h4 class="product-create-header">Inventory</h4>
          <div class="tw-flex tw-items-center tw-space-x-2">
            <input
              id="check"
              v-model="dataObj.availability"
              class="tw-w-fit"
              type="checkbox"
            />
            <span class="tw-flex tw-space-x-1 tw-items-center">
              <label for="">Availability</label>
              <el-tooltip class="item" effect="light" placement="right-end">
                <div slot="content">Select if product is available</div>
                <i-icon icon="ic:baseline-help-outline" />
              </el-tooltip>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <label for="" class="tw-text-xs">Product Description</label>
      <v-editor
        v-model="dataObj.content"
        :editorToolbar="customToolbar"
      ></v-editor>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {},
      busy: false,
      id: this.$route.params.id,
      activeName: "first",
      dataObj: {
        category_ids: [],
        content: "",
        availability: "",
        product_name: "",
        price: "",
        photos: [],
      },
      photos: []
    };
  },
  methods: {
    getProduct() {
      this.busy = true;
      this.$request(`admin/products/${this.id}`)
        .then((res) => {
          let resPayload = res.data.product;
          this.item = resPayload;
          console.log(resPayload);
          console.log(res.data);
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },

    deleteProduct() {
      this.$request
        .post(`admin/products/delete/${this.id}`)
        .then((res) => {
          this.$swal.fire(
            "Deleted!",
            "Product deleted succesfully.",
            "success"
          );
          this.$router.go(-1);
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteRecord() {
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
            this.deleteProduct();
          }
        });
    },
  },
  created() {
    this.getProduct();
  },

  watch: {
    // data: {
    //     handler(val) {
    //         this.dataObj = {
    //             category_ids: [],
    //     content: "",
    //     availability: "",
    //     product_name: "",
    //     price: "",
    //     photos: [],
    //         }
    //         this.photos = [

    //         ]
    //     }
    // }
  }
};
</script>

<style scoped>
.product-create-header {
  font-size: 16px;
  font-weight: 700;
}

.input-container label {
  font-size: 12px;
  display: block;
}

.input-container input,
.input-container select,
.input-container textarea {
  padding: 10px 13px;
  font-size: 13px;
  width: 100%;
  border: 1px solid var(--gray-200);
  background: var(--gray-200);
  border: none !important;
  outline: none;
}
</style>

