<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <div class="tw-grid tw-grid-cols-4 tw-gap-4">
          <b-skeleton
            v-for="item in 4"
            :key="item"
            width="100%"
            height="80px"
          ></b-skeleton>
        </div>
      </template>
      <div class="tw-flex tw-gap-4">
        <div
          class="tw-w-full tw-bg-gradient-to-r tw-p-3 tw-rounded-lg"
          :class="{
            'tw-from-red-400 tw-to-red-500': name === 'total_products',
            'tw-from-green-400 tw-to-green-500': name === 'total_payments',
            'tw-from-amber-400 tw-to-amber-500': name === 'total_orders',
            'tw-from-cyan-400 tw-to-cyan-500': name === 'total_users',
          }"
          v-for="(value, name) in cardsData"
          :key="name"
        >
          <span class="tw-text-xs tw-font-semibold tw-uppercase">{{
            name.split("_").join(" ")
          }}</span>
          <div class="tw-font-bold tw-text-2xl">
            <slot :name="name" :value="value">{{ value ? value : "0" }} </slot>
          </div>
        </div>
      </div>
    </b-skeleton-wrapper>

    <div class="tw-flex tw-gap-4">
      <div class="tw-bg-white tw-p-4 tw-rounded-lg tw-w-full">
        <h6 class="tw-font-semibold">Orders</h6>
        <hr class="tw-my-2">
        <div class="tw-flex tw-flex-col tw-gap-3">
          <div v-for="(value, name) in ordersData" :key="name">
            <div class="tw-flex tw-gap-1 tw-items-center">
              <h6 class="tw-text-xs tw-font-medium">
                {{ name.split("_").join(" ") }}
              </h6>
              <h6>{{ value }}</h6>
            </div>
            <span
              class="tw-block tw-rounded-lg tw-h-3"
              :class="{
                'tw-bg-amber-100': name === 'pending_orders',
                'tw-bg-green-100': name === 'delivered_orders',
                'tw-bg-cyan-100': name === 'in_progress_orders',
                'tw-bg-red-100': name === 'canceled_orders',
                'tw-bg-blue-100': name === 'completed_orders',
              }"
              :style="{
                width:
                  `${getPercentage(
                    analytics.orders_total,
                    analytics.orders_total
                  )}` + '%',
              }"
            >
              <span
                class="tw-block tw-rounded-lg tw-h-3"
                :class="{
                  'tw-bg-amber-500': name === 'pending_orders',
                  'tw-bg-green-500': name === 'delivered_orders',
                  'tw-bg-cyan-500': name === 'in_progress_orders',
                  'tw-bg-red-500': name === 'canceled_orders',
                  'tw-bg-blue-500': name === 'completed_orders',
                }"
                :style="{
                  width:
                    `${getPercentage(value, analytics.orders_total)}` + '%',
                }"
              >
              </span>
            </span>
          </div>
        </div>
      </div>

      <div class="tw-bg-white tw-p-4 tw-rounded-lg tw-w-full">
        <h6 class="tw-font-semibold">Payments</h6>
        <hr class="tw-my-2">
        <div class="tw-flex tw-flex-col tw-gap-3">
          <div v-for="(value, name) in paymentsData" :key="name">
            <div class="tw-flex tw-gap-1 tw-items-center">
              <h6 class="tw-text-xs tw-font-medium">
                {{ name.split("_").join(" ") }}
              </h6>
              <h6>{{ value }}</h6>
            </div>
            <span
              class="tw-block tw-rounded-lg tw-h-3"
              :class="{
                'tw-bg-amber-100': name === 'pending_payments',
                'tw-bg-green-100': name === 'delivered_payments',
                'tw-bg-cyan-100': name === 'in_progress_payments',
                'tw-bg-red-100': name === 'canceled_payments',
                'tw-bg-blue-100': name === 'completed_payments',
              }"
              :style="{
                width:
                  `${getPercentage(
                    analytics.payments_total,
                    analytics.payments_total
                  )}` + '%',
              }"
            >
              <span
                class="tw-block tw-rounded-lg tw-h-3"
                :class="{
                  'tw-bg-amber-500': name === 'pending_payments',
                  'tw-bg-green-500': name === 'delivered_payments',
                  'tw-bg-cyan-500': name === 'in_progress_payments',
                  'tw-bg-red-500': name === 'canceled_payments',
                  'tw-bg-blue-500': name === 'completed_payments',
                }"
                :style="{
                  width:
                    `${getPercentage(value, analytics.payments_total)}` + '%',
                }"
              >
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="tw-bg-white tw-p-4 tw-rounded-lg">
      <h5 class="tw-font-semibold">Recent Orders</h5>
      <table-component
        :items="items"
        :fields="fields"
        :busy="busy"
        @view="viewOrder"
        :disableEditAction="true"
        :disableDeleteAction="true"
        :showBaseCount="false"
      >
        <template #button>
          <span
            class="tw-text-xs tw-text-primary tw-underline"
            role="button"
            @click="$router.push('/orders')"
          >
            View All Orders
          </span>
        </template>
      </table-component>
    </div>
  </div>
