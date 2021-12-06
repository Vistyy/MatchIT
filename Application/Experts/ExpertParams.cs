using Application.Core;

namespace Application.Experts
{
    public class ExpertParams : PagingParams
    {
        public string Skill { get; set; }
        public string SortBy { get; set; }
    }
}