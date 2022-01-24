export declare class Lock {
    protected isLocked: boolean;
    protected waitForUnlockAndLockAsync(msStep?: number, maxMsToWait?: number): Promise<void>;
    protected unlockAsync(): Promise<void>;
    lockAndExecuteAsync(action: () => Promise<void>): Promise<void>;
}
