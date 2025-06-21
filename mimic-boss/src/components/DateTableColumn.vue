<template>
  <ElTableColumn label="时间" width="200px">
    <template #default="scope">
      <ul>
        <li>创建：{{ format(scope.row.createdAt) }}</li>
        <li>更新：{{ format(scope.row.updatedAt) }}</li>
      </ul>
    </template>
  </ElTableColumn>
</template>

<script setup lang="ts">
  import { formatDate } from '@daysnap/utils'

  const format = (v: string) => formatDate(new Date(v))
</script>
