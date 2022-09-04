import {Command} from "../command";
import ping from './misc/ping'
import roles from './roles'

const commandList: Command[] = [
    ping,
    roles,
]

export default commandList