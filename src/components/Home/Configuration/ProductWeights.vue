<template>
  <div>
    <div class="tw-flex tw-justify-between tw-items-center">
      <h5 class="tw-font-semibold">Weights</h5>
      <button class="peppi-btn peppi-primary" @click="addWeight">
        Add Weight
      </button>
    </div>
    <div class="tw-mt-5 tw-bg-white tw-p-6">
      <b-skeleton-wrapper :loading="busy">
        <template #loading>
          <div class="tw-grid tw-grid-cols-6 tw-gap-3">
            <b-skeleton
              v-for="item in 6"
              :key="item"
              width="100%"
              height="50px"
            ></b-skeleton>
          </div>
        </template>
        <div class="tw-mb-4" v-if="addNewWeight">
          <input type="text" placeholder="Enter weight(in KG)" class="tw-p-2" v-model="payload.name" />
          <div class="tw-mt-2 tw-flex tw-gap-2 tw-justify-end">
            <button
              class="peppi-btn peppi-primary tw-bg-red-600"
              @click="close"
            >
              Cancel
            </button>
            <button class="peppi-btn peppi-primary" @click="complete">
              Complete
            </button>
          </div>
        </div>
        <div class="tw-grid lg:tw-grid-cols-6 tw-grid-cols-4 tw-gap-3">
          <div
            v-for="(item, idx) in items"
            :key="idx"
            class="tw-bg-gray400 tw-p-3 tw-flex tw-justify-between tw-items-center tw-rounded-lg"
          >
            <span>
              <input
                type="text"
                class="tw-bg-gray100 tw-p-1"
                v-model="item.name"
                :disabled="editMode !== item.id"
                :readonly="editMode !== item.id"
              />
            </span>
            <span class="tw-flex tw-gap-2">
              <span role="button" @click="editRecord(item)">
                <i-icon
                  class="tw-text-blue-600"
                  icon="mdi:edit-circle-outline"
                />
              </span>
              <span role="button" @click="deleteRecord(item)">
                <i-icon
                  class="tw-text-red-600"
                  icon="fluent:delete-12-regular"
                />
              </span>
            </span>
          </div>
        </div>

        <div v-if="items.length === 0">
          <h6 class="tw-text-red-600 tw-font-normal tw-text-sm">
            No items found
          </h6>
        </div>
      </b-skeleton-wrapper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      editMode: null,
      payload: {
        name: "",
      },
      addNewWeight: false,
    };
  },

  methods: {
    list() {
      this.busy = true;
      this.$request(`admin/weights`)
        .then((res) => {
          let resPayload = res.data.weights;
          this.items = resPayload;
          console.log(res.data);
          this.busy = false;
        })
        .catch((err) => {
          console.log(err);
          this.busy = false;
        });
    },

    editRecord(value) {
      this.editMode = this.editMode === null ? value.id : null;
    },

    addWeight() {
      this.addNewWeight = !this.addNewWeight;
    },

    close() {
      this.addNewWeight = !this.addNewWeight;
      this.payload.name = "";
    },

    complete() {
      this.loading = true;
      let payload = {
        name: this.payload.name+"kg"
      }
      this.$request
        .post(`admin/weights/add`, payload)
        .then((res) => {
          this.list();
          this.close();
          this.loading = false;
          return res;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },

    deleteWeight(value) {
      this.$request
        .post(`admin/weights/delete/${value.id}`)
        .then((res) => {
          this.$swal.fire("Deleted!", "Weight deleted succesfully.", "success");
          this.list();
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteRecord(value) {
      this.$swal
        .fire({
          title: "Continue?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          console.log(result, "kkk");
          if (result.isConfirmed) {
            this.deleteWeight(value);
          }
        });
    },
  },

  beforeMount() {
    this.list();
  },
};
</script>

<style>
input[type="text"]:disabled {
  background: var(--gray100);
}
</style>
