<template>
  <div>
    <div class="">
      <app-drawer />
      <div class="tw-pl-64 tw-w-full">
        <top-bar :links="links" />
        <!-- <app-header /> -->
          <div class="tw-p-6">
            <slot />
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AppHeader from "@/components/Navigation/AppHeader.vue";
import AppDrawer from "@/components/Navigation/AppDrawer.vue";
import TopBar from '@/components/Layout/TopBar.vue';
export default {
  components: { AppDrawer, TopBar },

  name: "DashboardLayout",
  computed: {
    links(){
      return this.$route.meta.links
    }
  },

};
</script>

<style></style>
