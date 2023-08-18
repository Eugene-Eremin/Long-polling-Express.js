<template>
  <div>
    <div>
      <input type="text" title="Введи сообщение" v-model="newMessage" />
      <input type="text" title="Кто ты чтобы посмотреть свои собщения" v-model="who" />
      <button @click="editNewMessage">Отправить</button>
    </div>
    <div>
      <div v-for="message in messages" :key="message.id">
        {{ message.id }}
        {{ message.message }}
        {{ message.who }}
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';

const messages = ref([])
const newMessage = ref('')
const who = ref('')

const editNewMessage = async () => {
  const message = {
    who: who.value,
    message: newMessage.value,
    id: Date.now()
  }
  await axios.post('http://localhost:5001/new-message', message)
}

const subscribe = async () => {
  try {
    const { data } = await axios.get('http://localhost:5001/get-message')
    messages.value = data
    console.log(messages.value)
    await subscribe()
  } catch (e) {
    console.log(e)
    setTimeout(async () => {
      await subscribe()
    }, 500)
  }
}

onMounted(async () => {
  await subscribe()
})

</script>


<style scoped></style>
