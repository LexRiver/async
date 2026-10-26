import { Async } from "./Async.mjs"

export class Lock{
    protected isLocked:boolean = false
    private isStartingAction:boolean = false

    protected async waitForUnlockAndLockAsync(msStep:number = 50, maxMsToWait:number = 0){
        if(this.isLocked){
            // must wait
            try {
                await Async.waitForFunctionToReturnTrueAsync(() => this.isLocked === false, msStep, maxMsToWait)
            } catch(x){
                throw new Error(`Unable to unlock the lock. Timeout ${maxMsToWait} ms`)
            }
        }
        if(this.isLocked) throw new Error('unable to unlock')
        this.isLocked = true

    }

    protected async unlockAsync(){
        if(!this.isLocked) throw new Error('unlock failed, not locked')
        this.isLocked = false
    }

    public async lockAndExecuteAsync(action:()=>Promise<void>|void, msStep:number = 50, maxMsToWait:number = 0){
        if(this.isStartingAction){
            throw new Error('Cannot acquire the same Lock from within its action')
        }

        await this.waitForUnlockAndLockAsync(msStep, maxMsToWait)
        try {
            this.isStartingAction = true
            let actionResult:Promise<void>|void
            try {
                actionResult = action()
            } finally {
                this.isStartingAction = false
            }
            await actionResult
        } finally {
            await this.unlockAsync()
        }
    }

}