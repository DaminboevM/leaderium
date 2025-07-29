import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/common/types/types";

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles)