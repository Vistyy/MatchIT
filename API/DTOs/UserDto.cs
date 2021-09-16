using Domain;

namespace API.DTOs
{
    public class UserDto
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public Photo Image { get; set; }
        public bool IsExpert { get; set; }

    }
}