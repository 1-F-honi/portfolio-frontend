<template>
  <section class="projects">
    <h2 class="mb-4">実績</h2>
    <CRow class="g-3 px-3">
      <CCol xs="12" md="6" v-for="(project, index) in projects" :key="index">
        <RouterLink
          :to="`/projects/${index}`"
          class="card-link"
          style="text-decoration: none;"
        >
          <CCard>
            <CCardBody>
              <CCardTitle>{{ project.title }}</CCardTitle>
              <CCardText>{{ project.description }}</CCardText>
              <ul>
                <li v-for="tech in project.techs" :key="tech">{{ tech }}</li>
              </ul>
            </CCardBody>
          </CCard>
        </RouterLink>
      </CCol>
    </CRow>
  </section>
</template>

<script setup>
const projects = [
  {
    title: 'Chatbot最適化',
    description: 'GPT-4を用いてカスタマーサポート精度を向上',
    techs: ['Python', 'OpenAI API']
  },
]
</script>

<style scoped>
.projects {
  padding: 2rem 0;
}
</style>
