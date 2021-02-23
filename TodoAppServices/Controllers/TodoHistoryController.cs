using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoAppServices.Entities;

namespace TodoAppServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoHistoryController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> Get()
        {
            var completed = TodoItemPOCO.Store.FindAll(x => x.IsComplete == true);
            return completed.ToList();
        }
    }
}
