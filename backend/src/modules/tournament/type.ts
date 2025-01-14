import { Type } from "@sinclair/typebox";

const Tournament = {
    _id: Type.String(),
    name: Type.String(),
    dates: Type.Object({
        start: Type.String(),
        final: Type.String(),
        playDays: Type.String(),
        subscriptionClose: Type.Optional(Type.String())
    }),
    description: Type.String(),
    game: Type.Object({
        name: Type.Optional(Type.String()),
        team: Type.Object({
            maxTeams: Type.Optional(Type.Number()),
            playersNumber: Type.Optional(Type.Number()),
            subscribed: Type.Number(),
            substitutesNumber: Type.Optional(Type.Number())
        }),
        username: Type.Optional(Type.String())
    }),
    informations: Type.Object({
        prizes: Type.String(),
        rulesUrl: Type.String()
    }),
    settings: Type.Optional(Type.Object({
        logo: Type.Optional(Type.String()),
        slug: Type.Optional(Type.String())
    })),
    state: Type.Optional(Type.Object({
        archived: Type.Optional(Type.Boolean()),
        public: Type.Optional(Type.Boolean())
    }))
};

export const TypeTournament = Type.Object(Tournament);
