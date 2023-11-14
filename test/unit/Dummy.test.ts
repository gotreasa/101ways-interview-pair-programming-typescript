import Dummy from '../../src/Dummy';

describe('Check the Dummy class is working', () => {
  test('should have a class object valid set to true', () => {
    const dummy = new Dummy();
    expect(dummy.valid).toBe(true);
  });
});
