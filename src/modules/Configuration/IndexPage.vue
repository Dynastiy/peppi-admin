<template>
  <div>
    <MainTab :tabs="tabs" :currentTab="activeTab" :currentName="activeName">
      <template #default="{ activeTab }">
        <component :is="tabs[activeTab].component" />
      </template>
    </MainTab>
  </div>
</template>

<script>
import MainTab from "@/components/Utils/MainTab.vue";

// Components
import ShippingConfiguration from "@/components/Home/Configuration/ShippingConfiguration.vue";
// import UserProfile from "@/components/Home/Configuration/UserProfile.vue";
import WeightPrices from "@/components/Home/Configuration/WeightPrices.vue";
import ProductWeights from "@/components/Home/Configuration/ProductWeights.vue";

export default {
  components: {
    MainTab,
  },
  data() {
    return {
      activeTab: 0,
      activeName: "shipping",
      tabs: [
        {
          id: 1,
          title: "Shipping",
          component: ShippingConfiguration,
          name: "shipping",
        },
        {
          id: 2,
          title: "Weights",
          component: ProductWeights,
          name: "weights",
        },
        {
          id: 3,
          title: "Weight Prices",
          component: WeightPrices,
          name: "weight-prices",
        },
        // {
        //   id: 4,
        //   title: "User Profile",
        //   component: UserProfile,
        //   name: "user-profile",
        // },
      ],
    };
  },
};
</script>

<style></style>
