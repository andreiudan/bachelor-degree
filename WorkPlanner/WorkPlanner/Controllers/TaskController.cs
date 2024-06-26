﻿using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkPlanner.Business.Commands.SubtaskCommands;
using WorkPlanner.Business.Commands.TaskCommands;
using WorkPlanner.Business.Queries.SubtaskQueries;
using WorkPlanner.Business.Queries.TaskQueries;
using WorkPlanner.Domain.Dtos;
using WorkPlanner.Domain.EntityPropertyTypes;

namespace WorkPlanner.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : Controller
    {
        private readonly IMediator mediator;

        public TaskController(IMediator mediator)
        {
            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SprintTaskCreationDto task)
        {
            TaskCreationCommand request = new TaskCreationCommand(task);

            SprintTaskDto result = await mediator.Send(request);

            return Created(string.Empty, result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            GetAllTasksQuery request = new GetAllTasksQuery();

            List<SprintTaskDto> result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("{taskId}")]
        public async Task<IActionResult> Get(string taskId)
        {
            GetTaskQuery request = new GetTaskQuery(taskId);

            SprintTaskDto result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("{taskId}/sprintName")]
        public async Task<IActionResult> GetSprintName(string taskId)
        {
            GetSprintNameForTaskQuery request = new GetSprintNameForTaskQuery(taskId);

            string result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("{taskId}/projectName")]
        public async Task<IActionResult> GetProjectName(string taskId)
        {
            GetProjectNameForTaskQuery request = new GetProjectNameForTaskQuery(taskId);

            string result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpPut("{taskId}/newSubtask={subtaskName}")]
        public async Task<IActionResult> AddSubtask(string taskId, string subtaskName)
        {
            SubtaskCreationCommand request = new SubtaskCreationCommand(taskId, subtaskName);

            SubtaskDto result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpPut("{taskId}/subtask")]
        public async Task<IActionResult> UpdateSubtask(string taskId, [FromBody] SubtaskDto subtask)
        {
            UpdateSubtaskCommand request = new UpdateSubtaskCommand(subtask, taskId);

            bool result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpGet("{taskId}/subtasks")]
        public async Task<IActionResult> GetSubtasks(string taskId)
        {
            GetTaskSubtasksQuery request = new GetTaskSubtasksQuery(taskId);

            List<SubtaskDto> result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpPut("{taskId}/status/{newStatus}")]
        public async Task<IActionResult> UpdateStatus(string taskId, StatusType newStatus)
        {
            UpdateTaskCommand request = new UpdateTaskCommand(taskId, newStatus);

            bool result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpPut("{taskId}/{newSprintId}")]
        public async Task<IActionResult> ChangeSprint(string taskId, string newSprintId)
        {
            ChangeSprintCommand request = new ChangeSprintCommand(taskId, newSprintId);

            bool result = await mediator.Send(request);

            return Ok(result);
        }

        [HttpPut("{taskId}/moveToBacklog")]
        public async Task<IActionResult> MoveToBacklog(string taskId)
        {
            MoveTaskToBacklogCommand request = new MoveTaskToBacklogCommand(taskId);

            bool result = await mediator.Send(request);

            return Ok(result);
        }
    }
}
