<template>
  <CListGroup class="overflow-auto">
    <CListGroupItem
      v-for="(msg, index) in messages"
      :key="index"
      :class="msg.sender === 'user' ? 'text-end bg-light' : 'text-start bg-body'"
    >
      {{ msg.content }}
    </CListGroupItem>
  </CListGroup>
</template>

<script setup>

defineProps({
  messages: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
</style>
