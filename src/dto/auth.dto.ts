export class AuthLoginDto {
  readonly account: string;
  readonly password: string;
}

export class AuthRegisterDto {
  readonly account: string;
  readonly password: string;
  readonly name: string;
}
