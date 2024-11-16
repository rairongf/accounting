
import { IsNotEmpty } from 'class-validator';

export class AccessTokenPayloadDto {
  @IsNotEmpty()
  sub: string;

  @IsNotEmpty()
  email: string;
}
