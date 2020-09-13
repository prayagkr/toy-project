
export class ResponseBody<T> {
    constructor(
        public code?: number,
        public data?: T,
        public message?: string,
        public success?: boolean
    ) { }
}

export class LoginModel {
    constructor(
        public email: string,
        public password: string
    ) {}
}

export class RegisterModel {
    constructor(
        public email: string,
        public password: string,
        public confirmPassword: string,
        public firstName?: string,
        public lastName?: string,
        public gender?: string
    ) {}
}

export class Question {
    constructor(
        public category?: string,
        public correct_answer?: string,
        public difficulty?: string,
        public incorrect_answers?: Array<string>,
        public question?: string,
        public type?: string,
        public id?: number,
        public ans?: Array<string>,
        public selectedAns?: string
    ) {}
}