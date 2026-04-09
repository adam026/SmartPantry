using MongoDB.Driver;
using SmartPantry.API.Models;

namespace SmartPantry.API.Services;

public class MongoDbService
{
    private readonly IMongoCollection<Ingredient> _ingredients;

    public MongoDbService(IConfiguration configuration)
    {
        var client = new MongoClient(configuration["MongoDbSettings:ConnectionString"]);
        var database = client.GetDatabase(configuration["MongoDbSettings:DatabaseName"]);

        _ingredients = database.GetCollection<Ingredient>(
            configuration["MongoDbSettings:IngredientsCollection"]);
    }

    public async Task<List<Ingredient>> GetAsync() =>
        await _ingredients.Find(_ => true).ToListAsync();

    public async Task<Ingredient?> GetAsync(string id) =>
        await _ingredients.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Ingredient ingredient) =>
        await _ingredients.InsertOneAsync(ingredient);

    public async Task UpdateAsync(string id, Ingredient ingredient) =>
        await _ingredients.ReplaceOneAsync(x => x.Id == id, ingredient);

    public async Task DeleteAsync(string id) =>
        await _ingredients.DeleteOneAsync(x => x.Id == id);
}