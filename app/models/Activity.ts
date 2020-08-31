import { ICategorizedInput } from './CategorizedInput';
import { IImage } from './Image';
import { IUserAvatar } from './UserAvatar';
import { ITime } from '../components/FormDateInput/FormDatePicker';
export interface IActivity {
    id: string;
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

export interface IActivityRequest {
    applicantId: string;
    activityId: string;
}

export type IForeignActivity = IActivity & IUserAvatar;