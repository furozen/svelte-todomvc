<script>
import {currentFilter} from '../TodoMVCLogic';

</script>

<ul class="filters">
    <li><a class="{$currentFilter === 'all' ? 'selected' : ''}" href="#/">All</a></li>
    <li><a class="{$currentFilter === 'active' ? 'selected' : ''}" href="#/active">Active</a></li>
    <li><a class="{$currentFilter === 'completed' ? 'selected' : ''}" href="#/completed">Completed</a></li>
</ul>
