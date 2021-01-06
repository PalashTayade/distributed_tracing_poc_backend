import { ApiProperty } from '@nestjs/swagger';
export class EmployeesDto {
    id : string;
    
     @ApiProperty()
    firstName: string;

    @ApiProperty()
     lastName: string;

     @ApiProperty()
     email: string;
     
     @ApiProperty()
     isActive:boolean;

}