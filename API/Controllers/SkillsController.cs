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
            return HandleResult(await Mediator.Send(new ListUsed.Query { Params = param }));
        }
        [HttpGet("all")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllSkills()
        {
            return HandleResult(await Mediator.Send(new ListAll.Query { }));
        }
        [HttpGet("job-required")]
        [AllowAnonymous]
        public async Task<IActionResult> GetJobSkills([FromQuery] SkillParams param)
        {
            return HandleResult(await Mediator.Send(new ListJobRequired.Query {Params = param}));
        }
    }
}