const { test } = require("@jest/globals");
const Engineer = require("../lib/Engineer");

test("Can set id via constructor argument", () => {
    const testValue = 23;
    const e = new Employee("Kevin", testValue);
    expect(e.id).toBe(testValue);
});

test("Can set email via constructor argument", () => {
    const testValue = "kevin@fake.com";
    const e = new Employee("Kevin", 1, testValue);
    expect(e.email).toBe(testValue);
});