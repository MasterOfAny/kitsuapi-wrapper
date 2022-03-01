<template>
  <footer id="footer">
    <div class="container">
      <div class="footer__copyright">
        <p class="footer__copyright-text">
          Copyright Anime-api wrapper © 2022 | All rights reserved | Track Anime
          Online
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footerUI",
};
</script>

<style scoped>
#footer {
  background: #2c2f30;
  padding: 30px 0;
  text-align: center;
}

.footer__copyright-text {
  color: white;
  font-size: 20px;
}
</style>