import { createServer } from "http";
const PORT = process.env.PORT;

const users = [
  { id: 1, name: "john sharma" },
  { id: 2, name: "lalu trevor" },
  { id: 3, name: "Mason Nath" },
];

// logger middleware

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// JSON middleware

const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

//route handler for GET /api/users

const getUserHandler = (req, res) => {
  console.log("users:inside");

  res.write(JSON.stringify(users));
  res.end();
};

//route handler for GET /api/users/:id

const getUserHandlerById = (req, res) => {
  const id = req.url.split("/")[3];
  const user = users.find((user) => user.id === parseInt(id));
  console.log("id:inside");

  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "No data found" }));
  }
  res.end();
};

// not found handler

const notFound = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Route not found" }));
  res.end();
};

// Route Handler For Post /api/users

const createUserHanlder = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    res.end()
  });
};

//logger middleware


const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === "/api/users" && req.method === "GET") {
        getUserHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        getUserHandlerById(req, res);
      } else if (req.url === "/api/users" && req.method === "POST") {
        createUserHanlder(req, res);
      } else {
        notFound(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`server is listenting to port ${PORT}`);
});

//   https://www.youtube.com/watch?v=32M1al-Y6Ag&t=231s
