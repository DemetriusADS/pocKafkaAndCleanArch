import { ValidateEmail } from '@src/utils'

const makeValidateEmailFactory = (): ValidateEmail => new ValidateEmail()

export { makeValidateEmailFactory }
