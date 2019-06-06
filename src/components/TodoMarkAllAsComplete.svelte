<script>
import {itemsStore,toggleAll} from '../TodoMVCLogic';
export let numCompleted;
</script>

<input id="toggle-all" class="toggle-all" type="checkbox" on:change={toggleAll} checked="{numCompleted === $itemsStore.length}">
<label for="toggle-all">Mark all as complete</label>
