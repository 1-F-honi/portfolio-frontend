<template>
  <CInputGroup class="p-2 border-top">
    <CFormInput
      v-model="input"
      placeholder="メッセージを入力..."
      @keyup.enter="onSend"
    />
    <CButton color="primary" @click="onSend">送信</CButton>
  </CInputGroup>
</template>

<script setup>

const input = ref('')
const emit = defineEmits(['send'])

function onSend() {
  const message = input.value.trim()
  if (!message) return
  emit('send', message)
  input.value = ''
}
</script>

<style scoped>
</style>