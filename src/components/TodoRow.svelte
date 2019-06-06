<script>
import {remove,setEditingIndex} from '../TodoMVCLogic';

  export let item;
  export let index
</script>


<div class="view">
    <input class="toggle" type="checkbox" bind:checked={item.completed}>
    <label on:dblclick="{() => setEditingIndex(index)}">{item.description}</label>
    <button on:click="{() => remove(index)}" class="destroy"></button>
</div>
