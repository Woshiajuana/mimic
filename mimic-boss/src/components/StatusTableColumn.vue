<template>
  <ElTableColumn label="状态" width="120px">
    <template #default="scope">
      <ElTag disable-transitions hit :type="statusMap[scope.row.status].type">{{
        statusMap[scope.row.status].label
      }}</ElTag>
    </template>
  </ElTableColumn>
</template>

<script lang="ts" setup>
  import { ato } from '@daysnap/utils'

  import { STATUS } from '@/utils'

  const statusMap = ato(STATUS, 'value')
</script>
