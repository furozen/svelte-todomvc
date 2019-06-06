<script>
import {handleEdit,submit,editingStore} from '../TodoMVCLogic';

  export let item;
  export let index;
  // put this {#if $editingStore === index} here fix run-time error
  // todo move the condition to level up after new version svelte is arrived
</script>
{#if $editingStore === index}
<input
    value='{item.description}'
    id="edit"
    class="edit"
    on:keydown={handleEdit}
    on:blur={submit}

>
{/if}
