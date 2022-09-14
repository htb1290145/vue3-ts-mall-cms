<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="logo" />
      <span v-show="!collapse">Vue3+TS</span>
    </div>
    <div class="menu">
      <el-menu
        background-color="#0c2135"
        text-color="#b7bdc3"
        active-text-color="#0a60bd"
        :default-active="defaultValue"
        :collapse="collapse"
      >
        <template v-for="item in userMenu" :key="item.id">
          <!-- 二级菜单 -->
          <!-- type=1 可展开的菜单。type=2，可点击的切换路由菜单 -->
          <template v-if="item.type === 1">
            <!-- 二级菜单的可以展开的标题 -->
            <el-sub-menu :index="item.id + ''">
              <template #title>
                <el-icon size="16px">
                  <User />
                </el-icon>
                <span>{{ item.name }}</span>
              </template>
              <!-- 遍历里面的item -->
              <template v-for="subitem in item.children" :key="subitem.id">
                <el-menu-item
                  :index="subitem.id + ''"
                  @click="menuItemClick(subitem)"
                >
                  <i v-if="subitem.icon" :class="subitem.icon"></i>
                  <span>{{ subitem.name }}</span>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <!-- 一级菜单 此处没有-->
          <template v-else-if="item.type === 2">
            <el-menu-item :index="item.id + ''">
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    // ref对象，使用需要.value
    const userMenu = computed(() => store.state.login.userMenu)

    // 菜单刷新后的选中->根据页面url得到当前激活菜单的id
    const route = useRoute()
    const currentPath = route.path
    const menu = pathMapToMenu(userMenu.value, currentPath)
    const defaultValue = ref(menu.id + '')

    // router
    const router = useRouter()
    const menuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return {
      userMenu,
      menuItemClick,
      defaultValue
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    img {
      height: 100%;
      margin: 0 10px;
    }
    span {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
}

.el-menu {
  border-right: none;
}
// hover 高亮
.el-menu-item:hover {
  color: #fff !important; // 菜单
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
