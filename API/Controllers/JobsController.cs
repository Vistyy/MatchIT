using System;
using System.Threading.Tasks;
using Application.Jobs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class JobsController : BaseApiController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetJobs([FromQuery] JobParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }

        [HttpGet("user/{userName}")]
        public async Task<IActionResult> GetUserJobs([FromQuery] JobParams param, string userName)
        {
            return HandlePagedResult(await Mediator.Send(new ListUser.Query { Params = param, UserName = userName }));
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetJob(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> Add(Add.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPost("{id}/bid")]
        public async Task<IActionResult> AddBid(Guid id, AddBid.Command command)
        {
            command.JobId = id;
            return HandleResult(await Mediator.Send(command));
        }
    }
}