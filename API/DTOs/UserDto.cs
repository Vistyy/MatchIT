using Domain;

namespace API.DTOs
{
    public class UserDto
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }
        public Photo Photo { get; set; }
        public bool IsExpert { get; set; }

    }
}