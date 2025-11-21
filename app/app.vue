<script setup>
import favicon16 from '~/assets/favicon/favicon-16x16.png'
import favicon32 from '~/assets/favicon/favicon-32x32.png'
import faviconIco from '~/assets/favicon/favicon.ico'

useHead({
  title: 'Hello',
  link: [
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: favicon16 },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: favicon32 },
    { rel: 'icon', type: 'image/x-icon', href: faviconIco }
  ]
})
</script>

<template>
  <div>
    <CollapsibleList />
    <NuxtPage />
  </div>
</template>


