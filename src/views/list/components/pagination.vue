<template>
  <div>
    <a-pagination :current="current1" show-quick-jumper :total="500" @change="onChange" />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Pagination',
  setup () {
    const current = ref(1)
    const onChange = pageNumber => {
      console.log('Page: ', pageNumber)
    }
    return {
      current,
      onChange
    }
  }
})
</script>
