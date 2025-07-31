import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @IsOptional()
    password?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    about?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsString()
    headline?: string;

    @IsOptional()
    @IsString()
    website?: string;
}

export class CreateSkillDto {
    @IsString()
    @IsNotEmpty({ message: 'Konikma nomi bosh bolmasligi kerak' })
    name: string;
}


export class CreateExperienceDto {
    @IsString()
    @IsNotEmpty({ message: 'Lavozim nomi kiritilishi shart' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'Kompaniya nomi kiritilishi kerak' })
    company: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsDateString({}, { message: 'Boshlanish sanasi notogri' })
    startDate: string;

    @IsOptional()
    @IsDateString({}, { message: 'Tugash sanasi notogri' })
    endDate?: string;

    @IsOptional()
    @IsBoolean()
    current?: boolean;

    @IsOptional()
    @IsString()
    description?: string;
}


