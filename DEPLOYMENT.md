# Deployment Guide

This guide outlines the steps to deploy the ProAcademic Analytics platform.

## Prerequisites

- MongoDB Atlas Account
- Node.js (>= 20.0.0)
- Render or similar hosting platform

## Environment Variables

The following environment variables must be configured:

| Variable | Description |
| :--- | :--- |
| `MONGO_URI` | Your MongoDB Atlas connection string. |
| `NODE_ENV` | Set to `production`. |
| `JWT_SECRET` | A secure secret for JWT signing. |
| `ADMIN_EMAIL` | Email for the initial admin account. |
| `ADMIN_PASSWORD` | Password for the initial admin account. |

## Steps

1. **Connect Database**: Obtain your MongoDB connection string from Atlas.
2. **Configure Environment**: Set the required variables in your hosting provider's dashboard.
3. **Deploy**: Push your code to the hosting provider and trigger a build.
4. **Verify**: Check the service logs to ensure "MongoDB Connected" is logged.
