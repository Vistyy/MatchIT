using System.Threading.Tasks;
using Application.Profiles;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{userName}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProfile(string userName)
        {
            return HandleResult(await Mediator.Send(new Details.Query { UserName = userName }));
        }

        [HttpPut]
        public async Task<IActionResult> Edit(UpdateProfile.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpPut("cv")]
        public async Task<IActionResult> AddCV(UserFile cv)
        {
            return HandleResult(await Mediator.Send(new AddCV.Command { CV = cv }));
        }
    }
}