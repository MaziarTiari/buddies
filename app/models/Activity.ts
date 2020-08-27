import { ICategorizedInput } from './CategorizedInput';
import { IImage } from './Image';
import { IUserAvatar } from './UserAvatar';

export interface IActivity {
    id: string;
    userId: string;
    title: string;
    location: string;
    memberUserIds: Array<string>;
    applicantUserIds: Array<string>;
    visibility: number ;
    description?: string;
    image?: IImage;
    startDate?: number;
    endDate?: number;
    applicationDeadline?: number;
    tags?: Array<ICategorizedInput>;
    maxMember?: number ;
}

export interface IActivityRequest {
    applicantId: string;
    activityId: string;
}

export type IForeignActivity = IActivity & IUserAvatar;