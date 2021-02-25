using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoAppServices.Entities
{
    public static class TodoItemPOCO
    {
        public static List<TodoItem> Store { get; set; } = new List<TodoItem>() { new TodoItem { ID = 1, Task = "Task 1", IsComplete = false },
                                                new TodoItem{ ID = 2, Task = "Task 2", IsComplete = false},
                                                new TodoItem{ ID = 3, Task = "Task 3", IsComplete = true},
                                                new TodoItem{ ID = 4, Task = "Task 4", IsComplete = true}
                                                        };

    }
}
