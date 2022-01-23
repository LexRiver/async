"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Async = void 0;
var Async;
(function (Async) {
    /**
     * Wait for some milliseconds by setTimeout wrapped in Promise
     * @param millisecondsToWait
     */
    function waitMsAsync(millisecondsToWait) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve();
                        }, millisecondsToWait);
                    })];
            });
        });
    }
    Async.waitMsAsync = waitMsAsync;
    /**
     * Wait for function to return true or throw error
     * @param func - this function must return true
     * @param msStep - execute function every msStep milliseconds and check for result
     * @param maxMsToWait - maximum milliseconds to wait
     */
    function waitForFunctionToReturnTrueAsync(functionToReturnTrue, msStep, maxMsToWait) {
        if (msStep === void 0) { msStep = 10; }
        if (maxMsToWait === void 0) { maxMsToWait = 30 * 1000; }
        return __awaiter(this, void 0, void 0, function () {
            var maxSteps, currentStep;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (msStep <= 0)
                            throw new Error("msStep=".concat(msStep, "<=0"));
                        if (maxMsToWait <= 0)
                            throw new Error("maxMsToWait=".concat(maxMsToWait));
                        maxSteps = 1;
                        if (maxMsToWait && maxMsToWait > msStep)
                            maxSteps = maxMsToWait / msStep;
                        currentStep = 0;
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 3];
                        if (functionToReturnTrue()) {
                            return [2 /*return*/];
                        }
                        if (currentStep > maxSteps) {
                            throw new Error("waitForFunctionToReturnTrue failed after timeout ".concat(maxMsToWait, "ms"));
                        }
                        return [4 /*yield*/, waitMsAsync(msStep)];
                    case 2:
                        _a.sent();
                        currentStep++;
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    Async.waitForFunctionToReturnTrueAsync = waitForFunctionToReturnTrueAsync;
})(Async = exports.Async || (exports.Async = {}));
