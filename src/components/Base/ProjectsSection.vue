<template>
  <section class="projects">
    <h2 class="mb-4">ファインチューニング実績</h2>
    <CRow class="g-3 px-3">
      <CCol xs="12" md="6" v-for="(project, index) in projects" :key="index">
        <CCard>
          <CCardBody>
            <CCardTitle>{{ project.title }}</CCardTitle>
            <CCardText>{{ project.description }}</CCardText>
            <ul>
              <li v-for="tech in project.techs" :key="tech">{{ tech }}</li>
            </ul>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </section>
</template>

<script setup>
import { CRow, CCol, CCard, CCardBody, CCardTitle, CCardText } from '@coreui/vue'

const projects = [
  {
    title: 'Chatbot最適化',
    description: 'GPT-4を用いてカスタマーサポート精度を向上',
    techs: ['Python', 'OpenAI API', 'LangChain']
  },
  {
    title: '業務自動化AI',
    description: '社内業務プロセスにLLaMA3をファインチューニング',
    techs: ['LLaMA3', 'Hugging Face', 'Weights & Biases']
  }
]
</script>

<style scoped>
.projects {
  padding: 2rem 0;
}
</style>
