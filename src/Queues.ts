import { Queue } from "./Queue";

export class Queues {
    constructor(public queues : Queue[]) {
    }

    pushQueue(queue : Queue) {
        this.queues.push(queue);
    }

    indexOf(queueId : number) : number {
        let index = -1;
        for(let i = 0; i < this.queues.length; i++) {
            if (this.queues[i].id == queueId) {
                index = i;
                break;
            }
        }
        return index;
    }

    deleteQueue(queueId : number) {
        let index = this.indexOf(queueId);
        if (index == -1) {
            console.log("Trying to delete nonexistent queue: " + queueId);
        } else {
            this.queues.splice(index, 1);
        }
    }

    toggleJoin(queueId : number, name : string) {
        let index = this.indexOf(queueId);
        if (index == -1) {
            console.log("Could not find queue with id: " + queueId);
        } else {
            let queue = this.queues[index];
            let usersIndex = queue.users.indexOf(name);
            if (usersIndex == -1) {
                queue.users.push(name);
            } else {
                queue.users.splice(usersIndex, 1);
            }
        }
    }
}