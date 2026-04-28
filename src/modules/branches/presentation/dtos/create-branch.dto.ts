import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBranchDto {
  @ApiProperty({ example: 'Main Annex' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'New York' })
  @IsNotEmpty()
  @IsString()
  city: string;
}
