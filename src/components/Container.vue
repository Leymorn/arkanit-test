<script setup lang="ts">
</script>
<template>
    <div class="container">
        <slot></slot>
    </div>
</template>
<style lang="scss" scoped>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        margin: auto;
    }
</style>