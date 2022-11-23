<template>
  <div class="el-card">
    <el-card shadow="always">
      <template #header>
        <!-- <h4>{{ title }}</h4> -->
      </template>
      <slot name="card-content"></slot>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
