import { ApiProperty } from '@nestjs/swagger';
export class EmployeesDto {
     @ApiProperty()
    firstName: string;

    @ApiProperty()
     lastName: string;

     @ApiProperty()
     email: string;
     
     @ApiProperty()
     isActive:boolean;

}