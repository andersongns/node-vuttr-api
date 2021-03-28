const {
  AuthenticationUseCase
} = require('../../../domain/authentication')
const { UserRepository } = require('../../../infra/db/mongodb')
const { hashBcryptGeneratorFactory, tokenJwtGeneratorFactory } = require('../helpers')

const dependencies = {
  usersRepository: UserRepository,
  hashGenerator: hashBcryptGeneratorFactory,
  tokenJwtGenerator: tokenJwtGeneratorFactory
}

module.exports = {
  authenticationUseCase: new AuthenticationUseCase(dependencies)
}
