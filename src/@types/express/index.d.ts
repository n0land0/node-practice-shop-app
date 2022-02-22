import { IUser } from '../../models/interfaces';

declare global {
    namespace Express {
        interface Request {
            user: Model;
            isLoggedIn: boolean;
            session: Session
        }
        interface Session {
            isLoggedIn: boolean;
            user: IUSer;
        }
    }
}
