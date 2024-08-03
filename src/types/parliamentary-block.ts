export interface Party {
  partyCode: string;
  partyAcronym: string;
  partyName: string;
}

export interface Member {
  party: Party;
  joinDate: string;
  leaveDate?: string;
}

export interface ParliamentaryBlock {
  blockCode: string;
  blockName: string;
  blockAcronym?: string;
  creationDate: string;
  partyAcronym?: string;
  members: Member[];
}