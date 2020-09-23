<template>
  <div class="wape">
    <TopPanel />
    <LeftPanel />
  </div>
</template>

<script>
import TopPanel from 'Components/layout/TopPanel.vue'
import LeftPanel from 'Components/layout/LeftPanel.vue'

export default {
    name: 'Wape',
    components: {
        TopPanel,
        LeftPanel
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style scoped>

</style>
