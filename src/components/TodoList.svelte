<script>
import {editingStore} from '../TodoMVCLogic';
import TodoRow from "./TodoRow.svelte";
import TodoRowEdit from "./TodoRowEdit.svelte";
export let filtered;

</script>

<ul class="todo-list">

    {#each filtered as item, index (item.id)}

        <li class="{item.completed ? 'completed' : ''} {$editingStore === index ? 'editing' : ''}">
            <TodoRow {item} {index} />
            <TodoRowEdit {item} {index}/>

        </li>
    {/each}

</ul>
