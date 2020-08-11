import { Image } from './Image';
import { CategorizedInput } from './CategorizedInput';

export interface Activity {
    id: string;
    userId: string;
    title: string;
    location: string;
    memberUserIds: Array<string>;
    applicantUserIds: Array<string>;
    visibility: number ;
    description?: string;
    image?: Image;
    startDate?: number;
    endDate?: number;
    applicationDeadline?: number;
    tags?: Array<CategorizedInput>;
    maxMember?: number ;
}