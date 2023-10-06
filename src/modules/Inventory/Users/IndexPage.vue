<template>
    <div>
      <table-component :items="items">
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
  