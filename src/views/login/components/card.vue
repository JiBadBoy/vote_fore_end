<template>
    <el-row :gutter="12"  type="flex" justify="center">
        <el-col :span="8">
            <el-card shadow="always">
                <el-alert
                        title="该功能暂未开放"
                        type="error"
                        :closable="false"
                        center
                        show-icon>
                </el-alert>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'card'
}
</script>

<style scoped>

</style>
