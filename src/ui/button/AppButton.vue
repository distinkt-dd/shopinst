<template>
  <button class="button">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  border-radius: var(--border-radius-lg);
  border: none;
  font-size: 14px;
  color: var(--color-text-main);
  font-weight: 600;
  cursor: pointer;

  background: transparent;

  &-square-44 {
    border-radius: 0;
    border: none;
    font-size: unset;
    color: currentColor;
    @include square(44px);

    @include hover {
      color: var(--color-accent);
    }
  }

  &-accent {
    border: 2px solid var(--color-accent);

    @include hover {
      color: var(--color-white);
      background-color: var(--color-accent);
    }

    &.active {
      background-color: var(--color-accent);
      color: var(--color-white);
    }
  }

  &-gradient {
    background-image: radial-gradient(200.23% 350.39% at -64.02% 210.29%, #ffa500 0%, #473cfb 100%);
    background-size: 100% 100%;
    background-position: left center;
    filter: brightness(100%) saturate(100%);
    transition: filter var(--transition-duration) ease;
    &:hover {
      filter: brightness(110%) saturate(170%);
    }
  }

  &[disabled] {
    filter: brightness(70%);
    pointer-events: none;
    cursor: not-allowed;
  }
}
</style>