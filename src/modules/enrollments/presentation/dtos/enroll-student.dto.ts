import { IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EnrollStudentDto {
  @ApiProperty({ description: 'ID of the student user' })
  @IsNotEmpty()
  @IsUUID()
  studentId: string;

  @ApiProperty({ description: 'ID of the target class' })
  @IsNotEmpty()
  @IsUUID()
  classId: string;

  @ApiProperty({ description: 'ID of the school year' })
  @IsNotEmpty()
  @IsUUID()
  schoolYearId: string;
}
