<template>
  <div>
    <!-- <div>
      {{ data }}
    </div> -->
    <div class="tw-grid tw-grid-cols-1 tw-gap-2">
      <div class="tw-flex tw-items-center tw-bg-gray200 tw-py-2 tw-px-3 tw-rounded-md">
        <span class="tw-w-2/5 tw-text-sm tw-font-medium">Name</span>
        <span class="tw-text-sm">{{ data.name }}</span>
      </div>
      <div class="tw-flex tw-items-center tw-py-2 tw-px-3">
        <span class="tw-w-2/5 tw-text-sm tw-font-medium">Slug</span>
        <span class="tw-text-sm">{{ data.slug }}</span>
      </div>
      <div class="tw-flex tw-items-center tw-bg-gray200 tw-py-2 tw-px-3 tw-rounded-md">
        <span class="tw-w-2/5 tw-text-sm tw-font-medium">Price</span>
        <span class="tw-text-sm">{{
          Number(data.price).toLocaleString("en-US", {
            style: "currency",
            currency: "NGN",
          })
        }}</span>
      </div>
      <div class="tw-flex tw-items-center tw-py-2 tw-px-3">
        <span class="tw-w-2/5 tw-text-sm tw-font-medium">Categories</span>
        <span class=" tw-flex tw-flex-wrap tw-gap-2">
          <span
            v-for="(item, idx) in data.categories"
            :key="idx"
            :class="item.category_name.charAt(0)"
            class="tag tw-text-[11px] tw-px-2 tw-py-1 tw-rounded-md"
            >{{ item.category_name }}</span
          >
        </span>
      </div>
      <div class="tw-flex tw-items-center tw-bg-gray200 tw-py-2 tw-px-3 tw-rounded-md">
        <span class="tw-w-2/5 tw-text-sm tw-font-medium">Availability</span>
        <span
          class="tw-text-xs"
          :class="data.availability === 'yes' ? 'available' : 'unavailable'"
          >{{ data.availability === "yes" ? "available" : "unavailable" }}</span
        >
      </div>
      <div class="tw-flex tw-items-center tw-py-2 tw-px-3">
        <span class="tw-w-2/5 tw-text-sm tw-font-medium">Description</span>
        <div v-html="data.description" class="tw-text-sm"></div>
      </div>
      <div class="tw-flex tw-items-center tw-bg-gray200 tw-py-2 tw-px-3 tw-rounded-md">
        <span class="tw-w-2/5 tw-text-sm tw-font-medium">Date Created:</span>
        <span class="tw-text-sm">{{ formatDate(data.created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { pick } from "lodash";
import { formatDate } from "@/plugins/filters";
// import { timeStamp2 } from "@/plugins/filter";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Modal Title",
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    displayData: {
      type: Object,
      default: () => ({}),
    },
    date: {
      type: String,
    },
    displayKey: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data() {
    return {
      busy: false,
      dialogVisible: false,
      formatDate,
    };
  },

  methods: {
    handleClose() {
      this.$emit("toggle");
    },
  },

  computed: {
    filterData() {
      return pick(this.displayData, this.displayKey);
    },
  },
};
</script>

<style>
p {
    margin: 0;
}
</style>