</template>

<script>
import { pick } from "lodash";
import TableComponent from "@/components/TableComponent.vue";
export default {
  components: { TableComponent },
  data() {
    return {
      analytics: {},
      displayKey: [
        "total_products",
        "total_payments",
        "total_orders",
        "total_users",
      ],
      items: [],
      fields: [
        {
          key: "id",
          label: "#",
          formatter: (val) => {
            let result = val.slice(0, 5);
            return `#${result}`;
          },
        },

        {
          key: "total_quantity",
          label: "Order Qty",
          formatter: (item) => {
            return item ? Number(item).toLocaleString() : "0";
          },
        },

        {
          key: "total_amount",
          label: "Total Amount",
          formatter: (item) => {
            return item
              ? Number(item).toLocaleString("en-US", {
                  style: "currency",
                  currency: "NGN",
                })
              : "NGN 0.00";
          },
        },

        {
          key: "user.username",
          label: "Customer",
        },

        {
          key: "item-status",
          label: "Status",
        },

        {
          key: "created_at",
          label: "Date",
        },

        { key: "actions", label: "" },
      ],
      busy: false,
      loading: false,
    };
  },
  methods: {
    getAnalytics() {
      this.loading = true;
      this.$request(`admin/products/dashboard`)
        .then((res) => {
          let resPayload = res.data;
          this.analytics = resPayload;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },

    getPercentage(value1, value2) {
      let perc = (value1 / value2) * 100;
      return perc;
    },

    viewOrder(e) {
      this.$router.push(`/order/${e.id}`);
    },

    list(page = 1) {
      this.busy = true;
      console.log(page, "kkk");
      this.$request
        .get(`admin/orders?page=` + page)
        .then((res) => {
          let resPayload = res.data;
          this.items = resPayload.data.splice(0, 5);
          this.totalRows = resPayload.total;
          this.showFrom = resPayload.from;
          this.showTo = resPayload.to;
          this.totalRecords = resPayload.total;
          this.currentPage = resPayload.current_page;
          this.perPage = resPayload.per_page;
          this.pages = Math.ceil(resPayload.total / resPayload.per_page);
          // console.log(this.pages, "kkk");
          console.log(res.data);
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },
  },

  beforeMount() {
    this.getAnalytics();
    this.list();
  },

  computed: {
    cardsData() {
      let data = {
        total_products: this.analytics.products_total,
        total_payments: this.analytics.payments_total,
        total_orders: this.analytics.orders_total,
        total_users: this.analytics.users_total,
      };
      return pick(data, this.displayKey);
    },

    ordersData() {
      let displayKey = [
        "pending_orders",
        "in_progress_orders",
        "completed_orders",
        "delivered_orders",
        "canceled_orders",
      ];
      let data = {
        pending_orders: this.analytics.pending_orders_total,
        in_progress_orders: this.analytics.inprogress_orders_total,
        completed_orders: this.analytics.completed_orders_total,
        delivered_orders: this.analytics.delivered_orders_total,
        canceled_orders: this.analytics.canceled_orders_total,
      };
      return pick(data, displayKey);
    },

    paymentsData() {
      let displayKey = [
        "pending_payments",
        "in_progress_payments",
        "completed_payments",
        "delivered_payments",
        "canceled_payments",
      ];
      let data = {
        pending_payments: this.analytics.pending_payments_total,
        in_progress_payments: this.analytics.inprogress_payments_total,
        completed_payments: this.analytics.completed_payments_total,
        delivered_payments: this.analytics.delivered_payments_total,
        canceled_payments: this.analytics.canceled_payments_total,
      };
      return pick(data, displayKey);
    },
  },
};
</script>

<style></style>
