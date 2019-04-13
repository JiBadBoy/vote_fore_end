<template>
    <el-row :gutter="20" type="flex" justify="center">
        <el-col :xs="24" :xl="16" :sm="16">
            <div class="logo">
                <h1>
                    <router-link class="w3lsbrand" to="/">
                        <span>维</span>
                        <i>住宅专项维修资金使用业主表决系统</i>
                    </router-link>
                </h1>
            </div>
        </el-col>
    </el-row>
</template>
<script>
export default {
  name: 'AppHeader'
}
</script>
