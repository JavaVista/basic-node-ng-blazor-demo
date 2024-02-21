using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;

public class MarvelApiService
{
    private readonly HttpClient _httpClient;
    private readonly string _publicKey = "your_public_key_here";
    private readonly string _privateKey = "your_private_key_here";

    public MarvelApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    private string GenerateHash(long timestamp)
    {
        using (var md5 = MD5.Create())
        {
            var bytes = md5.ComputeHash(Encoding.UTF8.GetBytes($"{timestamp}{_privateKey}{_publicKey}"));
            return BitConverter.ToString(bytes).Replace("-", "").ToLowerInvariant();
        }
    }

    public async Task<dynamic> FetchCharacter(string characterName)
    {
        long timestamp = DateTimeOffset.Now.ToUnixTimeSeconds();
        string hash = GenerateHash(timestamp);
        string url = $"https://gateway.marvel.com:443/v1/public/characters?ts={timestamp}&apikey={_publicKey}&hash={hash}&name={characterName}";

        return await _httpClient.GetFromJsonAsync<dynamic>(url);
    }

    public async Task<dynamic> FetchCharactersThatStartWith(string characterName)
    {
        long timestamp = DateTimeOffset.Now.ToUnixTimeSeconds();
        string hash = GenerateHash(timestamp);
        string url = $"https://gateway.marvel.com:443/v1/public/characters?ts={timestamp}&apikey={_publicKey}&hash={hash}&nameStartsWith={characterName}";

        return await _httpClient.GetFromJsonAsync<dynamic>(url);
    }
}
