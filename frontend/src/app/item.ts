export class SingleItem {
    constructor(
        public userId: number, 
        public title: string, 
        public completed: boolean,
        public id?: any,) {}
}

export class ITTests {
    constructor(
        public question: string,
        public answerRight1: string,
        public answerWrong1: string,
        public answerWrong2: string,
        public answerWrong3: string,
        public id?: number
    ) {}
}

export class Tests {
    constructor(
        public id: number,
        public question: string,
        public right_answer: string,
        public wrong_answer1: string,
        public wrong_answer2: string,
        public wrong_answer3: string
    ) {}
}

export class TestsGroup {
    constructor(
        public id: number,
        public group: string
        // public questions: Tests[]
    ) {}
}

export class QuestsInGroup {
    constructor(
        public id: number,
        public group: string,
        public questions: Tests[]
    ) {}
}

export class LogIn {
    constructor(
        public email: string,
        public password: string
    ){}
}

export class AuthToken {
    constructor(
        public auth_token: string
    ){}
  }

export class AuthUser {
    constructor(
        public email: string,
​        public first_name: string,
​        public id: any,
​        public last_name: string,
​        public username: string
    ) {}
}


export class Score {
    constructor(
        public id: number,
        public user: string,
        public group: number,
        public qty_right_answer: number
    ) {}
}


export class UserQuestAnswered {
    constructor(
        public id: number,
        public is_how_answered: boolean,
        public quest: number,
        public user: number
    ) {}
}


class GroupInStat {
    constructor(
        public id: number,
        public group: string
    ) {}
}


export class Statistic {
    constructor(
        public id: number,
        public is_how_answered: boolean,
        public quest: number,
        public user: number,
        public group: GroupInStat
    ) {}
}


export class Stat {
    constructor(
        public group: string,
        public qty_right: number,
        public qty_wrong: number
    ) {}
}
