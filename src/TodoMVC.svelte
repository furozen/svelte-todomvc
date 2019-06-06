<script>

import {itemsStore, setCurrentFilter,editingStore,currentFilter} from './TodoMVCLogic';

import TodoRow from "./components/TodoRow.svelte";
import TodoRowEdit from "./components/TodoRowEdit.svelte";
import TodoMarkAllAsComplete from "./components/TodoMarkAllAsComplete.svelte";
import TodoClearCompleted from "./components/TodoClearCompleted.svelte";
import TodoFilters from "./components/TodoFilters.svelte";
import TodoNumActive from "./components/TodoNumActive.svelte";
import TodoCreateNew from "./components/TodoCreateNew.svelte";


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
	<TodoCreateNew />
</header>




{#if $itemsStore.length > 0}
	<section class="main">
		<TodoMarkAllAsComplete />

		<ul class="todo-list">

			{#each filtered as item, index (item.id)}

				<li class="{item.completed ? 'completed' : ''} {$editingStore === index ? 'editing' : ''}">
                    <TodoRow {item} {index} />
                    <TodoRowEdit {item} {index}/>

				</li>
			{/each}

		</ul>

		<footer class="footer">
			<TodoNumActive {numActive}/>

			<TodoFilters/>

			{#if numCompleted}
				<TodoClearCompleted/>
			{/if}
		</footer>
	</section>
{/if}


