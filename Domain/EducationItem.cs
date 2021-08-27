using System;

namespace Domain
{
    public class EducationItem
    {
        public string Id { get; set; }
        public string FacilityName { get; set; }
        public string FacilityLocation { get; set; }
        public string FieldOfStudy { get; set; }
        public DateTime StudyingFrom { get; set; }
        public DateTime? StudyingTo { get; set; }

    }
}