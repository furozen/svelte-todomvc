//TODO use original @pyoner svelte-types as soon as this issue https://github.com/pyoner/svelte-types/issues/4 gone
import {Writable} from '@pyoner/svelte-types/types/svelte/interfaces';
import {derived, get, writable} from 'svelte/store';

const ENTER_KEY = 'Enter';
const ESCAPE_KEY = 'Escape';
export enum FilterStates {
  all = 'all',
  active = 'active',
  completed = 'completed'
}
export let currentFilter:Writable<FilterStates> = writable(FilterStates.all);


interface TodoRecord {
  id:string;
  description:string;
  completed:boolean;
}

type TodoRecords = TodoRecord[];
export const itemsStore:Writable<TodoRecords> = writable([]);


export let editingStore:Writable<number>=writable(NaN);

export const setCurrentFilter = (value:string)=>{

  currentFilter.set( FilterStates.all);
  if (value === '#/active') {
    currentFilter.set( FilterStates.active);
  } else if (value === '#/completed') {
    currentFilter.set( FilterStates.completed);
  }
}


export const clearCompleted = () => {
  itemsStore.update(items => items.filter(item => !item.completed));
};

export function remove(index:number) {
  itemsStore.update(items => items.slice(0, index).concat(items.slice(index + 1)));
}

export const setEditingIndex= (index:number) =>{
  editingStore.set(index)
}

export function toggleAll(event:Event) {
  itemsStore.update(items =>  items.map(item => ({
    id: item.id,
    description: item.description,
    // TS2339: Property 'checked' does not exist on type 'EventTarget'.
    //completed: event.target && (event.target).checked,
    // TS7017: Element implicitly has an 'any' type because type 'EventTarget' has no index signature.
    //completed: event.target && (event.target)['checked'],
    completed: event.target && (event.target as any).checked
  })));
}

export function createNew(event:KeyboardEvent) {

  if (event.key === ENTER_KEY) {
    // EventTarget -> HTMLInputElement
    let target = event.target as any as HTMLInputElement;
    itemsStore.update(items => items.concat({
      id: uuid(),
      description: target.value,
      completed: false
    }));
    target.value = '';
    console.log('createNew:', get(itemsStore));
  }
}

export function handleEdit(event:KeyboardEvent) {
  switch (event.key) {
    case ENTER_KEY:
      (event.target as any).blur();
      break;
    case ESCAPE_KEY:
      editingStore.set(NaN);
      break;
  }
}

export function submit(event:Event) {
  console.log('submit: editingStore', get(editingStore));
  itemsStore.update(items =>
    items.map((item, index) => {
      if (index === get(editingStore)) {
        return {
          ...item,
          description:(event.target as any).value
        }
      } else {
        return item;
      }
    }));
  console.log('submit: after', get(itemsStore));

   // @ts-ignore
  editingStore.set(undefined);
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
