<template>
    <el-row :gutter="20" type="flex" justify="center">
        <el-col :xs="24" :xl="16" :sm="16">
             <h3 class="product_tit">投票列表</h3>
             <el-collapse v-model="activeName" accordion>
                <el-collapse-item
                        v-for="(item, index) in list"
                        v-bind:title="item.Tuse_content"
                        v-bind:name="index"
                        v-bind:key="index"
                        >
                    <el-tag type="success">维修金额：{{item.Tuse_hezhunAmount}}</el-tag>
                    <el-tag type="success">维修范围：{{item.Tuse_fentanHouse}}</el-tag>
                    <el-tag type="success">分摊金额：{{item.TuseHouse_sumAmount}}</el-tag>
                    <el-tag type="success">现金分摊：{{item.TuseHouse_XJfentan}}</el-tag>
                    <el-button type="text" @click="dialogFormVisible = true">点击投票</el-button>
                </el-collapse-item>
            </el-collapse>
        </el-col>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
import {fetchList} from '@/api/vote'
export default {
  name: 'VoteList',
  data () {
    return {
      activeName: ['0'],
      list: null,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      fetchList(this.$store.getters.uid).then(response => {
        this.list = response.list
      })
    }
  }
}
</script>

<style scoped>

</style>
