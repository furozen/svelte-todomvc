<script>

import {currentFilter,itemsStore,editingStore, setCurrentFilter, clearCompleted,remove,toggleAll, createNew, handleEdit,submit} from './TodoMVCLogic';

import {get} from 'svelte/store';

    try {
      itemsStore.push( JSON.parse(localStorage.getItem('todos-svelte')));
    } catch (err) {
      itemsStore.length = 0;
    }

    const updateView = () => {
      setCurrentFilter(window.location.hash);
    };

    window.addEventListener('hashchange', updateView);
    updateView();


	$: filtered =  $itemsStore.filter(item => {
	  console.debug('filtred item', JSON.stringify(item), ' $current:',$currentFilter);
	  switch ($currentFilter) {
	    case 'all': return true;
	    case 'completed': return item.completed;
	    case 'active': return !item.completed;
	  }
	});


	$: numActive = $itemsStore.filter(item => !(item && item.completed)).length;

	$: numCompleted = $itemsStore.filter(item => (item && item.completed)).length;

	$: try {
		localStorage.setItem('todos-svelte', JSON.stringify($itemsStore));
	} catch (err) {
		// noop
	}
</script>

<header class="header">
	<h1>todos</h1>
	<input
		class="new-todo"
		on:keydown={createNew}
		placeholder="What needs to be done?"
		autofocus
	>
</header>




{#if $itemsStore.length > 0}
	<section class="main">
		<input id="toggle-all" class="toggle-all" type="checkbox" on:change={toggleAll} checked="{numCompleted === $itemsStore.length}">
		<label for="toggle-all">Mark all as complete</label>

		<ul class="todo-list">

			{#each filtered as item, index (item.id)}

				<li class="{item.completed ? 'completed' : ''} {$editingStore === index ? 'editing' : ''}">

					<div class="view">
						<input class="toggle" type="checkbox" bind:checked={item.completed}>
                        <label on:dblclick="{() => $editingStore = index}">{item.description}</label>
						<button on:click="{() => remove(index)}" class="destroy"></button>
					</div>

					{#if $editingStore === index}
						<input
							value='{item.description}'
							id="edit"
							class="edit"
							on:keydown={handleEdit}
							on:blur={submit}
							autofocus
						>
					{/if}
				</li>
			{/each}

		</ul>

		<footer class="footer">
			<span class="todo-count">
				<strong>{numActive}</strong> {numActive === 1 ? 'item' : 'items'} left
			</span>

			<ul class="filters">
				<li><a class="{$currentFilter === 'all' ? 'selected' : ''}" href="#/">All</a></li>
				<li><a class="{$currentFilter === 'active' ? 'selected' : ''}" href="#/active">Active</a></li>
				<li><a class="{$currentFilter === 'completed' ? 'selected' : ''}" href="#/completed">Completed</a></li>
			</ul>

			{#if numCompleted}
				<button class="clear-completed" on:click={clearCompleted}>
					Clear completed
				</button>
			{/if}
		</footer>
	</section>
{/if}


