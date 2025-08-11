<template>
  <div class="project-detail">
    <h2>プロジェクト詳細</h2>
    <div v-if="project">
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
      <div class="d-flex flex-column">
        <Window :messages="messages" />
        <Input @send="handleSend" />
      </div>
    </div>
    <div v-else>
      <p>プロジェクトが見つかりませんでした。</p>
    </div>
    <RouterLink to="/portfolio-frontend/">← 戻る</RouterLink>
  </div>
</template>

<script setup>
import Input from '../Parts/Input.vue'
import Window from '../Parts/Window.vue'
import { onMounted } from 'vue'

const route = useRoute()

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

// URLのパラメータを取得して対応するプロジェクトを取得
const projectId = parseInt(route.params.id)
const project = computed(() => projects[projectId])

const messages = ref([])

// ✉️ メッセージ受信処理
function handleSend(message) {
  const text = message.trim()
  if (!text) return

  messages.value.push({
    content: text,
    sender: 'user'
  })

  sendBotReply(text)
}

async function sendBotReply(userText) {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText })
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }

    // サーバー実装に合わせて text/json を切替
    const isJson = res.headers.get('content-type')?.includes('application/json')
    const reply = isJson ? (await res.json()).message : (await res.text())
    const content = String(reply ?? '').trim()
    if (!content) return

    messages.value.push({ content, sender: 'bot' })
  } catch (err) {
    console.error(err)
    messages.value.push({
      content: 'エラーが発生しました。しばらくしてから再度お試しください。',
      sender: 'bot'
    })
  }
}

</script>

<style scoped>
.project-detail {
  padding: 2rem;
}
</style>
