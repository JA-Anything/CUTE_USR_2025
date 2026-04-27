<template>
  <div class="content-page cute-community-page">
    <div class="placeholder">
      <span class="placeholder__badge">中國科技大學</span>
      <h2 class="placeholder__title">社區生態資源與生活</h2>
      <p class="placeholder__sub">頁面建置中</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.cute-community-page {
  min-height: 60vh;
  background-color: $bg;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder {
  text-align: center;

  &__badge {
    display: inline-block;
    padding: 4px 14px;
    background-color: $og1;
    color: #fff;
    font-size: 13px;
    border-radius: 999px;
    margin-bottom: 16px;
  }

  &__title {
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 8px;
  }

  &__sub {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
}
</style>
