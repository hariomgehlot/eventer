# Eventer - A Monorepo created with Nx.dev

This is a monorepo created using Nx.dev, containing two applications: a NestJS backend and an Angular frontend.

## Backend

The backend is a NestJS application that provides an API for the frontend to consume. It is located in the `apps/backend` directory and is built using NestJS v10.0.2.

## Frontend

The frontend is an Angular application that consumes the API provided by the backend. It is located in the `apps/ui` directory and is built using Angular v18.2.0.

## Running the applications

To run the applications, use the following commands:

- `nx serve backend` to start the backend
- `nx serve ui` to start the frontend

## Building the applications

To build the applications, use the following commands:

- `nx build backend` to build the backend
- `nx build ui` to build the frontend

## Testing the applications

To test the applications, use the following commands:

- `nx test backend` to test the backend
- `nx test ui` to test the frontend

## Linting the applications

To lint the applications, use the following commands:

- `nx lint backend` to lint the backend
- `nx lint ui` to lint the frontend

## Techstack

- NestJS v10.0.2
- Angular v18.2.0
