import { IssueBaseModel } from '../issue-list/issue-base.model';

export class IssueDetailModel extends IssueBaseModel {
  text: string;
  user: {
    avatar: string;
    profile: string;
    username: string;
  };
}
