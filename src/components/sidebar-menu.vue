<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const menu = ref([
  { title: 'Home', icon: 'house', path: '/' },
  { title: 'Dashboard', icon: 'speedometer2', path: '/dashboard' },
  { title: 'Inbox', icon: 'envelope', path: '/inbox' },
  { title: 'Products', icon: 'bag', path: '/products' },
  { title: 'Invoices', icon: 'receipt', path: '/invoices' },
  { title: 'Customers', icon: 'person', path: '/customers' },
  { title: 'Chat Room', icon: 'chat', path: '/chat-room' },
  { title: 'Calendar', icon: 'calendar3', path: '/calendar' },
  { title: 'Help Center', icon: 'life-preserver', path: '/help-center' },
  { title: 'Settings', icon: 'gear-wide-connected', path: '/settings' },
])
</script>

<template>
  <ul class="nav">
    <li v-for="(item, index) of menu" :key="index" :class="{ active: route.path === item.path }">
      <router-link :to="item.path">
        <span class="icon"><i class="bi" :class="`bi-${item.icon}`" /></span>
        <span>{{ item.title }}</span>
      </router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
  .nav {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    li {
      position: relative;
      &:before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 50%;
        width: 5px;
        height: 0;
        background-color: #A3A0FB;
      }
      a {
        display: flex;
        height: 53px;
        align-items: center;
        padding: 0 25px;
        color: #FFFFFF;
        text-decoration: none;
        gap: 11px;
      }
      .icon {
        color: #A5A4BF;
      }
      &.active {
        background-color: rgba(#000, 0.1);
        .icon {
          color: #A3A0FB;
        }
        &:before {
          height: 100%;
          top: 0;
        }
        a {

        }
      }
    }
  }
</style>
