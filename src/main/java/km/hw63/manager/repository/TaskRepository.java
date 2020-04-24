package km.hw63.manager.repository;

import km.hw63.manager.model.Task;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TaskRepository extends PagingAndSortingRepository<Task, String> {
}
