﻿using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkPlanner.Business.Commands.ProjectCommands;
using WorkPlanner.Business.Queries.ProjectQueries;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        private readonly IMediator mediator;

        public ProjectController(IMediator mediator)
        {
            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProjectCreationDto project)
        {
            ProjectCreationCommand request = new ProjectCreationCommand(project);

            ProjectDto result = await mediator.Send(request);

            return CreatedAtAction(nameof(Create), new { id = result.Id } ,result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            GetAllProjectsQuery request = new GetAllProjectsQuery();

            List<ProjectDto> result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            GetProjectQuery request = new GetProjectQuery(id);

            ProjectDto result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("getAllChildren")]
        public async Task<IActionResult> GetAllWithAllChildren()
        {
            GetAllProjectsWithAllChildrenQuery request = new GetAllProjectsWithAllChildrenQuery();

            List<ProjectDto> result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("{projectId}/sprints")]
        public async Task<IActionResult> GetSprints(string projectId)
        {
            GetSprintsForProjectQuery request = new GetSprintsForProjectQuery(projectId);

            List<SprintDto> response = await mediator.Send(request);

            return Ok(response);
        }

        [HttpGet("{projectId}/activeSprint")]
        public async Task<IActionResult> GetActiveSprint(string projectId)
        {
            GetActiveSprintForProjectQuery request = new GetActiveSprintForProjectQuery(projectId);

            SprintDto response = await mediator.Send(request);

            return Ok(response);
        }
    }
}
