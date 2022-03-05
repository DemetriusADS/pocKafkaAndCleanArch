import { ValidateEmail } from '../../src/utils'

interface Sut {
  sut: ValidateEmail
  fixture: string
}

const makeSut = (): Sut => {
  const sut = new ValidateEmail()
  const fixture = 'any@email.com'
  return { sut, fixture }
}
describe('Validate Email', () => {
  test('should return true if is a valid email', () => {
    const { sut, fixture } = makeSut()
    const testable = sut.execute(fixture)
    expect(testable).toBe(true)
  })
  test('should return false if is an invalid email', () => {
    const { sut } = makeSut()
    const testable = sut.execute('invalid_email')
    expect(testable).toBe(false)
  })
})
