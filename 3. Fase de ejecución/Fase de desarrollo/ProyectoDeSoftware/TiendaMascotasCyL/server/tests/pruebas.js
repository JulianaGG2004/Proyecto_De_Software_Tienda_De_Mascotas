// tests/user/user.test.js
import { jest } from "@jest/globals";

// ---------- Mocks antes de cualquier import ----------
jest.mock("../../config/sendEmail.js", () => jest.fn(() => Promise.resolve(true)));
jest.mock("../../utils/uploadImageCloudinary.js", () => jest.fn(() => Promise.resolve({ url: "http://fakeurl.com/avatar.png" })));
jest.mock("../../utils/generatedAccessToken.js", () => jest.fn((id) => `access-token-${id}`));
jest.mock("../../utils/generatedRefreshToken.js", () => jest.fn((id) => `refresh-token-${id}`));
jest.mock("../../utils/generatedOtp.js", () => jest.fn(() => "123456"));
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn((token) => ({ _id: "mockUserId" }))
}));

// ---------- Imports después de los mocks ----------
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import supertest from "supertest";
import bcryptjs from "bcryptjs";
import app from "../../app.js";
import UserModel from "../../models/user.model.js";
import sendEmail from "../../config/sendEmail.js";

let mongoServer;
const request = supertest(app);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

describe("Endpoints del Controlador de Usuarios", () => {

  describe("Registrar Usuario", () => {
    it("Debe fallar si faltan campos requeridos", async () => {
      const res = await request.post("/api/user/register").send({ email: "test@test.com" });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe(true);
    });

    it("Debe registrar un usuario exitosamente", async () => {
      const res = await request.post("/api/user/register").send({
        name: "Usuario Test",
        email: "test@test.com",
        password: "123456"
      });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("_id");
      expect(sendEmail).toHaveBeenCalled();
    });

    it("Debe fallar si el correo ya existe", async () => {
      await UserModel.create({
        name: "Existente",
        email: "exist@test.com",
        password: await bcryptjs.hash("123456", 10)
      });
      const res = await request.post("/api/user/register").send({
        name: "Nuevo Usuario",
        email: "exist@test.com",
        password: "123456"
      });
      expect(res.body.error).toBe(true);
      expect(res.body.message).toBe("Error, el correo ya existe");
    });
  });

  describe("Iniciar Sesión", () => {
    it("Debe fallar si falta correo o contraseña", async () => {
      const res = await request.post("/api/user/login").send({ email: "test@test.com" });
      expect(res.status).toBe(400);
    });

    it("Debe fallar si el usuario no existe", async () => {
      const res = await request.post("/api/user/login").send({ email: "noexiste@test.com", password: "123456" });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Usuario no esta registrado");
    });

    it("Debe iniciar sesión correctamente", async () => {
      const password = await bcryptjs.hash("123456", 10);
      await UserModel.create({ name: "Test", email: "test@test.com", password, status: "Active" });

      const res = await request.post("/api/user/login").send({ email: "test@test.com", password: "123456" });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("accesstoken");
      expect(res.body.data).toHaveProperty("refreshToken");
    });
  });

  describe("Cerrar Sesión", () => {
    it("Debe cerrar sesión correctamente", async () => {
      const user = await UserModel.create({ name: "Test", email: "test@test.com", password: "123456" });
      const res = await request.get("/api/user/logout").set("userid", user._id);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe("Olvidé Contraseña & OTP", () => {
    it("Debe enviar OTP de recuperación de contraseña", async () => {
      const user = await UserModel.create({ name: "Test", email: "test@test.com", password: "123456" });
      const res = await request.put("/api/user/forgot-password").send({ email: "test@test.com" });
      expect(res.status).toBe(200);
      expect(sendEmail).toHaveBeenCalled();
    });

    it("Debe verificar OTP correctamente", async () => {
      const user = await UserModel.create({
        name: "Test",
        email: "test@test.com",
        password: "123456",
        forgot_password_otp: "123456",
        forgot_password_expiry: new Date(Date.now() + 3600 * 1000)
      });
      const res = await request.put("/api/user/verify-forgot-password-otp").send({ email: "test@test.com", otp: "123456" });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe("Actualizar Detalles de Usuario & Avatar", () => {
    it("Debe actualizar detalles del usuario", async () => {
      const user = await UserModel.create({ name: "Test", email: "test@test.com", password: "123456" });
      const res = await request.put("/api/user/update-user")
        .set("userId", user._id)
        .send({ name: "Nombre Actualizado" });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("Debe subir avatar correctamente", async () => {
      const user = await UserModel.create({ name: "Test", email: "test@test.com", password: "123456" });
      const res = await request.put("/api/user/upload-avatar")
        .set("userId", user._id)
        .attach("avatar", Buffer.from("imagen falsa"), "avatar.png");
      expect(res.status).toBe(200);
      expect(res.body.data.avatar).toBe("http://fakeurl.com/avatar.png");
    });
  });

  describe("Refrescar Token & Detalles de Usuario", () => {
    it("Debe refrescar token de acceso", async () => {
      const res = await request.post("/api/user/refresh-token").set("Cookie", "refreshToken=mock");
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("accessToken");
    });

    it("Debe obtener detalles del usuario", async () => {
      const user = await UserModel.create({ name: "Test", email: "test@test.com", password: "123456" });
      const res = await request.get("/api/user/user-details").set("userId", user._id);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe("test@test.com");
    });
  });

});
