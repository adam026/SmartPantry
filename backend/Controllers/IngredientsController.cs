using Microsoft.AspNetCore.Mvc;
using SmartPantry.API.Models;
using SmartPantry.API.Services;

namespace SmartPantry.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IngredientsController : ControllerBase
{
    private readonly MongoDbService _service;

    public IngredientsController(MongoDbService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<List<Ingredient>> Get() =>
        await _service.GetAsync();

    [HttpPost]
    public async Task<IActionResult> Post(Ingredient ingredient)
    {
        await _service.CreateAsync(ingredient);
        return Ok(ingredient);
    }
}