import { IsEmail, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;
}
