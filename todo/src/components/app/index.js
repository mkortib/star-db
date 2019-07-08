import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';


export default class App extends React.Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: '' // active, done, all
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      
      const newArr = [
        ...todoData.slice(0, idx), ...todoData.slice(idx + 1)
      ]

      return {
        todoData: newArr 
      }

    })
  }

  addItem = (text) => {
    // generate id ?
    const newItem = this.createTodoItem(text)

    // add element in arr ?
    this.setState(({ todoData }) => {
      let newAddItem = [...todoData, newItem]
      return {
        todoData: newAddItem
      }
    })
  }

  toggleProperty(arr, id, propName) {
      const idx = arr.findIndex((el) => el.id === id);

      // update object

      const oldItem = arr[idx];
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };

      return [
        ...arr.slice(0, idx), 
        newItem,
        ...arr.slice(idx + 1)
      ]
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
     
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }

    })
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
     
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }

    })
  }

  search(items, term) {

    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.indexOf(term) > -1
    })
  }

  onInputChar = (e) => {
    this.setState({
      term: e
    })
  }

  status = (items, filterName) => {
    if (filterName === 'all' || filterName === '') {
      return items;
    }

    if (filterName === 'done') {
      return items.filter((item) => {
        return item.done === true 
      })
    }

    if (filterName === 'active') {
      return items.filter((item) => {
        return item.important === true 
      })
    }

  }

  onFilterChange = (filterVal) => {
    this.setState({
      filter: filterVal
    })
  }

  render() {

    const { todoData, term, filter } = this.state;

    
    const visibleItems = this.search(todoData, term);

    const filterItems = this.status(visibleItems, filter);

    const doneCount = todoData
                      .filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onInputChar={ this.onInputChar }/>
          <ItemStatusFilter onFilterChange={ this.onFilterChange }/>
        </div>
        <TodoList 
          todos={filterItems} 
          onDeleted={ this.deleteItem }
          onToggleDone={ this.onToggleDone }
          onToggleImportant={ this.onToggleImportant }
        />
        <ItemAddForm onItemAdded={ this.addItem } />
      </div>
    )
  }
};

