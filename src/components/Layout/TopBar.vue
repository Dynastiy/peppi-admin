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
          <!-- <span class="header-icon" role="button">
            <i-icon icon="ion:notifications-outline" />
          </span> -->

          <span class="tw-flex tw-flex-col tw-items-end">
            <!-- <span
              class="header-icon notifications font-weight-bolder text-uppercase"
              >A</span
            > -->
            <span class="text-capitalize" style="font-size: 14px">{{
              user.username
            }}</span>
            <div class="tw-text-white">
              <span
                @click="logout"
                role="button"
                class="menu-item-link tw-text-semibold tw-block tw-rounded-lg tw-text-[13px] tw-text-red-500 hover:tw-bg-gray200 hover:tw-text-dark-300"
              >
                <div class="tw-flex tw-items-center tw-gap-1">
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

    logout() {
      this.$swal
        .fire({
          title: "Uhhhh! 😔",
          text: "Are you sure you want to log out?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, logout!",
        })
        .then((result) => {
          console.log(result, "kkk");
          if (result.isConfirmed) {
            this.userLogout();
          }
        });
    },

    userLogout() {
      this.$store.dispatch("auth/logout");
      this.$swal
        .fire({
          title: "Woo hoo 😫",
          text: "Logged out succesfully",
          icon: "success",
          confirmButtonText: "Ok!",
        })
        .then((result) => {
          console.log(result, "kkk");
          if (result.isConfirmed) {
            this.$router.go();
          }
        });
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

    user() {
      return this.$store.getters["auth/getUser"];
    },
  },
};
</script>

<style scoped></style>
