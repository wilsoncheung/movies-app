<template>
  <div>
    <!-- class="container"-->
    <!-- <div class="filters">
        <div>1 things</div>
        <div>2 things</div>
        <div>3 things</div>
        <div>4 things</div>
      </div>
      <div class="content">
        <div class="search">5 things</div>
        <div>6 things</div>
        <div>7 things</div>
        <div>8 things</div>
        <div>9 things</div>
        <div>10 things</div>
      </div> -->
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
/* .container {
  margin: 1em 5em;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-column-gap: 25px;
} */
.filters {
  /* grid-row-start: 1;
  grid-row-end: 3; */
  display: grid;
  grid-row-gap: 10px;
}
.content {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
}
.search {
  grid-column: 1/6;
}
</style>