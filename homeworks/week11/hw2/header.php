<nav class="navbar">
  <div class="navbar__sitename">
    <a href="index.php">Ding's Blog</a>
  </div>
  <div class="navbar__lists">
    <div class="navbar__list-left">
      <a href="articles.php">文章列表</a>
      <a href="#">分類專區</a>
      <a href="#">關於我</a>
    </div>
    <div class="navbar__list-right">
      <?php if (empty($_SESSION)) { ?>
        <a href="login.php">登入</a>
        <?php } else {
        if ($role == 'ADMIN') { ?>
          <a href="admin.php">管理後台</a>
          <a href="handle_logout.php">登出</a>
        <?php } else { ?>
          <a href="handle_logout.php">登出</a>
      <?php }
      } ?>
    </div>
  </div>
</nav>