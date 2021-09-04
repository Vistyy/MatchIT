using System.Threading.Tasks;
using Application.Experts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ExpertsController : BaseApiController
    {        
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetExperts([FromQuery] ExpertParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }
    }
}