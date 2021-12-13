using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;

namespace Application.Jobs
{
    public class JobParams : PagingParams
    {
        public string Skill { get; set; }
        public string SortBy { get; set; } = "dateNewest";
    }
}