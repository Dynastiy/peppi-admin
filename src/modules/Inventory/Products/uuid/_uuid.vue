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
              >Back to product list</small
            >
            <h5 class="tw-mb-0 tw-text-14 tw-font-bold tw-capitalize">
              {{ item.name }}
            </h5>
          </div>
        </div>
        <div class="tw-flex tw-space-x-2 tw-my-4">
          <span
          role="button"
          @click="edit"
            class="tw-bg-cyan-600 tw-flex tw-space-x-2 tw-items-center tw-text-sm tw-px-4 tw-py-1 tw-text-white tw-rounded"
          >
            <i-icon icon="iconamoon:edit" />
            <span>Edit</span>
          </span>
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
        <el-tabs v-model="activeName">
          <el-tab-pane label="Product Overview" name="first">
            <product-overview :data="item" />
          </el-tab-pane>
          <el-tab-pane label="Images" name="second">
            <product-images :data="item"/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import ProductOverview from "@/components/Inventory/Products/ProductOverview.vue";
import ProductImages from "@/components/Inventory/Products/ProductImages.vue";
export default {
  components: { ProductOverview, ProductImages },
  data() {
    return {
      item: {},
      busy: false,
      id: this.$route.params.id,
      activeName: "first",
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

    edit() {
      this.$router.push(`/product/${this.id}/edit`)
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
};
</script>

<style></style>
