using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TareasApi.Data;
using TareasApi.Models;

namespace TareasApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TareasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TareasController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarea>>> GetTareas()
        {
            return await _context.Tareas.ToListAsync();
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Tarea>> GetTareas(int id)
        {

            var tarea = await _context.Tareas.FindAsync(id);

            if (tarea == null)
            {
                return NotFound();
            }

            return tarea;
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> PutTarea(int id, Tarea tarea)
        {
            if (id != tarea.Id)
            {
                return BadRequest();
            }

            _context.Entry(tarea).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TareaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }


        [HttpPost]
        public async Task<ActionResult<Tarea>> PostTarea(Tarea tarea){
            _context.Tareas.Add(tarea);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTareas), new { id = tarea.Id }, tarea);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Tarea>> DeleteTarea(int id){
            var tarea = await _context.Tareas.FindAsync(id);
            if (tarea == null){
                return NotFound();
            }

            _context.Tareas.Remove(tarea);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TareaExists(int id){
            return _context.Tareas.Any(e => e.Id == id);
        }

    }
}