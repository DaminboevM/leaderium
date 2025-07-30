import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/common/types/type"; 

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles)