<template>
  <div
    :class="collapsed ? 'klg-layout-sider--collapsed' : ''"
    class="klg-layout-sider">
    <header class="klg-layout-sider-title">
      <span class="klg-layout-logo-wrapper">
        <img
          :src="require('../../assets/logo.png')"
          class="klg-layout-logo">
      </span>
      <span
        v-if="!collapsed"
        class="klg-layout-sider-subtitle">
        运营后台
      </span>
    </header>
    <el-menu
      :router="true"
      :default-active="$route.path"
      :collapse="collapsed"
    >
      <template v-for="menu in menuData">
        <el-submenu
          v-if="menu.children"
          :key="menu.path"
          :index="menu.path">
          <template slot="title">
            <i
              v-if="menu.icon"
              :class="`el-icon-${menu.icon}`"/>
            <span slot="title">{{ menu.name }}</span>
          </template>
          <el-menu-item
            v-for="item in menu.children"
            :key="item.path"
            :index="item.path">
            {{ item.name }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-if="!menu.children"
          :key="menu.path"
          :index="menu.path">
          <i
            v-if="menu.icon"
            :class="`el-icon-${menu.icon}`"/>
          <span slot="title">{{ menu.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'SiderMenu',
  props: {
    collapsed: {
      type: Boolean,
      default: true
    },
    menuData: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
  .klg-layout-logo {
    height: 48px;
  }

  .klg-layout-sider {
    height: 100%;
  }

  .klg-layout-sider-title {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 15px 8px;
    border-bottom: 1px solid #e6e6e6;
    border-right: 1px solid #fafafa;
  }

  .klg-layout-sider--collapsed .klg-layout-logo-wrapper {
    overflow: hidden;
  }

  .klg-layout-sider-subtitle {
    word-break: keep-all;
    margin-left: 10px;
    font-size: 18px;
    font-weight: 500;
  }

  .klg-layout-sider .el-menu {
    height: calc(100% - 60px);
  }

  .klg-layout-sider .el-menu:not(.el-menu--collapse) {
    width: 100%;
  }

  .klg-layout-sider .el-menu-item.is-active {
    background-color: #ecf5ff;
  }
</style>
