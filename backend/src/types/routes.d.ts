declare module './routes/auth' {
    import { Router } from 'express';
    const authRouter: Router;
    export = authRouter;
}

declare module './routes/register' {
    import { Router } from 'express';
    const registerRouter: Router;
    export = registerRouter;
}

declare module './routes/userRoutes' {
    import { Router } from 'express';
    const userRouter: Router;
    export = userRouter;
}

declare module './routes/businessRoutes' {
    import { Router } from 'express';
    const businessRouter: Router;
    export = businessRouter;
}
