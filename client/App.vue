<template>
  <router-view/>
</template>

<style>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #666;
    -webkit-font-smoothing: antialiased;
    margin: 0;
    padding: 0;
  }

  a {
    color: #20a0ff;
    background: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    transition: color .3s ease;
  }
</style>
