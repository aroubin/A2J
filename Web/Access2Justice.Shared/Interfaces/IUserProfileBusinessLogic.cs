﻿using Access2Justice.Shared.Models;
using System;
using System.Threading.Tasks;

namespace Access2Justice.Shared.Interfaces
{
    public interface IUserProfileBusinessLogic
    {
        Task<UserProfile> GetUserProfileDataAsync(string oId);
        Task<dynamic> GetUserResourceProfileDataAsync(string oId);
        Task<UserProfile> UpdateUserProfilePlanIdAsync(string oId, Guid planId);
        Task<dynamic> UpsertUserSavedResourcesAsync(dynamic userData);
    }
}