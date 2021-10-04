<script>
  import Icon from './Icon.svelte'
  export let items = []
  export let components = []

  $: {
    items.map((item) => {
      item.fixed = item.fixed || false
      item.style = customStyle(item.contentStyle)
      item.collapsed = item.collapsed || false
      item.component = components[item.componentName]

      if (!item.componentName)
        console.error(`Component name was not specified for "${item.title}".`)
      if (item.componentName && !item.component)
        console.error(
          `Expected component "${item.componentName}" was not available.`
        )
    })
  }

  function customStyle(s) {
    let style = ''
    if (s) {
      for (const [key, value] of Object.entries(s)) {
        style += `${key}: ${value};`
      }
    }
    return style
  }
</script>

<style>
  :root {
    --darker-10: rgba(0, 0, 0, 0.1);
    --darker-20: rgba(0, 0, 0, 0.2);
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    border: 1px solid var(--darker-20);
    user-select: none;
  }
  li {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
  }
  li:first-child > span {
    border-top: none;
  }
  span {
    display: flex;
    line-height: 1.5em;
    background-color: var(--darker-10);
    padding: 0.5em;
    border-top: 1px solid var(--darker-20);
    border-bottom: 1px solid var(--darker-20);
  }
  img {
    width: 1.5em;
    height: 1.5em;
    margin-right: 0.5em;
  }
  svg {
    position: absolute;
    right: 0.5em;
    align-self: flex-end;
    opacity: 0.5;
  }
  li > div {
    display: flex;
  }
  .overlay > span {
    display: none;
  }
  .overlay {
    border-bottom: 1px solid var(--darker-20);
  }
  /* 	.overlay > span {
		position: absolute;
		flex-grow: 1;
		bottom: 1em;
		width: 100%;
		line-height: 1em;
		border-bottom: none;
	}
	.overlay img {
		position: absolute;
		width: 3em;
		height: 3em;
		bottom: -.5em;
	}
	.overlay caption {
		position: relative;
		left: 3.5em;
	}
	.overlay svg {
		right: 2.5em
	} */
  .closed:not(:last-child) > span {
    border-bottom: none;
  }
  .closed > div {
    display: none;
  }
  .closed > span {
    display: flex;
  }
  /* 	.closed > span {
		position: relative;
		line-height: 1.5em;
		top: 0;
	}
	.closed img {
		position: relative;
		top: 0;
		width: 1.5em;
		height: 1.5em;
	}
	.closed caption {
		left: 0;
	} */
</style>

<ul>
  {#each items as item}
    <li
      class:closed={item.collapsed}
      class:overlay={item.overlay}
      on:click={() => (item.collapsed = item.fixed ? item.collapsed : !item.collapsed)}>
      <span>
        {#if item.icon}<img src={item.icon} alt={item.title} />{/if}
        <caption>{item.title}</caption>
        {#if !item.fixed}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24">
            {#if item.collapsed}
              <path
                d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z"
                fill="none" />
              <path
                d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
            {:else}
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            {/if}
          </svg>
        {/if}
      </span>
      {#if item.component}
        <div style={item.style}>
          <svelte:component this={item.component} {...item.data} />
        </div>
      {/if}
    </li>
  {/each}
</ul>
