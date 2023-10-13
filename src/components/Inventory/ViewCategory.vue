<template>
  <div>
    <el-dialog
      title="View Category"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="30%"
    >
    <div>
        <img :src="data.icon_image" class="tw-w-20 tw-h-20 tw-p-1 tw-border tw-border-primary" alt="">
        <h5 class="tw-capitalize tw-mt-3 tw-mb-0">{{ data.category_name }}</h5>
        <!-- <h5>{{ data.slug }}</h5> -->
        <h6 class="tw-font-light tw-text-sm">{{ formatDate(data.created_at) }}</h6>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/plugins/filters';
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
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
      formatDate
    };
  },

  methods: {
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
