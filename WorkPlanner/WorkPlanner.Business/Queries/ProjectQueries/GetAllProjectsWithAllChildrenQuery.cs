﻿using MediatR;
using WorkPlanner.Domain.Dtos;

namespace WorkPlanner.Business.Queries.ProjectQueries
{
    public class GetAllProjectsWithAllChildrenQuery : IRequest<List<ProjectDto>>
    {
    }
}
