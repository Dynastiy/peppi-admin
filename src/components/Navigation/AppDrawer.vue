<template>
  <div
    id="app-drawer"
    class="tw-flex tw-flex-col tw-justify-between tw-pt-6 tw-px-2 tw-py-4 tw-pb-12 tw-bg-dark-100 tw-z-20 tw-fixed tw-left-0 tw-top-0 tw-h-screen tw-overflow-auto tw-w-64"
  >
    <div>
      <div class="tw-flex tw-justify-center">
        <img src="@/assets/img/peppi-logo.png" class="tw-w-32" alt="" />
      </div>

      <ul class="tw-pl-0 tw-flex tw-flex-col tw-space-y-4 tw-mt-12">
        <li v-for="(item, index) in menu" :key="index">
          <div class="menu-item">
            <span
              role="button"
              class="tw-flex tw-justify-between tw-capitalize tw-text-semibold tw-block tw-p-3 tw-rounded-[4px] tw-text-[13px] hover:tw-bg-gray200 hover:tw-text-dark-300"
              @click="item.hasChildren ? openSubMenu(item) : goToLink(item)"
              :class="[
                item.parent === routeParent
                  ? 'tw-bg-white tw-text-dark-300'
                  : 'tw-text-white',
              ]"
            >
              <div class="tw-flex tw-items-center tw-gap-2">
                <i-icon
                  :icon="item.icon"
                  v-if="item.icon"
                  class="menu-item-icon"
                  width="16px"
                />
                <span class="tw-flex tw-flex-col">
                  <span
                    :class="item.header ? 'menu-title-header' : 'menu-title'"
                  >
                    {{ item.title }}
                  </span>
                </span>
              </div>
              <span v-if="item.hasChildren">
                <i-icon
                  :icon="
                    subMenu === item.title
                      ? 'prime:angle-down'
                      : 'prime:angle-right'
                  "
                  width="22px"
                />
              </span>
            </span>
            <div
              class="sub-menu tw-flex tw-flex-col tw-space-y-6 tw-mt-4 tw-ml-6"
              :class="[subMenu === item.title ? 'tw-block' : 'tw-hidden']"
            >
              <span
                role="button"
                class=""
                v-for="(subMenu, index) in item.children"
                :key="index"
                @click="$router.push(subMenu.url)"
              >
                <span
                  class="sub-menu-items tw-text-xs tw-flex tw-gap-2 tw-capitalize"
                  :class="[
                    subMenu.subItem === subMenuRouteName
                      ? 'tw-text-primary'
                      : 'tw-text-white',
                  ]"
                >
                  <i-icon
                    :icon="subMenu.icon"
                    class="menu-item-icon"
                    width="17px"
                  />
                  <span class="sub-menu-title"> {{ subMenu.title }} </span>
                </span>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="tw-text-white">
      <span
        role="button"
        class="menu-item-link tw-text-semibold tw-block tw-p-3 tw-rounded-lg tw-text-[13px] tw-text-red-500 hover:tw-bg-gray200 hover:tw-text-dark-300"
      >
        <div class="tw-flex tw-items-center tw-space-x-3">
          <i-icon
            icon="material-symbols:logout"
            class="menu-item-icon"
            width="16px"
          />
          <span class="tw-flex tw-flex-col">
            <span> Logout </span>
          </span>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      menu: [
        {
          title: "analytics",
          icon: "carbon:analytics",
          parent: "analytics",
          url: "/",
          hasChildren: false,
        },
        {
          title: "inventory",
          icon: "ic:outline-inventory-2",
          parent: "inventory",
          url: "/inventory",
          hasChildren: true,
          children: [
            {
              title: "products",
              icon: "el:list-alt",
              url: "/inventory/products",
              hasChildren: false,
              parent: "inventory",
              subItem: "products",
            },
            {
              title: "categories",
              icon: "carbon:categories",
              url: "/inventory/categories",
              hasChildren: false,
              parent: "inventory",
              subItem: "categories",
            },
            {
              title: "users",
              icon: "ph:users-three",
              url: "/inventory/users",
              hasChildren: false,
              parent: "inventory",
              subItem: "users",
            },
          ],
        },

        {
          title: "orders",
          icon: "carbon:ibm-watson-orders",
          parent: "orders",
          url: "/orders",
          hasChildren: false,
        },

        {
          title: "payments",
          icon: "solar:card-outline",
          parent: "payments",
          url: "/payments",
          hasChildren: false,
        },
        // {
        //   title: "shipping",
        //   icon: "mdi:locations-outline",
        //   parent: "shipping",
        //   url: "/shipping",
        //   hasChildren: true,
        //   children: [
        //     {
        //       title: "shipping locations",
        //       icon: "mdi:locations-outline",
        //       url: "/shipping/shipping-locations",
        //       hasChildren: false,
        //       parent: "shipping",
        //       subItem: "shipping-locations",
        //     },
        //     {
        //       title: "weight prices",
        //       icon: "simple-icons:weightsandbiases",
        //       url: "/weight-prices",
        //       hasChildren: false,
        //       parent: "shipping",
        //       subItem: "weight-prices",
        //     },
        //   ],
        // },
        // {
        //   title: "reviews and ratings",
        //   icon: "material-symbols:share-reviews-outline",
        //   parent: "reviews-and-ratings",
        //   url: "/reviews-and-ratings",
        //   hasChildren: false,
        // },
        {
          title: "configuration",
          icon: "mingcute:settings-6-line",
          parent: "configuration",
          url: "/configuration",
          hasChildren: false,
        },
        // {
        //   title: "profile",
        //   icon: "gg:profile",
        //   parent: "profile",
        //   url: "/profile",
        //   hasChildren: false,
        // },
      ],
    };
  },

  methods: {
    goToLink(item) {
      this.$router.push(item.url).catch(() => {});
    },

    openSubMenu(item) {
      let value = this.subMenu === item.title ? null : item.title;
      this.$store.commit("drawer/SET_SUB_MENU", value);
    },

    collapseAppDrawer() {
      this.$store.dispatch("drawer/setCollapseState");
    },
  },

  computed: {
    routeName() {
      return this.$route.meta.name;
    },

    subMenuRouteName() {
      return this.$route.meta.subName ;
    },

    routeParent() {
      return this.$route.meta.parent;
    },

    user() {
      return this.$store.getters["auth/getUser"];
    },

    ...mapState("drawer", {
      isCollapsed: (state) => state.collapsed,
      subMenu: (state) => state.subMenu,
    }),
  },
};
</script>

<style></style>
