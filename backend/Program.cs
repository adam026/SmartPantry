using SmartPantry.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddSingleton<MongoDbService>();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
