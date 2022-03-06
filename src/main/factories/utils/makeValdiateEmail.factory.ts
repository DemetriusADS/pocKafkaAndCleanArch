import { ValidateEmail } from '../../../utils'

const makeValidateEmailFactory = (): ValidateEmail => new ValidateEmail()

export { makeValidateEmailFactory }
