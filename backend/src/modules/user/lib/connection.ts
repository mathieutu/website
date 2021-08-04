import { FastifyRequest } from "fastify";
import httpErrors from "http-errors";
import { Cookie } from "@/utils";
import * as SessionLib from "@/modules/session/lib";
import UserModel, { IUserDocument } from "@/modules/user/model";

export async function getUser(request: FastifyRequest): Promise<IUserDocument> {
    if (!request.headers.cookie) {
        throw new httpErrors.Unauthorized("Vous n'êtes pas connecté");
    }

    const cookies = Cookie.decode(request.headers.cookie);

    await SessionLib.assertValidity(cookies.userId, cookies.token);

    const user = await UserModel.findOne({
        _id: cookies.userId
    });

    if (!user) {
        throw new httpErrors.NotFound("Aucun utilisateur trouvé");
    }

    return user;
}