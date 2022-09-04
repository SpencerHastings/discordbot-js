export default class UserError extends Error {
    userMessage: string

    constructor(m: string, userMessage?: string) {
        super(m)
        Object.setPrototypeOf(this, UserError.prototype)
        if (userMessage) {
            this.userMessage = userMessage
        } else {
            this.userMessage = m
        }
    }
}