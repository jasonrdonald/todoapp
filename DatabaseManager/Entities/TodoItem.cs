using System;
using System.Collections.Generic;
using System.Text;

namespace DatabaseManager.Entities
{
    public class TodoItem
    {
        public int ID { get; set; }
        public string Task { get; set; }
        public bool IsComplete { get; set; }
    }
}
