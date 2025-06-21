<template>
  <ElTableColumn fixed="right" label="操作" width="110px" v-bind="$attrs">
    <template #default="scope">
      <ProTableActions :span="span">
        <slot :row="scope.row" :index="scope.$index"> </slot>
      </ProTableActions>
    </template>
  </ElTableColumn>
</template>

<script setup lang="ts">
  defineProps({
    span: {
      type: Number,
      default: 12,
    },
  })
</script>
