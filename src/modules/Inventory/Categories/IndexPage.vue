<template>
    <div>
      <table-component :items="items">
        <template #button>
          <button
            class="peppi-btn peppi-primary"
            @click="addCategory"
          >
            add category
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

    methods: {
        addCategory(){
            alert("Hello")
        }
    }
  };
  </script>
  
  <style></style>
  