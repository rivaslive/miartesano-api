type FunctionOptionType = (value?: unknown) => void;
type FunctionArgsType = (resolve: FunctionOptionType, reject: FunctionOptionType) => void;

export default async function awaitPromise (func: FunctionArgsType) {
  return new Promise((resolve, reject) => {
    func(resolve, reject)
  })
}
