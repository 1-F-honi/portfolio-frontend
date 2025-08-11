<template>
  <CFooter class="text-center py-4 bg-light">
    <p class="mb-2">© 2025 {{ fullName }}</p>
    <CButtonGroup>
      <CButton color="link" href="https://github.com/yourname" target="_blank">GitHub</CButton>
      <CButton color="link" href="https://zenn.dev/yourname" target="_blank">Zenn</CButton>
    </CButtonGroup>
  </CFooter>
</template>

<script setup>
import { computed } from 'vue'

const middleName = 'Erina'
const name = 'Noguchi'

const fullName = computed(() => `${middleName} ${name}`)
</script>
