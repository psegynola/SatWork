const {isInvalidEmail, isEmptyPayload} = require('./validator.js')

test('valid email', function() {
    const testPayload = {
        name: "test name",
        email: "test.email@example.com",

    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(false)
})

test('invalid email', function() {
    const testPayload = {
        name: "test name",
        email: "test.emailexample.com",

    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(true)
})

test('empty payload', function() {
    const testPayload={}
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(true)
})


test('non-empty payload', function() {
    const testPayload={
        name: "test name",
        email: "jdoe@example.ca"
    }
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(false)
})
