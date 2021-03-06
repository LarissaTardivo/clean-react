import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsErros, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { AuthenticationParams } from '@/domain/usecases'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsErros()
      default: throw new UnexpectedError()
    }
  }
}
