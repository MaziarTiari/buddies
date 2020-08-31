import { ICategorizedInput } from './CategorizedInput';
import { IImage } from './Image';
import { IUserAvatar } from './UserAvatar';
import { ITime } from '../components/FormDateInput/FormDatePicker';

export interface INewActivity {
    userId: string;
    title: string;
    location?: string;
    memberUserIds: Array<string>;
    applicantUserIds: Array<string>;
    visibility: number ;
    description?: string;
    image?: IImage;
    startDate?: number;
    endDate?: number;
    startTime?: ITime,
    endTime?: ITime,
    applicationDeadline?: number;
    tags?: Array<ICategorizedInput>;
    maxMember?: number ;
}

export interface IActivity extends INewActivity {
    id: string;
}

export interface IActivityRequest {
    applicantId: string;
    activityId: string;
}

export type IForeignActivity = IActivity & IUserAvatar;