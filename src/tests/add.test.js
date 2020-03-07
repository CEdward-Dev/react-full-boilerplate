// Tests with Jest reference

const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hi, I'm ${name}.`;

test('Should add two numbers', () => {
    const result = add(5, 10);
    expect(result).toBe(15);
});

test("Should return a welcome greeting using name", () => {
    const result = generateGreeting('John');
    expect(result).toBe('Hi, I\'m John.');
});

test("Should return a welcome greeting with default", () => {
    const result = generateGreeting();
    expect(result).toBe('Hi, I\'m Anonymous.');
});