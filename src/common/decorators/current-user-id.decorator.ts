import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { JwtPayload } from "../../auth/types/jwtPayload.type";

export const currentUserId = createParamDecorator(
    (_: undefined, context: ExecutionContext): number => {
      const request = context.switchToHttp().getRequest();
      const user = request.user as JwtPayload;
      return user.sub;
    },
);