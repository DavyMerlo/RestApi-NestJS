import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { JwtPayloadWithRt } from "../../auth/types/jwtPayloadRt";

export const currentUser = createParamDecorator(
    (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();
      if (!data) return request.user;
      return request.user[data];
    },
  );
