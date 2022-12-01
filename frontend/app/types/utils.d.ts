import {SyntheticEvent} from "react";

type ExtractPromiseType<T> = T extends PromiseLike<infer U> ? U : T;
