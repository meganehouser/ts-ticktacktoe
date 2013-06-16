/// <reference path="knockout.d.ts" />

interface KnockoutObservable<T> extends KnockoutObservableBase {
    (): T;
    (value: T): void;

    subscribe(callback: (newValue: T) => void , target?: T, topic?: string): KnockoutSubscription;
    notifySubscribers(valueToWrite, topic?: string);
}