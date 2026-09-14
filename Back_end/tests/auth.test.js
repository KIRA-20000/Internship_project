const test = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "test-secret";

const { register, login } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

function createResponse() {
    return {
        statusCode: 200,
        body: null,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(payload) {
            this.body = payload;
            return this;
        }
    };
}

test("register rejects incomplete input", async () => {
    const response = createResponse();

    await register({ body: { email: "student@example.com" } }, response);

    assert.equal(response.statusCode, 400);
    assert.equal(response.body.message, "Name, email and password are required");
});

test("login rejects incomplete input", async () => {
    const response = createResponse();

    await login({ body: { email: "student@example.com" } }, response);

    assert.equal(response.statusCode, 400);
    assert.equal(response.body.message, "Email and password are required");
});

test("protect rejects a missing bearer token", () => {
    const response = createResponse();
    let nextCalled = false;

    protect({ headers: {} }, response, () => {
        nextCalled = true;
    });

    assert.equal(response.statusCode, 401);
    assert.equal(response.body.message, "Not authorized, no token");
    assert.equal(nextCalled, false);
});

test("protect rejects an invalid token", () => {
    const response = createResponse();
    let nextCalled = false;

    protect(
        { headers: { authorization: "Bearer invalid-token" } },
        response,
        () => {
            nextCalled = true;
        }
    );

    assert.equal(response.statusCode, 401);
    assert.equal(response.body.message, "Not authorized, invalid token");
    assert.equal(nextCalled, false);
});

test("protect accepts a valid token and attaches the user", () => {
    const user = { userId: "user-123", role: "student" };
    const token = jwt.sign(user, process.env.JWT_SECRET);
    const request = { headers: { authorization: `Bearer ${token}` } };
    const response = createResponse();
    let nextCalled = false;

    protect(request, response, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, true);
    assert.deepEqual(request.user.userId, user.userId);
    assert.equal(request.user.role, user.role);
});
