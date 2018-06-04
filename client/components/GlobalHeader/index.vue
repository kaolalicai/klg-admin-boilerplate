<template>
  <div class="klg-global-header">
    <i
      :class="['klg-icon-collapsed', collapsed ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']"
      @click="changeLayoutCollapsed(!collapsed)"/>
    <el-dropdown
      v-if="username"
      @command="handleLogout">
      <span class="el-dropdown-link">
        {{ username }}<i class="el-icon-arrow-down el-icon--right"/>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import * as Cookies from 'js-cookie'
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'GlobalHeader',
  computed: {
    ...mapState('cookie', {
      username: state => state.username
    }),
    ...mapState('global', {
      collapsed: state => state.collapsed
    })
  },
  methods: {
    ...mapMutations('global', [
      'changeLayoutCollapsed'
    ]),
    handleLogout () {
      Cookies.remove('username')
      Cookies.remove('klg_token')
      location.reload(true)
    }
  }
}
</script>

<style scoped>
  .klg-global-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .klg-icon-collapsed {
    padding: 10px 10px 10px 0;
    cursor: pointer;
  }
</style>
