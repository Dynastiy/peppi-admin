<template>
  <div>
    <div>
      <div class="info-card">
        <img
          :src="info.profile_photo"
          alt="user Profile Photo"
          style="
            height: 80px;
            width: 80px;
            object-fit: cover;
            object-position: center;
            border-radius: 50%;
          "
          loading="lazy"
        />
        <h5 class="font-weight-bold tw-mb-0">
          {{ info.first_name + " " + info.last_name }}
        </h5>
        <small class="text-secondary">{{ user.email }}</small>
      </div>
      <div class="info-container mt-3">
        <div class="info-card">
          <span class="info-card-header">
            <span class="info-card-header-text">Username</span>
            <span class="info-card-icon">
              <i-icon icon="ph:user-circle" />
            </span>
          </span>
          <span class="info-card-data">
            {{ user.username || "" }}
          </span>
        </div>
        <div class="info-card">
          <span class="info-card-header">
            <span class="info-card-header-text">Date of Birth</span>
            <span class="info-card-icon"> <i-icon icon="uiw:date" /> </span>
          </span>
          <span class="info-card-data"> {{ info.dob || "No data" }} </span>
        </div>
        <div class="info-card">
          <span class="info-card-header">
            <span class="info-card-header-text">Gender</span>
            <span class="info-card-icon">
              <i-icon icon="carbon:ticket" />
            </span>
          </span>
          <span class="info-card-data"> {{ info.gender }} </span>
        </div>

        <div class="info-card">
          <span class="info-card-header">
            <span class="info-card-header-text">City</span>
            <span class="info-card-icon">
              <i-icon icon="pajamas:location" />
            </span>
          </span>
          <span class="info-card-data"> {{ info.city }} </span>
        </div>
        <div class="info-card">
          <span class="info-card-header">
            <span class="info-card-header-text">State</span>
            <span class="info-card-icon">
              <i-icon icon="pajamas:location" />
            </span>
          </span>
          <span class="info-card-data"> {{ info.state }} </span>
        </div>
        <div class="info-card">
          <span class="info-card-header">
            <span class="info-card-header-text">Country</span>
            <span class="info-card-icon">
              <i-icon icon="pajamas:location" />
            </span>
          </span>
          <span class="info-card-data"> {{ info.country }} </span>
        </div>
        <div class="info-card">
          <span class="info-card-header">
            <span class="info-card-header-text">Address</span>
            <span class="info-card-icon">
              <i-icon icon="pajamas:location" />
            </span>
          </span>
          <span class="info-card-data"> {{ info.address }} </span>
        </div>
        <div class="info-card">
          <span class="info-card-header">
            <span class="info-card-header-text">Date Joined</span>
            <span class="info-card-icon"> <i-icon icon="uiw:date" /> </span>
          </span>
          <span class="info-card-data">
            {{ user.created_at | formatDate }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: {},
      user: {},
    };
  },
  methods: {
    getUser() {
      this.$request
        .get(`/admin/users/${this.id}`)
        .then((res) => {
          console.log(res);
          this.user = res.data.user;
          this.info = res.data.user.profile;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  beforeMount() {
    this.getUser();
  },

  computed: {},
};
</script>

<style>
.info-container {
  display: grid;
  display: -ms-grid;
  display: -moz-grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.info-card {
  background: #fff;
  padding: 18px;
  border-radius: 15px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.125);
  display: flex;
  display: inline-flex;
  display: -webkit-flex;
  flex-direction: column;
  gap: 4px;
}
.tag-info {
  font-size: 14px;
  color: var(--gray-600);
  font-weight: 400;
}
.header-text {
  font-weight: 600;
}
.info-card-header-text {
  font-size: 15px;
  font-weight: 600;
}
.info-card-data {
  font-size: 14px;
  color: var(--gray-600);
}
.info-card-header {
  display: flex;
  display: inline-flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: space-between;
}
.info-card-header .info-card-icon {
  color: var(--main-color);
}
</style>
