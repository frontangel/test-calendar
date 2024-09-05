<script setup lang="ts">
  import { computed, reactive, watch } from 'vue';

  const props = defineProps<{
    form: {
      id?: string,
      title: string,
      date: string,
      time: string,
      notes: string,
      color: string
    }
  }>()

  const emits = defineEmits(['submit', 'close', 'discard'])

  const form = reactive({
    id: null,
    title: '',
    date: '',
    time: '',
    notes: '',
    color: ''
  })

  const isEdit = computed(() => Boolean(form.id))
  const colors = ['#3B86FF', '#1a8636', '#ff813b', '#ef2828']

  function handleSubmit() {
    emits('submit', { ...form})
  }

  function handleAction() {
    isEdit.value ? emits('discard', form.id) : emits('close')
  }

  watch(
    () => props.form,
    initForm,
    { deep: true, immediate: true }
  )

  function initForm() {
    Object.assign(form, props.form)
  }
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <label>
      <span>event name</span>
      <input v-model="form.title" placeholder="" maxlength="30" required />
    </label>
    <label>
      <span>event date</span>
      <input type="date" v-model="form.date" placeholder="" required />
      <i class="bi bi-calendar3" />
    </label>
    <label>
      <span>event time</span>
      <input type="time" v-model="form.time" placeholder="" required />
      <i class="bi bi-clock" />
    </label>
    <label>
      <span>notes</span>
      <input type="text" v-model="form.notes" />
    </label>

    <ul class="color-switcher">
      <li
        v-for="color in colors"
        :key="color"
        :style="{ backgroundColor: color }"
        :class="{ active: form.color === color }"
        @click="form.color = color"
      />
    </ul>

    <div class="actions">
      <button class="btn btn-link btn-cancel" type="button" @click="handleAction">{{ isEdit ? 'DISCARD' : 'Cancel' }}</button>
      <button class="btn btn-link" type="submit">{{ isEdit ? 'EDIT' : 'Save' }}</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
  .color-switcher {
    display: flex;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    li {
      display: block;
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      cursor: pointer;
      &:not(.active) {
        opacity: 0.3;
      }
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    .actions {
      display: flex;
      justify-content: space-between;
      .btn {
        padding: 0;
        text-decoration: none;
        color: #6A6996;
        font-size: 12px;
        font-weight: 300;
        &-cancel {
          color: #FF5F5F;
        }
      }
    }
  }
  label {
    border-bottom: 1px solid #D6D6D6;
    position: relative;
    span {
      display: block;
      font-size: 11px;
      color: #D6D6D6;
    }
    input {
      border: none;
      font-size: 11px;
      color: #43425D;
    }
    .bi {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      color: #D6D6D6;
    }
  }
</style>
