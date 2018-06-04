<template>
  <el-container>
    <el-aside
      :width="collapsed ? '64px' : '220px'"
      class="klg-aside">
      <SiderMenu
        :collapsed="collapsed"
        :menu-data="getMenuData()"
      />
    </el-aside>
    <el-container>
      <el-header class="klg-header">
        <GlobalHeader />
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {mapState} from 'vuex'
import {getMenuData} from 'common/menu'
import SiderMenu from 'components/SiderMenu'
import GlobalHeader from 'components/GlobalHeader'

export default {
  name: 'BasicLayout',
  components: {
    SiderMenu,
    GlobalHeader
  },
  computed: {
    ...mapState('global', {
      collapsed: state => state.collapsed
    })
  },
  methods: {
    getMenuData
  }
}
</script>

<style scoped>
.klg-aside {
  min-height: 100vh;
  transition: 0.3s all ease;
}

.klg-header {
  border-bottom: 1px solid #e6e6e6;
}
</style>
