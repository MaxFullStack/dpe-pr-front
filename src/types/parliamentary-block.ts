export interface Party {
  partyCode: string
  partyAcronym: string
  partyName: string
}

export interface Member {
  party: Party
  joinDate: string
  leaveDate?: string
}

export interface ParliamentaryBlock {
  blockCode: string
  blockName: string
  blockNickname: string
  creationDate: string
  members: Member[]
}
