
export interface CounterState {
    counter: number;
    channelName: string
}

export const initialState: CounterState  = {
    counter: 3,
    channelName: 'NgRx by Saurabh'
}