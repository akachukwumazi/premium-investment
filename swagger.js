import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Prime Chain User API Documentation",
      version: "1.0.0",
      description: "API documentation for prime chain user application",
    },
    servers: [
      {
        url: "http://localhost:3000/api", // change on deploy
      },
    ],
  },
  apis: ["./**/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
