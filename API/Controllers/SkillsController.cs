using System.Threading.Tasks;
using Application.Skills;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SkillsController : BaseApiController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetSkills([FromQuery] SkillParams param)
        {
            return HandleResult(await Mediator.Send(new List.Query { Params = param }));
        }
    }
}