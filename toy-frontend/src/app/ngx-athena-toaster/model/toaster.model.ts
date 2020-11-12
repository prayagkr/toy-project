


export class Toaster {
    constructor(
        public id?: number,
        public message?: string,
        public header?: string,
        public colorType: Array<boolean> = new Array<boolean>(false, false, false, false)
    ) { }
}

export class ToasterMessage {
    constructor(
        public message?: string,
        public header?: string,
        public type?: ToastType
    ) { }
}

export enum ToastType {
    SUCCESS, ERROR, WARNING, INFO
}
