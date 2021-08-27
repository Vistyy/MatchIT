using System;

namespace Domain
{
    public class Certification
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime DateAcquired { get; set; }
        public Photo Certificate { get; set; }
    }
}