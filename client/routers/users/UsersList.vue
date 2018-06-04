<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="用户角色">
        <klg-router-select
          :multiple="true"
          :options="USER_ROLES_OPTIONS"
          filter-key="role"
          @change="fetchData"
        />
      </el-form-item>
    </el-form>
    <div v-loading="isLoading">
      <el-table
        :data="data">
        <el-table-column
          prop="createdAt"
          label="注册时间"/>
        <el-table-column
          label="角色">
          <template slot-scope="scope">
            <span>{{ USER_ROLES_TEXT[scope.row.role] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="真实姓名"/>
        <el-table-column
          prop="phone"
          label="手机号码"/>
      </el-table>
      <klg-router-pagination
        :total="total"
        @change="fetchData"/>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import {mapActions, mapState} from 'vuex'
import convertApiQuery from 'utils/convertApiQuery'
import Const from 'common/const'

export default {
  data () {
    return {
      USER_ROLES_OPTIONS: Const.USER_ROLES_OPTIONS,
      USER_ROLES_TEXT: Const.USER_ROLES_TEXT
    }
  },
  computed: {
    ...mapState('users', {
      data: state => _.get(state, ['list', 'data', 'docs']),
      isLoading: state => _.get(state, ['list', 'isLoading']),
      error: state => _.get(state, ['list', 'error']),
      total: state => _.get(state, ['list', 'data', 'total'])
    })
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    ...mapActions('users', ['fetchUserList']),
    fetchData () {
      this.fetchUserList({query: convertApiQuery(this.$route.query)})
    }
  }
}
</script>
