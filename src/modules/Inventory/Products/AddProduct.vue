<template>
    <div>
      <div class="header tw-flex tw-justify-between tw-items-center">
        <div class="tw-flex tw-items-center tw-space-x-2">
          <span class="back-button peppi-btn peppi-primary" role="button" @click="$router.go(-1)">
            <i-icon icon="ic:baseline-arrow-back" width="20px" />
          </span>
  
          <div>
            <small class="tw-font-light tw-text-xs tw-mb-0">Back to product list</small>
            <h6 class="tw-mb-0 jtw-text-sm tw-font-semibold" style="font-weight: 500">Add New Product</h6>
          </div>
        </div>
        
          <button class="peppi-btn peppi-primary">Create Product </button>
      </div>
  
      <!-- Main Create Product Form -->
      <div class="tw-grid tw-grid-cols-2 tw-gap-8 tw-mt-8">
        <div class="left-data-content">
          <div>
            <h4 class="product-create-header">Description</h4>
            <div class="input-container">
              <div class="mb-3">
                <label for="">Brand</label>
                <input type="text" />
              </div>
  
              <div class="mb-3">
                <label for="">Product Name</label>
                <input type="text" />
              </div>
  
              <div class="">
                <label for="">Product Description</label>
                <textarea type="text"></textarea>
              </div>
            </div>
          </div>
          <div>
            <h4 class="product-create-header">Category</h4>
            <div class="input-container">
              <div class="mb-3">
                <label for="">Product Category</label>
                <select name="" id="">
                  <option value=""></option>
                </select>
              </div>
  
              <div class="mb-3">
                <label for="">Product Subcategory</label>
                <select name="" id="">
                  <option value=""></option>
                </select>
              </div>
  
              <div class="">
                <label for="">Product Line</label>
                <select name="" id="">
                  <option value=""></option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <h4 class="product-create-header">Inventory</h4>
            <div class="input-container">
              <div class="d-flex align-items-center" style="gap: 20px">
                <div class="mb-3 w-50">
                  <label for="">Quantity</label>
                  <input type="text" />
                </div>
                <div class="mb-3 w-100">
                  <label for="">SKU (Optional)</label>
                  <input type="text" />
                </div>
              </div>
              <div class="mb-3">
                <label for="">Model (Optional)</label>
                <input type="text" />
              </div>
              <div class="mb-3">
                <label for="">Product Features</label>
                <textarea></textarea>
              </div>
              <div class="mb-3">
                <label for="">Usage Instructions (Optional)</label>
                <textarea></textarea>
              </div>
  
              <div
                class="checkbox-example d-flex align-items-center"
                style="gap: 10px"
              >
                <!-- <input type="checkbox" id="checkAvailability" /> -->
                <input id="check" type="checkbox" />
                <label for="check" style="--d: 15px">
                  <svg viewBox="0,20,40,60">
                    <path d="M5 30 L 12 45 L 45 9"></path>
                  </svg>
                </label>
                <label for="">Availability</label>
              </div>
            </div>
          </div>
          <div>
            <h4 class="product-create-header">Colors</h4>
            <div
              class="input-container d-flex justify-content-between align-items-center"
            >
              <span class="colors-list">
                <!-- <span
                  class="colors"
                  v-for="item in colors"
                  :key="item.id"
                  :style="{
                    backgroundColor: item.name,
                    borderColor: item.border,
                  }"
                ></span> -->
              </span>
  
              <span class="text-primary">
                <i-icon icon="material-symbols:add" />
                Add Color
              </span>
            </div>
          </div>
        </div>
        <div class="right-data-content">
          <div>
            <h4 class="product-create-header d-flex" style="gap: 5px">
              <span>Product Images</span>
              <el-tooltip class="item" effect="light" placement="right-end">
                <div slot="content">loremmme yibsob</div>
                <i-icon icon="ic:baseline-help-outline" />
              </el-tooltip>
            </h4>
            <div class="input-container">
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                multiple
              >
                <div>
                  <!-- <i class="el-icon-upload"></i> -->
                  <i-icon icon="lucide:image-plus" width="50px" />
                  <div class="el-upload__text">
                    <em
                      class="text-primary"
                      style="text-decoration: underline !important"
                      >click to upload</em
                    >
                    or drag and drop
                  </div>
                </div>
                <!-- <div class="el-upload__tip" slot="tip">
                    jpg/png files with a size less than 500kb
                  </div> -->
              </el-upload>
            </div>
          </div>
          <div>
            <h4 class="product-create-header">Dimensions</h4>
            <div class="input-container">
              <div class="mb-3">
                <label for="">Items Weight</label>
                <select name="" id="">
                  <option value=""></option>
                </select>
              </div>
  
              <h4 class="product-create-header" style="font-size: 14px">
                Package Size (Optional)
              </h4>
              <div class="d-flex align-items-center" style="gap: 15px">
                <div class="mt-3 w-100">
                  <label for="">Length</label>
                  <select name="" id="">
                    <option value=""></option>
                  </select>
                </div>
                <div class="mt-3 w-100">
                  <label for="">Width</label>
                  <select name="" id="">
                    <option value=""></option>
                  </select>
                </div>
                <div class="mt-3 w-100">
                  <label for="">Height</label>
                  <select name="" id="">
                    <option value=""></option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 class="product-create-header">Sizes(Optional)</h4>
            <div
              class="input-container d-flex justify-content-between align-items-center"
            >
              <span class="sizes-list">
                <!-- <span
                  class="sizes"
                  v-for="item in sizes"
                  :key="item.id"
                  style="font-size: 14px"
                  >{{ item.name }}</span
                > -->
              </span>
  
              <span class="text-primary">
                <i-icon icon="material-symbols:add" />
                Add Size
              </span>
            </div>
          </div>
          <div>
            <h4 class="product-create-header">
              <span>Pricing</span>
              <el-tooltip class="item" effect="light" placement="right-end">
                <div slot="content">loremmme yibsob</div>
                <i-icon icon="ic:baseline-help-outline" />
              </el-tooltip>
            </h4>
            <div class="input-container">
              <div class="d-flex align-items-center" style="gap: 20px">
                <div>
                  <label
                    for=""
                    class="d-flex align-items-center"
                    style="gap: 5px"
                  >
                    <span>Actual Price</span>
                    <el-tooltip class="item" effect="light" placement="right-end">
                      <div slot="content">loremmme yibsob</div>
                      <i-icon icon="ic:baseline-help-outline" />
                    </el-tooltip>
                  </label>
                  <input type="text" />
                </div>
                <div>
                  <label
                    for=""
                    class="d-flex align-items-center"
                    style="gap: 5px"
                  >
                    <span>Selling Price</span>
                    <el-tooltip class="item" effect="light" placement="right-end">
                      <div slot="content">loremmme yibsob</div>
                      <i-icon icon="ic:baseline-help-outline" />
                    </el-tooltip>
                  </label>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 class="product-create-header">Product Options</h4>
            <div class="input-container d-flex flex-column" style="gap: 20px">
              <div class="d-flex align-items-center" style="gap: 8px">
                <input type="checkbox" class="check-box" />
                <label for="" class="mb-0">Free Delivery</label>
              </div>
              <div class="d-flex align-items-center" style="gap: 8px">
                <input type="checkbox" class="check-box" />
                <label for="" class="mb-0">Discount on Delivery</label>
              </div>
              <div class="d-flex align-items-center" style="gap: 8px">
                <input type="checkbox" class="check-box" />
                <label for="" class="mb-0">Cash on Delivery</label>
              </div>
            </div>
          </div>
          <div>
            <h4 class="product-create-header">Delivery & Returns</h4>
            <div class="input-container">
              <div class="d-flex align-items-center mb-3" style="gap: 8px">
                <input type="checkbox" class="check-box" />
                <label for="" class="mb-0">Allow returns</label>
              </div>
              <div>
                <label for="">Return Policy</label>
                <textarea name="" id=""></textarea>
              </div>
            </div>
          </div>
          <div>
            <h4 class="product-create-header">Product Grading</h4>
            <div class="input-container">
              <div>
                <label for="">Return Policy</label>
                <select name="" id="">
                  <option value=""></option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
//   import colors from "@/api/colors";
//   import sizes from "@/api/sizes";
  export default {
    data() {
      return {
        // colors,
        // sizes,
      };
    },
  };
  </script>

  <style scoped>
  .product-create-header{
    font-size: 16px;
  }

  .input-container label {
    font-size: 12px;
    display: block;
  }

  .input-container input, .input-container select, .input-container textarea {
    padding: 10px;
    font-size: 13px;
    width: 100%;
    border: 1px solid var(--gray-200);
    background: var(--gray-200);
    border: none !important;
    outline: none;
  }
  </style>