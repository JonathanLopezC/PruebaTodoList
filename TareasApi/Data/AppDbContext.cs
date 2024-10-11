using Microsoft.EntityFrameworkCore;
using TareasApi.Models;

namespace TareasApi.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Tarea> Tareas { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){
            
        }
    }
}
