<template>
  <div class="tw-flex tw-gap-4">
    <div class="tw-mb-4 tw-w-full">
      <video :src="data.video.url" style="width: 100%" controls></video>
    </div>
    <span class="tw-flex tw-flex-wrap tw-gap-4">
      <img
        v-for="(item, idx) in data.images"
        :key="idx"
        :src="item.url"
        alt=""
        class="tw-object-fit tw-p-1 tw-border-2 tw-border-primary tw-object-center tw-w-28 tw-h-28 tw-block"
      />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style></style>
