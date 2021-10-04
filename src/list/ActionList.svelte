<script>
  import { createEventDispatcher } from 'svelte'

  export let items = []
  export let autofilter = false
  export let action = false

  let dispatch = createEventDispatcher()
  let searchText = ''
  let current = 0

  function click(index) {
    current = index
    dispatch('active', { index, data: items[current] })
  }

  $: filtered = items.filter((item) =>
    item.toLowerCase().match(searchText.toLowerCase())
  )
</script>

<style>
  aside {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  span {
    width: 100%;
    padding: 0.5em;
    box-sizing: border-box;
  }
  input {
    width: 100%;
    margin: 0;
    box-sizing: border-box;
    border-radius: 1em;
    line-height: 2em;
    padding: 0 1em;
    outline: none;
  }
  input::placeholder {
    color: rgba(0, 0, 0, 0.5);
    font-size: smaller;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    line-height: 1.5em;
    cursor: pointer;
  }
  li {
    display: flex;
    /* 		min-height: 2em; */
    padding: 0.5em;
    align-items: center;
  }
  li:last-child {
    border-bottom: none;
    min-height: 0;
  }
  p {
    flex: 1 1 auto;
    margin: 0;
    font-size: smaller;
    line-height: 1.2em;
  }
  svg {
    width: 1em;
    height: 1em;
    stroke: currentcolor;
    fill: none;
    flex-shrink: 0;
  }
</style>

<aside>
  {#if autofilter}
    <span class="header etched">
      <input type="text" placeholder="search" bind:value={searchText} />
    </span>
  {/if}
  <ul>
    {#each filtered as content, i}
      <li
        class="etched {i === current ? 'active' : ''}"
        on:click={() => click(i)}>
        <p>{content}</p>
        {#if action}
          <svg viewBox="0 0 24 24"><path d="M16 7 L20 12 L16 17" /></svg>
        {/if}
      </li>
    {/each}
    <li />
  </ul>
</aside>
