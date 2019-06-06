<script>
  export let numActive;
</script>
<span class="todo-count">
    <strong>{numActive}</strong> {numActive === 1 ? 'item' : 'items'} left
</span>
