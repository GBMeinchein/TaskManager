using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task.Models;

namespace Task.Controllers
{
    [Route("api/[controller]")]
    public class TarefasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TarefasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("api/Tarefas/Index")]
        public IEnumerable<Tarefas> Index()
        {
            return _context.Tarefas;
        }

        // GET: api/Tarefas
        [HttpGet]
        public IEnumerable<Tarefas> GetTarefas()
        {
            return _context.Tarefas;
        }

        // GET: api/Tarefas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTarefas([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tarefas = await _context.Tarefas.FindAsync(id);

            if (tarefas == null)
            {
                return NotFound();
            }

            return Ok(tarefas);
        }

        // PUT: api/Tarefas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTarefas([FromRoute] int id, Tarefas tarefas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tarefas.Id)
            {
                return BadRequest();
            }

            _context.Entry(tarefas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TarefasExists(id))
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

        // POST: api/Tarefas
        [HttpPost]
        public async Task<IActionResult> PostTarefas(Tarefas tarefas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Tarefas.Add(tarefas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTarefas", new { id = tarefas.Id }, tarefas);
        }

        // DELETE: api/Tarefas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarefas([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tarefas = await _context.Tarefas.FindAsync(id);
            if (tarefas == null)
            {
                return NotFound();
            }

            _context.Tarefas.Remove(tarefas);
            await _context.SaveChangesAsync();

            return Ok(tarefas);
        }

        private bool TarefasExists(int id)
        {
            return _context.Tarefas.Any(e => e.Id == id);
        }
    }
}