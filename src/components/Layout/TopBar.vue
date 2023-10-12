<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="tw-sticky tw-top-0 tw-z-40 tw-bg-white tw-shadow">
    <div class="tw-relative tw-bg-white tw-py-4 tw-px-6">
      <div
        class="tw-flex tw-items-center tw-justify-between overflow-auto sm:tw-whitespace-nowrap"
      >
        <div class="tw-flex tw-items-center tw-justify-between tw-w-full">
          <div
            class="tw-font-semibold sm:tw-text-xs lg:tw-text-base sm:tw-mr-3 lg:tw-mr-0 tw-capitalize"
          >
            <span class="tw-uppercase">
              {{ $route.meta.parent.split("-")[0] }}
              <span class="tw-text-dark-100"> - </span>
            </span>
            <span class="tw-capitalize">
              {{ start_case($route.meta.name) }}</span
            >
          </div>
        </div>
        <div class="d-flex align-items-center" style="gap: 20px">
          <span class="header-icon" role="button">
            <i-icon icon="ion:notifications-outline" />
          </span>

          <span class="d-flex align-items-center" style="gap: 5px">
            <span
              class="header-icon notifications font-weight-bolder text-uppercase"
              >A</span
            >
            <span class="text-capitalize" style="font-size: 14px">Hello</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { startCase, split } from "lodash";
export default {
  props: {
    links: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    start_case(value) {
      return startCase(value);
    },

    structureTitle() {
      const splitArr = split(this.$route.name, "-");
      if (splitArr.length > 0) {
        splitArr.shift();
      }

      // console.log(splitArr);
      splitArr.forEach((element) => {
        // console.log(startCase(element));
        element = this.start_case(element);
        console.log(element);
        // console.log(startCase(element))
      });
      console.log(splitArr);
      return splitArr.join(" - ");
    },
  },

  computed: {
    isActive() {
      return this.$route.meta.subName;
    },
  },
};
</script>

<style scoped></style>
