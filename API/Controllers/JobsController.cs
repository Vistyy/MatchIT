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

        [HttpPost("{jobId}/bid")]
        public async Task<IActionResult> AddBid(Guid jobId, AddBid.Command command)
        {
            command.JobId = jobId;
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("bids/{id}")]
        public async Task<IActionResult> DeleteBid(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteBid.Command { Id = id }));
        }

        [HttpDelete("{id}/{bidId}")]
        public async Task<IActionResult> AcceptBid(Guid id, Guid bidId)
        {
            return HandleResult(await Mediator.Send(new AcceptBid.Command { JobId = id, JobBidId = bidId }));

        }
    }
}