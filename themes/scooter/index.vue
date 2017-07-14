<template>
  <div v-if="false"></div>
</template>
<style>
a {
  color: inherit;

  &:hover {
    color: #638dd4;
  }
}

.c-arrow {

}

.c-circle {
  display: inline-block;
  border: 5px solid currentColor;
  border-radius: 50%;
}

.c-arrow--left,
.c-arrow--right {
  display: inline-block;
  width: 0;
  height: 0;
  border: 5px solid transparent;
}

.c-arrow--left {
  border-right-color: currentColor;
}

.c-arrow--right {
  border-left-color: currentColor;
}
</style>