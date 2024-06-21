import { shallowMount } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue';
import { readTodos, createTodo, doneTodo, undoneTodo, updateTodos } from '@/api';

// Mock the entire api module
jest.mock('@/api');

describe('TodoList.vue', () => {
    let wrapper;

    beforeEach(() => {
        jest.clearAllMocks();
        wrapper = shallowMount(TodoList, {
            data() {
                return {
                    todos: [],
                    toggleSort: true,
                };
            },
        });
    });

    it('renders todo list', () => {
        expect(wrapper.findAll('li').length).toBe(1);
    });

    it('calls readTodos on created', () => {
        expect(readTodos).toHaveBeenCalled();
    });

    it('handles empty todos array', async () => {
        wrapper.setData({ todos: [] });
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.sortedTodos.length).toBe(0);
    });

    it('calls createTodo when posting a new todo', async () => {
        createTodo.mockResolvedValue({ id: 3, name: 'Todo 3', createdAt: new Date() });
        await wrapper.vm.post('Todo 3');
        expect(createTodo).toHaveBeenCalled();
        expect(wrapper.vm.todos.length).toBe(1);
    });

    it('calls doneTodo when marking a todo as done', async () => {
        wrapper.setData({
            todos: [{ id: 1, name: 'Todo 1', done: false }],
        });

        doneTodo.mockResolvedValue({ id: 1, name: 'Todo 1', done: true });
        await wrapper.vm.done(1);
        expect(doneTodo).toHaveBeenCalled();
        expect(wrapper.vm.todos[0].done).toBe(true);
    });

    it('calls undoneTodo when marking a todo as undone', async () => {
        wrapper.setData({
            todos: [{ id: 1, name: 'Todo 1', done: true }],
        });

        undoneTodo.mockResolvedValue({ id: 1, name: 'Todo 1', done: false });
        await wrapper.vm.undone(1);
        expect(undoneTodo).toHaveBeenCalled();
        expect(wrapper.vm.todos[0].done).toBe(false);
    });

    it('calls updateTodos on created if toggleSort is true', () => {
        expect(updateTodos).toHaveBeenCalled();
    });

    it('updates todo in the list', () => {
        wrapper.setData({
            todos: [{ id: 1, name: 'Todo 1', done: false }],
        });

        wrapper.vm.update(1, { id: 1, name: 'Todo 1 Updated', done: true });
        expect(wrapper.vm.todos[0].name).toBe('Todo 1 Updated');
        expect(wrapper.vm.todos[0].done).toBe(true);
    });

    it('handles error when fetching todos', async () => {
        readTodos.mockRejectedValue(new Error('Error fetching todos'));
        await wrapper.vm.getAll();
        expect(wrapper.vm.todos.length).toBe(0);
    });

    it('renders todos correctly', async () => {
        wrapper.setData({
            todos: [
                { id: 1, name: 'Todo 1', createdAt: new Date('2023-01-01') },
                { id: 2, name: 'Todo 2', createdAt: new Date('2023-01-02') },
            ],
        });

        await wrapper.vm.$nextTick();
        expect(wrapper.findAll('li').length).toBe(2);
    });

    it('correctly sorts todos by date', async () => {
        const todos = [
            { id: 1, name: 'Todo 1', createdAt: new Date('2023-01-01') },
            { id: 2, name: 'Todo 2', createdAt: new Date('2023-01-02') },
        ];
        wrapper.setData({ todos });
        await wrapper.vm.$nextTick();
        const sortedTodos = wrapper.vm.sortedTodos;
        expect(sortedTodos[0].id).toBe(2);
        expect(sortedTodos[1].id).toBe(1);
    });
});
