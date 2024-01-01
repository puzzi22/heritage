# Héritage du Cor

An e-commerce platform to sell rare music belonging to the horn repertoire.

## Getting Started

These instructions will guide you through getting a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software and how to install them:

- .NET 6.0 SDK or later
- An IDE such as Visual Studio, VS Code, or JetBrains Rider
- SQLite
- Docker Desktop (for containerization and running services such as databases)
- Node.js (for running Angular frontend)
- Angular CLI (for Angular development)

### Installing and Running the Project

1. Clone the repository:
`git clone https://github.com/puzzi22/heritage`

2. Navigate to the project directory:
`cd heritage`

3. Backend setup:
	1. Restore .NET dependencies: `dotnet restore`
	2. Build the .NET project: `dotnet build`
	3. Run the application using Docker (this will set up required services like databases): `docker-compose up`

4. API: Run the application with hot reload: `cd API`
`dotnet watch run`

5. Frontend setup:
	1. Navigate to the Angular project directory: `cd client`
	2. Install NPM packages: `npm install`
	3. Run the Angular development server:
`ng serve`

The frontend should now be running on `http://localhost:4200/`.

## Testing

### User Accounts

For testing purposes, you can either create a new user account or use a pre-existing test account. Example credentials for an existing test account are as follows:

- Email: `bob@test.com`
- Password: `Pa$$w0rd`

### Payments (Stripe Integration)

This application integrates Stripe for payment processing in test mode, allowing you to simulate transactions without moving any real money.

#### How to Make a Fake Payment
- Use a test card number, such as `4242 4242 4242 4242`.
- Enter a valid future date for the card expiration, such as `12/34`.
- Use any three-digit CVC (or four digits for American Express cards).
- You can fill other form fields with any value.

#### Testing Declined Payments
To simulate declined payments and test your integration's error-handling logic, use the following test card numbers:

- Generic Decline: `4000000000000002`
- Insufficient Funds: `4000000000009995`
- Lost Card: `4000000000009987`
- Stolen Card: `4000000000009979`
- Expired Card: `4000000000000069`
- Incorrect CVC: `4000000000000127`
- Processing Error: `4000000000000119`
- Incorrect Number: `4242424242424241`
- Velocity Limit Exceeded: `4000000000006975`

Each of these cards will result in a specific error response that are handled in the application.

### Applying Discount Codes

To test the discount functionality, use the code `STUDENT50` at checkout to apply a 50% deduction on your order total.

**Note**: Ensure you are using test API keys from Stripe and operating in test mode for all the above testing scenarios.



## Built With

- [.NET](https://dotnet.microsoft.com/) - The framework used
- [Entity Framework](https://docs.microsoft.com/en-us/ef/) - Object Relational Mapping (ORM) used
- [SQLite] (https://www.sqlite.org/index.html) - The database used
- [Angular] (https://angular.io/) - Frontend framework
- [Bootstrap 5.0](https://getbootstrap.com/) - Front-end framework for UI design
- [Docker] (https://www.docker.com/) - Used for containerization and running services
- [Stripe](https://stripe.com) - Payment processing platform used
- [Visual Studio Code] (https://code.visualstudio.com) - The source code editor used

## Author

- **Pierre-Antoine Tremblay** - *Héritage du Cor* - [Puzzi22](https://github.com/puzzi22)

## License

All rights reserved. The total or partial reproduction of this work by any means or procedures, including printing, photocopying, microfilm, electronic processing, or any other system, as well as the distribution of copies through rental or lending, is prohibited without the written authorization of the author or within the limits permitted by the Intellectual Property Law.