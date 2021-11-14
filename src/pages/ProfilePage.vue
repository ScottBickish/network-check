<template>
  <div class="row container-fluid"></div>
  <Profile :profile="profile" :propost="propost" />
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { profilesService } from "../services/ProfilesService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import { extrasService } from "../services/ExtrasService";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await profilesService.getProfile(route.params.id);
        await profilesService.getProfilePostId(route.params.id);
        await extrasService.getAll();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message);
      }
    });
    return {
      profile: computed(() => AppState.profile),
      propost: computed(() => AppState.propost),
      extras: computed(() => AppState.extras),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>