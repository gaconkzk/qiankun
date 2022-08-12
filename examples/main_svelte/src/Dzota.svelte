<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { initialize_microapps, uninitialize_microapps } from './lib/micro-apps';

  let loading = true;
  let subapp;

  function push(subapp) {
    try {
      history.pushState(null, '', subapp);
    } catch (e) {
      console.error(e);
    }
  }

  const loader = (l) => {
    loading = l;
  };

  onMount(() => {
    if (subapp) {
      initialize_microapps(loader);
    }
  });

  onDestroy(() => {
    if (subapp) {
      uninitialize_microapps();
    }
  });
</script>

<div class="mainapp">
  <header class="mainapp-header">
    <h1>Dzota</h1>
  </header>
  <div class="mainapp-main">
    <!-- 侧边栏 -->
    <ul class="mainapp-sidemenu">
      <li><button on:click={() => push('/react16')} disabled={loading}>React16</button></li>
      <li><button on:click={() => push('/react15')} disabled={loading}>React15</button></li>
      <li><button on:click={() => push('/vue')} disabled={loading}>Vue</button></li>
      <li><button on:click={() => push('/vue3')} disabled={loading}>Vue3</button></li>
      <li><button on:click={() => push('/purehtml')} disabled={loading}>Purehtml</button></li>
    </ul>
    <!-- 子应用  -->
    <div id="subapp-container" bind:this={subapp}>
      {#if loading}
        <h4>loading...</h4>
      {/if}
      <div id="subapp-viewport" />
    </div>
  </div>
</div>
