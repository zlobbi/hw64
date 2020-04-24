'use strict';

window.addEventListener('load', function () {
    async function getTasks() {
        return await fetch('http://localhost:8080/tasks')
    }

    getTasks().then(r => r.json()).then(data => {
        let count = data.length;
        for(let i = 0; i < count; i++) {
            let task = createTaskElem(data[i]);
            document.getElementById('tasks').append(task);
        }
    })

    const form = document.getElementById('task-form');
    form.addEventListener('submit', addTaskToList);

    function addTaskToList(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        if(data.get('task-name') === '') {
            document.getElementsByTagName('input')[0].placeholder = 'Please input a Task!';
            document.getElementsByTagName('input')[0].focus();
            return false;
        } else {
            document.getElementsByTagName('input')[0].placeholder = 'task name';
            sendTaskToServer(data).then(res=> res.json()).then(data => document
                .getElementById('tasks').append(createTaskElem(data)));
            document.getElementsByTagName('input')[0].focus();
            return true;
        }
    }

    async function sendTaskToServer(data) {
        const json = JSON.stringify(Object.fromEntries(data))
            const settings = {
                method: 'POST',
                cache: 'no-cache',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            }
        return await fetch('http://localhost:8080/add/', settings);
    }

    async function finishTask(taskId) {
        const settings = {
            method: 'PUT',
            body: taskId
        }
        await fetch('http://localhost:8080/finish', settings);

    }

    function createTaskElem(task) {
        let li = document.createElement('li');
        li.id = task.id;
        li.classList.add('list-group-item', 'list-group-item-primary', 'border-light', 'rounded', 'text-secondary', 'text-capitalize');
        li.innerHTML = task.task + ' ' + '<span class="badge badge-danger float-right badge-pill align-self-end">' + 'new' + '</span>';
        if(task.finished) {
            finishedTaskClassList(li);
        } else {
            addEvLisToTask(li);
        }
    return li;
    }

    function addEvLisToTask(task) {
        task.addEventListener('dblclick', async function () {
           finishedTaskClassList(task);
           await finishTask(task.id);
        })
    }

    function finishedTaskClassList(task) {
        task.classList.remove('list-group-item-primary')
        task.classList.add('line', 'list-group-item-success');
        let span = task.getElementsByTagName('span')[0];
        span.classList.remove('badge-danger');
        span.classList.add('badge-success');
        span.removeChild(span.firstChild);
        span.appendChild(document.createTextNode('success'));
    };
})




