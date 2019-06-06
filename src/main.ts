import TodoMVC from './TodoMVC.svelte';

// @ts-ignore
window.todomvc = new TodoMVC({
	// @ts-ignore
	target: document.querySelector('.todoapp')
});
