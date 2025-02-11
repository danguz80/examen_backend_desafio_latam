const request = require("supertest");
const { app, server } = require("../index");

describe("Operaciones CRUD de cafes", () => {

    test("GET /cafes debe devolver un status 200 y un array con al menos 1 objeto", async () => {
        const response = await request(app).get("/cafes");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("DELETE /cafes/:id debe devolver status 404 si el id no existe", async () => {
        const response = await request(app)
            .delete("/cafes/999") // ID que no existe
            .set("Authorization", "Bearer token");
        expect(response.status).toBe(404);
    });

    test("POST /cafes debe agregar un nuevo café y devolver status 201", async () => {
        const nuevoCafe = { id: 5, nombre: "Latte" };
        const response = await request(app)
            .post("/cafes")
            .send(nuevoCafe);
        expect(response.status).toBe(201);
        expect(response.body).toContainEqual(nuevoCafe);
    });

    test("PUT /cafes/:id debe devolver status 400 si los IDs no coinciden", async () => {
        const cafeActualizado = { id: 10, nombre: "Expreso Doble" };
        const response = await request(app)
            .put("/cafes/1") // ID diferente al del objeto enviado
            .send(cafeActualizado);
        expect(response.status).toBe(400);
    });

});

afterAll(() => {
    server.close(); // Ahora sí podemos cerrar el servidor correctamente
});


