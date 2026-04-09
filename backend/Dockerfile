FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["SmartPantry.API.csproj", "./"]
RUN dotnet restore "SmartPantry.API.csproj"

COPY . .
RUN dotnet publish "SmartPantry.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "SmartPantry.API.dll"]