'use strict';
const baseUrl = 'http://localhost:8080';

window.addEventListener('load', function () {
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
            document.getElementById('tasks').append(createTaskElem(data.get('task-name')));
            document.getElementsByTagName('input')[0].focus();
            return true;
        }
    }

    function createTaskElem(task) {
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'list-group-item-primary', 'border-light', 'rounded', 'text-secondary', 'text-capitalize');
        li.innerHTML = task + ' ' + '<span class="badge badge-danger float-right badge-pill align-self-end">' + 'new' + '</span>';
        addEvLisToTask(li);
    return li;
    }

    function addEvLisToTask(task) {
        task.addEventListener('dblclick', function () {
            task.classList.remove('list-group-item-primary')
            task.classList.add('line', 'list-group-item-success');
            let span = task.getElementsByTagName('span')[0];
            span.classList.remove('badge-danger');
            span.classList.add('badge-success');
            span.removeChild(span.firstChild);
            span.appendChild(document.createTextNode('success'));
        })
    }

    // async function createUser(userFormData) {
    //     const userJSON = JSON.stringify(Object.fromEntries(userFormData))
    //     const settings = {
    //         method: 'POST',
    //         cache: 'no-cache',
    //         mode: 'cors',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: userJSON
    //     }
    //
    //     const response = await fetch(baseUrl + '/registration', settings).then(res => res.json());
    //     console.log(response.id);
    //     window.location.href = baseUrl + '/index';
    // }
})




