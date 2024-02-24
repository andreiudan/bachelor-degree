using WorkPlanner.DataAccess;
using Microsoft.EntityFrameworkCore;
using WorkPlanner.Interfaces.DataAccess;
using WorkPlanner.Interfaces.Business;
using WorkPlanner.Business.Commands;
using AutoMapper;
using WorkPlanner.Business;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using WorkPlanner.Domain;
using WorkPlanner.Api;
using WorkPlanner.Business.UserRegistration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var config = new MapperConfiguration(cfg =>
{
    cfg.AddProfile<MappingProfile>();
});

var mapper = config.CreateMapper();

builder.Services.AddSingleton(mapper);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
               builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddDbContext<WorkPlannerContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("Default"));
});

builder.Services.AddMediatR(cfg => 
    cfg.RegisterServicesFromAssemblies(typeof(UserRegistrationCommand).Assembly));

builder.Services.AddOptions<JwtBearerConfiguration>()
    .Bind(builder.Configuration.GetSection(nameof(JwtBearerConfiguration)));

builder.Services.ConfigureOptions<JwtBearerOptionsConfigurator>();

builder.Services.AddAuthentication(option =>
{
    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer();

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddSingleton<IPasswordHasher, PasswordHasher>();
builder.Services.AddSingleton<IUsernameGenerator, UsernameGenerator>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
