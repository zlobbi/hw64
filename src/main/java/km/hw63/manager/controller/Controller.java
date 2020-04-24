package km.hw63.manager.controller;

import km.hw63.manager.model.Task;
import km.hw63.manager.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class Controller {
    private final TaskService service;

    public Controller(TaskService service) {
        this.service = service;
    }

    @GetMapping("/clear")
    public String clearDb() {
        service.clearAllTasks();
        return "cleared";
    }

    @GetMapping("/tasks")
    public Iterable<Task> getTasks() {
        return service.findAllTasks();
    }

    @PostMapping(value = "/add", headers = "Accept=application/json")
    public Task addTask(@RequestBody Map<String, String> data) {
        Task task = new Task(data.get("task-name"));
        service.saveTask(task);
        return task;
    }

    @PutMapping(value = "/finish", headers = "Accept=text/plain")
    public String finishTask(@RequestBody String taskId) {
        service.finishTask(taskId);
        return "success";
    }
}
