<template>
  <section class="skills text-center">
    <h2 class="mb-3">スキル・使用技術</h2>
    <div>
      <CBadge
        v-for="skill in skills"
        :key="skill"
        color="secondary"
        class="m-1 px-3 py-2"
        pill
      >
        {{ skill }}
      </CBadge>
    </div>
  </section>
</template>

<script setup>

const skills = [
  'Python', 'JavaScript', 'Vue.js', 'Hugging Face'
]
</script>

<style scoped>
.skills {
  padding: 1rem 0;
}
</style>
