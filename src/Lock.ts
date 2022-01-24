import { Async } from "."

export class Lock{
    protected isLocked:boolean = false

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

    public async lockAndExecuteAsync(action:()=>Promise<void>|void){
        await this.waitForUnlockAndLockAsync()
        await action()
        await this.unlockAsync()
    }

}