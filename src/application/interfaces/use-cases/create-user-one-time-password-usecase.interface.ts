export interface ICreateUserOneTimePasswordUseCase {
  execute(userId: number): Promise<string>;
}
