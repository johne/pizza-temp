#!/usr/bin/node

const Path = require("path");
const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Nes = require("@hapi/nes");
const TempManager = require("./src/TempManager");
const routes = require("./src/routes");

const server = new Hapi.Server({
  port: 3000,
  routes: {
    cors: {
      origin: ["*"]
    },
    files: {
      relativeTo: Path.join(__dirname, "ui/pizza-temp/dist")
    }
  }
});

const provision = async () => {
  await server.register(Inert);
  await server.register(Nes);

  const tempManager = new TempManager(server);

  server.route(routes);

  server.route({
    method: "GET",
    path: "/current",
    config: {
      id: "current",
      handler: request => {
        return JSON.stringify(tempManager.getTemps());
      }
    }
  });

  server.route({
    method: "GET",
    path: "/history",
    config: {
      id: "history",
      handler: async request => {
        return JSON.stringify(
          await tempManager.getHistory(request.query.secondsBack)
        );
      }
    }
  });

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: false,
        index: true
      }
    }
  });

  await server.start();

  console.log("Server running at:", server.info.uri);
};

provision();
