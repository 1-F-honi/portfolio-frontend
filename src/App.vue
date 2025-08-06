<template>
  <CContainer fluid class="p-0">
    <HeroSection />
    <ProjectsSection />
    <SkillsSection />
    <FooterSection />
  </CContainer>
</template>

<script setup>
import { CContainer } from '@coreui/vue'
import HeroSection from './components/Base/HeroSection.vue'
import ProjectsSection from './components/Base/ProjectsSection.vue'
import SkillsSection from './components/Base/SkillsSection.vue'
import FooterSection from './components/Base/FooterSection.vue'
</script>

<style scoped>
/* 必要に応じてスタイル調整 */
</style>
