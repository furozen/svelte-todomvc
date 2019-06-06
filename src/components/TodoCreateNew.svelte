<script>
import {createNew} from '../TodoMVCLogic';

</script>
<input
    class="new-todo"
    on:keydown={createNew}
    placeholder="What needs to be done?"
>
