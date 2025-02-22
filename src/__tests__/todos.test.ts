import request from "supertest";
import { dataSource } from "../data-source";
import { app } from "..";

beforeAll(async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
});

afterAll(async () => {
  if (dataSource.isInitialized) {
    await dataSource.destroy();
  }
});

describe("Todo API Endpoints", () => {
  test("Should create a new Todo full field", async () => {
    const response = await request(app).post("/").send({
      name: "Jest",
      startDate: "2024-02-21",
      endDate: "2024-02-28",
    });

    expect(response.status).toBe(201);
  });
  test("Should create a new Todo 1 field name", async () => {
    const response = await request(app).post("/").send({
      name: "Jest",
    });

    expect(response.status).toBe(201);
  });
  test("Should create a new Todo not have start date", async () => {
    const response = await request(app).post("/").send({
      name: "Jest",
      endDate: "2024-02-28",
    });

    expect(response.status).toBe(400);
  });
  test("Should create a new Todo have start date, not have end date", async () => {
    const response = await request(app).post("/").send({
      name: "Jest",
      startDate: "2024-02-28",
    });

    expect(response.status).toBe(201);
  });
  test("Should get all Todos", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test("Should update an existing Todo", async () => {
    const response = await request(app).put(`/1`).send({
      name: "Jest and Supertest",
    });
    expect(response.body.data.name).toBe("Jest and Supertest");
    expect(response.status).toBe(200);
  });
  test("Should update an non existing Todo", async () => {
    const response = await request(app).put(`/100`).send({
      name: "Jest and Supertest",
    });

    expect(response.status).toBe(404);
  });
  test("Should update an existing Todo but delete field startdate", async () => {
    const response = await request(app).put(`/1`).send({
      name: "Jest and Supertest",
      startDate: null,
      endDate: "2000-03-23",
    });

    expect(response.status).toBe(400);
    console.log(response.body);
    expect(response.body.message.startDate._errors).toHaveLength(1);
  });
  test("Should delete a Todo", async () => {
    const response = await request(app).delete(`/1`);
    expect(response.status).toBe(200);
  });

  test("Should return 404 when deleting a non-existing Todo", async () => {
    const response = await request(app).delete(`/9999`);
    expect(response.status).toBe(404);
  });
  test("Should return 404 when deleting a string id Todo", async () => {
    const response = await request(app).delete(`/asd`);
    expect(response.status).toBe(400);
  });
});
