using Microsoft.AspNetCore.Http;
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
    public class TodoController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> Get()
        {
            var todoitems = TodoItemPOCO.Store.FindAll(x => x.IsComplete == false);
            return todoitems.ToList();
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            if (TodoItemPOCO.Store.Any(item => item.ID == id))
            {
                //TodoItemPOCO.Store.RemoveAll(item => item.ID == id);
                TodoItemPOCO.Store.Find(item => item.ID == id).IsComplete = true;
                var todoitems = TodoItemPOCO.Store.FindAll(x => x.IsComplete == false);
                return Ok(todoitems);
            }

            return BadRequest(false);
        }
        [HttpPost]
        public ActionResult Post(TodoItem todoItem)
        {
            var id = TodoItemPOCO.Store.Count + 1;
            todoItem.ID = id;
            if (TodoItemPOCO.Store.All(item => item.ID != todoItem.ID))
            {
                
                TodoItemPOCO.Store.Add(todoItem);
                var todoitems = TodoItemPOCO.Store.FindAll(x => x.IsComplete == false);
                return Ok(todoitems);
            }
            return BadRequest(false);
        }
    }
}
