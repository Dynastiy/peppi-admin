<template>
  <div>
    <table-component :items="items">
      <template #button>
        <button
          class="peppi-btn peppi-primary"
          @click="$router.push('/inventory/product/add-product')"
        >
          Create product
        </button>
      </template>
    </table-component>
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
export default {
  components: { TableComponent },
  data() {
    return {
      items: [],
    };
  },
};
</script>

<style></style>
