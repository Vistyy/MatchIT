using Application.Core;

namespace Application.Jobs
{
    public class JobParams : PagingParams
    {
        public string Skill { get; set; }
        public string SortBy { get; set; } = "dateNewest";
    }
}