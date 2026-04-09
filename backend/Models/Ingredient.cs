using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SmartPantry.API.Models;

public class Ingredient
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public double Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public DateTime AddedAt { get; set; }
    public DateTime ExpiresAt { get; set; }
}