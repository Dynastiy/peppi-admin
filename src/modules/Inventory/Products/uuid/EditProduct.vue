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
            <small class="tw-font-light tw-text-xs tw-mb-0">Go Back</small>
            <h5 class="tw-mb-0 tw-text-14 tw-font-bold tw-capitalize">
              {{ item.name }}
            </h5>
          </div>
        </div>
        <div class="tw-flex tw-gap-2 tw-my-4">
          <span
            role="button"
            @click="deleteRecord"
            class="tw-bg-red-600 tw-flex tw-space-x-2 tw-items-center tw-text-sm tw-px-4 tw-py-1 tw-text-white tw-rounded"
          >
            <i-icon icon="fluent:delete-12-regular" />
            <span>Delete</span>
          </span>

          <button
            class="peppi-btn peppi-primary"
            @click.prevent="updateProduct"
          >
            Update Product
          </button>
        </div>
      </div>
      <div class="tw-mt-4">
        <div class="tw-grid tw-grid-cols-2 tw-gap-8 tw-my-8">
          <div class="left-data-content tw-flex tw-flex-col tw-space-y-3">
            <div>
              <div class="input-container">
                <div class="mb-3">
                  <label for="">Product Name</label>
                  <input type="text" v-model="dataObj.name" />
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
                <div class="tw-mb-3">
                  <label for="">Product Weight</label>
                  <v-select
                    class=""
                    placeholder="Select Product Weight"
                    label="name"
                    v-model="dataObj.weight"
                    :options="weights"
                    :reduce="(option) => option.name"
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
                <div class="">
                  <div>
                    <label
                      for=""
                      class="d-flex align-items-center"
                      style="gap: 5px"
                    >
                      <span>Price</span>
                      <el-tooltip
                        class="item"
                        effect="light"
                        placement="right-end"
                      >
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
                <span>Product Gallery</span>
                <el-tooltip class="item" effect="light" placement="right-end">
                  <div slot="content">
                    Select four images(jpg/png files with a size less than
                    500kb)
                  </div>
                  <i-icon icon="ic:baseline-help-outline" />
                </el-tooltip>
              </h4>
              <label for="" style="font-size: 12px">Product Images</label>
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

                <!-- <div class="tw-mt-3">
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
            </div> -->

                <div class="tw-grid tw-grid-cols-4 tw-gap-3 tw-mt-3">
                  <div v-for="(item, idx) in photos" :key="idx">
                    <div class="tw-shadow tw-p-2">
                      <img :src="item" alt="" />
                      <div class="tw-flex tw-justify-end tw-gap-2">
                        <span
                          role="button"
                          class="tw-text-red-600 tw-text-md"
                          @click="removePhoto(idx)"
                        >
                          <i-icon icon="fluent:delete-12-regular" />
                        </span>
                        <a
                          :href="item"
                          class="tw-text-amber-600 tw-text-md"
                          target="_blank"
                        >
                          <i-icon icon="iconamoon:eye" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label for="" style="font-size: 12px"
                >Product Video Desription</label
              >
              <!-- <div class="add-file" role="button">
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
          </div> -->
              <input
                type="file"
                name=""
                id=""
                @change="handleVideoUpload"
                accept="video/*"
              />
              <div
                class="tw-flex tw-justify-end tw-gap-2 tw-mt-2"
                v-if="videoUrl !== null"
              >
                <a
                  :href="videoUrl"
                  class="tw-text-amber-600 tw-text-sm"
                  target="_blank"
                >
                  Preview Video
                </a>
              </div>
              <!-- <div class="tw-mt-3">
            <span
              v-for="(item, idx) in videos"
              :key="idx"
              class="tw-flex tw-items-center tw-space-x-2"
            >
              <span class="tw-text-xs">{{ item.slice(0, 14) + "..." }}</span>
              <span role="button" @click="removeVideo(idx)">
                <i-icon
                  icon="carbon:close-outline"
                  class="tw-font-bold tw-text-red-600 tw-text-xs"
                />
              </span>
            </span>
          </div> -->
            </div>
            <div></div>
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
            v-model="dataObj.description"
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
        description: "",
        availability: "",
        name: "",
        price: "",
        photos: [],
        weight: "",
        video: "",
      },
      videoUrl: null,
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["code-block"],
      ],
      photos: [],
      categories: [],
      weights: [],
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

    updateProduct() {
      const formData = new FormData();
      formData.append("name", this.dataObj.name);

      for (const image of this.dataObj.photos) {
        formData.append("photos[]", image);
      }

      // for (const vid of this.videos) {
      //   formData.append("video[]", vid);
      // }

      formData.append("video", this.dataObj.video);
      formData.append("description", this.dataObj.description);
      formData.append("price", this.dataObj.price);
      formData.append("weight", this.dataObj.weight);
      formData.append("availability", this.dataObj.availability ? "yes" : "no");

      for (const item of this.dataObj.category_ids) {
        formData.append("category_ids[]", item);
      }

      this.busy = true;
      this.$request
        .post(`/admin/products/update/${this.id}`, formData)
        .then((res) => {
          let resPayload = res.data.categories;
          this.categories = resPayload;
          this.$swal.fire(
            "Successful!",
            "Product updated succesfully.",
            "success"
          );
          this.getProduct();
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.$swal.fire(
            "Error! Product not Updated!",
            err.data.message,
            "warning"
          );
          this.busy = false;
        });
    },

    getCategories() {
      this.busy = true;
      this.$request(`admin/categories`)
        .then((res) => {
          let resPayload = res.data.categories;
          this.categories = resPayload;
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

    handleUpload() {
      if (this.photos.length < 4) {
        const input = event.target;
        this.dataObj.photos.push(input.files[0]);
        console.log(input.files[0], "kkk");
        var photo = null;
        if (input.files.length > 0) {
          var src = URL.createObjectURL(input.files[0]);
          photo = src;
          this.isActive = false;
        }
        this.photos.push(photo);
      }
    },

    handleVideoUpload() {
      const input = event.target;
      this.dataObj.video = input.files[0];
      console.log(input.files[0].name, "kkk");
      if (input.files.length > 0) {
        var src = URL.createObjectURL(input.files[0]);
        this.videoUrl = src;
        this.isActive = false;
      }
    },

    removePhoto(value) {
      if (this.photos.length !== 0) {
        this.dataObj.photos.splice(value, 1);
        this.photos.splice(value, 1);
      }
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
    this.getCategories();
    this.getWeights();
  },

  watch: {
    item: {
      handler(val) {
        if (val) {
          this.dataObj = {
            category_ids: val.categories,
            description: val.description,
            availability: val.availability,
            name: val.name,
            price: val.price,
            weight: val.weight,
            video: val.video,
            photos: val.images,
          };
          let images = val.images;
          for (const image of images) {
            this.photos.push(image.url);
          }
          this.videoUrl = val.video === null ? val.video : val.video.url  
        }
      },
      immediate: true,
    },
  },
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
