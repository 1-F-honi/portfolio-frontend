<template>
  <div class="project-detail">
    <h2>プロジェクト詳細</h2>

    <div v-if="project">
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>

      <div class="d-flex flex-column">
        <Window :messages="messages" />
        <Input @send="handleSend" />
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      </div>
    </div>

    <div v-else>
      <p>プロジェクトが見つかりませんでした。</p>
    </div>

    <RouterLink :to="baseUrl">← 戻る</RouterLink>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Input from '../Parts/Input.vue'
import Window from '../Parts/Window.vue'

// ====== ルーティングとデータ ======
const route = useRoute()
const projects = [
  {
    title: 'Chatbot最適化',
    description: 'GPT-4を用いてカスタマーサポート精度を向上',
    techs: ['Python', 'OpenAI API', 'LangChain'],
  },
  {
    title: '業務自動化AI',
    description: '社内業務プロセスにLLaMA3をファインチューニング',
    techs: ['LLaMA3', 'Hugging Face', 'Weights & Biases'],
  },
]

// URLの :id を安全に解釈
const projectIndex = Number.isInteger(+route.params.id) ? Number(route.params.id) : -1
const project = computed(() => projects[projectIndex] ?? null)

// GitHub Pagesのサブディレクトリにも対応
const baseUrl = import.meta.env.BASE_URL || '/'

// ====== チャット状態 ======
const messages = ref([])
const errorMsg = ref('')

// ====== API送信（開発: /api プロキシ / 本番: 絶対URL） ======
const API_BASE =
    import.meta.env.DEV
        ? '/api'
        : (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '') // 末尾スラッシュ除去

let currentController = null

async function sendBotReply(userText) {
  // 直前リクエストが動いていればキャンセル（連打対策）
  if (currentController) currentController.abort()
  currentController = new AbortController()

  try {
    errorMsg.value = ''
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText }),
      signal: currentController.signal,
    })

    if (!res.ok) {
      // 405/404などの見える化
      throw new Error(`HTTP ${res.status}`)
    }

    const ct = res.headers.get('content-type') || ''
    const reply = ct.includes('application/json') ? (await res.json())?.message : await res.text()
    const content = String(reply ?? '').trim()
    if (!content) return

    messages.value.push({ content, sender: 'bot' })
  } catch (err) {
    if (err.name === 'AbortError') return
    console.error(err)
    errorMsg.value =
        'エラーが発生しました。時間をおいて再度お試しください。（' + (err.message || 'unknown') + '）'
    messages.value.push({
      content: 'エラーが発生しました。しばらくしてから再度お試しください。',
      sender: 'bot',
    })
  } finally {
    currentController = null
  }
}

// ✉️ メッセージ受信処理
function handleSend(message) {
  const text = String(message ?? '').trim()
  if (!text) return

  messages.value.push({ content: text, sender: 'user' })
  sendBotReply(text)
}
</script>

<style scoped>
.project-detail {
  padding: 2rem;
}
.error {
  margin-top: 0.75rem;
  color: #c62828;
  font-size: 0.9rem;
}
</style>
